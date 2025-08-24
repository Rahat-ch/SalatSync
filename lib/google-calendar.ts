// Client-side calendar utilities (browser-compatible)

export interface CalendarEvent {
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  reminders: {
    useDefault: boolean;
    overrides?: {
      method: 'popup' | 'email';
      minutes: number;
    }[];
  };
}

export class GoogleCalendarClient {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async createEvent(event: CalendarEvent, calendarId: string = 'primary') {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create event: ${response.statusText}`);
    }

    return response.json();
  }

  async updateEvent(eventId: string, event: CalendarEvent, calendarId: string = 'primary') {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteEvent(eventId: string, calendarId: string = 'primary') {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete event: ${response.statusText}`);
    }
  }

  async listEvents(calendarId: string = 'primary', timeMin?: string, timeMax?: string) {
    const params = new URLSearchParams({
      singleEvents: 'true',
      orderBy: 'startTime',
    });

    if (timeMin) params.append('timeMin', timeMin);
    if (timeMax) params.append('timeMax', timeMax);

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${params}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to list events: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items || [];
  }

  // Get existing prayer time events to avoid duplicates
  async getPrayerEvents(date: Date, calendarId: string = 'primary') {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const events = await this.listEvents(
      calendarId,
      startOfDay.toISOString(),
      endOfDay.toISOString()
    );

    // Filter for prayer time events (we'll identify them by title or description)
    return events.filter(
      (event: any) =>
        event.summary?.includes('Prayer') ||
        event.description?.includes('SalatSync') ||
        ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].some((prayer) =>
          event.summary?.includes(prayer)
        )
    );
  }
}

export function createPrayerEvent(
  prayerName: string,
  prayerTime: Date,
  location: { city?: string; country?: string; latitude: number; longitude: number },
  reminderMinutes: number = 10
): CalendarEvent {
  const startTime = new Date(prayerTime);
  const endTime = new Date(prayerTime.getTime() + 30 * 60 * 1000); // 30 minutes duration

  const locationString = location.city
    ? `${location.city}, ${location.country}`
    : `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;

  return {
    summary: `${prayerName} Prayer`,
    description: `Prayer time calculated for ${locationString}\n\nAdded by SalatSync - Never miss a prayer!`,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    reminders: {
      useDefault: false,
      overrides: [
        {
          method: 'popup',
          minutes: reminderMinutes,
        },
      ],
    },
  };
}
