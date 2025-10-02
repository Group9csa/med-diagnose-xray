# MedVision AI - Complete Integration Guide

## 🎯 Overview
This guide walks you through integrating your trained model files (.h5 format) with the MedVision AI platform, setting up authentication, and deploying the complete application.

---

## 📋 Prerequisites

1. **Trained model files** in `.h5` format:
   - `cnn_model.h5`
   - `vgg19_model.h5`
   - `resnet50_model.h5`
   - `densenet121_model.h5`

2. **Python 3.8+** installed on your system
3. **Node.js 16+** for the frontend
4. **Git** for version control

---

## 🚀 Step-by-Step Setup

### Step 1: Clone and Setup Repository

```bash
# Clone your repository
git clone <your-repo-url>
cd <your-repo-name>

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

### Step 2: Place Your Model Files

Create the models directory structure and place your trained models:

```bash
# Create directories
mkdir -p models/federated/rounds

# Copy your model files to the models directory
cp path/to/your/cnn_model.h5 models/
cp path/to/your/vgg19_model.h5 models/
cp path/to/your/resnet50_model.h5 models/
cp path/to/your/densenet121_model.h5 models/
```

**Directory structure after copying:**
```
models/
├── cnn_model.h5              # Your CNN model
├── vgg19_model.h5            # Your VGG19 model
├── resnet50_model.h5         # Your ResNet50 model
├── densenet121_model.h5      # Your DenseNet121 model
└── federated/
    ├── global_model.h5       # Will be created by federated training
    ├── training_history.json # Will be created by federated training
    └── rounds/               # Federated training checkpoints
```

### Step 3: Configure Backend Model Loading

**File:** `backend/app.py`

1. **Locate the model loading section** (around line 35):

```python
# Currently commented out - you need to uncomment and modify:

# MODELS = {}
# def load_models():
#     global MODELS
#     for model_name, model_path in MODEL_PATHS.items():
#         if os.path.exists(model_path):
#             MODELS[model_name] = tf.keras.models.load_model(model_path)
#             print(f"✓ Loaded {model_name}")
#         else:
#             print(f"✗ Model not found: {model_path}")
# 
# load_models()
```

2. **Uncomment these lines** to enable actual model loading:

```python
MODELS = {}

def load_models():
    global MODELS
    for model_name, model_path in MODEL_PATHS.items():
        if os.path.exists(model_path):
            try:
                MODELS[model_name] = tf.keras.models.load_model(model_path)
                print(f"✓ Loaded {model_name} from {model_path}")
            except Exception as e:
                print(f"✗ Error loading {model_name}: {e}")
        else:
            print(f"✗ Model file not found: {model_path}")

# Call this when the app starts
load_models()
```

3. **Update the prediction endpoint** (around line 185):

Find this section:
```python
# MOCK PREDICTION (Replace with actual model prediction)
prediction_class = np.random.choice(['Normal', 'Bacterial Pneumonia', 'Viral Pneumonia'])
confidence = np.random.uniform(0.7, 0.99)
probabilities = {
    'Normal': np.random.uniform(0.1, 0.9),
    'Bacterial': np.random.uniform(0.1, 0.9),
    'Viral': np.random.uniform(0.1, 0.9)
}
```

Replace with:
```python
# ACTUAL MODEL PREDICTION
if model_name in MODELS and MODELS[model_name] is not None:
    model = MODELS[model_name]
    prediction = model.predict(image_array)
    
    # Assuming your model outputs 3 classes: [Normal, Bacterial, Viral]
    class_names = ['Normal', 'Bacterial Pneumonia', 'Viral Pneumonia']
    predicted_class_idx = np.argmax(prediction[0])
    prediction_class = class_names[predicted_class_idx]
    confidence = float(prediction[0][predicted_class_idx])
    
    probabilities = {
        'Normal': float(prediction[0][0]),
        'Bacterial': float(prediction[0][1]),
        'Viral': float(prediction[0][2])
    }
else:
    return jsonify({
        'error': f'Model {model_name} not loaded or not found'
    }), 500
```

### Step 4: Enable Grad-CAM Visualizations

The Grad-CAM functionality is already implemented in `backend/app.py`. To verify it works:

1. **Check the generate_gradcam function** (around line 92):
   - It automatically finds the last convolutional layer
   - Generates heatmap overlays on X-ray images
   - Returns base64 encoded images

2. **Test Grad-CAM** after loading models:
   - The prediction endpoint automatically calls `generate_gradcam()`
   - Returns the visualization in the response as `gradcam_image`

### Step 5: Train Federated Learning Model

```bash
cd backend/federated

# Configure federated learning settings in fl_config.py if needed:
# - num_clients: Number of simulated hospitals (default: 5)
# - rounds: Number of federated training rounds (default: 10)
# - epochs_per_round: Local training epochs (default: 5)

# Run federated training
python fl_server.py
```

**What this does:**
- Creates `global_model.h5` in `models/federated/`
- Generates `training_history.json` with training metrics
- Saves round checkpoints in `models/federated/rounds/`

**Expected output:**
```
=== Federated Learning Server ===
Loading base model...
✓ Base model loaded
Initializing 5 clients...
✓ Clients initialized

Round 1/10
  Client hospital_a training...
  Client hospital_b training...
  ...
  Global model saved: models/federated/global_model.h5
  
Round 2/10
  ...
```

### Step 6: Start the Backend Server

```bash
cd backend
python app.py
```

The server will start on `http://localhost:5000`

