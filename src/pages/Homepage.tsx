import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Stethoscope, 
  Brain, 
  Users, 
  Shield, 
  Zap, 
  Activity,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Homepage = () => {
  const { user } = useAuth();
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Models",
      description: "CNN, VGG19, ResNet50, DenseNet121, and Federated Global Model for accurate pneumonia detection."
    },
    {
      icon: Shield,
      title: "Privacy-Preserving",
      description: "Federated learning ensures patient data privacy while improving model performance."
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Get instant predictions with confidence scores and visual explanations."
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Multiple hospitals contribute to model training without sharing sensitive data."
    }
  ];

  const models = [
    { name: "CNN", accuracy: "92.5%" },
    { name: "VGG19", accuracy: "94.2%" },
    { name: "ResNet50", accuracy: "93.8%" },
    { name: "DenseNet121", accuracy: "95.1%" },
    { name: "Federated Global", accuracy: "96.3%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <Badge className="mb-4 bg-white/20 text-white border-white/20 hover:bg-white/30">
              <Activity className="h-4 w-4 mr-2" />
              AI-Powered Medical Diagnosis
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              MedVision AI
              <br />
              <span className="text-accent">Professional Pneumonia Detection</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Advanced deep learning platform for medical professionals to accurately detect 
              and classify pneumonia from chest X-rays.
            </p>
            
            {user && (
              <p className="text-sm text-white/80 mb-6">
                Welcome back, {user.email}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg">
                <Link to="/prediction" className="flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2" />
                  Start Diagnosis
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link to="/comparison">
                  View Model Performance
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Final Year Project Overview
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This project implements state-of-the-art deep learning techniques for automated 
              pneumonia detection, focusing on privacy-preserving federated learning approaches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-medical transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-primary rounded-lg w-fit">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Model Performance */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Model Performance
            </h2>
            <p className="text-lg text-muted-foreground">
              Comparison of different deep learning architectures for pneumonia detection
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {models.map((model, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {model.accuracy}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Validated
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/comparison">
                View Detailed Comparison
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Test the AI Models?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Upload a chest X-ray image and get instant predictions with confidence scores 
            and visual explanations using our trained models.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-accent hover:bg-white/90">
              <Link to="/prediction">
                <Stethoscope className="h-5 w-5 mr-2" />
                Upload X-Ray Image
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link to="/federated">
                Learn About Federated Learning
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;