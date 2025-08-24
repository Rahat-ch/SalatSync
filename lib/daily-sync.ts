// Daily sync utility for prayer times
// This would typically run as a background service or cron job

export interface DailySyncConfig {
  enabled: boolean;
  syncTime: string; // Format: "HH:MM"
  daysAhead: number; // How many days ahead to sync
}

export class DailySyncManager {
  private config: DailySyncConfig;
  private intervalId: NodeJS.Timeout | null = null;

  constructor(config: DailySyncConfig) {
    this.config = config;
  }

  start() {
    if (!this.config.enabled || this.intervalId) return;

    // Check every hour if it's time to sync
    this.intervalId = setInterval(
      () => {
        this.checkAndSync();
      },
      60 * 60 * 1000
    ); // 1 hour

    // Also check immediately
    this.checkAndSync();
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private checkAndSync() {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Check if it's the configured sync time (within the hour)
    if (this.shouldSync(currentTime)) {
      this.performDailySync();
    }
  }

  private shouldSync(currentTime: string): boolean {
    const [targetHour] = this.config.syncTime.split(':').map(Number);
    const [currentHour] = currentTime.split(':').map(Number);

    return currentHour === targetHour;
  }

  private async performDailySync() {
    try {
      // This would integrate with the CalendarSyncContext
      console.log('Performing daily sync...');

      // Sync for today and upcoming days
      for (let i = 0; i < this.config.daysAhead; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);

        // Here we would call the calendar sync service
        // await calendarSyncService.syncPrayerTimes(date);
      }

      console.log('Daily sync completed');
    } catch (error) {
      console.error('Daily sync failed:', error);
    }
  }

  updateConfig(config: Partial<DailySyncConfig>) {
    this.config = { ...this.config, ...config };

    if (!config.enabled && this.intervalId) {
      this.stop();
    } else if (config.enabled && !this.intervalId) {
      this.start();
    }
  }
}

// Utility function to get the next sync time
export function getNextSyncTime(syncTime: string): Date {
  const [hours, minutes] = syncTime.split(':').map(Number);
  const next = new Date();
  next.setHours(hours, minutes, 0, 0);

  // If the time has already passed today, set for tomorrow
  if (next < new Date()) {
    next.setDate(next.getDate() + 1);
  }

  return next;
}

// Utility to format time until next sync
export function getTimeUntilNextSync(syncTime: string): string {
  const next = getNextSyncTime(syncTime);
  const now = new Date();
  const diffMs = next.getTime() - now.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
