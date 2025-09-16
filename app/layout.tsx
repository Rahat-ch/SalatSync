import type { Metadata } from 'next';
import { Playfair_Display, Amiri } from 'next/font/google';

import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { CalendarSyncProvider } from '@/contexts/CalendarSyncContext';
import { LocationProvider } from '@/contexts/LocationContext';
import { PrayerTimesProvider } from '@/contexts/PrayerTimesContext';
import { PreferencesProvider } from '@/contexts/PreferencesContext';

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'SalatSync - Schedule Your Day Around Prayer Time',
  description:
    'Connect your Google Calendar and get automatic prayer time reminders calculated precisely for your location.',
  applicationName: 'SalatSync',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
    other: {
      rel: 'icon',
      url: '/logo.png',
    },
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'SalatSync',
    title: 'SalatSync - Schedule Your Day Around Prayer Time',
    description:
      'Connect your Google Calendar and get automatic prayer time reminders calculated precisely for your location.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SalatSync - Schedule Your Day Around Prayer Time',
    description:
      'Connect your Google Calendar and get automatic prayer time reminders calculated precisely for your location.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <meta name="theme-color" content="#065f46" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${amiri.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <PreferencesProvider>
          <AuthProvider>
            <LocationProvider>
              <PrayerTimesProvider>
                <CalendarSyncProvider>{children}</CalendarSyncProvider>
              </PrayerTimesProvider>
            </LocationProvider>
          </AuthProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
