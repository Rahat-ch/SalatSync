# SalatSync Component Showcase

This file demonstrates practical usage of the SalatSync design system with shadcn/ui components, creating beautiful Islamic prayer time applications.

## 🎯 Quick Start Examples

### Basic Button Usage with Shadcn/ui

```tsx
import { Button } from "@/components/ui/button";

// Primary action button with Islamic design
<Button className="btn-primary">
  Get Prayer Times
</Button>

// Secondary action button
<Button variant="secondary" className="btn-secondary">
  Learn More
</Button>

// Outline button with Islamic colors
<Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
  Custom Button
</Button>

// Large button for hero sections
<Button size="lg" className="btn-primary text-lg px-8 py-6">
  Get Started
</Button>
```

### Card Components with Shadcn/ui

```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Standard Islamic card
<Card className="islamic-card">
  <CardHeader>
    <CardTitle className="font-elegant text-xl font-semibold text-primary">
      Prayer Times
    </CardTitle>
    <CardDescription>
      Beautiful card with Islamic design elements
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-foreground/80">Content here</p>
  </CardContent>
</Card>

// Prayer-specific card
<Card className="prayer-card">
  <CardContent className="pt-6 text-center">
    <div className="prayer-name font-arabic text-2xl mb-2">الفجر</div>
    <div className="prayer-time font-elegant text-xl">5:30 AM</div>
  </CardContent>
</Card>

// Card with custom styling
<Card className="islamic-card border-2 border-secondary/30">
  <CardHeader>
    <CardTitle className="font-elegant text-lg font-semibold text-secondary">
      Special Content
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p>Custom border styling</p>
  </CardContent>
</Card>
```

### Typography Examples

```tsx
// Main heading with gradient
<h1 className="font-elegant text-responsive-xl font-bold text-gradient-primary">
  SalatSync
</h1>

// Section heading
<h2 className="font-elegant text-2xl font-semibold text-primary mb-4">
  Prayer Times
</h2>

// Arabic text
<span className="arabic-text font-arabic text-xl text-secondary-foreground">
  الفجر
</span>

// Body text with responsive sizing
<p className="text-responsive-md text-foreground/80 leading-relaxed">
  This text automatically scales based on screen size for optimal readability.
</p>

// Caption text
<small className="text-sm text-muted-foreground font-elegant">
  Additional information
</small>
```

### Form Elements with Shadcn/ui

```tsx
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Input field
<Input
  placeholder="Enter location"
  className="font-elegant"
/>

// Select dropdown
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

// Form container
<form className="space-y-6">
  <div>
    <label className="block font-elegant font-medium text-foreground mb-2">
      Location
    </label>
    <Input
      placeholder="Enter your city"
      className="font-elegant"
    />
  </div>
  <Button type="submit" className="btn-primary w-full">
    Get Prayer Times
  </Button>
</form>
```

### Navigation Components

```tsx
import { Button } from "@/components/ui/button";

// Navigation link
<Button variant="ghost" className="nav-link">
  Prayer Times
</Button>

// Active navigation link
<Button variant="ghost" className="nav-link active">
  Current Prayer
</Button>

// Navigation container
<nav className="flex gap-6">
  <Button variant="ghost" className="nav-link">Home</Button>
  <Button variant="ghost" className="nav-link">About</Button>
  <Button variant="ghost" className="nav-link">Contact</Button>
</nav>
```

## 🎨 Advanced Usage

### Gradient Backgrounds with Cards

```tsx
// Hero section with gradient
<Card className="hero-gradient border-0">
  <CardContent className="pt-6 text-center text-primary-foreground">
    <h1 className="font-elegant text-responsive-xl font-bold mb-6">
      Welcome to SalatSync
    </h1>
    <p className="text-responsive-lg opacity-90">
      Beautiful Islamic prayer times
    </p>
  </CardContent>
</Card>

// Content section with primary gradient
<Card className="primary-gradient border-0">
  <CardContent className="pt-6 text-center text-primary-foreground">
    <h2 className="font-elegant text-2xl font-semibold mb-4">
      Primary Content
    </h2>
    <p>Content with primary gradient background</p>
  </CardContent>
</Card>

// Secondary gradient for highlights
<Card className="secondary-gradient border-0">
  <CardContent className="pt-6 text-center text-secondary-foreground">
    <h3 className="font-elegant text-xl font-semibold">
      Highlighted Content
    </h3>
  </CardContent>
</Card>
```

