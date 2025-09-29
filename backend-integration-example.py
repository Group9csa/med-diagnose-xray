"""
Backend Integration Example for MedAI Pneumonia Detection
========================================================

This file provides a complete Flask backend example that integrates with the MedAI frontend.
Replace the TODO sections with your actual trained model paths and implement the logic
according to your specific model architecture and requirements.

Requirements:
- Flask
- Flask-CORS  
- TensorFlow
- Pillow
- NumPy
- OpenCV (for Grad-CAM)

Install with: pip install flask flask-cors tensorflow pillow numpy opencv-python
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os
import cv2
import time
import base64
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Configuration
UPLOAD_FOLDER = 'uploads'
GRADCAM_FOLDER = 'gradcam_outputs'
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

# Create necessary directories
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(GRADCAM_FOLDER, exist_ok=True)

# TODO: Replace these paths with your actual trained model files
MODEL_PATHS = {
    'cnn': '/path/to/your/models/cnn_pneumonia_model.h5',
    'vgg19': '/path/to/your/models/vgg19_pneumonia_model.h5', 
    'resnet50': '/path/to/your/models/resnet50_pneumonia_model.h5',
    'densenet121': '/path/to/your/models/densenet121_pneumonia_model.h5',
    'federated': '/path/to/your/models/federated_global_model.h5'
}

# Load models (uncomment when you have actual model files)
models = {}
# for model_name, model_path in MODEL_PATHS.items():
#     try:
#         models[model_name] = tf.keras.models.load_model(model_path)
#         print(f"✓ Loaded {model_name} model successfully")
#     except Exception as e:
#         print(f"✗ Failed to load {model_name} model: {e}")

# Mock model performance data (replace with actual metrics)
MODEL_PERFORMANCE = {
    'cnn': {
        'accuracy': 92.5,
        'precision': 91.2,
        'recall': 90.8,
        'f1_score': 91.0,
        'training_time': '45 min',
        'parameters': '2.3M'
    },
    'vgg19': {
        'accuracy': 94.2,
        'precision': 93.8,
        'recall': 93.5,
        'f1_score': 93.6,
        'training_time': '2.1 hrs',
        'parameters': '143.7M'
    },
    'resnet50': {
        'accuracy': 93.8,
        'precision': 93.1,
        'recall': 92.9,
        'f1_score': 93.0,
        'training_time': '1.8 hrs',
        'parameters': '25.6M'
    },
    'densenet121': {
        'accuracy': 95.1,
        'precision': 94.8,
        'recall': 94.6,
        'f1_score': 94.7,
        'training_time': '2.3 hrs',
        'parameters': '8.0M'
    },
    'federated': {
        'accuracy': 96.3,
        'precision': 95.9,
        'recall': 95.7,
        'f1_score': 95.8,
        'training_time': '4.2 hrs',
        'parameters': '8.0M'
    }
}

def preprocess_image(image_file, target_size=(224, 224)):
    """
    Preprocess uploaded image for model inference
    
    Args:
        image_file: Uploaded file object
        target_size: Target image size tuple (height, width)
        
    Returns:
        Preprocessed image array ready for model input
    """
    try:
        # Open and convert image
        image = Image.open(io.BytesIO(image_file.read()))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
            
        # Resize image
        image = image.resize(target_size)
        
        # Convert to numpy array and normalize
        image_array = np.array(image, dtype=np.float32)
        image_array = image_array / 255.0  # Normalize to [0,1]
        
        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)
        
        return image_array, image
        
    except Exception as e:
        raise ValueError(f"Error preprocessing image: {str(e)}")

def generate_gradcam(model, image_array, class_idx, layer_name=None):
    """
    Generate Grad-CAM heatmap for model predictions
    
    Args:
        model: Trained TensorFlow model
        image_array: Preprocessed image array
        class_idx: Index of predicted class
        layer_name: Name of convolutional layer for Grad-CAM
        
    Returns:
        Grad-CAM heatmap as base64 encoded image
    """
    try:
        # TODO: Implement Grad-CAM generation specific to your model architecture
        # This is a template - adjust layer names and logic for your models
        
        if layer_name is None:
            # Try to find the last convolutional layer automatically
            for layer in reversed(model.layers):
                if 'conv' in layer.name.lower():
                    layer_name = layer.name
                    break
        
        if layer_name is None:
            raise ValueError("Could not find convolutional layer for Grad-CAM")
            
        # Create gradient model
        grad_model = tf.keras.models.Model(
            [model.inputs], 
            [model.get_layer(layer_name).output, model.output]
        )
        
        # Compute gradients
        with tf.GradientTape() as tape:
            conv_outputs, predictions = grad_model(image_array)
            loss = predictions[:, class_idx]
            
        grads = tape.gradient(loss, conv_outputs)
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
        
        # Generate heatmap
        conv_outputs = conv_outputs[0]
        heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)
        heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
        heatmap = heatmap.numpy()
        
        # Resize heatmap to original image size
        heatmap = cv2.resize(heatmap, (224, 224))
        heatmap = np.uint8(255 * heatmap)
        
        # Apply colormap
        heatmap_colored = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
        
        # Convert to base64 for frontend display
        _, buffer = cv2.imencode('.png', heatmap_colored)
        heatmap_b64 = base64.b64encode(buffer).decode('utf-8')
        
        return f"data:image/png;base64,{heatmap_b64}"
        
    except Exception as e:
        print(f"Grad-CAM generation error: {e}")
        return None

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Main prediction endpoint for pneumonia detection
    
    Expected input:
    - image: File (PNG, JPG, JPEG, DICOM)
    - model: String (cnn, vgg19, resnet50, densenet121, federated)
    
    Returns JSON with prediction results
    """
    try:
        start_time = time.time()
        
        # Validate request
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
            
        if 'model' not in request.form:
            return jsonify({'error': 'No model specified'}), 400
            
        image_file = request.files['image']
        model_name = request.form['model']
        
        # Validate model name
        if model_name not in MODEL_PATHS:
            return jsonify({'error': f'Invalid model: {model_name}'}), 400
            
        # Check file size
        image_file.seek(0, os.SEEK_END)
        file_size = image_file.tell()
        image_file.seek(0)
        
        if file_size > MAX_FILE_SIZE:
            return jsonify({'error': 'File size exceeds 10MB limit'}), 400
            
        # Preprocess image
        image_array, original_image = preprocess_image(image_file)
        
        # TODO: Replace this mock prediction with actual model inference
        if model_name in models:
            # Use actual model
            model = models[model_name]
            prediction = model.predict(image_array)
            
            # Get predicted class and confidence scores
            classes = ['Normal', 'Bacterial', 'Viral']
            predicted_class_idx = np.argmax(prediction[0])
            predicted_class = classes[predicted_class_idx]
            
            # Confidence scores (convert to percentages)
            confidence = {
                'Normal': float(prediction[0][0]) * 100,
                'Bacterial': float(prediction[0][1]) * 100,
                'Viral': float(prediction[0][2]) * 100
            }
            
            # Generate Grad-CAM
            gradcam_url = generate_gradcam(model, image_array, predicted_class_idx)
            
        else:
            # Mock prediction for demonstration (remove when models are loaded)
            print(f"⚠️  Using mock prediction for {model_name} - replace with actual model")
            
            # Simulate prediction based on model performance
            base_accuracy = MODEL_PERFORMANCE[model_name]['accuracy']
            
            # Generate mock confidence scores
            if np.random.random() < (base_accuracy / 100):
                # Correct prediction
                predicted_class = np.random.choice(['Normal', 'Bacterial', 'Viral'])
                high_conf = 60 + np.random.random() * 35  # 60-95%
                low_conf1 = np.random.random() * (100 - high_conf) * 0.7
                low_conf2 = 100 - high_conf - low_conf1
                
                confidence = {predicted_class: high_conf}
                remaining_classes = [c for c in ['Normal', 'Bacterial', 'Viral'] if c != predicted_class]
                confidence[remaining_classes[0]] = low_conf1
                confidence[remaining_classes[1]] = low_conf2
            else:
                # Simulate incorrect prediction
                predicted_class = np.random.choice(['Normal', 'Bacterial', 'Viral'])
                confidence = {
                    'Normal': 20 + np.random.random() * 40,
                    'Bacterial': 20 + np.random.random() * 40,
                    'Viral': 20 + np.random.random() * 40
                }
                # Normalize to 100%
                total = sum(confidence.values())
                confidence = {k: (v/total)*100 for k, v in confidence.items()}
            
            gradcam_url = None  # No Grad-CAM for mock predictions
        
        processing_time = time.time() - start_time
        
        result = {
            'prediction': predicted_class,
            'confidence': confidence,
            'gradcam_url': gradcam_url,
            'processing_time': round(processing_time, 2)
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/api/models/metrics', methods=['GET'])
def get_model_metrics():
    """
    Return performance metrics for all models
    """
    try:
        # TODO: Replace with actual metrics from your model evaluation
        return jsonify({
            'models': [
                {
                    'name': model_name,
                    **metrics
                }
                for model_name, metrics in MODEL_PERFORMANCE.items()
            ]
        })
    except Exception as e:
        return jsonify({'error': f'Failed to get metrics: {str(e)}'}), 500

@app.route('/api/federated/rounds', methods=['GET'])
def get_federated_rounds():
    """
    Return federated learning training round data
    """
    try:
        # TODO: Replace with actual federated learning training logs
        rounds_data = [
            {'round': i, 'accuracy': 78.5 + i * 2.1, 'participants': min(3 + i//2, 8), 'dataPoints': 1500 + i * 250}
            for i in range(1, 11)
        ]
        return jsonify({'rounds': rounds_data})
    except Exception as e:
        return jsonify({'error': f'Failed to get federated data: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'models_loaded': list(models.keys()),
        'total_models': len(MODEL_PATHS)
    })

@app.route('/', methods=['GET'])
def index():
    """
    API information endpoint
    """
    return jsonify({
        'name': 'MedAI Pneumonia Detection API',
        'version': '1.0.0',
        'description': 'Backend API for pneumonia detection using transfer learning',
        'endpoints': {
            '/api/predict': 'POST - Submit X-ray image for prediction',
            '/api/models/metrics': 'GET - Get model performance metrics',
            '/api/federated/rounds': 'GET - Get federated learning data',
            '/api/health': 'GET - Health check'
        },
        'models_available': list(MODEL_PATHS.keys()),
        'models_loaded': len(models) > 0
    })

if __name__ == '__main__':
    print("🏥 MedAI Pneumonia Detection API")
    print("=" * 40)
    print(f"📁 Upload folder: {UPLOAD_FOLDER}")
    print(f"🎯 Models configured: {len(MODEL_PATHS)}")
    print(f"✅ Models loaded: {len(models)}")
    print("\n📋 TODO: Replace the following with your actual model paths:")
    for model_name, path in MODEL_PATHS.items():
        status = "✅" if model_name in models else "⚠️"
        print(f"   {status} {model_name}: {path}")
    
    print(f"\n🚀 Starting server on http://localhost:5000")
    print("📚 API documentation available at http://localhost:5000")
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True  # Set to False in production
    )