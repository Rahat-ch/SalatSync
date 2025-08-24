'use client';

import { Clock, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

import PrayerTimesDisplay from '@/components/PrayerTimesDisplay';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import CalendarSettingsTab from '@/components/settings/CalendarSettingsTab';
import LocationSettingsTab from '@/components/settings/LocationSettingsTab';
import PrayerSettingsTab from '@/components/settings/PrayerSettingsTab';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserNav } from '@/components/UserNav';

function DashboardContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const { preferences, loading } = usePreferences();

  const [activeTab, setActiveTab] = useState('prayer');

  // Handle Google Calendar OAuth callback (moved from dashboard)
  useEffect(() => {
    const calendarSuccess = searchParams.get('calendar_success');
    const calendarError = searchParams.get('calendar_error');

    if (calendarSuccess) {
      try {
        const tokenData = JSON.parse(decodeURIComponent(calendarSuccess));

        if (user) {
          localStorage.setItem(
            `calendar-auth-${user.id}`,
            JSON.stringify({
              accessToken: tokenData.access_token,
              refreshToken: tokenData.refresh_token,
              expiresAt: tokenData.expires_at,
              scope: tokenData.scope,
            })
          );

          // Refresh the page to update calendar sync state
          window.location.replace('/dashboard');
        }
      } catch (error) {
        console.error('Failed to process calendar tokens:', error);
      }
    }

    if (calendarError) {
      console.error('Calendar authorization error:', calendarError);
    }
  }, [searchParams, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center p-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <main className="bg-background min-h-screen">
        {/* Navigation Header */}
        <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="font-elegant text-2xl font-bold">SalatSync</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="ghost" className="nav-link">
                    Home
                  </Button>
                </Link>
                <UserNav />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Header */}
        <section className="hero-gradient text-primary-foreground px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h1 className="font-elegant mb-4 text-4xl font-bold md:text-5xl">
              Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-xl opacity-90 md:text-2xl">Your prayer times dashboard</p>
          </div>
        </section>

        {/* Main Content */}
        <div className="px-6 py-16" style={{ backgroundImage: 'url(/so-white.png)' }}>
          <div className="mx-auto max-w-6xl">
            {/* Prayer Times Display */}
            <div className="mb-8">
              <PrayerTimesDisplay />
            </div>

            {/* Settings Content */}
            <Card className="shadow-xl">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="px-6 pt-6 pb-2">
                  <TabsList className="grid w-full grid-cols-3 lg:inline-flex lg:w-auto">
                    <TabsTrigger value="prayer" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="hidden sm:inline">Prayer Times</span>
                    </TabsTrigger>
                    <TabsTrigger value="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="hidden sm:inline">Location</span>
                    </TabsTrigger>
                    <TabsTrigger value="calendar" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="hidden sm:inline">Calendar</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="px-6 pb-6">
                  <TabsContent value="prayer">
                    <PrayerSettingsTab />
                  </TabsContent>

                  <TabsContent value="location">
                    <LocationSettingsTab />
                  </TabsContent>

                  <TabsContent value="calendar">
                    <CalendarSettingsTab />
                  </TabsContent>
                </div>
              </Tabs>
            </Card>

            {/* Footer Info */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Last updated: {preferences.lastUpdated.toLocaleDateString()} at{' '}
                {preferences.lastUpdated.toLocaleTimeString()}
              </p>
              <p className="mt-1">
                Version: <Badge variant="secondary">{preferences.version}</Badge>
              </p>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
