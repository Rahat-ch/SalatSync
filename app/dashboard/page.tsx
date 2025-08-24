'use client';

import { Calendar, MapPin, Settings } from 'lucide-react';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="bg-background min-h-screen">
        {/* Header */}
        <div className="bg-background border-b">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <h1 className="font-elegant text-3xl font-bold">
              Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-muted-foreground mt-2">
              Your prayer times and calendar integration dashboard
            </p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Quick Actions */}
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Calendar Integration
                </CardTitle>
                <CardDescription>Manage your Google Calendar sync settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Setup Calendar Sync</Button>
              </CardContent>
            </Card>

            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Settings
                </CardTitle>
                <CardDescription>Update your location for accurate prayer times</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Update Location
                </Button>
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
