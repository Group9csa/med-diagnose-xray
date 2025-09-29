import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Target,
  CheckCircle,
  AlertCircle,
  Brain
} from "lucide-react";

const ModelComparisonPage = () => {
  // TODO: Replace with actual model performance data from backend
  const modelPerformance = [
    {
      name: "CNN",
      description: "Basic Convolutional Neural Network",
      accuracy: 92.5,
      precision: 91.2,
      recall: 90.8,
      f1Score: 91.0,
      trainingTime: "45 min",
      parameters: "2.3M",
      status: "trained"
    },
    {
      name: "VGG19",
      description: "Visual Geometry Group 19-layer network",
      accuracy: 94.2,
      precision: 93.8,
      recall: 93.5,
      f1Score: 93.6,
      trainingTime: "2.1 hrs",
      parameters: "143.7M",
      status: "trained"
    },
    {
      name: "ResNet50",
      description: "50-layer Residual Network",
      accuracy: 93.8,
      precision: 93.1,
      recall: 92.9,
      f1Score: 93.0,
      trainingTime: "1.8 hrs",
      parameters: "25.6M",
      status: "trained"
    },
    {
      name: "DenseNet121",
      description: "121-layer Densely Connected Network",
      accuracy: 95.1,
      precision: 94.8,
      recall: 94.6,
      f1Score: 94.7,
      trainingTime: "2.3 hrs",
      parameters: "8.0M",
      status: "trained"
    },
    {
      name: "Federated Global",
      description: "Privacy-preserving federated learning model",
      accuracy: 96.3,
      precision: 95.9,
      recall: 95.7,
      f1Score: 95.8,
      trainingTime: "4.2 hrs",
      parameters: "8.0M",
      status: "trained"
    }
  ];

  // TODO: Replace with actual confusion matrix data
  const confusionMatrixData = {
    CNN: {
      Normal: { Normal: 185, Bacterial: 8, Viral: 7 },
      Bacterial: { Normal: 12, Bacterial: 176, Viral: 12 },
      Viral: { Normal: 9, Bacterial: 15, Viral: 176 }
    },
    VGG19: {
      Normal: { Normal: 192, Bacterial: 5, Viral: 3 },
      Bacterial: { Normal: 8, Bacterial: 184, Viral: 8 },
      Viral: { Normal: 6, Bacterial: 9, Viral: 185 }
    },
    ResNet50: {
      Normal: { Normal: 189, Bacterial: 7, Viral: 4 },
      Bacterial: { Normal: 10, Bacterial: 181, Viral: 9 },
      Viral: { Normal: 7, Bacterial: 12, Viral: 181 }
    },
    DenseNet121: {
      Normal: { Normal: 194, Bacterial: 4, Viral: 2 },
      Bacterial: { Normal: 6, Bacterial: 186, Viral: 8 },
      Viral: { Normal: 5, Bacterial: 8, Viral: 187 }
    },
    "Federated Global": {
      Normal: { Normal: 196, Bacterial: 3, Viral: 1 },
      Bacterial: { Normal: 4, Bacterial: 189, Viral: 7 },
      Viral: { Normal: 3, Bacterial: 6, Viral: 191 }
    }
  };

  const getBestModel = () => {
    return modelPerformance.reduce((prev, current) => 
      (prev.accuracy > current.accuracy) ? prev : current
    );
  };

  const getPerformanceColor = (value: number) => {
    if (value >= 95) return "success";
    if (value >= 90) return "warning";
    return "destructive";
  };

  const renderConfusionMatrix = (modelName: string, data: any) => {
    const classes = ['Normal', 'Bacterial', 'Viral'];
    
    return (
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-center">{modelName}</h4>
        <div className="grid grid-cols-4 gap-1 text-xs">
          {/* Header */}
          <div></div>
          {classes.map(cls => (
            <div key={cls} className="text-center font-medium p-2">
              {cls.slice(0, 3)}
            </div>
          ))}
          
          {/* Matrix */}
          {classes.map(actualClass => (
            <div key={actualClass}>
              <div className="font-medium p-2 text-right">{actualClass.slice(0, 3)}</div>
              {classes.map(predictedClass => (
                <div 
                  key={predictedClass}
                  className={`p-2 text-center border rounded ${
                    actualClass === predictedClass 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {data[actualClass][predictedClass]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-lg">
              <BarChart3 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Model Performance Comparison
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive analysis of different deep learning architectures for pneumonia detection
          </p>
        </div>

        {/* Best Performing Model Highlight */}
        <Card className="mb-8 border-success/50 bg-success/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-success" />
                <div>
                  <CardTitle className="text-success">Best Performing Model</CardTitle>
                  <CardDescription>Highest accuracy and F1-score</CardDescription>
                </div>
              </div>
              <Badge className="bg-success text-success-foreground">
                Top Performer
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-success mb-1">
                  {getBestModel().name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getBestModel().description}
                </p>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-foreground">
                  {getBestModel().accuracy}%
                </div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-foreground">
                  {getBestModel().f1Score}%
                </div>
                <div className="text-sm text-muted-foreground">F1-Score</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-foreground">
                  {getBestModel().parameters}
                </div>
                <div className="text-sm text-muted-foreground">Parameters</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Performance Metrics Comparison
            </CardTitle>
            <CardDescription>
              Detailed comparison of accuracy, precision, recall, and F1-score for all models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium">Model</th>
                    <th className="text-center p-3 font-medium">Accuracy</th>
                    <th className="text-center p-3 font-medium">Precision</th>
                    <th className="text-center p-3 font-medium">Recall</th>
                    <th className="text-center p-3 font-medium">F1-Score</th>
                    <th className="text-center p-3 font-medium">Parameters</th>
                    <th className="text-center p-3 font-medium">Training Time</th>
                    <th className="text-center p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {modelPerformance.map((model, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="p-3">
                        <div>
                          <div className="font-medium text-foreground">{model.name}</div>
                          <div className="text-sm text-muted-foreground">{model.description}</div>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="space-y-1">
                          <div className="font-semibold">{model.accuracy}%</div>
                          <Progress value={model.accuracy} className="h-1" />
                        </div>
                      </td>
                      <td className="p-3 text-center font-medium">{model.precision}%</td>
                      <td className="p-3 text-center font-medium">{model.recall}%</td>
                      <td className="p-3 text-center">
                        <Badge variant="outline" className={`text-${getPerformanceColor(model.f1Score)}`}>
                          {model.f1Score}%
                        </Badge>
                      </td>
                      <td className="p-3 text-center text-muted-foreground">{model.parameters}</td>
                      <td className="p-3 text-center text-muted-foreground">{model.trainingTime}</td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-success mr-1" />
                          <span className="text-success text-sm capitalize">{model.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Model Architecture Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Accuracy Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-primary" />
                Accuracy Comparison
              </CardTitle>
              <CardDescription>
                Visual comparison of model accuracies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {modelPerformance.map((model, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{model.name}</span>
                    <span className="text-muted-foreground">{model.accuracy}%</span>
                  </div>
                  <div className="relative">
                    <Progress value={model.accuracy} className="h-3" />
                    <div 
                      className="absolute top-0 left-0 h-3 bg-gradient-primary rounded-full transition-all duration-500"
                      style={{ width: `${model.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                Key Insights
              </CardTitle>
              <CardDescription>
                Analysis findings and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-success">Best Overall Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    Federated Global Model achieves highest accuracy (96.3%) while maintaining privacy
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-success">Efficient Architecture</h4>
                  <p className="text-sm text-muted-foreground">
                    DenseNet121 provides excellent performance with fewer parameters (8.0M)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-warning">Trade-off Consideration</h4>
                  <p className="text-sm text-muted-foreground">
                    VGG19 has high accuracy but requires significantly more parameters (143.7M)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-success">Privacy Advantage</h4>
                  <p className="text-sm text-muted-foreground">
                    Federated learning enables model training without data centralization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Confusion Matrices */}
        <Card>
          <CardHeader>
            <CardTitle>Confusion Matrices</CardTitle>
            <CardDescription>
              Detailed classification performance for each model
              <br />
              <span className="text-xs text-muted-foreground">
                TODO: Replace with actual confusion matrix data from trained models
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(confusionMatrixData).map(([modelName, data]) => (
                <Card key={modelName} className="p-4">
                  {renderConfusionMatrix(modelName, data)}
                </Card>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-primary-light rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-medium text-primary mb-1">Integration Notes</h4>
                  <p className="text-muted-foreground">
                    The confusion matrix data shown above is mock data for demonstration. 
                    To integrate with your trained models:
                  </p>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>• Replace confusionMatrixData with actual model evaluation results</li>
                    <li>• Load confusion matrices from your model evaluation scripts</li>
                    <li>• Update modelPerformance array with real accuracy metrics</li>
                    <li>• Connect to your Flask/Django backend API for live data</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModelComparisonPage;