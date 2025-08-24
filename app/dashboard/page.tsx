'use client';

import { Calendar, MapPin, Settings } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

import { CalendarSync } from '@/components/CalendarSync';
import { LocationInput } from '@/components/LocationInput';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from '@/contexts/LocationContext';

function DashboardContent() {
  const { user } = useAuth();
  const { location, requestLocation, setManualLocation } = useLocation();
  const searchParams = useSearchParams();

  // Handle Google Calendar OAuth callback
  useEffect(() => {
    const calendarSuccess = searchParams.get('calendar_success');
    const calendarError = searchParams.get('calendar_error');

    if (calendarSuccess) {
      try {
        const tokenData = JSON.parse(decodeURIComponent(calendarSuccess));

        // Store tokens in localStorage (in production, use secure storage)
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
      // You could show a toast notification here
    }
  }, [searchParams, user]);

  return (
    <ProtectedRoute>
      <div className="bg-background min-h-screen">
        {/* Header */}
        <div className="bg-background border-b">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-elegant text-3xl font-bold">
                  Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  Your prayer times and calendar integration dashboard
                </p>
              </div>
              <Link href="/">
                <Button variant="ghost" className="nav-link">
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Calendar Integration */}
            <CalendarSync />

            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Settings
                </CardTitle>
                <CardDescription>
                  {location
                    ? `Current: ${location.city ? `${location.city}, ${location.country}` : `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}`
                    : 'Set your location for accurate prayer times'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {location ? (
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" onClick={requestLocation}>
                      Update GPS Location
                    </Button>
                    <details className="w-full">
                      <summary className="text-muted-foreground cursor-pointer text-sm">
                        Or search for a different city
                      </summary>
                      <div className="mt-3">
                        <LocationInput onLocationSet={setManualLocation} />
                      </div>
                    </details>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button onClick={requestLocation} className="w-full">
                      Use GPS Location
                    </Button>
                    <div className="text-muted-foreground text-center text-sm">or</div>
                    <LocationInput onLocationSet={setManualLocation} />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Preferences
                </CardTitle>
                <CardDescription>
                  Customize notifications and prayer calculation methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Configure
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Prayer Times Section */}
          <div className="mt-8">
            <h2 className="font-elegant mb-6 text-2xl font-bold">Today&apos;s Prayer Times</h2>
            <Card className="islamic-card">
              <CardContent className="p-6">
                <div className="text-muted-foreground text-center">
                  <Calendar className="mx-auto mb-4 h-12 w-12" />
                  <p>Prayer times will be calculated based on your location</p>
                  <Button className="mt-4">Enable Location Access</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
