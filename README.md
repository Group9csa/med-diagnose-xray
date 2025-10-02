# MedVision AI - Professional Pneumonia Detection Platform

An advanced AI-powered platform for medical professionals to detect and classify pneumonia from chest X-ray images using state-of-the-art deep learning models and federated learning.

## 🌟 Features

### 🧠 Multiple AI Models
- **CNN** - Custom Convolutional Neural Network
- **VGG19** - Transfer Learning with VGG19 architecture
- **ResNet50** - Residual Network for deep feature extraction
- **DenseNet121** - Densely connected networks
- **Federated Global Model** - Privacy-preserving collaborative learning

### 🔐 Secure Authentication
- Professional account system for medical staff
- Secure login/signup with email verification
- User profile management
- Session-based authentication

### 📊 Advanced Analysis
- Real-time pneumonia detection
- Confidence scores for predictions
- Grad-CAM visualizations for model interpretability
- Side-by-side model performance comparison

### 🏥 Federated Learning
- Privacy-preserving collaborative training
- Multi-hospital data simulation
- Training history tracking
- Performance metrics visualization

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Trained model files (.h5 format)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd medvision-ai
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

4. **Place your model files**
```bash
# Copy your trained models to the models directory
cp path/to/your/*.h5 models/
```

5. **Start the application**

Backend:
```bash
cd backend
python app.py
```

Frontend (in a new terminal):
```bash
npm run dev
```

6. **Access the application**
- Open `http://localhost:3000`
- Click "Get Started"
- Sign up with your professional account
- Start detecting pneumonia!

## 📚 Documentation

- **[Integration Guide](INTEGRATION_GUIDE.md)** - Complete setup and integration instructions
- **[Federated Setup Guide](backend/FEDERATED_SETUP_GUIDE.md)** - Federated learning configuration
- **[Backend README](backend/README.md)** - Backend API documentation

## 🏗️ Project Structure

```
medvision-ai/
├── src/                      # Frontend React application
│   ├── components/           # Reusable UI components
│   ├── pages/               # Application pages
│   │   ├── Welcome.tsx      # Landing page
│   │   ├── Login.tsx        # Authentication page
│   │   ├── Homepage.tsx     # Main dashboard
│   │   ├── PredictionPage.tsx       # Single model prediction
│   │   ├── ModelComparisonPage.tsx  # Multi-model comparison
│   │   └── FederatedLearningPage.tsx # Federated learning interface
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication state
│   └── integrations/        # External integrations
│       └── supabase/        # Database client (auto-generated)
├── backend/                 # Flask backend
│   ├── app.py              # Main Flask application
│   ├── federated/          # Federated learning components
│   │   ├── fl_server.py    # Federated server
│   │   ├── fl_client.py    # Federated client simulation
│   │   ├── fl_aggregator.py # Model aggregation
│   │   └── fl_config.py    # FL configuration
│   ├── uploads/            # Temporary upload storage
│   └── static/             # Static files and Grad-CAM outputs
├── models/                 # Trained model storage
│   ├── *.h5               # Your trained models
│   └── federated/         # Federated learning models
└── public/                # Public assets
```

## 🔑 Key Technologies

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Shadcn/ui** - Component library

### Backend
- **Flask** - Python web framework
- **TensorFlow/Keras** - Deep learning
- **OpenCV** - Image processing
- **NumPy** - Numerical computing

### Database & Auth
- **Lovable Cloud** - Backend infrastructure (powered by Supabase)
- **PostgreSQL** - Relational database
- **Row Level Security** - Data protection

## 🎯 Usage

### For Medical Professionals

1. **Sign Up/Login**
   - Create an account with your professional email
   - Securely authenticate

2. **Upload X-Ray**
   - Navigate to the Prediction page
   - Upload a chest X-ray image (JPEG, PNG)

3. **Select Model**
   - Choose from CNN, VGG19, ResNet50, DenseNet121, or Federated
   - Click "Predict"

4. **View Results**
   - See prediction class (Normal, Bacterial, Viral)
   - Check confidence scores
   - Examine Grad-CAM visualization

5. **Compare Models**
   - Use Model Comparison page
   - Compare all models side-by-side
   - Analyze performance differences

## 🧪 Model Training

### Individual Models
Train your models using the standard pneumonia dataset:
- Dataset: Chest X-ray Images (Pneumonia)
- Classes: Normal, Bacterial Pneumonia, Viral Pneumonia
- Format: Save as `.h5` files

### Federated Learning
```bash
cd backend/federated
python fl_server.py
```

This will:
- Simulate multi-hospital training
- Create `global_model.h5`
- Generate training history
- Save checkpoints

## 🔒 Security

- ✅ Secure authentication with password hashing
- ✅ Row-level security for user data
- ✅ Protected API endpoints
- ✅ CORS configured for production
- ✅ Privacy-preserving federated learning
- ✅ No patient data stored on device

## 📊 Performance Metrics

Our models achieve the following performance on the test set:

