# MedVision AI - Complete Deployment Guide

## 📋 Overview
This guide covers how to access, deploy, and integrate your trained models into MedVision AI.

---

## 🌐 Accessing Your App

### Option 1: Lovable Cloud (Recommended)
Your app is hosted on Lovable Cloud and accessible through:

1. **Lovable Editor**: https://lovable.dev/projects/YOUR_PROJECT_ID
   - Open your project in the Lovable editor
   - Click the "Preview" button to see your live app
   - The app runs on Lovable's cloud infrastructure

2. **Direct URL**: Your app has a unique URL like `https://YOUR_PROJECT_NAME.lovable.app`
   - This URL persists even when you close the browser
   - Share this URL with others to let them access your app

3. **Mobile Access**: The same URLs work on mobile devices
   - Your app is fully responsive
   - Authentication persists across devices

### Option 2: GitHub + Local Development
1. Connect your project to GitHub (click GitHub button in top-right)
2. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the frontend:
   ```bash
   npm run dev
   ```

5. In a separate terminal, start the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

---

## 🤖 Integrating Your Trained Models

### Step 1: Prepare Your Model Files
Ensure your models are in `.h5` format and compatible with TensorFlow 2.x.

### Step 2: Place Model Files
Copy your `.h5` model files to the `models/` directory:
```
project-root/
├── models/
│   ├── cnn_model.h5
│   ├── vgg19_model.h5
│   ├── resnet50_model.h5
│   └── densenet121_model.h5
└── backend/
    └── app.py
```

### Step 3: Model Compatibility
The backend (`backend/app.py`) has been updated to handle TensorFlow compatibility issues:

✅ **Automatic Features**:
- Models load with `compile=False` to avoid optimizer issues
- Automatic recompilation with current TensorFlow version
- Custom objects for backward compatibility
- Batch keyword compatibility for TF 2.x

✅ **What You Don't Need to Worry About**:
- Version mismatches between training and deployment
- Optimizer state incompatibilities
- Custom layer definitions
- Batch normalization issues

### Step 4: Verify Model Loading
Start the backend server and check the console output:
```bash
cd backend
python app.py
```

You should see:
```
✓ Loaded cnn model
✓ Loaded vgg19 model
✓ Loaded resnet50 model
✓ Loaded densenet121 model
```

If a model fails to load, you'll see an error message with details.

---

## 🎨 Grad-CAM Visualization

### How It Works
1. User uploads an X-ray image
2. Click "Predict Pneumonia" to get classification
3. Click "Generate Grad-CAM" button to visualize affected areas
4. **For Normal cases**: Message displayed that highlighting isn't needed
5. **For Pneumonia cases**: Side-by-side comparison shows:
   - Original X-ray
   - Heatmap overlay highlighting infected regions (red/yellow areas)

### Backend Implementation
The Grad-CAM generation in `backend/app.py`:
- Automatically finds the last convolutional layer
- Computes gradients to identify important regions
- Generates color-coded heatmap (red = high importance)
- Overlays heatmap on original image
- Returns base64-encoded image for display

---

## 🔧 Troubleshooting Model Loading

### Issue: "does not recognize batch keyword"
**Solution**: Already fixed in `backend/app.py`. The model loader uses TensorFlow 2.x compatible syntax.

### Issue: "Incompatible with TF version"
**Solution**: The code loads models with `compile=False` and recompiles them with the current TensorFlow version.

### Issue: Custom layers not found
**Solution**: Add custom objects to the `custom_objects` dictionary in `app.py`:
```python
custom_objects = {
    'GlorotUniform': tf.keras.initializers.GlorotUniform,
    'YourCustomLayer': YourCustomLayer,
}
```

### Issue: Model files not found
**Check**:
1. Files are in the correct directory (`models/`)
2. File names match those in `MODEL_PATHS` dictionary
3. File permissions allow reading

---

## 📊 Model Performance Metrics

Update the model metrics in `backend/app.py` to match your actual model performance:
```python
MODEL_PERFORMANCE = {
    'cnn': {
        'accuracy': 0.92,  # Update with your metrics
        'precision': 0.91,
        'recall': 0.93,
        'f1_score': 0.92,
    },
    # ... update other models
}
```

---

## 🚀 Deployment Options

### Option 1: Lovable Cloud (Current Setup)
✅ Already configured
✅ Automatic HTTPS
✅ Database included (Supabase)
✅ Authentication setup
✅ No server management needed

### Option 2: Self-Hosting Backend
If you need to host the Flask backend separately:

1. **Heroku**:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

2. **AWS EC2**:
   - Launch EC2 instance
   - Install Python and dependencies
   - Run Flask app with gunicorn
   - Configure security groups

3. **Docker**:
   ```dockerfile
   FROM python:3.9
   WORKDIR /app
   COPY backend/ .
   RUN pip install -r requirements.txt
   CMD ["python", "app.py"]
   ```

4. **Update Frontend URL**:
   Change `http://localhost:5000` to your deployed backend URL in `src/pages/PredictionPage.tsx`.

---

## 📱 Accessing After Browser Close

### Your app is always accessible at:
1. **Lovable Editor**: https://lovable.dev (login required)
   - Click on your project to access it
   - All your projects are listed in your dashboard

2. **Live App URL**: https://YOUR_PROJECT_NAME.lovable.app
   - This URL never changes
   - Bookmark it for quick access
   - Works on any device

3. **GitHub Repository** (if connected):
   - Clone and run locally anytime
   - All code is version controlled
   - Deploy to any platform

---

## 🔐 Database Access

Your app uses Lovable Cloud (Supabase) for:
- User authentication
- User profiles
- Data persistence

**Access Database**:
1. Open your project in Lovable
2. Click "Cloud" button in top-right
3. View tables, users, and data
4. No separate Supabase account needed

---

## ✅ Checklist Before Production

- [ ] All `.h5` model files in `models/` directory
- [ ] Backend server starts without errors
- [ ] All models load successfully
- [ ] Grad-CAM generates correctly for pneumonia cases
- [ ] Frontend connects to backend API
- [ ] User authentication works
- [ ] GitHub repository is up to date
- [ ] Environment variables configured (if self-hosting)

---

## 📞 Support

For issues:
1. Check console logs in browser (F12)
2. Check backend terminal output
3. Review error messages in the UI
4. Contact Lovable support if needed

---

## 🎉 Ready to Use

Your MedVision AI platform is now ready with:
✅ Fixed model loading for TensorFlow compatibility
✅ Grad-CAM visualization with generate button
✅ User authentication
✅ Responsive design
✅ Cloud deployment

**Next Steps**:
1. Place your `.h5` model files in the `models/` directory
2. Start the backend: `python backend/app.py`
3. Access your app at the Lovable URL
4. Test with X-ray images!
