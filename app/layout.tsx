import type { Metadata } from 'next';
import { Playfair_Display, Amiri } from 'next/font/google';

import './globals.css';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
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
  title: 'SalatSync - Islamic Prayer Times',
  description: 'Beautiful Islamic prayer times app with elegant design and accurate timings',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SalatSync',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'SalatSync',
    title: 'SalatSync - Islamic Prayer Times',
    description:
      'Never miss a prayer time again. Automatic Islamic prayer time tracking with Google Calendar integration.',
  },
  twitter: {
    card: 'summary',
    title: 'SalatSync - Islamic Prayer Times',
    description:
      'Never miss a prayer time again. Automatic Islamic prayer time tracking with Google Calendar integration.',
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
        <meta name="theme-color" content="#16a34a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SalatSync" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="shortcut icon" href="/favicon-32x32.png" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${amiri.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ServiceWorkerRegistration />
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
