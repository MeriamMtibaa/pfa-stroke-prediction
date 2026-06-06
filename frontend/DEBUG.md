# Debugging Guide - "Predict Risk" Button Issue

## Problem
When clicking "Predict Risk", the page becomes blank (white screen).

## Possible Causes

### 1. JavaScript Error
The most common cause. Check browser console:
- Press `F12` to open DevTools
- Go to Console tab
- Look for red error messages
- Check Network tab for failed requests

### 2. Backend Not Running
The API might not be responding:
```bash
# Check if backend is running
curl http://127.0.0.1:8000/health

# Or visit in browser
http://127.0.0.1:8000/docs
```

### 3. CORS Issues
Backend might not allow frontend requests.

Check backend `main.py` has CORS middleware:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 4. Form Validation Error
Form might have invalid data causing crash.

## Quick Fixes

### Fix 1: Check Browser Console
1. Open browser DevTools (`F12`)
2. Go to Console tab
3. Reload page
4. Click "Predict Risk"
5. Look for error messages
6. Share error message if you need help

### Fix 2: Verify Backend Running
```bash
cd backend-ml
# Activate venv if needed
python main.py
```

Backend should show:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Fix 3: Test API Manually
Open browser and test:
```
http://127.0.0.1:8000/health
http://127.0.0.1:8000/form-options
http://127.0.0.1:8000/sample-patient
```

All should return JSON responses.

### Fix 4: Check Network Tab
1. Open DevTools → Network tab
2. Click "Predict Risk"
3. Look for failed requests (red color)
4. Click failed request
5. Check Response tab for error message

### Fix 5: Clear Cache
```bash
# In frontend folder
rm -rf node_modules/.vite
npm run dev
```

Then reload browser page.

### Fix 6: Test with Sample Data
1. Click "Load Sample" button first
2. Then click "Predict Risk"
3. This ensures all fields have valid data

## Common Error Messages

### "Network Error"
- Backend not running
- Wrong port
- CORS issue

**Solution**: Start backend, check CORS config

### "Cannot read property of undefined"
- Missing data in response
- API endpoint changed
- Backend error

**Solution**: Check backend logs, verify endpoints

### "Failed to fetch"
- Backend not accessible
- Network issue
- Port mismatch

**Solution**: Verify backend URL in `src/api/strokeApi.js`

### White screen, no errors
- React error boundary caught error
- Check if ErrorBoundary message shows
- Reload page

## Testing Steps

1. **Test Backend Directly**
```bash
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "Male",
    "age": 67,
    "hypertension": 0,
    "heart_disease": 1,
    "ever_married": "Yes",
    "work_type": "Private",
    "Residence_type": "Urban",
    "avg_glucose_level": 228.69,
    "bmi": 36.6,
    "smoking_status": "formerly smoked"
  }'
```

Should return prediction JSON.

2. **Test Frontend API Call**
Add console.log in PatientForm.jsx:
```jsx
async function handleSubmit(event) {
  event.preventDefault()
  console.log('Form submitted with:', formData)
  
  // ... rest of code
  
  try {
    console.log('Calling API...')
    const response = await predictStroke(patientData)
    console.log('API response:', response.data)
    // ... rest
  } catch (error) {
    console.error('API error:', error)
    // ... rest
  }
}
```

3. **Check State Updates**
In Home.jsx, add console.log:
```jsx
function setPredictionResult(result) {
  console.log('Setting prediction:', result)
  setPredictionResult(result)
}
```

## Emergency Reset

If nothing works:

```bash
# Stop frontend
Ctrl+C

# Clear everything
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install

# Rebuild
npm run build

# Restart dev server
npm run dev
```

## Contact Points

1. Browser Console → Look for errors
2. Network Tab → Check API calls
3. Backend logs → Check server errors
4. Component state → Use React DevTools

## Most Likely Solution

Based on "page becomes blank", this is usually:

1. **JavaScript error** - Check console
2. **API error** - Check backend is running
3. **Missing error handling** - Already added ErrorBoundary

**Try this first:**
1. Open browser console (`F12`)
2. Reload page
3. Fill form or click "Load Sample"
4. Click "Predict Risk"
5. Read error message in console
6. Fix based on error message

If you see an error message, share it and I can help fix it specifically.
