# Component Reference

## Core Components

### Navbar
Sticky header with navigation.
```jsx
<Navbar />
```

### Hero
Landing section with animated background.
```jsx
<Hero />
```

### StatusCard
Metric card with icon, value, trend.
```jsx
<StatusCard
  icon={Activity}
  label="API Status"
  value="Operational"
  status="operational"
  trend={2.3}
  delay={0.1}
/>
```

### PatientForm
Multi-section patient assessment form.
```jsx
<PatientForm
  onPrediction={setPredictionResult}
  onAllPredictions={setAllPredictions}
/>
```

Sections: Demographics, Medical, Lifestyle, Clinical Metrics

### PredictionCard
Displays prediction results with risk gauge.
```jsx
<PredictionCard predictionResult={predictionResult} />
```

### MetricsCard
Interactive bar chart of model performance.
```jsx
<MetricsCard metrics={metrics} loading={loading} error={error} />
```

### MultiModelResults
Three-model comparison display.
```jsx
<MultiModelResults allPredictions={allPredictions} />
```

### Footer
Professional footer with links.
```jsx
<Footer />
```

## Utility Components

### LoadingSkeleton
Loading state animation.
```jsx
<LoadingSkeleton className="h-40" />
```

### EmptyState
Empty state with icon and message.
```jsx
<EmptyState
  icon={Activity}
  title="No Results"
  description="Complete the form"
/>
```

### SuccessAnimation
Success feedback overlay.
```jsx
<SuccessAnimation show={showSuccess} message="Complete!" />
```

### GradientCard
Reusable gradient card with hover effect.
```jsx
<GradientCard gradient="from-sky-500 to-sky-600" delay={0.1}>
  Content
</GradientCard>
```

## Utility Functions

### cn()
Merge Tailwind classes
```jsx
import { cn } from '@/lib/utils'
const className = cn('px-4', condition && 'bg-sky-500')
```

### formatMetric()
Format numbers for display
```jsx
formatMetric(0.8523, 3) // "0.852"
```

### formatPercentage()
Format as percentage
```jsx
formatPercentage(0.85) // "85.0%"
```

## Custom CSS Classes

### glass-card
Glassmorphism card effect
```html
<div class="glass-card rounded-3xl p-8">Glass card</div>
```

### gradient-text
Gradient text effect
```html
<h1 class="gradient-text">Gradient Text</h1>
```

### metric-card
Metric card styling
```html
<div class="metric-card">Metric</div>
```

### btn-primary
Primary button style
```html
<button class="btn-primary">Click me</button>
```

### btn-secondary
Secondary button style
```html
<button class="btn-secondary">Click me</button>
```

### input-field
Form input styling
```html
<input class="input-field" type="text" />
```

---

See DESIGN_SHOWCASE.md and VISUAL_GUIDE.md for complete documentation.