### Islamic Design Elements

```tsx
// Islamic border container
<Card className="islamic-card">
  <CardHeader>
    <CardTitle className="font-elegant text-xl font-semibold text-primary">
      Islamic Design
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

// Glass effect component
<Card className="glass-effect border-0">
  <CardContent className="pt-6">
    <h4 className="font-elegant text-lg font-semibold text-primary-foreground">
      Glass Effect
    </h4>
    <p className="text-primary-foreground/80">
      Modern glass morphism effect
    </p>
  </CardContent>
</Card>

// Islamic pattern background
<Card className="bg-islamic-pattern border-0">
  <CardContent className="pt-6">
    <div className="bg-card/80 p-6 rounded-lg">
      <h4 className="font-elegant text-lg font-semibold text-primary">
        Pattern Background
      </h4>
      <p>Content over Islamic geometric pattern</p>
    </div>
  </CardContent>
</Card>
```

### Enhanced Form Components

```tsx
import { Badge } from '@/components/ui/badge';

// Form with validation and styling
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
        <label className="font-elegant text-foreground mb-2 block font-medium">City</label>
        <Input placeholder="e.g., Mecca, Medina, Istanbul" />
      </div>
      <div>
        <label className="font-elegant text-foreground mb-2 block font-medium">Country</label>
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
</Card>;
```

## 📱 Responsive Design Patterns

### Grid Layouts with Shadcn/ui

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card className="islamic-card">
    <CardHeader>
      <CardTitle className="font-elegant text-lg font-semibold text-primary">Card 1</CardTitle>
    </CardHeader>
    <CardContent>Content here</CardContent>
  </Card>
  <Card className="islamic-card">
    <CardHeader>
      <CardTitle className="font-elegant text-lg font-semibold text-primary">Card 2</CardTitle>
    </CardHeader>
    <CardContent>Content here</CardContent>
  </Card>
  <Card className="islamic-card">
    <CardHeader>
      <CardTitle className="font-elegant text-lg font-semibold text-primary">Card 3</CardTitle>
    </CardHeader>
    <CardContent>Content here</CardContent>
  </Card>
</div>

// Prayer times grid
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
  <Card className="prayer-card">
    <CardContent className="pt-6 text-center">
      <div className="prayer-name font-arabic text-lg mb-1">الفجر</div>
      <div className="prayer-time font-elegant">5:30</div>
      <Badge variant="secondary" className="mt-2">Next</Badge>
    </CardContent>
  </Card>
  {/* Repeat for other prayers */}
</div>
```

### Responsive Typography

```tsx
// Responsive heading
<h1 className="font-elegant text-responsive-xl font-bold text-primary">
  SalatSync
</h1>

// Responsive body text
<p className="text-responsive-md text-foreground/80 leading-relaxed">
  This text automatically scales for different screen sizes
</p>

// Responsive button text
<Button className="btn-primary text-responsive-md">
  Get Started
</Button>
```

## 🌙 Dark Mode Considerations

### Automatic Dark Mode with Shadcn/ui

The design system automatically handles dark mode, and shadcn/ui components inherit these styles:

```tsx
// Dark mode ready component
<Card className="islamic-card">
  <CardHeader>
    <CardTitle className="font-elegant text-xl font-semibold text-primary">
      Dark Mode Ready
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-foreground/80">
      This component automatically adapts to dark mode
    </p>
  </CardContent>
</Card>

// Enhanced dark mode styling
<Card className="islamic-card dark:bg-accent/10 dark:border-accent/20">
  <CardHeader>
    <CardTitle className="font-elegant text-lg font-semibold text-primary">
      Enhanced Dark Mode
    </CardTitle>
  </CardHeader>
</Card>
```

## 🎯 Best Practices

### 1. Use Shadcn/ui for Structure, Design System for Aesthetics

```tsx
// ✅ Good - Combines both systems
<Card className="islamic-card">
  <CardHeader>
    <CardTitle className="font-elegant text-xl font-semibold text-primary">
      Prayer Times
    </CardTitle>
  </CardHeader>
  <CardContent>
    <Button className="btn-primary w-full">Get Times</Button>
  </CardContent>
</Card>

