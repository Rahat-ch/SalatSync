import {
  PrayerTimes,
  Coordinates,
  CalculationMethod,
  CalculationParameters,
  Madhab,
  HighLatitudeRule,
  Prayer,
} from 'adhan';

export interface PrayerTimesResult {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
  qiyam?: Date;
}

export interface PrayerTimeSettings {
  calculationMethod: CalculationMethodType;
  madhab: MadhabType;
  highLatitudeRule: HighLatitudeRuleType;
  adjustments?: {
    fajr?: number;
    sunrise?: number;
    dhuhr?: number;
    asr?: number;
    maghrib?: number;
    isha?: number;
  };
}

export type CalculationMethodType =
  | 'muslim_world_league'
  | 'egyptian'
  | 'karachi'
  | 'umm_al_qura'
  | 'dubai'
  | 'moonsighting_committee'
  | 'north_america'
  | 'kuwait'
  | 'qatar'
  | 'singapore'
  | 'turkey'
  | 'tehran'
  | 'other';

export type MadhabType = 'shafi' | 'hanafi';
export type HighLatitudeRuleType =
  | 'middle_of_the_night'
  | 'seventh_of_the_night'
  | 'twilight_angle';

const calculationMethods: Record<CalculationMethodType, () => CalculationParameters> = {
  muslim_world_league: () => CalculationMethod.MuslimWorldLeague(),
  egyptian: () => CalculationMethod.Egyptian(),
  karachi: () => CalculationMethod.Karachi(),
  umm_al_qura: () => CalculationMethod.UmmAlQura(),
  dubai: () => CalculationMethod.Dubai(),
  moonsighting_committee: () => CalculationMethod.MoonsightingCommittee(),
  north_america: () => CalculationMethod.NorthAmerica(),
  kuwait: () => CalculationMethod.Kuwait(),
  qatar: () => CalculationMethod.Qatar(),
  singapore: () => CalculationMethod.Singapore(),
  turkey: () => CalculationMethod.Turkey(),
  tehran: () => CalculationMethod.Tehran(),
  other: () => CalculationMethod.Other(),
};

const madhabMap: Record<MadhabType, Madhab> = {
  shafi: Madhab.Shafi,
  hanafi: Madhab.Hanafi,
};

const highLatitudeRuleMap: Record<HighLatitudeRuleType, HighLatitudeRule> = {
  middle_of_the_night: HighLatitudeRule.MiddleOfTheNight,
  seventh_of_the_night: HighLatitudeRule.SeventhOfTheNight,
  twilight_angle: HighLatitudeRule.TwilightAngle,
};

export function calculatePrayerTimes(
  latitude: number,
  longitude: number,
  date: Date = new Date(),
  settings: PrayerTimeSettings = {
    calculationMethod: 'muslim_world_league',
    madhab: 'shafi',
    highLatitudeRule: 'middle_of_the_night',
  }
): PrayerTimesResult {
  const coordinates = new Coordinates(latitude, longitude);
  const params = calculationMethods[settings.calculationMethod]();

  // Apply settings
  params.madhab = madhabMap[settings.madhab];
  params.highLatitudeRule = highLatitudeRuleMap[settings.highLatitudeRule];

  // Apply manual adjustments if provided
  if (settings.adjustments) {
    if (settings.adjustments.fajr) params.adjustments.fajr = settings.adjustments.fajr;
    if (settings.adjustments.sunrise) params.adjustments.sunrise = settings.adjustments.sunrise;
    if (settings.adjustments.dhuhr) params.adjustments.dhuhr = settings.adjustments.dhuhr;
    if (settings.adjustments.asr) params.adjustments.asr = settings.adjustments.asr;
    if (settings.adjustments.maghrib) params.adjustments.maghrib = settings.adjustments.maghrib;
    if (settings.adjustments.isha) params.adjustments.isha = settings.adjustments.isha;
  }

  const prayerTimes = new PrayerTimes(coordinates, date, params);

  return {
    fajr: prayerTimes.fajr,
    sunrise: prayerTimes.sunrise,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha,
  };
}

export function getNextPrayer(
  prayerTimes: PrayerTimesResult,
  currentTime: Date = new Date()
): {
  prayer: Prayer;
  time: Date;
  name: string;
  arabicName: string;
} | null {
  const prayers = [
    { prayer: Prayer.Fajr, time: prayerTimes.fajr, name: 'Fajr', arabicName: 'الفجر' },
    { prayer: Prayer.Dhuhr, time: prayerTimes.dhuhr, name: 'Dhuhr', arabicName: 'الظهر' },
    { prayer: Prayer.Asr, time: prayerTimes.asr, name: 'Asr', arabicName: 'العصر' },
    { prayer: Prayer.Maghrib, time: prayerTimes.maghrib, name: 'Maghrib', arabicName: 'المغرب' },
    { prayer: Prayer.Isha, time: prayerTimes.isha, name: 'Isha', arabicName: 'العشاء' },
  ];

  // Find the next prayer that hasn't passed yet
  for (const prayer of prayers) {
    if (prayer.time > currentTime) {
      return prayer;
    }
  }

  // If all prayers have passed, return tomorrow's Fajr
  const tomorrow = new Date(currentTime);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowPrayerTimes = calculatePrayerTimes(0, 0, tomorrow); // Will be recalculated with actual coordinates

  return {
    prayer: Prayer.Fajr,
    time: tomorrowPrayerTimes.fajr,
    name: 'Fajr',
    arabicName: 'الفجر',
  };
}

export function getCurrentPrayer(
  prayerTimes: PrayerTimesResult,
  currentTime: Date = new Date()
): {
  prayer: Prayer;
  time: Date;
  name: string;
  arabicName: string;
} | null {
  const prayers = [
    { prayer: Prayer.Fajr, time: prayerTimes.fajr, name: 'Fajr', arabicName: 'الفجر' },
    { prayer: Prayer.Dhuhr, time: prayerTimes.dhuhr, name: 'Dhuhr', arabicName: 'الظهر' },
    { prayer: Prayer.Asr, time: prayerTimes.asr, name: 'Asr', arabicName: 'العصر' },
    { prayer: Prayer.Maghrib, time: prayerTimes.maghrib, name: 'Maghrib', arabicName: 'المغرب' },
    { prayer: Prayer.Isha, time: prayerTimes.isha, name: 'Isha', arabicName: 'العشاء' },
  ];

  // Find the current prayer (last one that has passed)
  let currentPrayer = null;
  for (const prayer of prayers) {
    if (prayer.time <= currentTime) {
      currentPrayer = prayer;
    } else {
      break;
    }
  }

  return currentPrayer;
}

export function formatPrayerTime(time: Date): string {
  return time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
