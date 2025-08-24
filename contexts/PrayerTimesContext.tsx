'use client';

import { Prayer } from 'adhan';
import { createContext, useContext, useEffect, useState } from 'react';

import {
  calculatePrayerTimes,
  getNextPrayer,
  getCurrentPrayer,
  formatPrayerTime,
  PrayerTimesResult,
  PrayerTimeSettings,
} from '@/lib/prayer-times';

import { useLocation } from './LocationContext';

interface PrayerTimesContextType {
  prayerTimes: PrayerTimesResult | null;
  nextPrayer: {
    prayer: Prayer;
    time: Date;
    name: string;
    arabicName: string;
  } | null;
  currentPrayer: {
    prayer: Prayer;
    time: Date;
    name: string;
    arabicName: string;
  } | null;
  timeUntilNext: {
    hours: number;
    minutes: number;
    seconds: number;
  } | null;
  settings: PrayerTimeSettings;
  updateSettings: (newSettings: Partial<PrayerTimeSettings>) => void;
  refreshPrayerTimes: () => void;
  loading: boolean;
}

const defaultSettings: PrayerTimeSettings = {
  calculationMethod: 'muslim_world_league',
  madhab: 'shafi',
  highLatitudeRule: 'middle_of_the_night',
};

const PrayerTimesContext = createContext<PrayerTimesContextType | undefined>(undefined);

export function PrayerTimesProvider({ children }: { children: React.ReactNode }) {
  const { location } = useLocation();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesResult | null>(null);
  const [nextPrayer, setNextPrayer] = useState<PrayerTimesContextType['nextPrayer']>(null);
  const [currentPrayer, setCurrentPrayer] = useState<PrayerTimesContextType['currentPrayer']>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<PrayerTimesContextType['timeUntilNext']>(null);
  const [settings, setSettings] = useState<PrayerTimeSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('salatsync-prayer-settings');
    if (savedSettings) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
      } catch {
        localStorage.removeItem('salatsync-prayer-settings');
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('salatsync-prayer-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<PrayerTimeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const refreshPrayerTimes = () => {
    if (!location) return;

    setLoading(true);
    try {
      const times = calculatePrayerTimes(
        location.latitude,
        location.longitude,
        new Date(),
        settings
      );
      setPrayerTimes(times);

      const next = getNextPrayer(times);
      setNextPrayer(next);

      const current = getCurrentPrayer(times);
      setCurrentPrayer(current);
    } catch (error) {
      console.error('Error calculating prayer times:', error);
    } finally {
      setLoading(false);
    }
  };

  // Recalculate when location or settings change
  useEffect(() => {
    refreshPrayerTimes();
  }, [location, settings]);

  // Update countdown timer
  useEffect(() => {
    if (!nextPrayer) return;

    const updateCountdown = () => {
      const now = new Date();
      const difference = nextPrayer.time.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeUntilNext({ hours, minutes, seconds });
      } else {
        // Prayer time has passed, refresh prayer times
        refreshPrayerTimes();
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextPrayer]);

  // Refresh prayer times at midnight
  useEffect(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Next midnight

    const msUntilMidnight = midnight.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      refreshPrayerTimes();

      // Set up daily refresh
      const dailyInterval = setInterval(refreshPrayerTimes, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <PrayerTimesContext.Provider
      value={{
        prayerTimes,
        nextPrayer,
        currentPrayer,
        timeUntilNext,
        settings,
        updateSettings,
        refreshPrayerTimes,
        loading,
      }}
    >
      {children}
    </PrayerTimesContext.Provider>
  );
}

export const usePrayerTimes = () => {
  const context = useContext(PrayerTimesContext);
  if (context === undefined) {
    throw new Error('usePrayerTimes must be used within a PrayerTimesProvider');
  }
  return context;
};
