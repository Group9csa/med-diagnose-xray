import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "@/components/FileUpload";
import { 
  Brain, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Stethoscope,
  TrendingUp,
  Eye,
  Loader2
} from "lucide-react";

interface PredictionResult {
  prediction: 'Normal' | 'Bacterial' | 'Viral';
  confidence: {
    Normal: number;
    Bacterial: number;
    Viral: number;
  };
  gradcam_url?: string;
  processing_time?: number;
}

const PredictionPage = () => {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const { toast } = useToast();

  const models = [
    { 
      id: "cnn", 
      name: "CNN", 
      description: "Basic Convolutional Neural Network",
      accuracy: "92.5%"
    },
    { 
      id: "vgg19", 
      name: "VGG19", 
      description: "Visual Geometry Group 19-layer network",
      accuracy: "94.2%"
    },
    { 
      id: "resnet50", 
      name: "ResNet50", 
      description: "50-layer Residual Network",
      accuracy: "93.8%"
    },
    { 
      id: "densenet121", 
      name: "DenseNet121", 
      description: "121-layer Densely Connected Network",
      accuracy: "95.1%"
    },
    { 
      id: "federated", 
      name: "Federated Global Model", 
      description: "Privacy-preserving federated learning model",
      accuracy: "96.3%"
    },
  ];

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setPredictionResult(null); // Clear previous results
  };

  const handlePredict = async () => {
    if (!uploadedFile || !selectedModel) {
      toast({
        title: "Missing Requirements",
        description: "Please upload an image and select a model",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call to Flask/Django backend
      /*
      const formData = new FormData();
      formData.append('image', uploadedFile);
      formData.append('model', selectedModel);
      
      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Prediction failed');
      }
      
      const result = await response.json();
      setPredictionResult(result);
      */

      // Simulate API call with mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResult: PredictionResult = {
        prediction: Math.random() > 0.5 ? 'Normal' : Math.random() > 0.5 ? 'Bacterial' : 'Viral',
        confidence: {
          Normal: Math.random() * 100,
          Bacterial: Math.random() * 100,
          Viral: Math.random() * 100,
        },
        gradcam_url: '/api/gradcam/latest', // TODO: Replace with actual Grad-CAM URL
        processing_time: 2.3
      };
      
      // Normalize confidence scores to sum to 100%
      const total = mockResult.confidence.Normal + mockResult.confidence.Bacterial + mockResult.confidence.Viral;
      mockResult.confidence.Normal = (mockResult.confidence.Normal / total) * 100;
      mockResult.confidence.Bacterial = (mockResult.confidence.Bacterial / total) * 100;
      mockResult.confidence.Viral = (mockResult.confidence.Viral / total) * 100;
      
      setPredictionResult(mockResult);
      
      toast({
        title: "Prediction Complete",
        description: `Classified as ${mockResult.prediction} with ${mockResult.confidence[mockResult.prediction].toFixed(1)}% confidence`,
      });
      
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Prediction Failed",
        description: "An error occurred during prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getResultColor = (prediction: string) => {
    switch (prediction) {
      case 'Normal': return 'normal';
      case 'Bacterial': return 'bacterial';
      case 'Viral': return 'viral';
      default: return 'muted';
    }
  };

  const getResultIcon = (prediction: string) => {
    switch (prediction) {
      case 'Normal': return CheckCircle2;
      case 'Bacterial': return AlertCircle;
      case 'Viral': return AlertCircle;
      default: return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-lg">
              <Stethoscope className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            AI-Powered Pneumonia Detection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a chest X-ray image and select a model to get instant predictions 
            with confidence scores and visual explanations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload and Model Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary" />
                  Upload X-Ray Image
                </CardTitle>
                <CardDescription>
                  Upload a chest X-ray image for pneumonia detection analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload 
                  onFileUpload={handleFileUpload} 
                  isLoading={isLoading}
                  disabled={isLoading}
                />
              </CardContent>
            </Card>

            {/* Model Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Select AI Model
                </CardTitle>
                <CardDescription>
                  Choose from our trained deep learning models
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model for prediction" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="font-medium">{model.name}</div>
                            <div className="text-sm text-muted-foreground">{model.description}</div>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {model.accuracy}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedModel && (
                  <div className="p-4 bg-primary-light rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary">
                          {models.find(m => m.id === selectedModel)?.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {models.find(m => m.id === selectedModel)?.description}
                        </p>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">
                        {models.find(m => m.id === selectedModel)?.accuracy}
                      </Badge>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handlePredict}
                  disabled={!uploadedFile || !selectedModel || isLoading}
                  size="lg"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Predict Pneumonia
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Prediction Results */}
            {predictionResult && (
              <Card className="animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-primary" />
                    Prediction Results
                  </CardTitle>
                  <CardDescription>
                    AI analysis completed in {predictionResult.processing_time}s
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Prediction */}
                  <div className="text-center p-6 bg-gradient-card rounded-lg border">
                    {(() => {
                      const ResultIcon = getResultIcon(predictionResult.prediction);
                      const colorClass = getResultColor(predictionResult.prediction);
                      
                      return (
                        <div>
                          <div className={`mx-auto mb-4 p-4 rounded-full w-fit bg-${colorClass} text-${colorClass}-foreground`}>
                            <ResultIcon className="h-8 w-8" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">
                            {predictionResult.prediction}
                          </h3>
                          <p className="text-muted-foreground">
                            {predictionResult.confidence[predictionResult.prediction].toFixed(1)}% Confidence
                          </p>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Confidence Scores */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Confidence Breakdown</h4>
                    
                    {Object.entries(predictionResult.confidence).map(([type, score]) => (
                      <div key={type} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{type}</span>
                          <span className="text-muted-foreground">{score.toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={score} 
                          className={`h-2 bg-${getResultColor(type)}`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Grad-CAM Visualization */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Visual Explanation</h4>
                    <div className="bg-secondary rounded-lg p-6 text-center">
                      <div className="text-muted-foreground mb-2">
                        <Eye className="h-8 w-8 mx-auto mb-2" />
                        Grad-CAM Heatmap
                      </div>
                      <p className="text-sm text-muted-foreground">
                        TODO: Display Grad-CAM overlay
                      </p>
                      {/* TODO: Replace with actual Grad-CAM image */}
                      {/* <img src={predictionResult.gradcam_url} alt="Grad-CAM visualization" className="w-full rounded-lg" /> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instructions */}
            <Card className="bg-primary-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">How it Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <p>Upload a clear chest X-ray image (PNG, JPG, or DICOM format)</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <p>Select an AI model trained for pneumonia detection</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <p>Get instant classification (Normal, Bacterial, or Viral) with confidence scores</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <p>View Grad-CAM visualization highlighting relevant image regions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;