**Verify the server is running:**
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "models_loaded": {
    "cnn": true,
    "vgg19": true,
    "resnet50": true,
    "densenet121": true,
    "federated": true
  }
}
```

### Step 7: Setup Authentication Database

The authentication is already configured! When you first run the app:

1. Navigate to the welcome page at `http://localhost:3000`
2. Click "Get Started" → "Sign Up"
3. Create your professional account
4. Your profile will be automatically created in the database

**Database tables created:**
- `profiles` - Stores user information (email, full_name, specialty, hospital)
- Auto-triggers handle profile creation on signup

### Step 8: Start the Frontend

```bash
# In the root directory
npm run dev
```

The app will open at `http://localhost:3000`

---

## 🔍 Testing the Integration

### 1. Test Authentication
1. Go to `http://localhost:3000`
2. Click "Get Started"
3. Sign up with your professional email
4. Sign in and verify you reach the home page

### 2. Test Model Predictions
1. Navigate to "Prediction" page
2. Upload a chest X-ray image
3. Select a model (CNN, VGG19, ResNet50, DenseNet121, or Federated)
4. Click "Predict"
5. Verify you get:
   - Prediction class
   - Confidence scores
   - Grad-CAM visualization

### 3. Test Model Comparison
1. Navigate to "Model Comparison" page
2. Upload an X-ray image
3. Click "Compare All Models"
4. Verify all models return predictions with performance metrics

### 4. Test Federated Learning Page
1. Navigate to "Federated Learning" page
2. Check training history
3. View hospital data distribution
4. Upload an image for federated model prediction

---

## 🐛 Troubleshooting

### Models Not Loading
**Problem:** `✗ Model not found` errors

**Solutions:**
1. Verify model files are in the correct location:
   ```bash
   ls -la models/
   ```
2. Check file permissions:
   ```bash
   chmod 644 models/*.h5
   ```
3. Verify model format is compatible with TensorFlow/Keras

### Grad-CAM Not Working
**Problem:** No Grad-CAM images generated

**Solutions:**
1. Ensure your models have convolutional layers
2. Check the console for errors in `generate_gradcam()`
3. Verify `opencv-python` is installed:
   ```bash
   pip install opencv-python
   ```

### Authentication Issues
**Problem:** Can't sign up or sign in

**Solutions:**
1. Check if the backend database is running
2. Verify Cloud is enabled in your Lovable project
3. Check browser console for errors
4. Make sure auto-confirm email is enabled in settings

### Federated Training Fails
**Problem:** `python fl_server.py` fails

**Solutions:**
1. Ensure base model exists (CNN model):
   ```bash
   ls -la models/cnn_model.h5
   ```
2. Check Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Review `fl_config.py` settings

---

## 📁 File Modification Checklist

### Backend Files to Modify:
- [ ] `backend/app.py` - Uncomment model loading (line ~35)
- [ ] `backend/app.py` - Replace mock predictions with actual model predictions (line ~185)
- [ ] `backend/federated/fl_config.py` - (Optional) Adjust training parameters

### Frontend Files (No Changes Required):
- ✅ Already configured to work with your backend
- ✅ Authentication integrated
- ✅ All pages ready to use

---

## 🚢 Deployment

### Deploy to GitHub
```bash
git add .
git commit -m "Integrated trained models and authentication"
git push origin main
```

### Deploy Frontend (Lovable)
1. Click "Publish" button in Lovable interface
2. Your app will be deployed to `<your-project>.lovable.app`

### Deploy Backend
You can deploy the backend to:
- **Heroku**: Follow [Heroku Python deployment guide](https://devcenter.heroku.com/articles/getting-started-with-python)
- **Railway**: Follow [Railway deployment docs](https://docs.railway.app/deploy/deployments)
- **Render**: Follow [Render Python guide](https://render.com/docs/deploy-flask)

**Important:** Update the frontend API endpoints to point to your deployed backend URL.

---

## 📊 Model Performance Tracking

Your models' performance metrics are stored in:
- `backend/app.py` - `MODEL_PERFORMANCE` dictionary (line ~55)
- Update these with your actual training results

```python
MODEL_PERFORMANCE = {
    'cnn': {
        'accuracy': 0.925,  # Update with your model's accuracy
        'precision': 0.918,
        'recall': 0.923,
        # ...
    }
}
```

---

## 🔐 Security Best Practices

1. **Never commit your `.h5` model files** to Git (they're large)
2. **Use `.gitignore`** to exclude sensitive files
3. **Environment variables** for sensitive data
4. **Row Level Security** is already configured for user data
5. **Authentication** is required for all protected routes

---

## 📞 Need Help?

If you encounter issues:
1. Check the console logs (both frontend and backend)
2. Review the error messages
3. Verify all files are in the correct locations
4. Ensure all dependencies are installed

---

## ✅ Final Checklist

Before deployment:
- [ ] All model files copied to `models/` directory
- [ ] Model loading uncommented in `backend/app.py`
- [ ] Mock predictions replaced with actual predictions
- [ ] Federated model trained (`global_model.h5` exists)
- [ ] Backend server starts without errors
- [ ] Frontend connects to backend successfully
- [ ] Authentication works (signup, login, logout)
- [ ] Predictions return actual results (not mock data)
- [ ] Grad-CAM visualizations display correctly
- [ ] All pages accessible and functional

---

**Congratulations!** 🎉 Your MedVision AI platform is now fully integrated and ready to use!