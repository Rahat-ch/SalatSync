# SalatSync Design System

A beautiful and elegant design system for Islamic prayer times applications, featuring warm colors, Islamic aesthetics, and modern design principles.

## 🎨 Color Palette

### Primary Colors (HSL Values)

- **Deep Emerald Green**: `hsl(158, 64%, 25%)` - Primary brand color
- **Rich Gold**: `hsl(45, 95%, 50%)` - Secondary accent color
- **Midnight Blue**: `hsl(220, 70%, 25%)` - Tertiary accent color

### Background & Text Colors

- **Warm Cream Background**: `hsl(45, 20%, 96%)` - Main background
- **Dark Brown Text**: `hsl(25, 15%, 15%)` - Primary text color
- **Light Muted**: `hsl(45, 10%, 90%)` - Secondary background
- **Medium Muted**: `hsl(25, 10%, 45%)` - Secondary text

### Color Usage

```css
/* Primary elements */
.btn-primary {
  @apply bg-primary text-primary-foreground;
}

/* Secondary elements */
.btn-secondary {
  @apply bg-secondary text-secondary-foreground;
}

/* Accent elements */
.accent-element {
  @apply bg-accent text-accent-foreground;
}
```

## 🔤 Typography

### Font Families

- **Playfair Display** (`font-elegant`): Headings, titles, elegant text
  - Weights: 400, 500, 600, 700
- **Amiri** (`font-arabic`): Arabic prayer names and text
  - Weights: 400, 700
  - Supports Arabic and Latin scripts

### Typography Classes

```css
/* Elegant typography */
.font-elegant {
  font-family: var(--font-playfair-display);
}

/* Arabic typography */
.font-arabic {
  font-family: var(--font-amiri);
}

/* Responsive text sizes */
.text-responsive-xl {
  @apply text-2xl md:text-3xl lg:text-4xl;
}
.text-responsive-lg {
  @apply text-xl md:text-2xl lg:text-3xl;
}
.text-responsive-md {
  @apply text-lg md:text-xl lg:text-2xl;
}
```

## 🌈 Gradients

### Available Gradients

- **Primary**: `linear-gradient(135deg, emerald → lighter emerald)`
- **Secondary**: `linear-gradient(135deg, gold → lighter gold)`
- **Hero**: `linear-gradient(135deg, emerald → midnight blue)`
- **Prayer Cards**: `linear-gradient(145deg, white → warm cream)`

### Usage

```css
/* Apply gradients */
.hero-gradient {
  background: var(--gradient-hero);
}
.primary-gradient {
  background: var(--gradient-primary);
}
.secondary-gradient {
  background: var(--gradient-secondary);
}

/* Text gradients */
.text-gradient-primary {
  @apply text-gradient-primary;
}
.text-gradient-secondary {
  @apply text-gradient-secondary;
}
```

## 🎭 Shadows

### Shadow System

- **Elegant**: `0 10px 30px -10px emerald/30%` - Primary shadows
- **Prayer**: `0 8px 25px -8px gold/20%` - Secondary shadows
- **Soft**: `0 4px 12px -4px dark-brown/10%` - Subtle shadows

### Usage

```css
/* Apply shadows */
.shadow-elegant {
  box-shadow: var(--shadow-elegant);
}
.shadow-prayer {
  box-shadow: var(--shadow-prayer);
}
.shadow-soft {
  box-shadow: var(--shadow-soft);
}
```

## 🧩 Components

### Buttons

```css
/* Primary button */
.btn-primary {
  @apply bg-primary text-primary-foreground font-elegant rounded-lg px-6 py-3 font-medium;
  background: var(--gradient-primary);
  box-shadow: var(--shadow-elegant);
  transition: all 0.3s ease;
}

/* Secondary button */
.btn-secondary {
  @apply bg-secondary text-secondary-foreground font-elegant rounded-lg px-6 py-3 font-medium;
  background: var(--gradient-secondary);
  box-shadow: var(--shadow-prayer);
  transition: all 0.3s ease;
}
```

