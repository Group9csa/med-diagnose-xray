import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Activity, Brain, Shield, Stethoscope } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="h-16 w-16 text-primary" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                MedVision AI
              </h1>
            </div>
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI-Powered Pneumonia Detection Platform for Medical Professionals
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="p-6 rounded-lg bg-card border border-border space-y-2">
              <Activity className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Real-time Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Instant chest X-ray analysis with confidence scores
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border space-y-2">
              <Shield className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Federated Learning</h3>
              <p className="text-sm text-muted-foreground">
                Privacy-preserving collaborative model training
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border space-y-2">
              <Stethoscope className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Professional Tools</h3>
              <p className="text-sm text-muted-foreground">
                Grad-CAM visualizations and model comparisons
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="mt-8 text-lg px-8 py-6"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>

          {/* Info Text */}
          <p className="text-sm text-muted-foreground mt-4">
            For healthcare professionals only • Secure authentication required
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <p className="text-xs text-muted-foreground">
            © 2025 MedVision AI. Advanced pneumonia detection using transfer learning and federated AI.
          </p>
        </div>
      </div>
    </div>
  );
}