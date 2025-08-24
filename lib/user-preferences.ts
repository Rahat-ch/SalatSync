import {
  PrayerTimeSettings,
  CalculationMethodType,
  MadhabType,
  HighLatitudeRuleType,
} from './prayer-times';

export interface NotificationSettings {
  enabled: boolean;
  fajrEnabled: boolean;
  dhuhrEnabled: boolean;
  asrEnabled: boolean;
  maghribEnabled: boolean;
  ishaEnabled: boolean;
  reminderMinutes: number; // Minutes before prayer time
  sound: NotificationSoundType;
  vibration: boolean;
  showInBrowser: boolean;
}

export interface DisplaySettings {
  theme: ThemeType;
  language: LanguageType;
  timeFormat: TimeFormatType;
  showArabicNames: boolean;
  showCountdown: boolean;
  showNextPrayer: boolean;
  compactMode: boolean;
}

export interface CalendarSettings {
  autoSync: boolean;
  syncDaysAhead: number;
  includeAllPrayers: boolean;
  reminderMinutes: number;
  eventDuration: number; // Minutes
  useCustomCalendar: boolean;
  calendarName: string;
}

export interface LocationSettings {
  autoDetect: boolean;
  savedLocations: SavedLocation[];
  defaultLocationId?: string;
}

export interface SavedLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  timezone: string;
  isDefault: boolean;
  createdAt: Date;
}

export interface UserPreferences {
  id?: string;
  userId?: string;

  // Prayer calculation preferences
  prayerSettings: PrayerTimeSettings;

  // Notification preferences
  notifications: NotificationSettings;

  // Display preferences
  display: DisplaySettings;

  // Calendar integration preferences
  calendar: CalendarSettings;

  // Location preferences
  location: LocationSettings;

  // System preferences
  lastUpdated: Date;
  version: string;
}

// Type definitions
export type ThemeType = 'light' | 'dark' | 'auto';
export type LanguageType = 'en' | 'ar';
export type TimeFormatType = '12h' | '24h';
export type NotificationSoundType = 'none' | 'default' | 'adhan' | 'bell' | 'chime';

// Default preferences
export const defaultNotificationSettings: NotificationSettings = {
  enabled: false,
  fajrEnabled: true,
  dhuhrEnabled: true,
  asrEnabled: true,
  maghribEnabled: true,
  ishaEnabled: true,
  reminderMinutes: 5,
  sound: 'default',
  vibration: true,
  showInBrowser: true,
};

export const defaultDisplaySettings: DisplaySettings = {
  theme: 'auto',
  language: 'en',
  timeFormat: '12h',
  showArabicNames: true,
  showCountdown: true,
  showNextPrayer: true,
  compactMode: false,
};

export const defaultCalendarSettings: CalendarSettings = {
  autoSync: false,
  syncDaysAhead: 7,
  includeAllPrayers: true,
  reminderMinutes: 5,
  eventDuration: 30,
  useCustomCalendar: true,
  calendarName: 'Prayer Times',
};

export const defaultLocationSettings: LocationSettings = {
  autoDetect: true,
  savedLocations: [],
};

export const defaultPrayerSettings: PrayerTimeSettings = {
  calculationMethod: 'muslim_world_league',
  madhab: 'shafi',
  highLatitudeRule: 'middle_of_the_night',
};

export const defaultUserPreferences: UserPreferences = {
  prayerSettings: defaultPrayerSettings,
  notifications: defaultNotificationSettings,
  display: defaultDisplaySettings,
  calendar: defaultCalendarSettings,
  location: defaultLocationSettings,
  lastUpdated: new Date(),
  version: '1.0.0',
};

// Validation functions
export function validatePrayerSettings(settings: PrayerTimeSettings): boolean {
  const validCalculationMethods: CalculationMethodType[] = [
    'muslim_world_league',
    'egyptian',
    'karachi',
    'umm_al_qura',
    'dubai',
    'moonsighting_committee',
    'north_america',
    'kuwait',
    'qatar',
    'singapore',
    'turkey',
    'tehran',
    'other',
  ];

  const validMadhabs: MadhabType[] = ['shafi', 'hanafi'];
  const validHighLatitudeRules: HighLatitudeRuleType[] = [
    'middle_of_the_night',
    'seventh_of_the_night',
    'twilight_angle',
  ];

  return (
    validCalculationMethods.includes(settings.calculationMethod) &&
    validMadhabs.includes(settings.madhab) &&
    validHighLatitudeRules.includes(settings.highLatitudeRule)
  );
}

export function validateNotificationSettings(settings: NotificationSettings): boolean {
  const validSounds: NotificationSoundType[] = ['none', 'default', 'adhan', 'bell', 'chime'];

  return (
    typeof settings.enabled === 'boolean' &&
    typeof settings.reminderMinutes === 'number' &&
    settings.reminderMinutes >= 0 &&
    settings.reminderMinutes <= 60 &&
    validSounds.includes(settings.sound)
  );
}

export function validateDisplaySettings(settings: DisplaySettings): boolean {
  const validThemes: ThemeType[] = ['light', 'dark', 'auto'];
  const validLanguages: LanguageType[] = ['en', 'ar'];
  const validTimeFormats: TimeFormatType[] = ['12h', '24h'];

  return (
    validThemes.includes(settings.theme) &&
    validLanguages.includes(settings.language) &&
    validTimeFormats.includes(settings.timeFormat)
  );
}

export function validateUserPreferences(preferences: UserPreferences): boolean {
  return (
    validatePrayerSettings(preferences.prayerSettings) &&
    validateNotificationSettings(preferences.notifications) &&
    validateDisplaySettings(preferences.display) &&
    preferences.version !== undefined &&
    preferences.lastUpdated instanceof Date
  );
}

// Utility functions
export function mergePreferences(
  current: Partial<UserPreferences>,
  updates: Partial<UserPreferences>
): UserPreferences {
  return {
    ...defaultUserPreferences,
    ...current,
    ...updates,
    lastUpdated: new Date(),
  };
}

export function resetPreferencesToDefaults(): UserPreferences {
  return {
    ...defaultUserPreferences,
    lastUpdated: new Date(),
  };
}

export function exportPreferences(preferences: UserPreferences): string {
  return JSON.stringify(preferences, null, 2);
}

export function importPreferences(jsonString: string): UserPreferences | null {
  try {
    const imported = JSON.parse(jsonString);

    // Convert date strings back to Date objects
    if (imported.lastUpdated) {
      imported.lastUpdated = new Date(imported.lastUpdated);
    }

    // Validate the imported preferences
    if (validateUserPreferences(imported)) {
      return imported;
    }

    return null;
  } catch {
    return null;
  }
}
