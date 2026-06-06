# Next Steps - Getting Started

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser.

### 3. Connect to Backend
Ensure your FastAPI backend is running at `http://localhost:8000`

Edit `src/api/strokeApi.js` if using a different backend URL.

## 📋 Project Structure Overview

```
frontend/
├── src/
│   ├── components/        # 13 reusable components
│   ├── pages/             # 2 main pages (Home, About)
│   ├── lib/               # Utility functions
│   ├── api/               # API client (strokeApi.js)
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind styles
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies
```

## 🎨 Design System Quick Reference

### Colors
- **Primary**: sky-500 (#0ea5e9)
- **Success**: emerald-500
- **Warning**: amber-500
- **Danger**: red-500
- **Neutral**: slate (50-900)

### CSS Classes
- `.glass-card` - Glassmorphism effect
- `.gradient-text` - Gradient text
- `.metric-card` - Metric display
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.input-field` - Form input

### Component Import Examples
```jsx
import Hero from '@/components/Hero'
import StatusCard from '@/components/StatusCard'
import PatientForm from '@/components/PatientForm'
```

## 🔧 Customization Guide

### Change Primary Color
Edit `tailwind.config.js` or use `bg-amber-500` class names.

### Modify Spacing
Update `frontend/src/index.css` component definitions.

### Adjust Animations
Edit timing in `src/components/*.jsx` Framer Motion configs.

### Change Typography
Update `index.css` with different font or sizes.

## 🧪 Testing the Application

### Test Form Submission
1. Navigate to home page
2. Click "Load Sample" button
3. Click "Predict Risk"
4. See results in prediction card

### Test Multi-Section Form
Click section tabs (Demographics, Medical, etc.) to navigate form.

### Test Model Comparison
After prediction, scroll to see three-model comparison.

### Test Responsiveness
- Desktop: Full layout
- Tablet: 2-column layout
- Mobile: Single column, stacked

## 📱 Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Check for linting issues
npm run lint
```

## 🐛 Troubleshooting

### Build fails
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Animations not smooth
- Check GPU acceleration (Chrome DevTools)
- Reduce animation count if needed
- Verify Framer Motion is installed

### Styling issues
- Run `npm install tailwindcss @tailwindcss/postcss`
- Clear browser cache
- Rebuild CSS

### API connection issues
- Verify backend URL in `src/api/strokeApi.js`
- Check CORS headers on backend
- Verify backend is running on port 8000

## 📚 Documentation Files

Read in this order:
1. **README.md** - Overview & setup
2. **DESIGN_SHOWCASE.md** - Design achievements
3. **VISUAL_GUIDE.md** - Component showcase
4. **COMPONENTS.md** - Component API
5. **REDESIGN_CHECKLIST.md** - Completion status

## 🎯 Key Features to Explore

1. **Multi-Section Form**: Patient assessment with organized sections
2. **Risk Visualization**: Pie chart gauge showing probability
3. **Model Comparison**: Side-by-side prediction from 3 models
4. **Performance Metrics**: Interactive bar chart
5. **Responsive Design**: Works on all screen sizes
6. **Smooth Animations**: Hover effects and transitions

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized static files.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
- Connect GitHub repo to Netlify
- Set build command: `npm run build`
- Set publish directory: `dist`

## 🔒 Environment Variables

Create `.env` if needed:
```
VITE_API_URL=http://localhost:8000
```

Access in code:
```jsx
const apiUrl = import.meta.env.VITE_API_URL
```

## 💡 Performance Tips

1. Use Chrome DevTools to profile
2. Check Lighthouse score
3. Monitor bundle size with `npm run build`
4. Test on real devices
5. Use responsive images

## 🆘 Need Help?

### Component Questions
- Check `COMPONENTS.md` for API
- Look at `src/components/` for examples
- Review `VISUAL_GUIDE.md` for patterns

### Styling Questions
- See `src/index.css` for custom classes
- Check `tailwind.config.js` for colors
- Review component files for usage

### API Questions
- Check `src/api/strokeApi.js`
- Review FastAPI backend documentation
- Check network tab in DevTools

## 📝 Common Tasks

### Add a New Component
1. Create file in `src/components/ComponentName.jsx`
2. Use existing components as template
3. Import in pages or other components
4. Style with Tailwind classes

### Add a New Page
1. Create file in `src/pages/PageName.jsx`
2. Add route in `src/App.jsx`
3. Add nav link in `src/components/Navbar.jsx`

### Update API Endpoint
1. Edit `src/api/strokeApi.js`
2. Add new function following pattern
3. Export and use in components

## 🎓 Learning Resources

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Docs](https://react.dev)
- [Recharts Docs](https://recharts.org)
- [Lucide Icons](https://lucide.dev)

## ✅ Pre-Deployment Checklist

- [ ] All components tested
- [ ] Forms working
- [ ] Predictions displaying
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] Backend connected
- [ ] Build succeeds
- [ ] Performance acceptable

## 🎉 You're Ready!

The dashboard is fully functional and production-ready. Start the development server, test the features, and deploy when ready.

**Happy coding! 🚀**

---

For detailed information, see the documentation files in this directory.
