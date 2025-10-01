"""
Federated Learning API Endpoints
Provides REST API for federated model predictions and status
"""

from flask import Blueprint, request, jsonify
import os
import json
import numpy as np
from PIL import Image
import io
import time

federated_bp = Blueprint('federated', __name__)

# Configuration
FEDERATED_MODEL_PATH = '../models/federated/global_model.h5'
HISTORY_FILE = '../models/federated/training_history.json'

# Load federated model
FEDERATED_MODEL = None
try:
    from tensorflow import keras
    if os.path.exists(FEDERATED_MODEL_PATH):
        FEDERATED_MODEL = keras.models.load_model(FEDERATED_MODEL_PATH)
        print(f"✓ Loaded federated global model from {FEDERATED_MODEL_PATH}")
    else:
        print(f"⚠️  Federated model not found at {FEDERATED_MODEL_PATH}")
        print("   Run: cd federated && python fl_server.py")
except Exception as e:
    print(f"Error loading federated model: {e}")


@federated_bp.route('/api/federated/predict', methods=['POST'])
def federated_predict():
    """Make prediction using federated global model"""
    try:
        if FEDERATED_MODEL is None:
            return jsonify({
                'error': 'Federated model not trained yet',
                'message': 'Please run federated training first: cd federated && python fl_server.py'
            }), 503
        
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        image_file = request.files['image']
        start_time = time.time()
        
        # Preprocess image
        image_bytes = image_file.read()
        image = Image.open(io.BytesIO(image_bytes))
        
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        image = image.resize((224, 224))
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        
        # Make prediction
        predictions = FEDERATED_MODEL.predict(image_array)
        prediction_class = np.argmax(predictions[0])
        confidence = float(predictions[0][prediction_class])
        
        # Class mapping
        class_names = ['NORMAL', 'BACTERIAL PNEUMONIA', 'VIRAL PNEUMONIA']
        predicted_class = class_names[prediction_class]
        
        processing_time = time.time() - start_time
        
        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence,
            'all_probabilities': {
                'normal': float(predictions[0][0]),
                'bacterial': float(predictions[0][1]),
                'viral': float(predictions[0][2])
            },
            'processing_time': f"{processing_time:.2f}s",
            'model_used': 'federated',
            'privacy_preserved': True
        })
    
    except Exception as e:
        print(f"Federated prediction error: {e}")
        return jsonify({'error': str(e)}), 500


@federated_bp.route('/api/federated/status', methods=['GET'])
def federated_status():
    """Get federated learning training status"""
    try:
        model_exists = os.path.exists(FEDERATED_MODEL_PATH)
        model_trained = FEDERATED_MODEL is not None
        
        status = {
            'model_exists': model_exists,
            'model_trained': model_trained,
            'model_path': FEDERATED_MODEL_PATH,
            'ready_for_prediction': model_trained
        }
        
        # Add model info if available
        if model_trained:
            status['model_parameters'] = FEDERATED_MODEL.count_params()
            status['input_shape'] = str(FEDERATED_MODEL.input_shape)
        
        return jsonify(status)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@federated_bp.route('/api/federated/history', methods=['GET'])
def federated_history():
    """Get federated training history"""
    try:
        if not os.path.exists(HISTORY_FILE):
            return jsonify({
                'error': 'No training history found',
                'message': 'Train the federated model first'
            }), 404
        
        with open(HISTORY_FILE, 'r') as f:
            history = json.load(f)
        
        # Format response
        rounds_data = []
        for i, round_num in enumerate(history['rounds']):
            rounds_data.append({
                'round': round_num,
                'accuracy': history['global_accuracy'][i],
                'participants': len(history['client_metrics'][i]),
                'data_points': sum(m['samples'] for m in history['client_metrics'][i])
            })
        
        return jsonify({
            'rounds': rounds_data,
            'total_rounds': len(history['rounds']),
            'final_accuracy': history['global_accuracy'][-1] if history['global_accuracy'] else 0,
            'timestamp': history.get('timestamp', 'Unknown')
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@federated_bp.route('/api/federated/hospitals', methods=['GET'])
def federated_hospitals():
    """Get participating hospitals information"""
    from fl_config import HOSPITALS
    
    return jsonify({
        'hospitals': HOSPITALS,
        'total_hospitals': len(HOSPITALS),
        'total_samples': sum(h['samples'] for h in HOSPITALS)
    })
