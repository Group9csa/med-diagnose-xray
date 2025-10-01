# 🔐 Federated Learning Setup Guide

## 📖 What is Federated Learning?

Federated Learning (FL) allows multiple hospitals to collaboratively train a shared model **without sharing their private patient data**. Each hospital trains on their local data, then only the model updates (weights) are shared and aggregated into a global model.

### How This Implementation Works:

```
┌─────────────────────────────────────────────────────────────┐
│                    Federated Learning Flow                   │
└─────────────────────────────────────────────────────────────┘

Round 1:
  Global Model (Initial) → Hospital 1 → Train Locally → Weights₁
                         → Hospital 2 → Train Locally → Weights₂
                         → Hospital 3 → Train Locally → Weights₃
                         ...
                         → Hospital 8 → Train Locally → Weights₈
                         
  FedAvg Aggregation: Weighted Average of All Weights
  
  → New Global Model (Round 1) → Save Checkpoint

Round 2:
  Global Model (Round 1) → [Same process] → Global Model (Round 2)
  
... Continue for 6 rounds

Final: Global Model trained on data from ALL hospitals
       WITHOUT any hospital sharing their raw data! 🔒
```

### Key Components:

1. **FL Server** (`fl_server.py`): Orchestrates the entire process
2. **FL Clients** (`fl_client.py`): Simulates each hospital's local training
3. **FL Aggregator** (`fl_aggregator.py`): Implements FedAvg algorithm
4. **FL Config** (`fl_config.py`): Configuration and hospital setup
5. **Federated API** (`federated_api.py`): REST API for predictions

---

## 🚀 Step-by-Step Setup

### Step 1: Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

**Dependencies installed:**
- tensorflow (for model training)
- flask & flask-cors (for API)
- opencv-python, pillow, numpy (for image processing)
- scikit-learn (for data splitting)

---

### Step 2: Prepare Your Model Files

You mentioned you have `.h5` model files. Here's what to do:

```
models/
├── cnn_model.h5           # ← Your base CNN model (REQUIRED)
├── vgg19_model.h5         # ← Your VGG19 model (optional)
├── resnet50_model.h5      # ← Your ResNet50 model (optional)
├── densenet121_model.h5   # ← Your DenseNet121 model (optional)
└── federated/             # ← Will be created by training
    ├── global_model.h5
    ├── training_history.json
    └── rounds/
        ├── global_model_round_1.h5
        ├── global_model_round_2.h5
        └── ...
```

**IMPORTANT:** 
- The `cnn_model.h5` file is used as the starting point for federated training
- If you don't have `cnn_model.h5`, the system will create a new CNN architecture from scratch
- Your model must:
  - Input shape: `(224, 224, 3)` (RGB images)
  - Output: 3 classes with softmax activation
  - Be a Keras/TensorFlow `.h5` model

---

### Step 3: Configure Federated Learning

Edit `backend/federated/fl_config.py` if you want to customize:

```python
FL_CONFIG = {
    'num_clients': 8,              # Number of hospitals (1-8)
    'rounds': 6,                   # Training rounds (more = better accuracy)
    'epochs_per_round': 5,         # Local epochs per hospital
    'batch_size': 32,              # Batch size for training
    'learning_rate': 0.001,        # Learning rate
    'base_model': '../models/cnn_model.h5',  # YOUR BASE MODEL
    'global_model_path': '../models/federated/global_model.h5',
    'rounds_dir': '../models/federated/rounds',
    'history_file': '../models/federated/training_history.json'
}

HOSPITALS = [
    {'id': 'H001', 'name': 'Metro General Hospital', 'size': 'Large', 'samples': 2000},
    {'id': 'H002', 'name': 'City Medical Center', 'size': 'Large', 'samples': 1800},
    # ... 8 hospitals total
]
```

**What these parameters mean:**
- `num_clients`: How many hospitals participate (simulated)
- `rounds`: Number of federated training rounds
- `epochs_per_round`: How many epochs each hospital trains locally
- `base_model`: Path to your starting model

---

### Step 4: Train the Federated Model

**Navigate to the federated directory:**

```bash
cd backend/federated
python fl_server.py
```

**What happens during training:**

