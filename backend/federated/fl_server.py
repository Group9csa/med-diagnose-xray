"""
Federated Learning Server
Orchestrates the federated training process across multiple hospital clients
"""

import numpy as np
import json
import os
from typing import List, Dict
from datetime import datetime
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split

from fl_config import FL_CONFIG, HOSPITALS, MODEL_ARCHITECTURE
from fl_client import FederatedClient
from fl_aggregator import FederatedAggregator


class FederatedLearningServer:
    """Central server coordinating federated learning"""
    
    def __init__(self, config: Dict):
        self.config = config
        self.global_model = None
        self.clients: List[FederatedClient] = []
        self.aggregator = FederatedAggregator(config)
        self.training_history = {
            'rounds': [],
            'global_accuracy': [],
            'client_metrics': [],
            'timestamp': datetime.now().isoformat()
        }
    
    def load_base_model(self):
        """Load or create base model architecture"""
        try:
            if os.path.exists(self.config['base_model']):
                print(f"📦 Loading base model from {self.config['base_model']}")
                self.global_model = keras.models.load_model(self.config['base_model'])
            else:
                print("🏗️  Creating new base model architecture")
                self.global_model = self._create_base_model()
            
            print(f"✓ Model loaded: {self.global_model.count_params()} parameters")
        except Exception as e:
            print(f"⚠️  Error loading base model: {e}")
            print("🏗️  Creating new model from scratch")
            self.global_model = self._create_base_model()
    
    def _create_base_model(self):
        """Create CNN model architecture"""
        model = keras.Sequential([
            keras.layers.Conv2D(32, (3, 3), activation='relu', 
                              input_shape=MODEL_ARCHITECTURE['input_shape']),
            keras.layers.MaxPooling2D((2, 2)),
            keras.layers.Conv2D(64, (3, 3), activation='relu'),
            keras.layers.MaxPooling2D((2, 2)),
            keras.layers.Conv2D(128, (3, 3), activation='relu'),
            keras.layers.MaxPooling2D((2, 2)),
            keras.layers.Flatten(),
            keras.layers.Dense(256, activation='relu'),
            keras.layers.Dropout(0.5),
            keras.layers.Dense(128, activation='relu'),
            keras.layers.Dropout(0.5),
            keras.layers.Dense(MODEL_ARCHITECTURE['num_classes'], activation='softmax')
        ])
        
        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=self.config['learning_rate']),
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def initialize_clients(self):
        """Initialize hospital clients"""
        print(f"\n🏥 Initializing {self.config['num_clients']} hospital clients...")
        
        for hospital in HOSPITALS[:self.config['num_clients']]:
            client = FederatedClient(
                client_id=hospital['id'],
                hospital_info=hospital,
                config=self.config
            )
            client.initialize_model(self.global_model)
            self.clients.append(client)
            print(f"   ✓ {hospital['name']} ({hospital['size']}) - {hospital['samples']} samples")
    
    def simulate_data_distribution(self):
        """
        Simulate distributed data across hospitals
        NOTE: Replace with actual data loading in production
        """
        print("\n📊 Simulating data distribution across hospitals...")
        
        # Generate synthetic data (replace with real chest X-ray data)
        X_all = np.random.rand(12000, 224, 224, 3).astype(np.float32)
        y_all = keras.utils.to_categorical(
            np.random.randint(0, 3, 12000), 
            num_classes=3
        )
        
        # Distribute data to clients based on hospital size
        start_idx = 0
        for client in self.clients:
            num_samples = client.hospital_info['samples']
            end_idx = start_idx + num_samples
            
            X_client = X_all[start_idx:end_idx]
            y_client = y_all[start_idx:end_idx]
            
            client.load_local_data(X_client, y_client)
            start_idx = end_idx
        
        print("✓ Data distribution complete")
    
    def train_federated(self):
        """Main federated training loop"""
        print("\n" + "="*60)
        print("🚀 Starting Federated Learning Training")
        print("="*60)
        print(f"Configuration:")
        print(f"  • Rounds: {self.config['rounds']}")
        print(f"  • Clients: {self.config['num_clients']}")
        print(f"  • Epochs per round: {self.config['epochs_per_round']}")
        print("="*60 + "\n")
        
        for round_num in range(1, self.config['rounds'] + 1):
            print(f"\n{'='*60}")
            print(f"📍 Round {round_num}/{self.config['rounds']}")
            print('='*60)
            
            # Get current global weights
            global_weights = self.global_model.get_weights()
            
            # Client training
            client_weights = []
            client_samples = []
            round_metrics = []
            
            print("\n🏥 Training at local hospitals:")
            for client in self.clients:
                print(f"\n{client.hospital_info['name']}:")
                
                # Update client model with global weights
                client.update_model(global_weights)
                
                # Local training
                updated_weights, metrics = client.train_local_model(
                    epochs=self.config['epochs_per_round']
                )
                
                client_weights.append(updated_weights)
                client_samples.append(client.get_sample_count())
                round_metrics.append({
                    'hospital': client.hospital_info['name'],
                    'accuracy': metrics['accuracy'],
                    'samples': metrics['samples']
                })
            
            # Aggregate weights
            print(f"\n🔄 Aggregating updates from {len(client_weights)} clients...")
            aggregated_weights = self.aggregator.aggregate(
                client_weights, 
                client_samples
            )
            
            # Update global model
            self.global_model.set_weights(aggregated_weights)
            
            # Evaluate global model (on a test set in production)
            global_accuracy = np.mean([m['accuracy'] for m in round_metrics])
            
            # Save checkpoint
            self.aggregator.save_global_model(self.global_model, round_num)
            
            # Record history
            self.training_history['rounds'].append(round_num)
            self.training_history['global_accuracy'].append(float(global_accuracy))
            self.training_history['client_metrics'].append(round_metrics)
            
            print(f"\n📊 Round {round_num} Results:")
            print(f"   • Global Accuracy: {global_accuracy:.4f}")
            print(f"   • Participating Hospitals: {len(self.clients)}")
            print(f"   • Total Samples: {sum(client_samples)}")
            
            if round_num > 1:
                improvement = self.aggregator.compute_accuracy_improvement(
                    global_accuracy,
                    self.training_history['global_accuracy'][-2]
                )
                print(f"   • Improvement: {improvement:+.2f}%")
        
        # Save final model
        print(f"\n{'='*60}")
        print("💾 Saving final global model...")
        self.global_model.save(self.config['global_model_path'])
        print(f"✓ Saved to: {self.config['global_model_path']}")
        
        # Save training history
        history_path = self.config['history_file']
        with open(history_path, 'w') as f:
            json.dump(self.training_history, f, indent=2)
        print(f"✓ Training history saved to: {history_path}")
        
        print(f"\n{'='*60}")
        print("🎉 Federated Learning Training Complete!")
        print(f"{'='*60}\n")
    
    def get_training_summary(self) -> Dict:
        """Get summary of training results"""
        return {
            'total_rounds': len(self.training_history['rounds']),
            'final_accuracy': self.training_history['global_accuracy'][-1],
            'participating_hospitals': len(self.clients),
            'total_parameters': self.global_model.count_params(),
            'timestamp': self.training_history['timestamp']
        }


def main():
    """Main execution function"""
    print("\n" + "🔒"*30)
    print("  MedAI Federated Learning System")
    print("  Privacy-Preserving Pneumonia Detection")
    print("🔒"*30 + "\n")
    
    # Initialize server
    server = FederatedLearningServer(FL_CONFIG)
    
    # Load base model
    server.load_base_model()
    
    # Initialize clients
    server.initialize_clients()
    
    # Simulate data distribution
    server.simulate_data_distribution()
    
    # Train federated model
    server.train_federated()
    
    # Print summary
    summary = server.get_training_summary()
    print("\n📋 Training Summary:")
    print(f"   • Total Rounds: {summary['total_rounds']}")
    print(f"   • Final Accuracy: {summary['final_accuracy']:.4f}")
    print(f"   • Hospitals: {summary['participating_hospitals']}")
    print(f"   • Parameters: {summary['total_parameters']:,}")
    print(f"   • Completed: {summary['timestamp']}\n")


if __name__ == '__main__':
    main()
