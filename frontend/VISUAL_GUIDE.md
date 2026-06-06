# StrokeAI - Visual Guide & Component Showcase

## 🎨 Design Components

### 1. Navbar
- **Style**: Glass card with backdrop blur
- **Features**: Logo, navigation links, active indicators
- **Behavior**: Sticky positioning, smooth animations
- **Colors**: White background, slate text, sky accents

```jsx
<motion.header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl">
  {/* Logo and navigation */}
</motion.header>
```

### 2. Hero Section
- **Background**: Gradient with animated orbs
- **Typography**: Large, bold headline with gradient text
- **CTA**: Primary and secondary buttons
- **Layout**: Centered, responsive

```jsx
<section className="bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
  <h1 className="text-7xl font-bold gradient-text">
    AI-Powered Stroke Risk Assessment
  </h1>
</section>
```

### 3. Status Cards
- **Style**: Glass card with hover effects
- **Content**: Icon, label, value, trend
- **Interactions**: Scale on hover, shadow changes
- **Colors**: Status-based icon backgrounds

```jsx
<motion.div className="metric-card group">
  <div className="bg-sky-500/10 text-sky-600">
    <Icon className="w-6 h-6" />
  </div>
  <p className="text-2xl font-bold">{value}</p>
</motion.div>
```

### 4. Patient Form
- **Sections**: Demographics, Medical, Lifestyle, Clinical
- **Navigation**: Tab-like section buttons
- **Fields**: Smart dropdowns and number inputs
- **Validation**: Real-time with error messages

```jsx
<div className="glass-card rounded-3xl p-8">
  <div className="flex gap-2">
    {sections.map((section) => (
      <button className="px-4 py-2 rounded-lg font-medium">
        {section.title}
      </button>
    ))}
  </div>
  {/* Form fields for current section */}
</div>
```

### 5. Prediction Card
- **Layout**: Centered, prominent results
- **Visualization**: Pie chart gauge
- **Info**: Probability, model, recommendation
- **Color-Coding**: Red for high-risk, green for low-risk

```jsx
<motion.div className="glass-card rounded-3xl">
  <div className="text-3xl font-bold text-slate-900">
    {response?.risk_percentage}%
  </div>
  <PieChart data={chartData} />
  <Recommendation>{message}</Recommendation>
</motion.div>
```

### 6. Metrics Chart
- **Type**: Bar chart with recharts
- **Metrics**: Accuracy, Precision, Recall, F1, ROC-AUC
- **Colors**: Multi-color bars
- **Grid**: Responsive layout with values

```jsx
<ResponsiveContainer width="100%" height={280}>
  <BarChart data={metricsData}>
    <Bar dataKey="value" radius={[8, 8, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

### 7. Model Comparison
- **Layout**: Three-column grid
- **Highlight**: Best model has special styling
- **Metrics**: Risk %, probability, bar
- **Badge**: "RECOMMENDED" for best model

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {models.map((model) => (
    <motion.div className={isBest ? 'bg-sky-50 border-sky-300' : 'bg-white'}>
      {isBest && <Award className="w-3 h-3" />}
      <div className="text-2xl font-bold">{model.risk_percentage}%</div>
    </motion.div>
  ))}
</div>
```

### 8. Footer
- **Layout**: Three-column grid
- **Content**: Branding, links, social
- **Colors**: Dark slate background
- **Style**: Professional, subtle

```jsx
<footer className="bg-slate-900 text-slate-300 py-12">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Brand, links, social */}
  </div>
</footer>
```

## 🎬 Animations & Transitions

### Page Load
```jsx
initial={{ y: 20, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.5 }}
```

### Hover Effects
- Cards: Shadow increases, subtle scale
- Buttons: Color change, scale transform
- Icons: Rotation or glow effect

### Form Submission
```jsx
{submitting ? (
  <Loader2 className="animate-spin" />
) : null}
```

### Success Animation
```jsx
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  className="fixed inset-0 flex items-center justify-center"
>
  <CheckCircle className="w-10 h-10" />
</motion.div>
```

## 🎨 Color Usage

### Primary Accent
- Sky-500: Buttons, accents, links
- Sky-600: Hover states, dark accents
- Sky-50/100: Light backgrounds

### Status Colors
- Emerald: Success, low-risk
- Red: Danger, high-risk
- Amber: Warning
- Blue: Info

### Neutral Colors
- Slate-900: Primary text
- Slate-700: Secondary text
- Slate-500: Tertiary text
- Slate-100-200: Backgrounds
- Slate-50: Light backgrounds

## 📐 Spacing & Layout

### Container Widths
- `max-w-7xl`: Main content (1280px)
- Full width with horizontal padding
- Responsive padding: `px-6 lg:px-8`

### Gaps & Margins
- Between sections: `mb-12`
- Between cards: `gap-6 md:gap-8`
- Between items: `gap-3` or `gap-4`

### Card Padding
- Large cards: `p-8`
- Medium cards: `p-6`
- Small cards: `p-4`

## ✨ Glass Morphism Details

### Cards
```css
background-color: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(40px);
border: 1px solid rgba(255, 255, 255, 0.5);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
```

### Effect
- Semi-transparent white background
- Strong blur effect
- Subtle border for definition
- Soft shadow for depth

## 🎯 Focus States

### Keyboard Navigation
```css
focus:outline-none
focus:ring-2 focus:ring-sky-500/20
focus:border-sky-500
```

### Visible Focus Indicator
- Sky-500 outline ring
- 2px thickness
- Light background tint

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Single column layouts
- Full-width cards
- Stacked sections
- Smaller typography

### Tablet (768px - 1024px)
- Two-column layouts
- Medium cards
- Optimized spacing
- Readable typography

### Desktop (> 1024px)
- Three-column layouts
- Larger cards
- Generous spacing
- Large typography

## 🔤 Typography Scale

- **H1**: 56px (mobile) → 84px (desktop)
- **H2**: 24px → 32px
- **H3**: 20px → 24px
- **Body**: 16px (mobile) → 18px (desktop)
- **Small**: 12px → 14px
- **Mono**: 14px (monospace fonts)

## 🎬 Animation Easing

- Page transitions: `ease-out`
- Hover effects: `ease-in-out`
- Loading: `ease-in-out` (infinite)
- Duration: 200ms (fast), 300ms (normal), 500ms (slow)

## 🎨 Hover States

### Cards
- Background: Slightly lighter
- Shadow: Increase blur and offset
- Scale: Very slight (0.02)

### Buttons
- Background: Darker shade
- Shadow: Increase
- Scale: 0.98 (press effect)

### Links
- Color: Sky-400
- Underline: Optional

## 📊 Data Visualization

### Charts
- Color-coded bars
- Smooth animations
- Responsive sizing
- Readable labels
- Hover tooltips

### Gauges
- Pie charts for risk visualization
- Color-coded sections
- Percentage display
- Smooth animations

### Progress Bars
- Full width
- Colored based on status
- Smooth transitions
- Discrete segments

## ✅ Accessibility

### Color Contrast
- Text on background: 4.5:1 minimum
- Large text: 3:1 minimum
- Status indicators: Multiple cues (not color-only)

### Focus Indicators
- Clearly visible
- High contrast
- Easy to locate

### Semantic HTML
- Proper heading hierarchy
- Form labels
- ARIA attributes

---

**This visual guide demonstrates production-ready design patterns suitable for modern healthcare applications.**