| Model | Accuracy | Precision | Recall | F1-Score |
|-------|----------|-----------|--------|----------|
| CNN | 92.5% | 91.8% | 92.3% | 92.0% |
| VGG19 | 94.2% | 93.9% | 94.1% | 94.0% |
| ResNet50 | 93.8% | 93.2% | 93.6% | 93.4% |
| DenseNet121 | 95.1% | 94.8% | 95.0% | 94.9% |
| Federated Global | 96.3% | 96.1% | 96.2% | 96.1% |

*Update these values with your actual model performance*

## 🛠️ Development

### Run in Development Mode

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd backend
python app.py
```

### Build for Production

Frontend:
```bash
npm run build
```

Backend:
Deploy to your preferred platform (Heroku, Railway, Render, etc.)

## 🤝 Contributing

This is a final year project. For collaboration or questions, please contact the project team.

## 📄 License

This project is part of a final year academic research project. All rights reserved.

## 👥 Authors

**Medical AI Research Team**
- Advanced pneumonia detection using transfer learning
- Privacy-preserving federated learning implementation
- Professional medical platform development

## 🙏 Acknowledgments

- Dataset providers for pneumonia X-ray images
- TensorFlow and Keras teams
- Medical professionals who provided domain expertise
- Lovable platform for seamless full-stack development

---

## 📞 Support

For issues, questions, or contributions:
1. Check the [Integration Guide](INTEGRATION_GUIDE.md)
2. Review the [Troubleshooting section](INTEGRATION_GUIDE.md#-troubleshooting)
3. Contact the development team

---

**Built with ❤️ for medical professionals**

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### 4. Build for Production

```bash
npm run build
```

## 🔌 Backend Integration

### API Endpoints Required

Create these endpoints in your Flask/Django backend:

#### 1. Prediction Endpoint
```python
# Flask example
@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Expected input:
    - image: File (PNG, JPG, JPEG, DICOM)
    - model: String (cnn, vgg19, resnet50, densenet121, federated)
    
    Expected output:
    {
        "prediction": "Normal" | "Bacterial" | "Viral",
        "confidence": {
            "Normal": float,
            "Bacterial": float,
            "Viral": float
        },
        "gradcam_url": "string (optional)",
        "processing_time": float
    }
    """
    # TODO: Implement your model inference logic here
    pass
```

#### 2. Grad-CAM Endpoint
```python
@app.route('/api/gradcam/<image_id>', methods=['GET'])
def get_gradcam(image_id):
    """
    Return Grad-CAM heatmap overlay image
    """
    # TODO: Generate and return Grad-CAM visualization
    pass
```

#### 3. Model Metrics Endpoint
```python
@app.route('/api/models/metrics', methods=['GET'])
def get_model_metrics():
    """
    Expected output:
    {
        "models": [
            {
                "name": "CNN",
                "accuracy": 92.5,
                "precision": 91.2,
                "recall": 90.8,
                "f1_score": 91.0,
                "confusion_matrix": {...}
            },
            # ... other models
        ]
    }
    """
    # TODO: Return actual model performance metrics
    pass
```

### Model Integration Points

Replace the following placeholders in the code:

#### In `src/pages/PredictionPage.tsx`:
```typescript
// TODO: Replace with actual API call to Flask/Django backend
const response = await fetch('/api/predict', {
  method: 'POST',
  body: formData,
});

if (!response.ok) {
  throw new Error('Prediction failed');
}

const result = await response.json();
setPredictionResult(result);
```

#### In `src/pages/ModelComparisonPage.tsx`:
```typescript
// TODO: Replace with actual model performance data from backend
const modelPerformance = await fetch('/api/models/metrics');
```

#### In `src/pages/FederatedLearningPage.tsx`:
```typescript
// TODO: Replace with actual federated learning data from backend
const federatedData = await fetch('/api/federated/rounds');
```

## 🔐 Model File Integration

### 1. CNN Model
```python
# In your backend, load the trained CNN model
import tensorflow as tf

# TODO: Replace with path to trained CNN model
cnn_model = tf.keras.models.load_model('/path/to/cnn_pneumonia_model.h5')
```

### 2. VGG19 Model
```python
# TODO: Replace with path to trained VGG19 model
vgg19_model = tf.keras.models.load_model('/path/to/vgg19_pneumonia_model.h5')
```

### 3. ResNet50 Model
```python
# TODO: Replace with path to trained ResNet50 model
resnet50_model = tf.keras.models.load_model('/path/to/resnet50_pneumonia_model.h5')
```

### 4. DenseNet121 Model
```python
# TODO: Replace with path to trained DenseNet121 model
densenet121_model = tf.keras.models.load_model('/path/to/densenet121_pneumonia_model.h5')
```

### 5. Federated Global Model
```python
# TODO: Replace with path to federated global model
federated_model = tf.keras.models.load_model('/path/to/federated_global_model.h5')
```

## 🖼️ Grad-CAM Implementation

Example Grad-CAM generation (add to your backend):

```python
import tensorflow as tf
import cv2
import numpy as np

def generate_gradcam(model, image, class_idx, layer_name='conv2d'):
    """
    Generate Grad-CAM heatmap for the prediction
    
    Args:
        model: Trained TensorFlow model
        image: Preprocessed input image
        class_idx: Index of the predicted class
        layer_name: Name of the convolutional layer for Grad-CAM
    
    Returns:
        heatmap: Grad-CAM heatmap as numpy array
    """
    # TODO: Implement Grad-CAM generation logic
    grad_model = tf.keras.models.Model([model.inputs], 
                                       [model.get_layer(layer_name).output, model.output])
    
    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(image)
        loss = predictions[:, class_idx]
    
    grads = tape.gradient(loss, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    
    conv_outputs = conv_outputs[0]
    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)
    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    
    return heatmap.numpy()
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn)
│   ├── Navigation.tsx   # Main navigation component
│   └── FileUpload.tsx   # Drag-and-drop file upload
├── pages/
│   ├── Homepage.tsx           # Project overview and introduction
│   ├── PredictionPage.tsx     # X-ray upload and prediction
│   ├── ModelComparisonPage.tsx # Performance metrics and comparison
│   └── FederatedLearningPage.tsx # Federated learning visualization
├── hooks/
│   └── use-toast.ts     # Toast notifications
├── lib/
│   └── utils.ts         # Utility functions
├── index.css            # Medical design system and themes
└── App.tsx              # Main application and routing
```

## 🎨 Design System

The application uses a comprehensive medical design system with:

- **Colors**: Medical blue primary, classification colors for Normal/Bacterial/Viral
- **Typography**: Clean, professional fonts optimized for readability
- **Components**: Customized shadcn components with medical variants
- **Animations**: Smooth transitions and loading states
- **Responsive**: Mobile-first design with breakpoint optimizations

### Customizing Colors

Modify the design system in `src/index.css`:

```css
:root {
  /* Primary medical blue */
  --primary: 214 84% 56%;
  
  /* Classification colors */
  --normal: 142 76% 36%;      /* Green for normal */
  --bacterial: 38 92% 50%;    /* Orange for bacterial */
  --viral: 0 84% 60%;         /* Red for viral */
}
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] File upload works with PNG, JPG, JPEG files
- [ ] File validation rejects invalid file types
- [ ] Model selection dropdown functions correctly
- [ ] Prediction button shows loading state
- [ ] Results display with proper confidence scores
- [ ] Navigation works between all pages
- [ ] Responsive design on mobile devices
- [ ] Error handling for failed predictions

### Adding Automated Tests

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test
```

## 🚀 Deployment

### Using Lovable (Recommended)
1. Open your Lovable project
2. Click "Share" → "Publish"
3. Your app will be deployed automatically

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy the dist/ folder to your hosting service
```

## 🔧 Configuration

### Environment Variables (if needed)
Create `.env.local` for local development:

```env
# Backend API URL (if different from default)
VITE_API_URL=http://localhost:5000

# Other configuration
VITE_MAX_FILE_SIZE=10485760  # 10MB in bytes
```

## 📝 Backend Implementation Example

Here's a complete Flask backend example:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# TODO: Load your trained models
models = {
    'cnn': tf.keras.models.load_model('/path/to/cnn_model.h5'),
    'vgg19': tf.keras.models.load_model('/path/to/vgg19_model.h5'),
    'resnet50': tf.keras.models.load_model('/path/to/resnet50_model.h5'),
    'densenet121': tf.keras.models.load_model('/path/to/densenet121_model.h5'),
    'federated': tf.keras.models.load_model('/path/to/federated_model.h5'),
}

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get uploaded file and model selection
        file = request.files['image']
        model_name = request.form['model']
        
        # Preprocess image
        image = Image.open(io.BytesIO(file.read()))
        image = image.resize((224, 224))  # Adjust size as needed
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        
        # Get model and make prediction
        model = models[model_name]
        prediction = model.predict(image_array)
        
        # Process results
        classes = ['Normal', 'Bacterial', 'Viral']
        predicted_class = classes[np.argmax(prediction[0])]
        confidence = {
            'Normal': float(prediction[0][0]) * 100,
            'Bacterial': float(prediction[0][1]) * 100,
            'Viral': float(prediction[0][2]) * 100,
        }
        
        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence,
            'processing_time': 2.3  # Replace with actual timing
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
```

## 🆘 Troubleshooting

### Common Issues

1. **File Upload Not Working**
   - Check file size limits (max 10MB)
   - Verify file types are PNG, JPG, JPEG, or DICOM
   - Ensure backend CORS is properly configured

2. **Predictions Not Loading**
   - Verify backend API is running
   - Check network requests in browser dev tools
   - Confirm model files are loaded correctly

3. **Styling Issues**
   - Clear browser cache
   - Check for CSS conflicts
   - Verify Tailwind CSS is properly installed

## 📄 License

This project is developed for educational and research purposes. Please ensure compliance with medical data regulations when deploying in production.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical issues or questions about integration:
- Check the troubleshooting section above
- Review the backend integration examples
- Ensure all TODO comments are addressed with your actual model paths and API endpoints

---

**Note**: This frontend is ready for production but requires backend integration with your trained models. All TODO comments in the code indicate where you need to replace mock data with actual model integration.