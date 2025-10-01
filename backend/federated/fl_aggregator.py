"""
Federated Aggregator
Implements FedAvg algorithm to combine client model updates
"""

import numpy as np
from typing import List, Dict
import os


class FederatedAggregator:
    """Aggregates model weights from multiple clients using Federated Averaging"""
    
    def __init__(self, config: Dict):
        self.config = config
        self.aggregation_strategy = 'weighted_average'  # or 'simple_average'
    
    def federated_averaging(self, client_weights: List[List[np.ndarray]], 
                          client_samples: List[int]) -> List[np.ndarray]:
        """
        Perform Federated Averaging (FedAvg)
        
        Args:
            client_weights: List of weight arrays from each client
            client_samples: Number of samples each client trained on
        
        Returns:
            Aggregated global weights
        """
        total_samples = sum(client_samples)
        
        # Initialize with zeros matching the shape of first client's weights
        num_layers = len(client_weights[0])
        global_weights = [np.zeros_like(w) for w in client_weights[0]]
        
        # Weighted average based on number of samples
        for client_idx, weights in enumerate(client_weights):
            weight_factor = client_samples[client_idx] / total_samples
            
            for layer_idx in range(num_layers):
                global_weights[layer_idx] += weights[layer_idx] * weight_factor
        
        return global_weights
    
    def simple_average(self, client_weights: List[List[np.ndarray]]) -> List[np.ndarray]:
        """
        Simple averaging without considering data distribution
        
        Args:
            client_weights: List of weight arrays from each client
        
        Returns:
            Aggregated global weights
        """
        num_clients = len(client_weights)
        num_layers = len(client_weights[0])
        
        global_weights = [np.zeros_like(w) for w in client_weights[0]]
        
        for weights in client_weights:
            for layer_idx in range(num_layers):
                global_weights[layer_idx] += weights[layer_idx] / num_clients
        
        return global_weights
    
    def aggregate(self, client_weights: List[List[np.ndarray]], 
                 client_samples: List[int] = None) -> List[np.ndarray]:
        """
        Main aggregation method
        
        Args:
            client_weights: Model weights from all clients
            client_samples: Optional sample counts for weighted averaging
        
        Returns:
            Aggregated global model weights
        """
        if self.aggregation_strategy == 'weighted_average' and client_samples:
            return self.federated_averaging(client_weights, client_samples)
        else:
            return self.simple_average(client_weights)
    
    def save_global_model(self, model, round_num: int):
        """Save global model checkpoint"""
        checkpoint_path = os.path.join(
            self.config['rounds_dir'], 
            f'global_model_round_{round_num}.h5'
        )
        model.save(checkpoint_path)
        print(f"💾 Saved global model checkpoint: {checkpoint_path}")
    
    def compute_accuracy_improvement(self, current_acc: float, 
                                    previous_acc: float) -> float:
        """Calculate accuracy improvement between rounds"""
        if previous_acc == 0:
            return 0.0
        return ((current_acc - previous_acc) / previous_acc) * 100
