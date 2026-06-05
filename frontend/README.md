# StrokeAI - Premium Healthcare Dashboard

A production-ready, modern SaaS healthcare platform for AI-powered stroke risk assessment.

## 🎨 Design Philosophy

This application embodies a premium, medical-grade aesthetic inspired by modern products like Stripe, Linear, Vercel, and Notion. The design focuses on:

- **Trust & Professionalism**: Medical-grade UI that inspires confidence
- **Clarity**: Clean visual hierarchy and exceptional readability
- **Sophistication**: Premium glassmorphism and subtle animations
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **Responsiveness**: Seamless experience across all devices

## ✨ Features

### Modern UI Components
- **Glassmorphism Cards**: Frosted glass effect with backdrop blur
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Smart Loading States**: Skeleton screens and progressive loading
- **Interactive Charts**: Recharts visualizations with gradients
- **Status Indicators**: Real-time system health monitoring
- **Risk Gauges**: Visual probability representations

### Clinical Features
- **Multi-Section Patient Form**: Organized by Demographics, Medical History, Lifestyle, and Clinical Metrics
- **Real-Time Predictions**: Sub-second ML inference
- **Model Comparison**: Side-by-side analysis of three ML models
- **Performance Metrics**: Comprehensive accuracy, precision, recall, F1, and ROC-AUC
- **Risk Visualization**: Intuitive pie charts and progress bars
- **Explainable AI**: Model transparency and feature importance

## 🛠 Tech Stack

- **React 19** - Latest React with concurrent features
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Framer Motion** - Production-ready animation library
- **Recharts** - Composable charting library
- **Lucide Icons** - Beautiful, consistent icon set
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

## 🎨 Design System

### Color Palette
```css
Primary: #0ea5e9 (Sky Blue)
Slate: #0f172a - #f8fafc
Success: #10b981
Warning: #f59e0b
Danger: #ef4444
```

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: 8px grid system
- **Weights**: 300-800

### Spacing
- Based on 8px grid
- Consistent padding and margins
- Responsive breakpoints: sm, md, lg, xl

### Shadows
- **Soft**: Subtle elevation
- **Medium**: Card hover states
- **Large**: Modals and popovers
- **Glass**: Frosted glass effect

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

The app connects to a FastAPI backend. Ensure the backend is running at:
```
http://localhost:8000
```

Configure in `src/api/strokeApi.js` if using a different URL.

## 📁 Project Structure

```
src/
├── api/
│   └── strokeApi.js         # API client
├── components/
│   ├── Navbar.jsx           # Sticky navigation
│   ├── Hero.jsx             # Landing section
│   ├── StatusCard.jsx       # Metric cards
│   ├── PatientForm.jsx      # Assessment form
│   ├── PredictionCard.jsx   # Risk results
│   ├── MetricsCard.jsx      # Performance metrics
│   ├── MultiModelResults.jsx # Model comparison
│   ├── AnimatedBackground.jsx # Hero animations
│   ├── Footer.jsx           # Footer
│   └── ...
├── pages/
│   ├── Home.jsx             # Main dashboard
│   └── AboutModel.jsx       # Model information
├── lib/
│   └── utils.js             # Utility functions
├── App.jsx                  # Root component
└── index.css                # Global styles
```

## 🎯 Key Components

### StatusCard
Real-time metrics with icons, values, and trend indicators.

### PatientForm
Multi-section form with validation, sample data loading, and smooth transitions.

### PredictionCard
Risk visualization with gauge, probability, and clinical recommendations.

### MetricsCard
Interactive bar chart showing model performance across 5 metrics.

### MultiModelResults
Side-by-side comparison of Logistic Regression, Random Forest, and XGBoost models.

## 🎨 Customization

### Tailwind Configuration
Edit `tailwind.config.js` to customize:
- Colors
- Typography
- Spacing
- Animations
- Shadows

### Design Tokens
Modify `src/index.css` for:
- Custom components
- Utility classes
- Global styles

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components adapt seamlessly across devices.

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- High contrast mode support
- Screen reader friendly

## 🔒 Security

- Input validation on all forms
- Sanitized user inputs
- Secure API communication
- No inline scripts
- CSP headers ready

## 🚀 Performance

- Code splitting with React Router
- Lazy loading for routes
- Optimized images
- Minimal bundle size
- Fast First Contentful Paint
- Smooth 60fps animations

## 📊 Features Checklist

- ✅ Premium glassmorphism design
- ✅ Smooth micro-interactions
- ✅ Loading skeletons
- ✅ Empty states
- ✅ Error handling
- ✅ Toast notifications
- ✅ Responsive layout
- ✅ Dark mode ready
- ✅ Accessibility compliant
- ✅ Production optimized

## 🤝 Contributing

This is a production-ready healthcare application. Contributions should maintain:
- Design consistency
- Code quality
- Performance standards
- Accessibility compliance

## 📄 License

This project is part of a clinical decision support system. Refer to the main repository for licensing information.

## 🩺 Clinical Notice

This application is designed as a clinical decision support tool. All predictions should be reviewed by qualified healthcare professionals. The model is optimized for high recall (sensitivity) to minimize false negatives in stroke risk assessment.

---

Built with ❤️ for healthcare innovation