### Cards

```css
/* Islamic card */
.islamic-card {
  @apply bg-card text-card-foreground rounded-lg p-6;
  box-shadow: var(--shadow-soft);
  border: 1px solid hsl(158, 64%, 25%, 0.1);
  transition: all 0.3s ease;
}

/* Prayer card */
.prayer-card {
  @apply from-card to-muted shadow-prayer rounded-lg bg-gradient-to-br;
  background: var(--gradient-prayer);
}
```

### Navigation

```css
/* Navigation link */
.nav-link {
  @apply font-elegant text-foreground/80 hover:text-primary font-medium transition-colors;
}

/* Active navigation */
.nav-link.active {
  @apply text-primary;
}
```

## 🎨 Design Elements

### Islamic Borders

```css
.islamic-border {
  @apply border-primary/20 rounded-lg border-2;
  background: linear-gradient(135deg, hsl(158, 64%, 25%, 0.05), hsl(45, 95%, 50%, 0.05));
}
```

### Background Patterns

```css
/* Islamic geometric pattern */
.bg-islamic-pattern {
  background-image: var(--pattern-islamic);
  background-size: 60px 60px;
}

/* Glass effect */
.glass-effect {
  @apply border border-white/20 bg-white/10 backdrop-blur-sm;
}
```

### Prayer Time Display

```css
/* Prayer time */
.prayer-time {
  @apply font-elegant text-primary text-2xl font-semibold;
}

/* Prayer name */
.prayer-name {
  @apply font-arabic text-secondary-foreground text-xl;
}
```

## 🌙 Dark Mode

The design system automatically adapts to dark mode with:

- Darker backgrounds using brown tones
- Lighter accent colors for better contrast
- Adjusted gradients for dark environments
- Maintained Islamic aesthetic

## 📱 Responsive Design

### Mobile-First Approach

- Base styles for mobile devices
- Responsive typography scales
- Adaptive spacing and layouts
- Touch-friendly button sizes

### Breakpoints

```css
/* Responsive utilities */
.text-responsive-xl {
  @apply text-2xl md:text-3xl lg:text-4xl;
}
.text-responsive-lg {
  @apply text-xl md:text-2xl lg:text-3xl;
}
.text-responsive-md {
  @apply text-lg md:text-xl lg:text-2xl;
}
```

## 🚀 Getting Started

### 1. Import Fonts

The fonts are automatically loaded in `app/layout.tsx`:

```tsx
import { Playfair_Display, Amiri } from 'next/font/google';
```

### 2. Use Design Classes

```tsx
// Button example
<button className="btn-primary">Get Prayer Times</button>

// Card example
<div className="islamic-card">
  <h2 className="font-elegant text-responsive-lg">Prayer Times</h2>
</div>

// Arabic text example
<span className="arabic-text font-arabic">الفجر</span>
```

### 3. Custom CSS Variables

All colors are available as CSS custom properties:

```css
.my-element {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

## 🎯 Best Practices

1. **Use semantic color tokens** instead of hardcoded values
2. **Apply typography classes** for consistent text styling
3. **Leverage component classes** for consistent UI elements
4. **Maintain Islamic aesthetic** with warm tones and geometric patterns
5. **Ensure accessibility** with proper contrast ratios
6. **Test dark mode** for all components

## 🔧 Customization

### Adding New Colors

```css
:root {
  --new-color: hsl(200, 70%, 50%);
  --new-color-foreground: hsl(45, 20%, 96%);
}
```

### Creating New Components

```css
@layer components {
  .my-component {
    @apply bg-primary text-primary-foreground rounded-lg;
    box-shadow: var(--shadow-elegant);
  }
}
```

## 📚 Resources

- [Playfair Display Font](https://fonts.google.com/specimen/Playfair+Display)
- [Amiri Font](https://fonts.google.com/specimen/Amiri)
- [HSL Color Picker](https://hslpicker.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

_This design system is optimized for Islamic prayer times applications, providing an elegant and culturally appropriate user experience._
