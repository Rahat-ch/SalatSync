'use client';

import { MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserNav } from '@/components/UserNav';
import { useAuth } from '@/contexts/AuthContext';
import { usePrayerTimes } from '@/contexts/PrayerTimesContext';

export default function Home() {
  const { user } = useAuth();
  const { nextPrayer } = usePrayerTimes();

  return (
    <main className="bg-background min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="SalatSync Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <h1 className="font-elegant text-2xl font-bold">SalatSync</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="nav-link">
                      Dashboard
                    </Button>
                  </Link>
                  <UserNav />
                </>
              ) : (
                <Link href="/auth/signin">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 grid min-h-[600px] grid-cols-1 items-center gap-8 px-6 py-20 lg:grid-cols-2">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="font-elegant mb-6 text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
                Schedule Your
                <br />
                Day Around
                <br />
                <span className="text-yellow-400">Prayer Time</span>
              </h1>
              <p className="mb-8 text-lg text-gray-100 md:text-xl">
                Connect your Google Calendar and get automatic prayer time reminders calculated
                precisely for your location.
              </p>

              {/* CTA Buttons */}
              <div className="mb-8 flex flex-wrap gap-4">
                {user ? (
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-yellow-400 px-6 py-3 font-semibold text-gray-900 hover:bg-yellow-300"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/signin">
                    <Button
                      size="lg"
                      className="bg-yellow-400 px-6 py-3 font-semibold text-gray-900 hover:bg-yellow-300"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Connect Google Calendar
                    </Button>
                  </Link>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-white/10 text-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <span className="text-gray-200">Precise timing</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-400" />
                  <span className="text-gray-200">Location-based</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-400" />
                  <span className="text-gray-200">Scheduled for you</span>
                </div>
              </div>
            </div>

            {/* Right Content - Image with Next Prayer Card */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/green_sunset.png"
                  alt="Mosque at sunset"
                  width={800}
                  height={500}
                  className="h-[400px] w-full object-cover lg:h-[500px]"
                />

                {/* Next Prayer Card Overlay */}
                {nextPrayer && (
                  <div className="absolute top-4 right-4 rounded-lg bg-yellow-400 p-3 text-gray-900 shadow-lg">
                    <p className="text-xs font-medium">Next Prayer</p>
                    <p className="text-xl font-bold">{nextPrayer.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <h2 className="font-elegant mb-3 text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-lg text-gray-600">
              Get personalized prayer times and sync them with your calendar in three simple steps
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <Card className="border-0 bg-white p-6 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                1
              </div>
              <h3 className="mb-3 text-xl font-semibold">Enter Your Location</h3>
              <p className="text-gray-600">
                Simply enter your city or allow location access to get accurate prayer times for
                your area
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="border-0 bg-white p-6 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                2
              </div>
              <h3 className="mb-3 text-xl font-semibold">View Prayer Times</h3>
              <p className="text-gray-600">
                See today&apos;s prayer times instantly, calculated using accurate Islamic methods
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="border-0 bg-white p-6 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 text-xl font-bold text-white">
                3
              </div>
              <h3 className="mb-3 text-xl font-semibold">Sync with Calendar</h3>
              <p className="text-gray-600">
                Connect to get automatic reminders and never miss a prayer time again
              </p>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mt-16 rounded-2xl bg-white p-8 text-center shadow-sm">
            <h3 className="font-elegant mb-3 text-2xl font-bold">Ready to get started?</h3>
            <p className="mb-6 text-gray-600">
              Login and sync your calendar to your local prayer times
            </p>
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-green-600 px-8 py-3 text-white hover:bg-green-700">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button className="bg-green-600 px-8 py-3 text-white hover:bg-green-700">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <h2 className="font-elegant mb-3 text-4xl font-bold text-gray-900">
              Features Built for the Muslim Community
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to maintain your prayer schedule with modern technology
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Google Calendar Integration */}
            <Card className="border-0 p-6 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <Calendar className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Google Calendar Integration</h3>
              <p className="text-sm text-gray-600">
                Seamlessly sync prayer times with your Google Calendar for automatic reminders
              </p>
            </Card>

            {/* Mobile Optimized */}
            <Card className="border-0 p-6 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <svg
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Mobile Optimized</h3>
              <p className="text-sm text-gray-600">
                Access your prayer times anywhere, on any device
              </p>
            </Card>

            {/* Built Your Day Around Salat */}
            <Card className="border-0 p-6 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <svg
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Build Your Day Around Salat</h3>
              <p className="text-sm text-gray-600">
                Structure your daily activities around the five prayer times
              </p>
            </Card>

            {/* Privacy First */}
            <Card className="border-0 p-6 text-center shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                <svg
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">Privacy First</h3>
              <p className="text-sm text-gray-600">
                Your location and calendar data are kept secure and private
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="font-elegant mb-4 text-3xl font-bold">SalatSync</h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-green-50">
            Helping Muslims worldwide stay connected to their faith through technology. May Allah
            accept our prayers and guide us on the straight path.
          </p>
          <p className="text-sm text-green-100">Built with love for the Ummah</p>
        </div>
      </footer>
    </main>
  );
}
