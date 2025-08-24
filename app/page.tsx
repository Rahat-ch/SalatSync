'use client';

import { MapPin, Calendar, Bell } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  // Calculate next prayer time (demo - 1 hour from now) - using useMemo to prevent recalculation
  const nextPrayerTime = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    return date;
  }, []);

  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = nextPrayerTime.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining({ hours, minutes, seconds });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [nextPrayerTime]);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-elegant mb-6 text-6xl font-bold md:text-7xl">SalatSync</h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90 md:text-2xl">
            Never miss a prayer with our beautiful Islamic prayer time tracker
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="btn-primary px-8 py-6 text-lg">
              Get Started
            </Button>
            <Button variant="secondary" size="lg" className="btn-secondary px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Next Prayer Countdown */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-elegant text-gradient-primary mb-8 text-center text-3xl">
            Time Until Dhuhr
          </h2>
          <Card className="islamic-card">
            <CardContent className="pt-8">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="font-elegant text-primary text-5xl font-bold md:text-6xl">
                    {formatTime(timeRemaining.hours)}
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">Hours</p>
                </div>
                <div className="text-primary text-5xl md:text-6xl">:</div>
                <div className="text-center">
                  <div className="font-elegant text-primary text-5xl font-bold md:text-6xl">
                    {formatTime(timeRemaining.minutes)}
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">Minutes</p>
                </div>
                <div className="text-primary text-5xl md:text-6xl">:</div>
                <div className="text-center">
                  <div className="font-elegant text-primary text-5xl font-bold md:text-6xl">
                    {formatTime(timeRemaining.seconds)}
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">Seconds</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Prayer Times Grid */}
      <section className="bg-content-pattern px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-elegant text-gradient-secondary mb-12 text-center text-4xl">
            Today&apos;s Prayer Times
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="prayer-card transition-transform hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="prayer-name mb-2">الفجر</div>
                <h3 className="font-elegant mb-2 text-xl">Fajr</h3>
                <div className="prayer-time">5:30 AM</div>
                <p className="text-muted-foreground mt-2 text-sm">Dawn Prayer</p>
              </CardContent>
            </Card>

            <Card className="prayer-card transition-transform hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="prayer-name mb-2">الظهر</div>
                <h3 className="font-elegant mb-2 text-xl">Dhuhr</h3>
                <div className="prayer-time">12:45 PM</div>
                <Badge variant="secondary" className="mt-2">
                  Next Prayer
                </Badge>
              </CardContent>
            </Card>

            <Card className="prayer-card transition-transform hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="prayer-name mb-2">العصر</div>
                <h3 className="font-elegant mb-2 text-xl">Asr</h3>
                <div className="prayer-time">3:30 PM</div>
                <p className="text-muted-foreground mt-2 text-sm">Afternoon Prayer</p>
              </CardContent>
            </Card>

            <Card className="prayer-card transition-transform hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="prayer-name mb-2">المغرب</div>
                <h3 className="font-elegant mb-2 text-xl">Maghrib</h3>
                <div className="prayer-time">6:15 PM</div>
                <p className="text-muted-foreground mt-2 text-sm">Sunset Prayer</p>
              </CardContent>
            </Card>

            <Card className="prayer-card transition-transform hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="prayer-name mb-2">العشاء</div>
                <h3 className="font-elegant mb-2 text-xl">Isha</h3>
                <div className="prayer-time">7:45 PM</div>
                <p className="text-muted-foreground mt-2 text-sm">Night Prayer</p>
              </CardContent>
            </Card>

            <Card className="prayer-card transition-transform hover:scale-105">
              <CardContent className="pt-6 text-center">
                <div className="prayer-name mb-2">الجمعة</div>
                <h3 className="font-elegant mb-2 text-xl">Jummah</h3>
                <div className="prayer-time">1:00 PM</div>
                <Badge variant="outline" className="mt-2">
                  Friday Only
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-elegant text-gradient-primary mb-12 text-center text-4xl">
            Features
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="islamic-card transition-shadow hover:shadow-xl">
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

            <Card className="islamic-card transition-shadow hover:shadow-xl">
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

            <Card className="islamic-card transition-shadow hover:shadow-xl">
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
                <Button className="btn-primary">Sign Up Free</Button>
                <Button
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                >
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
