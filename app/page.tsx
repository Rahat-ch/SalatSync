import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-elegant text-responsive-xl font-bold mb-6">
            SalatSync
          </h1>
          <p className="text-responsive-lg mb-8 opacity-90">
            Beautiful Islamic Prayer Times with Elegant Design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary text-lg px-8 py-6">
              Get Prayer Times
            </Button>
            <Button variant="secondary" size="lg" className="btn-secondary text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Design System Showcase */}
      <section className="py-16 px-6 bg-content-pattern">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-elegant text-responsive-lg text-center mb-12 text-gradient-primary">
            Design System Showcase
          </h2>

          {/* Typography Section */}
          <div className="mb-16">
            <h3 className="font-elegant text-2xl font-semibold mb-6 text-primary">
              Typography
            </h3>
            <div className="grid gap-6">
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-responsive-xl text-primary">
                    Playfair Display - Elegant Typography
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-responsive-md text-foreground/80">
                    This elegant serif font is perfect for headings and titles, 
                    providing a sophisticated and timeless appearance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-arabic text-2xl text-secondary-foreground text-right">
                    خط أميري - الخط العربي
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-responsive-md text-foreground/80">
                    The Amiri font beautifully displays Arabic text with proper 
                    ligatures and traditional Islamic calligraphy aesthetics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Color Palette Section */}
          <div className="mb-16">
            <h3 className="font-elegant text-2xl font-semibold mb-6 text-primary">
              Color Palette
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="islamic-card text-center">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-primary rounded-lg mx-auto mb-4"></div>
                  <h4 className="font-elegant font-semibold text-primary mb-2">
                    Deep Emerald
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    hsl(158, 64%, 25%)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="islamic-card text-center">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-secondary rounded-lg mx-auto mb-4"></div>
                  <h4 className="font-elegant font-semibold text-secondary-foreground mb-2">
                    Rich Gold
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    hsl(45, 95%, 50%)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="islamic-card text-center">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 bg-accent rounded-lg mx-auto mb-4"></div>
                  <h4 className="font-elegant font-semibold text-accent-foreground mb-2">
                    Midnight Blue
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    hsl(220, 70%, 25%)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Component Examples */}
          <div className="mb-16">
            <h3 className="font-elegant text-2xl font-semibold mb-6 text-primary">
              Components
            </h3>
            <div className="grid gap-6">
              {/* Buttons */}
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-xl font-semibold text-primary">
                    Buttons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Button className="btn-primary">Primary Button</Button>
                    <Button variant="secondary" className="btn-secondary">Secondary Button</Button>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Outline Button
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Prayer Cards */}
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-xl font-semibold text-primary">
                    Prayer Time Cards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="prayer-card">
                      <CardContent className="pt-6 text-center">
                        <div className="prayer-name mb-2">الفجر</div>
                        <div className="prayer-time">5:30 AM</div>
                        <Badge variant="secondary" className="mt-2">Next Prayer</Badge>
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
                  <CardTitle className="font-elegant text-xl font-semibold text-primary">
                    Form Elements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block font-elegant font-medium text-foreground mb-2">
                      Location
                    </label>
                    <Input 
                      placeholder="Enter your city or location"
                      className="font-elegant"
                    />
                  </div>
                  <div>
                    <label className="block font-elegant font-medium text-foreground mb-2">
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
                  <Button className="btn-primary w-full">
                    Get Prayer Times
                  </Button>
                </CardContent>
              </Card>

              {/* Islamic Borders */}
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-xl font-semibold text-primary">
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
            <h3 className="font-elegant text-2xl font-semibold mb-6 text-primary">
              Gradients
            </h3>
            <div className="grid gap-6">
              <Card className="hero-gradient border-0">
                <CardContent className="pt-6 text-center text-primary-foreground">
                  <h4 className="font-elegant text-2xl font-semibold mb-2">
                    Hero Gradient
                  </h4>
                  <p className="text-lg opacity-90">
                    Emerald to Midnight Blue transition
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="primary-gradient border-0">
                  <CardContent className="pt-6 text-center text-primary-foreground">
                    <h4 className="font-elegant text-xl font-semibold mb-2">
                      Primary Gradient
                    </h4>
                    <p>Emerald variations</p>
                  </CardContent>
                </Card>
                
                <Card className="secondary-gradient border-0">
                  <CardContent className="pt-6 text-center text-secondary-foreground">
                    <h4 className="font-elegant text-xl font-semibold mb-2">
                      Secondary Gradient
                    </h4>
                    <p>Gold variations</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Responsive Design */}
          <div className="mb-16">
            <h3 className="font-elegant text-2xl font-semibold mb-6 text-primary">
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
            <h3 className="font-elegant text-2xl font-semibold mb-6 text-primary">
              Content Background Patterns
            </h3>
            <div className="grid gap-6">
              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-xl font-semibold text-primary">
                    Subtle Vertical Stripes
                  </CardTitle>
                  <CardDescription>
                    Perfect for main content areas - elegant and non-distracting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-subtle-stripes p-8 rounded-lg min-h-[200px] flex items-center justify-center">
                    <p className="text-foreground/80 text-center">
                      This area demonstrates the subtle vertical stripes pattern.<br />
                      It provides texture without interfering with content readability.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-xl font-semibold text-primary">
                    Subtle Ribbed Pattern
                  </CardTitle>
                  <CardDescription>
                    Alternative pattern with finer, more delicate texture
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-subtle-ribbed p-8 rounded-lg min-h-[200px] flex items-center justify-center">
                    <p className="text-foreground/80 text-center">
                      This area shows the ribbed pattern variation.<br />
                      Slightly more refined with 1px spacing.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="islamic-card">
                <CardHeader>
                  <CardTitle className="font-elegant text-xl font-semibold text-primary">
                    Content Area with Pattern
                  </CardTitle>
                  <CardDescription>
                    How to use patterns in main content sections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-subtle-stripes p-6 rounded-lg">
                    <h4 className="font-elegant text-lg font-semibold text-primary mb-3">
                      Main Content Section
                    </h4>
                    <p className="text-foreground/80 mb-3">
                      This demonstrates how the subtle pattern works with actual content.
                      The pattern adds visual interest without compromising readability.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-card/50 p-4 rounded-lg">
                        <h5 className="font-elegant font-semibold text-primary mb-2">Feature 1</h5>
                        <p className="text-sm text-foreground/70">Content over pattern background</p>
                      </div>
                      <div className="bg-card/50 p-4 rounded-lg">
                        <h5 className="font-elegant font-semibold text-primary mb-2">Feature 2</h5>
                        <p className="text-sm text-foreground/70">More content examples</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="mb-16">
            <h3 className="font-elegant text-2xl font-semibold mb-6 text-primary">
              Interactive Demo
            </h3>
            <Card className="islamic-card">
              <CardHeader>
                <CardTitle className="font-elegant text-xl font-semibold text-primary">
                  Prayer Time Calculator
                </CardTitle>
                <CardDescription>
                  Enter your location to get accurate prayer times
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-elegant font-medium text-foreground mb-2">
                      City
                    </label>
                    <Input placeholder="e.g., Mecca, Medina, Istanbul" />
                  </div>
                  <div>
                    <label className="block font-elegant font-medium text-foreground mb-2">
                      Country
                    </label>
                    <Input placeholder="e.g., Saudi Arabia, Turkey" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="btn-primary flex-1">
                    Calculate Times
                  </Button>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-elegant text-2xl font-semibold mb-4 text-gradient-primary">
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