```
🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒
  MedAI Federated Learning System
  Privacy-Preserving Pneumonia Detection
🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒

📦 Loading base model from ../models/cnn_model.h5
✓ Model loaded: 1,234,567 parameters

🏥 Initializing 8 hospital clients...
   ✓ Metro General Hospital (Large) - 2000 samples
   ✓ City Medical Center (Large) - 1800 samples
   ✓ Regional Health Institute (Medium) - 1500 samples
   ...

📊 Simulating data distribution across hospitals...
🏥 Metro General Hospital: Loaded 2000 samples
🏥 City Medical Center: Loaded 1800 samples
...
✓ Data distribution complete

============================================================
🚀 Starting Federated Learning Training
============================================================
Configuration:
  • Rounds: 6
  • Clients: 8
  • Epochs per round: 5
============================================================

============================================================
📍 Round 1/6
============================================================

🏥 Training at local hospitals:

Metro General Hospital:
   ├─ Accuracy: 0.7845
   ├─ Loss: 0.5234
   └─ Val Accuracy: 0.7621

City Medical Center:
   ├─ Accuracy: 0.7923
   ├─ Loss: 0.4987
   └─ Val Accuracy: 0.7756

... (all 8 hospitals train)

🔄 Aggregating updates from 8 clients...
💾 Saved global model checkpoint: ../models/federated/rounds/global_model_round_1.h5

📊 Round 1 Results:
   • Global Accuracy: 0.7800
   • Participating Hospitals: 8
   • Total Samples: 12000

... (continues for 6 rounds)

============================================================
💾 Saving final global model...
✓ Saved to: ../models/federated/global_model.h5
✓ Training history saved to: ../models/federated/training_history.json

============================================================
🎉 Federated Learning Training Complete!
============================================================

📋 Training Summary:
   • Total Rounds: 6
   • Final Accuracy: 0.8756
   • Hospitals: 8
   • Parameters: 1,234,567
   • Completed: 2025-01-XX XX:XX:XX
```

**Training time:** ~10-30 minutes depending on your hardware

**Note:** This uses **simulated data** (random arrays). In production, you'd replace the `simulate_data_distribution()` method with real chest X-ray dataset loading.

---

### Step 5: Start the Backend API

**Navigate back to backend directory:**

```bash
cd ..  # Back to backend/
python app.py
```

**Expected output:**

```
✓ Loaded federated global model from ../models/federated/global_model.h5
 * Running on http://127.0.0.1:5000
```

---

### Step 6: Test the Federated Model

#### Option A: Using the Frontend

1. Open your frontend app at `http://localhost:8080` (or your Vite dev server port)
2. Navigate to "Prediction" page
3. Upload a chest X-ray image
4. Select **"Federated Global Model"** from the dropdown
5. Click "Analyze X-Ray"
6. You should see prediction results from the federated model!

#### Option B: Using cURL (Terminal)

```bash
curl -X POST http://localhost:5000/api/federated/predict \
  -F "image=@path/to/your/xray.jpg"
```

**Expected response:**

```json
{
  "prediction": "NORMAL",
  "confidence": 0.89,
  "all_probabilities": {
    "normal": 0.89,
    "bacterial": 0.07,
    "viral": 0.04
  },
  "processing_time": "0.34s",
  "model_used": "federated",
  "privacy_preserved": true
}
```

#### Option C: Check Training History

```bash
curl http://localhost:5000/api/federated/history
```

**Response:**

```json
{
  "rounds": [
    {"round": 1, "accuracy": 0.78, "participants": 8, "data_points": 12000},
    {"round": 2, "accuracy": 0.81, "participants": 8, "data_points": 12000},
    ...
  ],
  "total_rounds": 6,
  "final_accuracy": 0.8756,
  "timestamp": "2025-01-XX"
}
```

#### Option D: Check Model Status

```bash
curl http://localhost:5000/api/federated/status
```

---

## ✅ How to Verify It's Working Properly

### 1. Check File Generation

After training, verify these files exist:

```bash
ls -la models/federated/
# Should show:
# - global_model.h5 (final model)
# - training_history.json (metrics)
# - rounds/ (directory with checkpoints)

ls -la models/federated/rounds/
# Should show:
# - global_model_round_1.h5
# - global_model_round_2.h5
# ...
# - global_model_round_6.h5
```

### 2. Validate Training History

```bash
cat models/federated/training_history.json
```

Should contain:
- `rounds`: Array of round numbers
- `global_accuracy`: Array of accuracy values (should increase over rounds)
- `client_metrics`: Per-hospital metrics for each round
- `timestamp`: When training completed

### 3. Test Predictions

Upload different X-ray images and verify:
- ✅ Predictions return in < 2 seconds
- ✅ Confidence scores are between 0-1
- ✅ All 3 probabilities sum to ~1.0
- ✅ Predictions make sense (pneumonia images classified as pneumonia)

### 4. Compare with Other Models

Test the same image with:
1. CNN model
2. VGG19 model
3. Federated model

Compare accuracy and confidence scores. The federated model should perform similarly or better than the base CNN model.

### 5. Check API Endpoints

All these should return 200 OK:

```bash
# Health check
curl http://localhost:5000/api/health

# Model metrics
curl http://localhost:5000/api/models/metrics

# Federated status
curl http://localhost:5000/api/federated/status

# Federated history
curl http://localhost:5000/api/federated/history

# Hospital info
curl http://localhost:5000/api/federated/hospitals
```

---

## 🔧 Troubleshooting

### Error: "Federated model not found"

**Cause:** Training hasn't been run yet

