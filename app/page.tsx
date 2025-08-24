'use client';

import { MapPin, Calendar, Bell } from 'lucide-react';
import Link from 'next/link';

import { LocationInput } from '@/components/LocationInput';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserNav } from '@/components/UserNav';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from '@/contexts/LocationContext';
import { usePrayerTimes } from '@/contexts/PrayerTimesContext';
import { formatPrayerTime } from '@/lib/prayer-times';

export default function Home() {
  const { user } = useAuth();
  const {
    location,
    requestLocation,
    setManualLocation,
    loading: locationLoading,
    error: locationError,
  } = useLocation();
  const { prayerTimes, nextPrayer, timeUntilNext, loading: prayerLoading } = usePrayerTimes();

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <main className="bg-background min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
      <section className="hero-gradient text-primary-foreground px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-elegant mb-6 text-6xl font-bold md:text-7xl">SalatSync</h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90 md:text-2xl">
            Never miss a prayer with our beautiful Islamic prayer time tracker
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="btn-primary px-8 py-6 text-lg">
                  View Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth/signin">
                <Button size="lg" className="btn-primary px-8 py-6 text-lg">
                  Get Started
                </Button>
              </Link>
            )}
            <Button variant="secondary" size="lg" className="btn-secondary px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Next Prayer Countdown */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {!location ? (
            <div className="space-y-6">
              <Card className="islamic-card">
                <CardContent className="pt-8 text-center">
                  <MapPin className="text-primary mx-auto mb-4 h-16 w-16" />
                  <h3 className="font-elegant mb-4 text-2xl">Choose Your Location Method</h3>
                  <p className="text-muted-foreground mb-6">
                    We need your location to calculate accurate prayer times
                  </p>

                  <div className="mx-auto flex max-w-sm flex-col gap-4">
                    <Button
                      onClick={requestLocation}
                      disabled={locationLoading}
                      className="btn-primary w-full"
                    >
                      {locationLoading ? 'Getting Location...' : 'Use GPS Location'}
                    </Button>

                    <div className="flex items-center gap-2">
                      <div className="bg-border h-px flex-1"></div>
                      <span className="text-muted-foreground text-sm">or</span>
                      <div className="bg-border h-px flex-1"></div>
                    </div>
                  </div>

                  {locationError && <p className="mt-4 text-sm text-red-600">{locationError}</p>}
                </CardContent>
              </Card>

              <LocationInput onLocationSet={setManualLocation} loading={locationLoading} />
            </div>
          ) : nextPrayer && timeUntilNext ? (
            <>
              <h2 className="font-elegant text-gradient-primary mb-8 text-center text-3xl">
                Time Until {nextPrayer.name}
              </h2>
              <Card className="islamic-card">
                <CardContent className="pt-8">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="font-elegant text-primary text-5xl font-bold md:text-6xl">
                        {formatTime(timeUntilNext.hours)}
                      </div>
                      <p className="text-muted-foreground mt-2 text-sm">Hours</p>
                    </div>
                    <div className="text-primary text-5xl md:text-6xl">:</div>
                    <div className="text-center">
                      <div className="font-elegant text-primary text-5xl font-bold md:text-6xl">
                        {formatTime(timeUntilNext.minutes)}
                      </div>
                      <p className="text-muted-foreground mt-2 text-sm">Minutes</p>
                    </div>
                    <div className="text-primary text-5xl md:text-6xl">:</div>
                    <div className="text-center">
                      <div className="font-elegant text-primary text-5xl font-bold md:text-6xl">
                        {formatTime(timeUntilNext.seconds)}
                      </div>
                      <p className="text-muted-foreground mt-2 text-sm">Seconds</p>
                    </div>
                  </div>
                  {location.city && (
                    <p className="text-muted-foreground mt-4 text-center">
                      📍 {location.city}, {location.country}
                    </p>
                  )}
                </CardContent>
              </Card>
            </>
          ) : prayerLoading ? (
            <Card className="islamic-card">
              <CardContent className="pt-8 text-center">
                <div className="border-primary mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2"></div>
                <p className="text-muted-foreground">Calculating prayer times...</p>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </section>

      {/* Prayer Times Grid */}
      <section className="bg-content-pattern px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-elegant text-gradient-secondary mb-12 text-center text-4xl">
            Today&apos;s Prayer Times
          </h2>

          {prayerTimes ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="prayer-card">
                <CardContent className="pt-6 text-center">
                  <div className="prayer-name mb-2">الفجر</div>
                  <h3 className="font-elegant mb-2 text-xl">Fajr</h3>
                  <div className="prayer-time">{formatPrayerTime(prayerTimes.fajr)}</div>
                  <p className="text-muted-foreground mt-2 text-sm">Dawn Prayer</p>
                  {nextPrayer?.name === 'Fajr' && (
                    <Badge variant="secondary" className="mt-2">
                      Next Prayer
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="prayer-card">
                <CardContent className="pt-6 text-center">
                  <div className="prayer-name mb-2">الظهر</div>
                  <h3 className="font-elegant mb-2 text-xl">Dhuhr</h3>
                  <div className="prayer-time">{formatPrayerTime(prayerTimes.dhuhr)}</div>
                  <p className="text-muted-foreground mt-2 text-sm">Noon Prayer</p>
                  {nextPrayer?.name === 'Dhuhr' && (
                    <Badge variant="secondary" className="mt-2">
                      Next Prayer
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="prayer-card">
                <CardContent className="pt-6 text-center">
                  <div className="prayer-name mb-2">العصر</div>
                  <h3 className="font-elegant mb-2 text-xl">Asr</h3>
                  <div className="prayer-time">{formatPrayerTime(prayerTimes.asr)}</div>
                  <p className="text-muted-foreground mt-2 text-sm">Afternoon Prayer</p>
                  {nextPrayer?.name === 'Asr' && (
                    <Badge variant="secondary" className="mt-2">
                      Next Prayer
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="prayer-card">
                <CardContent className="pt-6 text-center">
                  <div className="prayer-name mb-2">المغرب</div>
                  <h3 className="font-elegant mb-2 text-xl">Maghrib</h3>
                  <div className="prayer-time">{formatPrayerTime(prayerTimes.maghrib)}</div>
                  <p className="text-muted-foreground mt-2 text-sm">Sunset Prayer</p>
                  {nextPrayer?.name === 'Maghrib' && (
                    <Badge variant="secondary" className="mt-2">
                      Next Prayer
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="prayer-card">
                <CardContent className="pt-6 text-center">
                  <div className="prayer-name mb-2">العشاء</div>
                  <h3 className="font-elegant mb-2 text-xl">Isha</h3>
                  <div className="prayer-time">{formatPrayerTime(prayerTimes.isha)}</div>
                  <p className="text-muted-foreground mt-2 text-sm">Night Prayer</p>
                  {nextPrayer?.name === 'Isha' && (
                    <Badge variant="secondary" className="mt-2">
                      Next Prayer
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <Card className="prayer-card">
                <CardContent className="pt-6 text-center">
                  <div className="prayer-name mb-2">الجمعة</div>
                  <h3 className="font-elegant mb-2 text-xl">Jummah</h3>
                  <div className="prayer-time">{formatPrayerTime(prayerTimes.dhuhr)}</div>
                  <Badge variant="outline" className="mt-2">
                    Friday Only
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="py-12 text-center">
              <Calendar className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
              <p className="text-muted-foreground text-lg">
                Enable location access to see your prayer times
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-elegant text-gradient-primary mb-12 text-center text-4xl">
            Features
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="islamic-card">
              <CardHeader className="text-center">
                <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <MapPin className="text-primary h-8 w-8" />
                </div>
                <CardTitle className="font-elegant">Location-Based</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Accurate prayer times based on your exact location
                </p>
              </CardContent>
            </Card>

            <Card className="islamic-card">
              <CardHeader className="text-center">
                <div className="bg-secondary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Calendar className="text-secondary h-8 w-8" />
                </div>
                <CardTitle className="font-elegant">Calendar Sync</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Automatically sync prayer times with Google Calendar
                </p>
              </CardContent>
            </Card>

            <Card className="islamic-card">
              <CardHeader className="text-center">
                <div className="bg-accent/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Bell className="text-accent h-8 w-8" />
                </div>
                <CardTitle className="font-elegant">Smart Reminders</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Customizable notifications before each prayer
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-subtle-stripes px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="islamic-border p-8 text-center">
            <CardContent className="pt-6">
              <h2 className="font-elegant text-gradient-secondary mb-4 text-3xl">
                Beautifully Crafted for Muslims
              </h2>
              <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
                SalatSync combines modern technology with Islamic aesthetics to create a prayer
                companion that respects tradition while embracing innovation.
              </p>
              <div className="flex justify-center gap-4">
                {user ? (
                  <Button className="btn-primary">View Calendar Integration</Button>
                ) : (
                  <Link href="/auth/signin">
                    <Button className="btn-primary">Sign Up Free</Button>
                  </Link>
                )}
                <Button variant="outline" className="border-secondary text-secondary">
                  View Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted px-6 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <h3 className="font-elegant text-gradient-primary mb-4 text-2xl">SalatSync</h3>
          <p className="text-muted-foreground mb-6">
            © 2024 SalatSync. Made with ❤️ for the Muslim community
          </p>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" className="nav-link">
              About
            </Button>
            <Button variant="ghost" className="nav-link">
              Features
            </Button>
            <Button variant="ghost" className="nav-link">
              Contact
            </Button>
            <Button variant="ghost" className="nav-link">
              Privacy
            </Button>
          </div>
        </div>
      </footer>
    </main>
  );
}
