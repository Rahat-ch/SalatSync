'use client';

import { Clock, Settings2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { usePreferences } from '@/contexts/PreferencesContext';

export default function PrayerSettingsTab() {
  const { preferences, updatePrayerSettings } = usePreferences();
  const { prayerSettings } = preferences;

  const calculationMethods = [
    { value: 'muslim_world_league', label: 'Muslim World League' },
    { value: 'egyptian', label: 'Egyptian General Authority' },
    { value: 'karachi', label: 'University of Islamic Sciences, Karachi' },
    { value: 'umm_al_qura', label: 'Umm Al-Qura, Saudi Arabia' },
    { value: 'dubai', label: 'Dubai (UAE)' },
    { value: 'moonsighting_committee', label: 'Moonsighting Committee Worldwide' },
    { value: 'north_america', label: 'Islamic Society of North America (ISNA)' },
    { value: 'kuwait', label: 'Kuwait' },
    { value: 'qatar', label: 'Qatar' },
    { value: 'singapore', label: 'Singapore' },
    { value: 'turkey', label: 'Turkey' },
    { value: 'tehran', label: 'Tehran Institute of Geophysics' },
    { value: 'other', label: 'Other' },
  ];

  const madhabOptions = [
    { value: 'shafi', label: 'Shafi, Maliki, Hanbali' },
    { value: 'hanafi', label: 'Hanafi' },
  ];

  const highLatitudeRules = [
    { value: 'middle_of_the_night', label: 'Middle of the Night' },
    { value: 'seventh_of_the_night', label: 'Seventh of the Night' },
    { value: 'twilight_angle', label: 'Twilight Angle' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <Clock className="h-5 w-5 text-green-600" />
          Prayer Time Calculation
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Configure how prayer times are calculated for your location
        </p>
      </div>

      <Separator />

      {/* Calculation Method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Calculation Method</CardTitle>
          <CardDescription>
            Different organizations use slightly different parameters for calculating prayer times
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="calculation-method">Choose your preferred method</Label>
            <Select
              value={prayerSettings.calculationMethod}
              onValueChange={(value) =>
                updatePrayerSettings({
                  calculationMethod: value as typeof prayerSettings.calculationMethod,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select calculation method" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border border">
                {calculationMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              <Badge variant="secondary" className="mr-2">
                Recommended
              </Badge>
              Muslim World League is widely accepted and used by many Islamic organizations
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Madhab */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Madhab (Asr Calculation)</CardTitle>
          <CardDescription>
            Different schools of thought calculate Asr prayer time differently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="madhab">Select your madhab</Label>
            <Select
              value={prayerSettings.madhab}
              onValueChange={(value) =>
                updatePrayerSettings({ madhab: value as 'shafi' | 'hanafi' })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select madhab" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border border">
                {madhabOptions.map((madhab) => (
                  <SelectItem key={madhab.value} value={madhab.value}>
                    {madhab.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              This affects only the Asr prayer calculation. Hanafi madhab typically results in later
              Asr times.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* High Latitude Rule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">High Latitude Adjustment</CardTitle>
          <CardDescription>
            For locations at high latitudes where normal calculations may not work
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="high-latitude">High latitude rule</Label>
            <Select
              value={prayerSettings.highLatitudeRule}
              onValueChange={(value) =>
                updatePrayerSettings({
                  highLatitudeRule: value as
                    | 'middle_of_the_night'
                    | 'seventh_of_the_night'
                    | 'twilight_angle',
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select high latitude rule" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border border">
                {highLatitudeRules.map((rule) => (
                  <SelectItem key={rule.value} value={rule.value}>
                    {rule.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Only applies to locations above 48° latitude where twilight calculations may fail
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Manual Adjustments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Settings2 className="h-4 w-4" />
            Manual Adjustments (Minutes)
          </CardTitle>
          <CardDescription>
            Fine-tune individual prayer times by adding or subtracting minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              { key: 'fajr', label: 'Fajr' },
              { key: 'sunrise', label: 'Sunrise' },
              { key: 'dhuhr', label: 'Dhuhr' },
              { key: 'asr', label: 'Asr' },
              { key: 'maghrib', label: 'Maghrib' },
              { key: 'isha', label: 'Isha' },
            ].map((prayer) => (
              <div key={prayer.key} className="space-y-2">
                <Label htmlFor={prayer.key} className="text-sm">
                  {prayer.label}
                </Label>
                <Input
                  id={prayer.key}
                  type="number"
                  placeholder="0"
                  min="-30"
                  max="30"
                  value={
                    prayerSettings.adjustments?.[
                      prayer.key as keyof typeof prayerSettings.adjustments
                    ] || ''
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    const numValue = value === '' ? undefined : parseInt(value);
                    updatePrayerSettings({
                      adjustments: {
                        ...prayerSettings.adjustments,
                        [prayer.key]: numValue,
                      },
                    });
                  }}
                  className="text-center"
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Use positive numbers to add minutes, negative to subtract. Range: -30 to +30 minutes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
