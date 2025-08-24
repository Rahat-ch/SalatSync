import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-elegant text-responsive-xl mb-6 font-bold">SalatSync</h1>
          <p className="text-responsive-lg mb-8 opacity-90">
            Beautiful Islamic Prayer Times with Elegant Design
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="btn-primary px-8 py-6 text-lg">
              Get Prayer Times
            </Button>
            <Button variant="secondary" size="lg" className="btn-secondary px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Design System Showcase */}
      <section className="bg-content-pattern px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-elegant text-responsive-lg text-gradient-primary mb-12 text-center">
            Design System Showcase
          </h2>

          {/* Typography Section */}
          <div className="mb-16">
            <h3 className="font-elegant text-primary mb-6 text-2xl font-semibold">Typography</h3>
            <div className="grid gap-6">
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-responsive-xl text-primary">
                    Playfair Display - Elegant Typography
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-responsive-md text-foreground/80">
                    This elegant serif font is perfect for headings and titles, providing a
                    sophisticated and timeless appearance.
                  </p>
                </CardContent>
              </Card>

              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-arabic text-secondary-foreground text-right text-2xl">
                    خط أميري - الخط العربي
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-responsive-md text-foreground/80">
                    The Amiri font beautifully displays Arabic text with proper ligatures and
                    traditional Islamic calligraphy aesthetics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Color Palette Section */}
          <div className="mb-16">
            <h3 className="font-elegant text-primary mb-6 text-2xl font-semibold">Color Palette</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="islamic-card text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary mx-auto mb-4 h-20 w-20 rounded-lg"></div>
                  <h4 className="font-elegant text-primary mb-2 font-semibold">Deep Emerald</h4>
                  <p className="text-muted-foreground text-sm">hsl(158, 64%, 25%)</p>
                </CardContent>
              </Card>

              <Card className="islamic-card text-center">
                <CardContent className="pt-6">
                  <div className="bg-secondary mx-auto mb-4 h-20 w-20 rounded-lg"></div>
                  <h4 className="font-elegant text-secondary-foreground mb-2 font-semibold">
                    Rich Gold
                  </h4>
                  <p className="text-muted-foreground text-sm">hsl(45, 95%, 50%)</p>
                </CardContent>
              </Card>

              <Card className="islamic-card text-center">
                <CardContent className="pt-6">
                  <div className="bg-accent mx-auto mb-4 h-20 w-20 rounded-lg"></div>
                  <h4 className="font-elegant text-accent-foreground mb-2 font-semibold">
                    Midnight Blue
                  </h4>
                  <p className="text-muted-foreground text-sm">hsl(220, 70%, 25%)</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Component Examples */}
          <div className="mb-16">
            <h3 className="font-elegant text-primary mb-6 text-2xl font-semibold">Components</h3>
            <div className="grid gap-6">
              {/* Buttons */}
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-primary text-xl font-semibold">
                    Buttons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button className="btn-primary">Primary Button</Button>
                    <Button variant="secondary" className="btn-secondary">
                      Secondary Button
                    </Button>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Outline Button
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Prayer Cards */}
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-primary text-xl font-semibold">
                    Prayer Time Cards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card className="prayer-card">
                      <CardContent className="pt-6 text-center">
                        <div className="prayer-name mb-2">الفجر</div>
                        <div className="prayer-time">5:30 AM</div>
                        <Badge variant="secondary" className="mt-2">
                          Next Prayer
                        </Badge>
                      </CardContent>
                    </Card>
                    <Card className="prayer-card">
                      <CardContent className="pt-6 text-center">
                        <div className="prayer-name mb-2">الظهر</div>
                        <div className="prayer-time">1:15 PM</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Form Elements */}
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-primary text-xl font-semibold">
                    Form Elements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="font-elegant text-foreground mb-2 block font-medium">
                      Location
                    </label>
                    <Input placeholder="Enter your city or location" className="font-elegant" />
                  </div>
                  <div>
                    <label className="font-elegant text-foreground mb-2 block font-medium">
                      Prayer Time
                    </label>
                    <Select>
                      <SelectTrigger className="font-elegant">
                        <SelectValue placeholder="Select prayer time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fajr">الفجر - Fajr</SelectItem>
                        <SelectItem value="dhuhr">الظهر - Dhuhr</SelectItem>
                        <SelectItem value="asr">العصر - Asr</SelectItem>
                        <SelectItem value="maghrib">المغرب - Maghrib</SelectItem>
                        <SelectItem value="isha">العشاء - Isha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="btn-primary w-full">Get Prayer Times</Button>
                </CardContent>
              </Card>

              {/* Islamic Borders */}
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-primary text-xl font-semibold">
                    Islamic Borders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="islamic-border p-6 text-center">
                    <p className="text-foreground/80">
                      Beautiful borders with subtle Islamic geometric patterns
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gradients Section */}
          <div className="mb-16">
            <h3 className="font-elegant text-primary mb-6 text-2xl font-semibold">Gradients</h3>
            <div className="grid gap-6">
              <Card className="hero-gradient border-0">
                <CardContent className="text-primary-foreground pt-6 text-center">
                  <h4 className="font-elegant mb-2 text-2xl font-semibold">Hero Gradient</h4>
                  <p className="text-lg opacity-90">Emerald to Midnight Blue transition</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="primary-gradient border-0">
                  <CardContent className="text-primary-foreground pt-6 text-center">
                    <h4 className="font-elegant mb-2 text-xl font-semibold">Primary Gradient</h4>
                    <p>Emerald variations</p>
                  </CardContent>
                </Card>

                <Card className="secondary-gradient border-0">
                  <CardContent className="text-secondary-foreground pt-6 text-center">
                    <h4 className="font-elegant mb-2 text-xl font-semibold">Secondary Gradient</h4>
                    <p>Gold variations</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Responsive Design */}
          <div className="mb-16">
            <h3 className="font-elegant text-primary mb-6 text-2xl font-semibold">
              Responsive Design
            </h3>
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="font-elegant text-responsive-lg text-primary">
                  Responsive Typography
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-responsive-md text-foreground/80 mb-4">
                  This text automatically scales based on screen size for optimal readability.
                </p>
                <p className="text-responsive-lg text-foreground/80">
                  Larger text for bigger screens, smaller for mobile devices.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Background Patterns for Content */}
          <div className="mb-16">
            <h3 className="font-elegant text-primary mb-6 text-2xl font-semibold">
              Content Background Patterns
            </h3>
            <div className="grid gap-6">
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-primary text-xl font-semibold">
                    Subtle Vertical Stripes
                  </CardTitle>
                  <CardDescription>
                    Perfect for main content areas - elegant and non-distracting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-subtle-stripes flex min-h-[200px] items-center justify-center rounded-lg p-8">
                    <p className="text-foreground/80 text-center">
                      This area demonstrates the subtle vertical stripes pattern.
                      <br />
                      It provides texture without interfering with content readability.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-primary text-xl font-semibold">
                    Subtle Ribbed Pattern
                  </CardTitle>
                  <CardDescription>
                    Alternative pattern with finer, more delicate texture
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-subtle-ribbed flex min-h-[200px] items-center justify-center rounded-lg p-8">
                    <p className="text-foreground/80 text-center">
                      This area shows the ribbed pattern variation.
                      <br />
                      Slightly more refined with 1px spacing.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-primary text-xl font-semibold">
                    Content Area with Pattern
                  </CardTitle>
                  <CardDescription>How to use patterns in main content sections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-subtle-stripes rounded-lg p-6">
                    <h4 className="font-elegant text-primary mb-3 text-lg font-semibold">
                      Main Content Section
                    </h4>
                    <p className="text-foreground/80 mb-3">
                      This demonstrates how the subtle pattern works with actual content. The
                      pattern adds visual interest without compromising readability.
                    </p>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="bg-card/50 rounded-lg p-4">
                        <h5 className="font-elegant text-primary mb-2 font-semibold">Feature 1</h5>
                        <p className="text-foreground/70 text-sm">
                          Content over pattern background
                        </p>
                      </div>
                      <div className="bg-card/50 rounded-lg p-4">
                        <h5 className="font-elegant text-primary mb-2 font-semibold">Feature 2</h5>
                        <p className="text-foreground/70 text-sm">More content examples</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="mb-16">
            <h3 className="font-elegant text-primary mb-6 text-2xl font-semibold">
              Interactive Demo
            </h3>
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="font-elegant text-primary text-xl font-semibold">
                  Prayer Time Calculator
                </CardTitle>
                <CardDescription>Enter your location to get accurate prayer times</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="font-elegant text-foreground mb-2 block font-medium">
                      City
                    </label>
                    <Input placeholder="e.g., Mecca, Medina, Istanbul" />
                  </div>
                  <div>
                    <label className="font-elegant text-foreground mb-2 block font-medium">
                      Country
                    </label>
                    <Input placeholder="e.g., Saudi Arabia, Turkey" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="btn-primary flex-1">Calculate Times</Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted px-6 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <h3 className="font-elegant text-gradient-primary mb-4 text-2xl font-semibold">
            SalatSync
          </h3>
          <p className="text-foreground/80 mb-6">
            Beautiful Islamic prayer times with elegant design
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
          </div>
        </div>
      </footer>
    </main>
  );
}