// ✅ Good - Consistent styling
<div className="space-y-6">
  <Card className="islamic-card">
    <CardTitle className="font-elegant text-lg font-semibold text-primary">Title 1</CardTitle>
  </Card>
  <Card className="islamic-card">
    <CardTitle className="font-elegant text-lg font-semibold text-primary">Title 2</CardTitle>
  </Card>
</div>
```

### 2. Leverage Shadcn/ui Variants

```tsx
// Use shadcn/ui button variants with Islamic styling
<Button variant="default" className="btn-primary">
  Primary Action
</Button>

<Button variant="secondary" className="btn-secondary">
  Secondary Action
</Button>

<Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
  Outline Action
</Button>

<Button variant="ghost" className="nav-link">
  Navigation Link
</Button>
```

### 3. Maintain Design System Consistency

```tsx
// Consistent card styling
<Card className="islamic-card">
  <CardHeader>
    <CardTitle className="font-elegant text-primary text-xl font-semibold">
      Consistent Title
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-foreground/80">Content with consistent styling</p>
  </CardContent>
</Card>
```

## 🔧 Customization Examples

### Custom Shadcn/ui Variants

```tsx
// In your button.tsx component
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-elegant font-medium transition-all',
  {
    variants: {
      variant: {
        default: 'btn-primary',
        secondary: 'btn-secondary',
        islamic: 'islamic-border bg-gradient-to-r from-primary/10 to-secondary/10',
        prayer: 'prayer-card text-center',
      },
      size: {
        default: 'px-6 py-3',
        sm: 'px-4 py-2',
        lg: 'px-8 py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### Extended Components

```tsx
// Prayer time display component with shadcn/ui
const PrayerTime = ({ name, time, isNext }) => (
  <Card className={`prayer-card ${isNext ? 'ring-secondary ring-2' : ''}`}>
    <CardContent className="pt-6 text-center">
      <div className="prayer-name font-arabic mb-1 text-lg">{name}</div>
      <div className="prayer-time font-elegant text-xl">{time}</div>
      {isNext && (
        <Badge variant="secondary" className="mt-2">
          Next Prayer
        </Badge>
      )}
    </CardContent>
  </Card>
);

// Usage
<PrayerTime name="الفجر" time="5:30 AM" isNext={true} />;
```

### Form Components with Validation

```tsx
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-elegant text-primary font-medium">Location</FormLabel>
          <FormControl>
            <Input placeholder="Enter your city" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit" className="btn-primary w-full">
      Get Prayer Times
    </Button>
  </form>
</Form>;
```

## 🚀 Performance Tips

### 1. Component Optimization

- Use shadcn/ui components for consistent behavior
- Apply design system classes for styling
- Leverage Tailwind's JIT compilation

### 2. Font Loading

- Google Fonts are optimized by Next.js
- Use font-display: swap for better performance
- Consider font preloading for critical text

### 3. CSS Optimization

- Design system uses CSS custom properties
- Minimal CSS duplication
- Efficient class combinations

---

_This showcase demonstrates the powerful combination of shadcn/ui components with the SalatSync Islamic design system. Use these examples to build beautiful, accessible, and culturally appropriate prayer time applications._

### Background Patterns

```tsx
/* Islamic geometric pattern */
.bg-islamic-pattern {
  background-image: var(--pattern-islamic);
  background-size: 60px 60px;
}

/* Subtle background patterns for main content */
.bg-subtle-stripes {
  background-image: var(--pattern-subtle-stripes);
  background-size: 2px 100%;
}

.bg-subtle-ribbed {
  background-image: var(--pattern-subtle-ribbed);
  background-size: 1px 100%;
}

/* Content area background with subtle pattern */
.bg-content-pattern {
  background-image: var(--pattern-subtle-stripes);
  background-size: 2px 100%;
  background-attachment: fixed;
}
```

### Usage Examples

```tsx
// Main content section with subtle pattern
<section className="py-16 px-6 bg-content-pattern">
  <div className="max-w-6xl mx-auto">
    <h2 className="font-elegant text-2xl font-semibold text-primary">
      Main Content
    </h2>
    <p>Content over elegant subtle background</p>
  </div>
</section>

// Individual content areas
<div className="bg-subtle-stripes p-6 rounded-lg">
  <h3>Content Title</h3>
  <p>Content with subtle texture</p>
</div>

// Alternative pattern
<div className="bg-subtle-ribbed p-6 rounded-lg">
  <h3>Alternative Pattern</h3>
  <p>More refined texture variation</p>
</div>
```
