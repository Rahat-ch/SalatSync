'use client';

import { Calendar, Settings, CheckCircle, AlertCircle, Loader2, Clock, Bell } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCalendarSync } from '@/contexts/CalendarSyncContext';
import { useLocation } from '@/contexts/LocationContext';
import { usePrayerTimes } from '@/contexts/PrayerTimesContext';

export function CalendarSync() {
  const {
    settings,
    isAuthorized,
    isLoading,
    error,
    lastSyncDate,
    authorizeCalendar,
    revokeAuthorization,
    updateSettings,
    syncPrayerTimes,
  } = useCalendarSync();

  const { location } = useLocation();
  const { prayerTimes } = usePrayerTimes();

  const [reminderMinutes, setReminderMinutes] = useState(settings.reminderMinutes.toString());

  const handleAuthorize = async () => {
    try {
      await authorizeCalendar();
    } catch (error) {
      console.error('Authorization failed:', error);
    }
  };

  const handleSync = async () => {
    try {
      await syncPrayerTimes();
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  // Check if sync requirements are met
  const canSync = isAuthorized && settings.enabled && location && prayerTimes;

  const getSyncBlockerMessage = () => {
    if (!location) return 'Location required - please set your location first';
    if (!prayerTimes) return 'Prayer times not available - please set your location';
    if (!isAuthorized) return 'Google Calendar not connected';
    if (!settings.enabled) return 'Calendar sync is disabled';
    return null;
  };

  const handleToggleEnabled = () => {
    updateSettings({ enabled: !settings.enabled });
  };

  const handleTogglePrayer = (prayer: keyof typeof settings.syncedPrayers) => {
    updateSettings({
      syncedPrayers: {
        ...settings.syncedPrayers,
        [prayer]: !settings.syncedPrayers[prayer],
      },
    });
  };

  const handleReminderChange = (value: string) => {
    const minutes = parseInt(value);
    if (!isNaN(minutes) && minutes >= 0 && minutes <= 60) {
      setReminderMinutes(value);
      updateSettings({ reminderMinutes: minutes });
    }
  };

  const formatLastSync = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="islamic-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Google Calendar Integration
          {isAuthorized && settings.enabled && (
            <Badge variant="secondary" className="ml-auto">
              <CheckCircle className="mr-1 h-3 w-3" />
              Active
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Automatically sync prayer times to your Google Calendar</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div className="bg-destructive/10 text-destructive flex items-center gap-2 rounded-md p-3">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Show requirements blocker */}
        {isAuthorized && getSyncBlockerMessage() && (
          <div className="flex items-center gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-200">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{getSyncBlockerMessage()}</span>
          </div>
        )}

        {!isAuthorized ? (
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">
              Connect your Google Calendar to automatically schedule prayer times
            </p>
            <Button onClick={handleAuthorize} disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Connect Google Calendar
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Manual Sync Status */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Manual Sync</p>
                <p className="text-muted-foreground text-sm">
                  Click &apos;Sync Now&apos; to update prayer times in your calendar
                </p>
              </div>
              <Badge variant={settings.enabled ? 'default' : 'outline'}>
                {settings.enabled ? 'Ready' : 'Disabled'}
              </Badge>
            </div>

            {/* Prayer Selection */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Prayers to Sync</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(settings.syncedPrayers).map(([prayer, enabled]) => (
                  <Button
                    key={prayer}
                    variant={enabled ? 'default' : 'outline'}
                    size="sm"
                    onClick={() =>
                      handleTogglePrayer(prayer as keyof typeof settings.syncedPrayers)
                    }
                    className="justify-start"
                  >
                    {prayer.charAt(0).toUpperCase() + prayer.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Reminder Settings */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Reminder</p>
              <div className="flex items-center gap-2">
                <Bell className="text-muted-foreground h-4 w-4" />
                <Input
                  type="number"
                  value={reminderMinutes}
                  onChange={(e) => handleReminderChange(e.target.value)}
                  className="w-20"
                  min="0"
                  max="60"
                />
                <span className="text-muted-foreground text-sm">minutes before</span>
              </div>
            </div>

            {/* Sync Status */}
            {lastSyncDate && (
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Last sync: {formatLastSync(lastSyncDate)}</span>
                </div>
              </div>
            )}

            {/* Enable/Disable and Sync Buttons */}
            <div className="flex gap-2">
              <Button
                variant={settings.enabled ? 'outline' : 'default'}
                onClick={handleToggleEnabled}
                disabled={isLoading}
                size="sm"
              >
                {settings.enabled ? 'Disable' : 'Enable'}
              </Button>

              <Button
                onClick={handleSync}
                disabled={isLoading || !canSync}
                className="flex-1"
                title={!canSync ? getSyncBlockerMessage() || undefined : undefined}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Sync Now
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={revokeAuthorization} disabled={isLoading}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-muted-foreground text-xs">
              Prayer times will be added to your primary Google Calendar with 30-minute duration.
              Auto-sync coming in Pro version!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
