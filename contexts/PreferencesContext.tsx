'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

import { PrayerTimeSettings } from '@/lib/prayer-times';
import {
  UserPreferences,
  defaultUserPreferences,
  validateUserPreferences,
  mergePreferences,
  resetPreferencesToDefaults,
  NotificationSettings,
  DisplaySettings,
  CalendarSettings,
  LocationSettings,
} from '@/lib/user-preferences';

interface PreferencesContextType {
  preferences: UserPreferences;
  loading: boolean;
  updatePrayerSettings: (settings: Partial<PrayerTimeSettings>) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  updateDisplaySettings: (settings: Partial<DisplaySettings>) => void;
  updateCalendarSettings: (settings: Partial<CalendarSettings>) => void;
  updateLocationSettings: (settings: Partial<LocationSettings>) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetToDefaults: () => void;
  exportPreferences: () => string;
  importPreferences: (jsonString: string) => boolean;
  savePreferences: () => Promise<void>;
  loadPreferences: () => Promise<void>;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

const STORAGE_KEY = 'salatsync-user-preferences';
const STORAGE_VERSION = '1.0.0';

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultUserPreferences);
  const [loading, setLoading] = useState(true);

  // Load preferences from localStorage on initialization
  useEffect(() => {
    loadPreferences();
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      const timeoutId = setTimeout(() => {
        savePreferencesToStorage();
      }, 500); // Debounce saves

      return () => clearTimeout(timeoutId);
    }
  }, [preferences, loading]);

  const loadPreferences = useCallback(async () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);

        // Convert date strings back to Date objects
        if (parsed.lastUpdated) {
          parsed.lastUpdated = new Date(parsed.lastUpdated);
        }

        // Merge with defaults to ensure all properties exist
        const merged = mergePreferences(defaultUserPreferences, parsed);

        if (validateUserPreferences(merged)) {
          setPreferences(merged);
        } else {
          console.warn('Invalid preferences found in storage, using defaults');
          setPreferences(defaultUserPreferences);
        }
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
      setPreferences(defaultUserPreferences);
    } finally {
      setLoading(false);
    }
  }, []);

  const savePreferencesToStorage = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences to storage:', error);
    }
  }, [preferences]);

  const savePreferences = useCallback(async () => {
    // In the future, this would save to the server
    // For now, we just save to localStorage
    savePreferencesToStorage();
  }, [savePreferencesToStorage]);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences((current) => ({
      ...current,
      ...updates,
      lastUpdated: new Date(),
    }));
  }, []);

  const updatePrayerSettings = useCallback((settings: Partial<PrayerTimeSettings>) => {
    setPreferences((current) => ({
      ...current,
      prayerSettings: {
        ...current.prayerSettings,
        ...settings,
      },
      lastUpdated: new Date(),
    }));
  }, []);

  const updateNotificationSettings = useCallback((settings: Partial<NotificationSettings>) => {
    setPreferences((current) => ({
      ...current,
      notifications: {
        ...current.notifications,
        ...settings,
      },
      lastUpdated: new Date(),
    }));
  }, []);

  const updateDisplaySettings = useCallback((settings: Partial<DisplaySettings>) => {
    setPreferences((current) => ({
      ...current,
      display: {
        ...current.display,
        ...settings,
      },
      lastUpdated: new Date(),
    }));
  }, []);

  const updateCalendarSettings = useCallback((settings: Partial<CalendarSettings>) => {
    setPreferences((current) => ({
      ...current,
      calendar: {
        ...current.calendar,
        ...settings,
      },
      lastUpdated: new Date(),
    }));
  }, []);

  const updateLocationSettings = useCallback((settings: Partial<LocationSettings>) => {
    setPreferences((current) => ({
      ...current,
      location: {
        ...current.location,
        ...settings,
      },
      lastUpdated: new Date(),
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    const defaults = resetPreferencesToDefaults();
    setPreferences(defaults);
  }, []);

  const exportPreferencesData = useCallback(() => {
    return JSON.stringify(preferences, null, 2);
  }, [preferences]);

  const importPreferencesData = useCallback((jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString);

      // Convert date strings back to Date objects
      if (imported.lastUpdated) {
        imported.lastUpdated = new Date(imported.lastUpdated);
      }

      if (validateUserPreferences(imported)) {
        setPreferences(imported);
        return true;
      } else {
        console.error('Invalid preferences format');
        return false;
      }
    } catch (error) {
      console.error('Error importing preferences:', error);
      return false;
    }
  }, []);

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        loading,
        updatePrayerSettings,
        updateNotificationSettings,
        updateDisplaySettings,
        updateCalendarSettings,
        updateLocationSettings,
        updatePreferences,
        resetToDefaults,
        exportPreferences: exportPreferencesData,
        importPreferences: importPreferencesData,
        savePreferences,
        loadPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
