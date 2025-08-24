'use client';

import { Clock, MapPin, Calendar as CalendarIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation } from '@/contexts/LocationContext';
import { usePrayerTimes } from '@/contexts/PrayerTimesContext';
import { formatPrayerTime } from '@/lib/prayer-times';

export default function PrayerTimesDisplay() {
  const { prayerTimes, nextPrayer, currentPrayer, timeUntilNext, loading } = usePrayerTimes();
  const { location } = useLocation();

  if (loading) {
    return (
      <Card className="shadow-lg">
        <CardContent className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Calculating prayer times...</span>
        </CardContent>
      </Card>
    );
  }

  if (!location) {
    return (
      <Card className="shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <MapPin className="mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Location Required</h3>
          <p className="mb-4 text-gray-500">
            Set your location in the Location tab to see accurate prayer times
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!prayerTimes) {
    return (
      <Card className="shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <CalendarIcon className="mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-gray-700">Prayer Times Unavailable</h3>
          <p className="text-gray-500">Unable to calculate prayer times for your location</p>
        </CardContent>
      </Card>
    );
  }

  const prayers = [
    {
      name: 'Fajr',
      arabicName: 'الفجر',
      time: prayerTimes.fajr,
      key: 'fajr',
    },
    {
      name: 'Sunrise',
      arabicName: 'الشروق',
      time: prayerTimes.sunrise,
      key: 'sunrise',
    },
    {
      name: 'Dhuhr',
      arabicName: 'الظهر',
      time: prayerTimes.dhuhr,
      key: 'dhuhr',
    },
    {
      name: 'Asr',
      arabicName: 'العصر',
      time: prayerTimes.asr,
      key: 'asr',
    },
    {
      name: 'Maghrib',
      arabicName: 'المغرب',
      time: prayerTimes.maghrib,
      key: 'maghrib',
    },
    {
      name: 'Isha',
      arabicName: 'العشاء',
      time: prayerTimes.isha,
      key: 'isha',
    },
  ];

  const getLocationString = () => {
    if (location.city && location.country) {
      return `${location.city}, ${location.country}`;
    }
    return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Location and Next Prayer */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Current Location */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-green-600" />
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-gray-900">{getLocationString()}</p>
            <p className="mt-1 text-sm text-gray-500">Prayer times calculated for today</p>
          </CardContent>
        </Card>

        {/* Next Prayer Countdown */}
        {nextPrayer && timeUntilNext && (
          <Card className="border-green-200 bg-green-50 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-green-800">
                <Clock className="h-5 w-5 text-green-600" />
                Next Prayer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-900">
                    {nextPrayer.name} • {nextPrayer.arabicName}
                  </p>
                  <p className="text-green-700">{formatPrayerTime(nextPrayer.time)}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-800">
                    {String(timeUntilNext.hours).padStart(2, '0')}:
                    {String(timeUntilNext.minutes).padStart(2, '0')}:
                    {String(timeUntilNext.seconds).padStart(2, '0')}
                  </p>
                  <p className="text-sm text-green-600">remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Prayer Times Grid */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Today&apos;s Prayer Times</CardTitle>
          <p className="text-gray-600">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {prayers.map((prayer) => {
              const isNext = nextPrayer?.name === prayer.name;
              const isCurrent = currentPrayer?.name === prayer.name;

              return (
                <div
                  key={prayer.key}
                  className={`rounded-lg p-4 text-center transition-all ${
                    isNext
                      ? 'border-2 border-green-300 bg-green-100 shadow-md'
                      : isCurrent
                        ? 'border-2 border-blue-300 bg-blue-100 shadow-md'
                        : 'border border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="mb-2">
                    <h3
                      className={`font-semibold ${
                        isNext ? 'text-green-800' : isCurrent ? 'text-blue-800' : 'text-gray-800'
                      }`}
                    >
                      {prayer.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        isNext ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-gray-500'
                      }`}
                    >
                      {prayer.arabicName}
                    </p>
                  </div>

                  <p
                    className={`text-lg font-bold ${
                      isNext ? 'text-green-900' : isCurrent ? 'text-blue-900' : 'text-gray-900'
                    }`}
                  >
                    {formatPrayerTime(prayer.time)}
                  </p>

                  {isNext && <Badge className="mt-2 bg-green-600 text-white">Next</Badge>}

                  {isCurrent && <Badge className="mt-2 bg-blue-600 text-white">Current</Badge>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
