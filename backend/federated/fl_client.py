"""
Federated Learning Client
Simulates a hospital client performing local training
"""

import numpy as np
from typing import Tuple, List
import tensorflow as tf
from tensorflow import keras


class FederatedClient:
    """Represents a hospital participating in federated learning"""
    
    def __init__(self, client_id: str, hospital_info: dict, config: dict):
        self.client_id = client_id
        self.hospital_info = hospital_info
        self.config = config
        self.local_model = None
        self.local_data = None
        self.local_labels = None
    
    def load_local_data(self, X_data: np.ndarray, y_data: np.ndarray):
        """Load local training data (simulated hospital data)"""
        self.local_data = X_data
        self.local_labels = y_data
        print(f"🏥 {self.hospital_info['name']}: Loaded {len(X_data)} samples")
    
    def update_model(self, global_weights: List[np.ndarray]):
        """Update local model with global weights"""
        if self.local_model is None:
            raise ValueError("Local model not initialized")
        self.local_model.set_weights(global_weights)
    
    def train_local_model(self, epochs: int = 5) -> Tuple[List[np.ndarray], dict]:
        """
        Train local model on hospital data
        
        Returns:
            Updated weights and training metrics
        """
        if self.local_data is None or self.local_labels is None:
            raise ValueError("No local data loaded")
        
        # Train model
        history = self.local_model.fit(
            self.local_data,
            self.local_labels,
            epochs=epochs,
            batch_size=self.config['batch_size'],
            validation_split=0.2,
            verbose=0
        )
        
        # Get updated weights
        updated_weights = self.local_model.get_weights()
        
        # Extract metrics
        metrics = {
            'accuracy': float(history.history['accuracy'][-1]),
            'loss': float(history.history['loss'][-1]),
            'val_accuracy': float(history.history['val_accuracy'][-1]),
            'samples': len(self.local_data)
        }
        
        print(f"   ├─ Accuracy: {metrics['accuracy']:.4f}")
        print(f"   ├─ Loss: {metrics['loss']:.4f}")
        print(f"   └─ Val Accuracy: {metrics['val_accuracy']:.4f}")
        
        return updated_weights, metrics
    
    def evaluate_model(self, test_data: np.ndarray, 
                      test_labels: np.ndarray) -> dict:
        """Evaluate local model on test data"""
        loss, accuracy = self.local_model.evaluate(
            test_data, 
            test_labels, 
            verbose=0
        )
        
        return {
            'loss': float(loss),
            'accuracy': float(accuracy)
        }
    
    def get_sample_count(self) -> int:
        """Return number of training samples"""
        return len(self.local_data) if self.local_data is not None else 0
    
    def initialize_model(self, model_architecture):
        """Initialize local model with given architecture"""
        self.local_model = keras.models.clone_model(model_architecture)
        self.local_model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=self.config['learning_rate']),
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