**Solution:**
```bash
cd backend/federated
python fl_server.py
```

### Error: "base_model not found"

**Cause:** `cnn_model.h5` doesn't exist

**Solution:**
- Place your `.h5` model in `models/cnn_model.h5`, OR
- The system will automatically create a new CNN architecture

### Error: "Module not found"

**Cause:** Dependencies not installed

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### Error: "CORS error" in frontend

**Cause:** Backend not running or CORS not configured

**Solution:**
- Ensure backend is running: `python app.py`
- Check `app.py` has `CORS(app)` enabled

### Training taking too long

**Solution:** Reduce parameters in `fl_config.py`:
```python
FL_CONFIG = {
    'num_clients': 4,        # Reduce from 8
    'rounds': 3,             # Reduce from 6
    'epochs_per_round': 3,   # Reduce from 5
}
```

### Low accuracy after training

**Causes:**
1. Using simulated data (replace with real dataset)
2. Not enough training rounds
3. Learning rate too high/low

**Solutions:**
- Increase `rounds` to 10-15
- Adjust `learning_rate` (try 0.0001 or 0.01)
- Use real chest X-ray dataset

---

## 🎯 Using Real Data (Production)

To replace simulated data with real chest X-ray images:

### Modify `fl_server.py`:

Find the `simulate_data_distribution()` method and replace with:

```python
def load_real_data_distribution(self):
    """Load real chest X-ray dataset"""
    from tensorflow.keras.preprocessing.image import ImageDataGenerator
    
    # Path to your dataset
    dataset_path = '/path/to/chest_xray_dataset/'
    
    datagen = ImageDataGenerator(rescale=1./255)
    
    # Load all data
    generator = datagen.flow_from_directory(
        dataset_path,
        target_size=(224, 224),
        batch_size=len(os.listdir(dataset_path)),
        class_mode='categorical',
        shuffle=True
    )
    
    X_all, y_all = next(generator)
    
    # Distribute to clients
    start_idx = 0
    for client in self.clients:
        num_samples = client.hospital_info['samples']
        end_idx = start_idx + num_samples
        
        X_client = X_all[start_idx:end_idx]
        y_client = y_all[start_idx:end_idx]
        
        client.load_local_data(X_client, y_client)
        start_idx = end_idx
```

### Expected Dataset Structure:

```
chest_xray_dataset/
├── NORMAL/
│   ├── image1.jpg
│   ├── image2.jpg
│   └── ...
├── BACTERIAL_PNEUMONIA/
│   ├── image1.jpg
│   └── ...
└── VIRAL_PNEUMONIA/
    ├── image1.jpg
    └── ...
```

---

## 📊 Understanding the Metrics

### Accuracy
- **Meaning:** Percentage of correct predictions
- **Good:** > 0.85 (85%)
- **Excellent:** > 0.90 (90%)

### Loss
- **Meaning:** How far predictions are from actual labels
- **Good:** < 0.3
- **Excellent:** < 0.1

### Validation Accuracy
- **Meaning:** Accuracy on unseen validation data
- **Important:** Should be close to training accuracy (not much lower)
- **If much lower:** Model is overfitting

### Confidence
- **Meaning:** How certain the model is about its prediction
- **Good:** > 0.80 (80%)
- **Caution:** Very high confidence (>0.99) on wrong predictions = overconfident model

---

## 🚀 Next Steps

1. ✅ **Train with real data** - Replace simulated data
2. ✅ **Tune hyperparameters** - Adjust learning rate, epochs, rounds
3. ✅ **Add more hospitals** - Increase `num_clients` to 10-20
4. ✅ **Implement differential privacy** - Enable in `fl_config.py`
5. ✅ **Deploy to production** - Use Railway, Render, or AWS
6. ✅ **Add authentication** - Secure API endpoints
7. ✅ **Monitor performance** - Log metrics to database

---

## 📚 Key Files Summary

| File | Purpose |
|------|---------|
| `fl_server.py` | Main orchestrator - run this to train |
| `fl_client.py` | Simulates each hospital's local training |
| `fl_aggregator.py` | Combines model updates (FedAvg) |
| `fl_config.py` | Configuration (edit this to customize) |
| `federated_api.py` | REST API for predictions |
| `global_model.h5` | Final trained federated model |
| `training_history.json` | Metrics from all rounds |

---

## 🎓 Learning Resources

- **Federated Learning Paper:** https://arxiv.org/abs/1602.05629
- **TensorFlow Federated:** https://www.tensorflow.org/federated
- **Privacy in ML:** https://developers.google.com/machine-learning/practica/privacy

---

## ✨ You're All Set!

Your federated learning system is now ready. Simply:

1. Place your `.h5` model in `models/cnn_model.h5`
2. Run `python fl_server.py` to train
3. Run `python app.py` to start API
4. Use the frontend to make predictions!

The federated model will be available as "Federated Global Model" in your dropdown. 🎉
