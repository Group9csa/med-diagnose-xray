"""
Federated Learning Configuration
Define hyperparameters, hospital distributions, and training settings
"""

import os

# Training Configuration
FL_CONFIG = {
    'num_clients': 8,
    'rounds': 6,
    'epochs_per_round': 5,
    'batch_size': 32,
    'learning_rate': 0.001,
    'base_model': '../models/cnn_model.h5',
    'global_model_path': '../models/federated/global_model.h5',
    'rounds_dir': '../models/federated/rounds',
    'history_file': '../models/federated/training_history.json'
}

# Hospital Data Distribution (simulated)
HOSPITALS = [
    {'id': 'H001', 'name': 'Metro General Hospital', 'size': 'Large', 'samples': 2000},
    {'id': 'H002', 'name': 'City Medical Center', 'size': 'Large', 'samples': 1800},
    {'id': 'H003', 'name': 'Regional Health Institute', 'size': 'Medium', 'samples': 1500},
    {'id': 'H004', 'name': 'Community Hospital', 'size': 'Medium', 'samples': 1200},
    {'id': 'H005', 'name': 'District Clinic', 'size': 'Small', 'samples': 800},
    {'id': 'H006', 'name': 'Valley Medical', 'size': 'Small', 'samples': 700},
    {'id': 'H007', 'name': 'Riverside Healthcare', 'size': 'Medium', 'samples': 1000},
    {'id': 'H008', 'name': 'Suburban Hospital', 'size': 'Large', 'samples': 2000},
]

# Model Architecture (same as base CNN)
MODEL_ARCHITECTURE = {
    'input_shape': (224, 224, 3),
    'num_classes': 3,
    'conv_layers': [
        {'filters': 32, 'kernel_size': (3, 3), 'activation': 'relu'},
        {'filters': 64, 'kernel_size': (3, 3), 'activation': 'relu'},
        {'filters': 128, 'kernel_size': (3, 3), 'activation': 'relu'},
    ],
    'dense_layers': [256, 128],
    'dropout': 0.5
}

# Privacy Settings
PRIVACY_CONFIG = {
    'differential_privacy': False,  # Can be enabled for additional privacy
    'noise_multiplier': 0.1,
    'max_grad_norm': 1.0,
    'secure_aggregation': True
}

# Create necessary directories
os.makedirs(os.path.dirname(FL_CONFIG['global_model_path']), exist_ok=True)
os.makedirs(FL_CONFIG['rounds_dir'], exist_ok=True)
