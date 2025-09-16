'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { GoogleCalendarClient, createPrayerEvent } from '@/lib/google-calendar';
import { PrayerTimesResult } from '@/lib/prayer-times';

import { useAuth } from './AuthContext';
import { useLocation } from './LocationContext';
import { usePrayerTimes } from './PrayerTimesContext';

interface CalendarSyncSettings {
  enabled: boolean;
  reminderMinutes: number;
  syncedPrayers: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
}

interface CalendarSyncState {
  settings: CalendarSyncSettings;
  isAuthorized: boolean;
  isLoading: boolean;
  error: string | null;
  lastSyncDate: string | null;
}

interface CalendarSyncContextType extends CalendarSyncState {
  // Authorization
  authorizeCalendar: () => Promise<void>;
  revokeAuthorization: () => void;

  // Settings
  updateSettings: (settings: Partial<CalendarSyncSettings>) => void;

  // Sync operations
  syncPrayerTimes: (date?: Date) => Promise<void>;
  clearPrayerEvents: (date?: Date) => Promise<void>;

  // Manual operations
  addPrayerEvent: (prayerName: string, prayerTime: Date) => Promise<void>;
}

const defaultSettings: CalendarSyncSettings = {
  enabled: false,
  reminderMinutes: 10,
  syncedPrayers: {
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
  },
};

const defaultState: CalendarSyncState = {
  settings: defaultSettings,
  isAuthorized: false,
  isLoading: false,
  error: null,
  lastSyncDate: null,
};

const CalendarSyncContext = createContext<CalendarSyncContextType | null>(null);

export function CalendarSyncProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { location } = useLocation();
  const { prayerTimes } = usePrayerTimes();
  const [state, setState] = useState<CalendarSyncState>(defaultState);
  const [calendarService, setCalendarService] = useState<GoogleCalendarClient | null>(null);

  // Load settings from localStorage
  useEffect(() => {
    if (!user) return;

    const savedSettings = localStorage.getItem(`calendar-sync-settings-${user.id}`);
    const savedAuth = localStorage.getItem(`calendar-auth-${user.id}`);
    const lastSync = localStorage.getItem(`last-sync-${user.id}`);

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setState((prev) => ({ ...prev, settings }));
    }

    if (savedAuth) {
      const { accessToken, expiresAt } = JSON.parse(savedAuth);

      // Check if token is still valid
      if (Date.now() < expiresAt) {
        setCalendarService(new GoogleCalendarClient(accessToken));
        setState((prev) => ({ ...prev, isAuthorized: true }));
      } else {
        // Token expired, clear it
        localStorage.removeItem(`calendar-auth-${user.id}`);
      }
    }

    if (lastSync) {
      setState((prev) => ({ ...prev, lastSyncDate: lastSync }));
    }
  }, [user]);

  // Note: Auto-sync removed - will be a Pro plan feature
  // Users sync manually for now

  const authorizeCalendar = async () => {
    if (!user) throw new Error('User not authenticated');

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Get the correct base URL for OAuth redirect
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        (process.env.NODE_ENV === 'production'
          ? 'https://www.salatsync.com'
          : window.location.origin);

      // Redirect to Google OAuth with account selection
      const authUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(baseUrl + '/auth/google/callback')}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent('https://www.googleapis.com/auth/calendar')}&` +
        `access_type=offline&` +
        `prompt=select_account consent&` +
        `state=calendar-sync`;

      // Redirect to Google OAuth
      window.location.href = authUrl;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authorization failed',
      }));
    }
  };

  const revokeAuthorization = () => {
    if (!user) return;

    localStorage.removeItem(`calendar-auth-${user.id}`);
    localStorage.removeItem(`last-sync-${user.id}`);

    setCalendarService(null);
    setState((prev) => ({
      ...prev,
      isAuthorized: false,
      lastSyncDate: null,
      settings: { ...prev.settings, enabled: false },
    }));

    // Save updated settings
    localStorage.setItem(
      `calendar-sync-settings-${user.id}`,
      JSON.stringify({ ...state.settings, enabled: false })
    );
  };

  const updateSettings = (newSettings: Partial<CalendarSyncSettings>) => {
    if (!user) return;

    const updatedSettings = { ...state.settings, ...newSettings };
    setState((prev) => ({ ...prev, settings: updatedSettings }));

    localStorage.setItem(`calendar-sync-settings-${user.id}`, JSON.stringify(updatedSettings));
  };

  const syncPrayerTimes = async (date: Date = new Date()) => {
    if (!calendarService || !prayerTimes || !location || !user) {
      const missing = [];
      if (!calendarService) missing.push('calendar service (not authorized)');
      if (!prayerTimes) missing.push('prayer times (no location set)');
      if (!location) missing.push('location');
      if (!user) missing.push('user (not signed in)');
      throw new Error(`Missing required data for sync: ${missing.join(', ')}`);
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Clear existing prayer events for the date
      await clearPrayerEvents(date);

      // Create new prayer events
      const prayers: Array<{ name: string; time: Date; enabled: boolean }> = [
        { name: 'Fajr', time: prayerTimes.fajr, enabled: state.settings.syncedPrayers.fajr },
        { name: 'Dhuhr', time: prayerTimes.dhuhr, enabled: state.settings.syncedPrayers.dhuhr },
        { name: 'Asr', time: prayerTimes.asr, enabled: state.settings.syncedPrayers.asr },
        {
          name: 'Maghrib',
          time: prayerTimes.maghrib,
          enabled: state.settings.syncedPrayers.maghrib,
        },
        { name: 'Isha', time: prayerTimes.isha, enabled: state.settings.syncedPrayers.isha },
      ];

      for (const prayer of prayers) {
        if (prayer.enabled) {
          const event = createPrayerEvent(
            prayer.name,
            prayer.time,
            location,
            state.settings.reminderMinutes
          );

          await calendarService.createEvent(event);
        }
      }

      const now = new Date().toISOString();
      localStorage.setItem(`last-sync-${user.id}`, now);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        lastSyncDate: now,
        error: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sync failed',
      }));
      throw error;
    }
  };

  const clearPrayerEvents = async (date: Date = new Date()) => {
    if (!calendarService) return;

    try {
      const existingEvents = await calendarService.getPrayerEvents(date);

      for (const event of existingEvents) {
        if (event.id) {
          await calendarService.deleteEvent(event.id);
        }
      }
    } catch (error) {
      console.error('Error clearing prayer events:', error);
    }
  };

  const addPrayerEvent = async (prayerName: string, prayerTime: Date) => {
    if (!calendarService || !location) {
      throw new Error('Calendar service or location not available');
    }

    const event = createPrayerEvent(
      prayerName,
      prayerTime,
      location,
      state.settings.reminderMinutes
    );

    return await calendarService.createEvent(event);
  };

  const value: CalendarSyncContextType = {
    ...state,
    authorizeCalendar,
    revokeAuthorization,
    updateSettings,
    syncPrayerTimes,
    clearPrayerEvents,
    addPrayerEvent,
  };

  return <CalendarSyncContext.Provider value={value}>{children}</CalendarSyncContext.Provider>;
}

export function useCalendarSync() {
  const context = useContext(CalendarSyncContext);
  if (!context) {
    throw new Error('useCalendarSync must be used within CalendarSyncProvider');
  }
  return context;
}
