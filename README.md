# SalatSync - Islamic Prayer Times App

A beautiful and elegant Islamic prayer times application built with Next.js and shadcn/ui, featuring a sophisticated design system inspired by Islamic aesthetics and modern web design principles.

## 📜 License Notice

**This project is open source and free to use, modify, and distribute under the MIT License. However, any public use of this software requires visible attribution to the original author and project. See the [LICENSE](LICENSE) file for complete details.**

---

## ✨ Features

- **Beautiful Islamic Design**: Warm colors, elegant typography, and Islamic geometric patterns
- **Professional UI Components**: Built with shadcn/ui for consistent, accessible components
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark Mode Support**: Automatic theme switching with Islamic night colors
- **Typography System**: Playfair Display for elegant text, Amiri for Arabic support
- **Design System**: Comprehensive component library with consistent styling
- **Modern Tech Stack**: Built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui

## 🎨 Design System + Shadcn/ui

SalatSync combines the best of both worlds:

- **Shadcn/ui Components**: Professional, accessible UI components (Button, Card, Input, Select, Badge)
- **Islamic Design System**: Beautiful color palette, typography, and cultural aesthetics
- **Seamless Integration**: Design system classes enhance shadcn/ui components
- **Consistent Experience**: Professional functionality with Islamic visual identity

### **Component Examples**

```tsx
// Enhanced shadcn/ui Button with Islamic styling
<Button className="btn-primary">Get Prayer Times</Button>

// Islamic Card with shadcn/ui structure
<Card className="islamic-card">
  <CardHeader>
    <CardTitle className="font-elegant text-primary">Prayer Times</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Beautiful content with Islamic design</p>
  </CardContent>
</Card>

// Form elements with Arabic support
<Input placeholder="Enter location" className="font-elegant" />
<Select>
  <SelectTrigger className="font-arabic">
    <SelectValue placeholder="اختر وقت الصلاة" />
  </SelectTrigger>
</Select>
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/salatsync.git
   cd salatsync
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Button, Card, Input, Select, Badge)
- **Fonts**: Google Fonts (Playfair Display, Amiri)
- **Icons**: Lucide React
- **Animations**: tw-animate-css

## 📁 Project Structure

```
salatsync/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and design system
│   ├── layout.tsx         # Root layout with fonts
│   └── page.tsx           # Home page with shadcn/ui components
├── components/             # UI components
│   └── ui/                # shadcn/ui components
│       ├── button.tsx     # Button component
│       ├── card.tsx       # Card component
│       ├── input.tsx      # Input component
│       ├── select.tsx     # Select component
│       └── badge.tsx      # Badge component
├── components.json         # shadcn/ui configuration
├── DESIGN_SYSTEM.md       # Complete design system reference
├── COMPONENT_SHOWCASE.md  # shadcn/ui + design system examples
├── lib/                   # Utility functions
├── public/                # Static assets
└── README.md              # This file
```

## 🎯 Key Design Principles

### Islamic Aesthetics

- Warm, earthy color palette inspired by Islamic art
- Geometric patterns and elegant borders
- Respectful and culturally appropriate design

### Professional UI with shadcn/ui

- Accessible, semantic components
- Consistent behavior and interactions
- Built-in dark mode support
- Keyboard navigation and screen reader support

### Developer Experience

- Semantic color tokens and design variables
- Reusable component classes
- Comprehensive documentation
- Consistent naming conventions

## 🧩 Using the Design System with Shadcn/ui

### Basic Components

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Enhanced buttons
<Button className="btn-primary">Primary Action</Button>
<Button variant="secondary" className="btn-secondary">Secondary Action</Button>

// Islamic cards
<Card className="islamic-card">
  <CardHeader>
    <CardTitle className="font-elegant text-responsive-lg">Content Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Beautiful content with Islamic design</p>
  </CardContent>
</Card>

// Prayer-specific styling
<Card className="prayer-card">
  <CardContent className="pt-6 text-center">
    <span className="prayer-name font-arabic">الفجر</span>
    <span className="prayer-time">5:30 AM</span>
  </CardContent>
</Card>
```

### Form Components

```tsx
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Enhanced form elements
<Input
  placeholder="Enter location"
  className="font-elegant"
/>

<Select>
  <SelectTrigger className="font-arabic">
    <SelectValue placeholder="اختر وقت الصلاة" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="fajr">الفجر - Fajr</SelectItem>
    <SelectItem value="dhuhr">الظهر - Dhuhr</SelectItem>
  </SelectContent>
</Select>
```

### Colors and Gradients

```tsx
// Apply gradients
<div className="hero-gradient">Hero section</div>
<div className="primary-gradient">Primary section</div>

// Text gradients
<h2 className="text-gradient-primary">Gradient Text</h2>
```

## 🌙 Dark Mode

The design system automatically supports dark mode with:

- Automatic theme detection
- Islamic night color palette
- Maintained visual hierarchy
- Consistent component styling
- shadcn/ui components inherit dark mode automatically

## 📱 Responsive Design

Built with a mobile-first approach:

- Responsive typography scales
- Adaptive component layouts
- Touch-friendly interactions
- Optimized for all screen sizes
- shadcn/ui components are responsive by default

## 🔧 Customization

### Adding New Colors

```css
:root {
  --custom-color: hsl(200, 70%, 50%);
  --custom-color-foreground: hsl(45, 20%, 96%);
}
```

### Creating New Components

```css
@layer components {
  .custom-component {
    @apply bg-primary text-primary-foreground rounded-lg;
    box-shadow: var(--shadow-elegant);
  }
}
```

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
      },
    },
  }
);
```

## 📚 Documentation

- **[Design System](./DESIGN_SYSTEM.md)**: Complete design tokens, components, and guidelines
- **[Component Showcase](./COMPONENT_SHOWCASE.md)**: shadcn/ui + design system examples
- **[Next.js Documentation](https://nextjs.org/docs)**: Framework documentation
- **[Tailwind CSS](https://tailwindcss.com/docs)**: Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)**: Professional UI components

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines

- Follow the established design system
- Use shadcn/ui components for structure
- Apply design system classes for aesthetics
- Maintain consistent typography
- Test in both light and dark modes
- Ensure responsive design

## 📄 License

This project is licensed under the **MIT License with Attribution Requirement** - see the [LICENSE](LICENSE) file for details.

### **License Summary**

- **Open Source**: Free to use, modify, and distribute
- **Attribution Required**: Must give credit to the original author and project
- **Commercial Use**: Allowed with attribution
- **Modifications**: Allowed with attribution

### **Attribution Requirements**

When using this software in any public-facing application, website, or product, you must include visible credit that includes:

- Project name: "SalatSync"
- Author: "[Your Name]"
- Link to the original repository (if applicable)

The credit can be displayed in:

- Application's "About" section or credits page
- Application's footer or header
- README or documentation
- Source code comments

### **Why This License?**

This license ensures that:

- Your work remains open and accessible to the community
- Users can freely use and build upon your design system
- You receive proper recognition for your contributions
- The Islamic design community benefits from your work

## 🙏 Acknowledgments

- Islamic art and design inspiration
- Google Fonts for typography
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Shadcn/ui for professional UI components

---

**Built with ❤️ for the Islamic community**

_SalatSync combines modern web development with traditional Islamic aesthetics, using professional UI components to create a beautiful and functional prayer times application._
