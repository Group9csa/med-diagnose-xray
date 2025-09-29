import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Network, 
  Shield, 
  Users, 
  Server,
  TrendingUp,
  Lock,
  Database,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Activity
} from "lucide-react";

const FederatedLearningPage = () => {
  const [selectedRound, setSelectedRound] = useState(10);

  // TODO: Replace with actual federated learning data from backend
  const federatedRounds = [
    { round: 1, accuracy: 78.5, participants: 3, dataPoints: 1500 },
    { round: 2, accuracy: 82.1, participants: 4, dataPoints: 2000 },
    { round: 3, accuracy: 85.3, participants: 5, dataPoints: 2500 },
    { round: 4, accuracy: 87.9, participants: 5, dataPoints: 2500 },
    { round: 5, accuracy: 89.8, participants: 6, dataPoints: 3000 },
    { round: 6, accuracy: 91.2, participants: 6, dataPoints: 3000 },
    { round: 7, accuracy: 92.5, participants: 7, dataPoints: 3500 },
    { round: 8, accuracy: 93.8, participants: 7, dataPoints: 3500 },
    { round: 9, accuracy: 95.1, participants: 8, dataPoints: 4000 },
    { round: 10, accuracy: 96.3, participants: 8, dataPoints: 4000 },
  ];

  const hospitals = [
    { 
      id: 1, 
      name: "General Hospital A", 
      dataSize: 500, 
      contribution: "High", 
      status: "Active",
      location: "New York"
    },
    { 
      id: 2, 
      name: "Medical Center B", 
      dataSize: 450, 
      contribution: "High", 
      status: "Active",
      location: "California"
    },
    { 
      id: 3, 
      name: "Regional Hospital C", 
      dataSize: 380, 
      contribution: "Medium", 
      status: "Active",
      location: "Texas"
    },
    { 
      id: 4, 
      name: "City Hospital D", 
      dataSize: 320, 
      contribution: "Medium", 
      status: "Active",
      location: "Florida"
    },
    { 
      id: 5, 
      name: "University Hospital E", 
      dataSize: 600, 
      contribution: "High", 
      status: "Active",
      location: "Illinois"
    },
    { 
      id: 6, 
      name: "Community Hospital F", 
      dataSize: 280, 
      contribution: "Low", 
      status: "Inactive",
      location: "Oregon"
    },
    { 
      id: 7, 
      name: "Metro Medical G", 
      dataSize: 420, 
      contribution: "Medium", 
      status: "Active",
      location: "Washington"
    },
    { 
      id: 8, 
      name: "Central Hospital H", 
      dataSize: 350, 
      contribution: "Medium", 
      status: "Active",
      location: "Colorado"
    },
  ];

  const comparisonData = {
    centralized: {
      accuracy: 93.8,
      dataPrivacy: "Low",
      scalability: "Limited",
      regulations: "Challenging",
      dataSharing: "Required"
    },
    federated: {
      accuracy: 96.3,
      dataPrivacy: "High",
      scalability: "Excellent",
      regulations: "Compliant",
      dataSharing: "Not Required"
    }
  };

  const getContributionColor = (contribution: string) => {
    switch (contribution) {
      case 'High': return 'success';
      case 'Medium': return 'warning';
      case 'Low': return 'destructive';
      default: return 'muted';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'success' : 'muted';
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-lg">
              <Network className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Federated Learning for Pneumonia Detection
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Privacy-preserving collaborative learning where multiple hospitals contribute to model 
            training without sharing sensitive patient data.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-1/2 mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Federated Learning Benefits */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-success/20 bg-success/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-success" />
                    <div>
                      <CardTitle className="text-success">Privacy Preserved</CardTitle>
                      <CardDescription>Data never leaves hospitals</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Patient data remains secure within each hospital's infrastructure while 
                    still contributing to model improvement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-primary">Collaborative Learning</CardTitle>
                      <CardDescription>Multiple institutions benefit</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Hospitals with limited data can benefit from a model trained on 
                    diverse datasets from multiple institutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-accent/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-6 w-6 text-accent" />
                    <div>
                      <CardTitle className="text-accent">Better Performance</CardTitle>
                      <CardDescription>96.3% accuracy achieved</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The federated model outperforms individual centralized models 
                    by leveraging diverse data distributions.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Participating Hospitals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  Participating Hospitals
                </CardTitle>
                <CardDescription>
                  Network of medical institutions contributing to federated learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {hospitals.map((hospital) => (
                    <Card key={hospital.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{hospital.name}</h4>
                            <p className="text-xs text-muted-foreground">{hospital.location}</p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs text-${getStatusColor(hospital.status)}`}
                          >
                            {hospital.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Data Size:</span>
                            <span className="font-medium">{hospital.dataSize} images</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Contribution:</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs text-${getContributionColor(hospital.contribution)}`}
                            >
                              {hospital.contribution}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process" className="space-y-8">
            {/* Federated Learning Process Diagram */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2 text-primary" />
                  Federated Learning Process
                </CardTitle>
                <CardDescription>
                  Step-by-step visualization of the federated learning workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Process Steps */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center space-y-3">
                      <div className="mx-auto p-4 bg-gradient-primary rounded-lg w-fit">
                        <Server className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">1. Initialize</h3>
                        <p className="text-sm text-muted-foreground">
                          Central server sends initial model to hospitals
                        </p>
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="mx-auto p-4 bg-gradient-accent rounded-lg w-fit">
                        <Database className="h-8 w-8 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">2. Local Training</h3>
                        <p className="text-sm text-muted-foreground">
                          Each hospital trains model on local data
                        </p>
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="mx-auto p-4 bg-gradient-primary rounded-lg w-fit">
                        <Network className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">3. Share Updates</h3>
                        <p className="text-sm text-muted-foreground">
                          Hospitals send model updates (not data) to server
                        </p>
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="mx-auto p-4 bg-gradient-accent rounded-lg w-fit">
                        <Activity className="h-8 w-8 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">4. Aggregate</h3>
                        <p className="text-sm text-muted-foreground">
                          Server combines updates into global model
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Diagram */}
                  <div className="bg-gradient-card p-8 rounded-lg border">
                    <div className="text-center text-sm text-muted-foreground mb-4">
                      Federated Learning Architecture
                    </div>
                    
                    {/* TODO: Replace with actual diagram or use a charting library */}
                    <div className="flex flex-col items-center space-y-6">
                      {/* Central Server */}
                      <div className="flex items-center justify-center p-4 bg-primary rounded-lg text-primary-foreground">
                        <Server className="h-6 w-6 mr-2" />
                        <span className="font-medium">Central Aggregation Server</span>
                      </div>

                      {/* Bidirectional Arrows */}
                      <div className="flex items-center space-x-2">
                        <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                        <span className="text-xs text-muted-foreground">Model Updates</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground -rotate-90" />
                      </div>

                      {/* Hospitals */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                        {hospitals.slice(0, 4).map((hospital) => (
                          <div 
                            key={hospital.id} 
                            className={`p-3 rounded-lg border text-center ${
                              hospital.status === 'Active' 
                                ? 'bg-success/10 border-success/20' 
                                : 'bg-muted/10 border-muted/20'
                            }`}
                          >
                            <Database className={`h-5 w-5 mx-auto mb-2 ${
                              hospital.status === 'Active' ? 'text-success' : 'text-muted-foreground'
                            }`} />
                            <div className="text-xs font-medium">{hospital.name}</div>
                            <div className="text-xs text-muted-foreground">{hospital.dataSize} images</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Privacy Features</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Data never leaves hospital premises</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Only model parameters are shared</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Differential privacy techniques applied</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>HIPAA compliance maintained</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Technical Benefits</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Handles heterogeneous data distributions</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Robust to hospital dropouts</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Scalable to many participants</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span>Reduced communication overhead</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-8">
            {/* Training Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Federated Training Progress
                </CardTitle>
                <CardDescription>
                  Accuracy improvement across federated learning rounds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Round Selector */}
                <div className="flex flex-wrap gap-2">
                  {federatedRounds.map((round) => (
                    <Button
                      key={round.round}
                      variant={selectedRound === round.round ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRound(round.round)}
                    >
                      Round {round.round}
                    </Button>
                  ))}
                </div>

                {/* Selected Round Details */}
                {(() => {
                  const currentRound = federatedRounds.find(r => r.round === selectedRound);
                  if (!currentRound) return null;

                  return (
                    <div className="grid md:grid-cols-4 gap-4">
                      <Card className="p-4 bg-primary/5 border-primary/20">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {currentRound.accuracy}%
                          </div>
                          <div className="text-sm text-muted-foreground">Accuracy</div>
                        </div>
                      </Card>
                      
                      <Card className="p-4 bg-accent/5 border-accent/20">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent">
                            {currentRound.participants}
                          </div>
                          <div className="text-sm text-muted-foreground">Hospitals</div>
                        </div>
                      </Card>
                      
                      <Card className="p-4 bg-success/5 border-success/20">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-success">
                            {currentRound.dataPoints.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Images</div>
                        </div>
                      </Card>
                      
                      <Card className="p-4 bg-secondary/50">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">
                            Round {currentRound.round}
                          </div>
                          <div className="text-sm text-muted-foreground">Current</div>
                        </div>
                      </Card>
                    </div>
                  );
                })()}

                {/* Progress Chart */}
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Accuracy Progress Over Rounds</h4>
                  <div className="space-y-3">
                    {federatedRounds.map((round) => (
                      <div key={round.round} className="flex items-center space-x-4">
                        <div className="w-16 text-sm font-medium">
                          R{round.round}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{round.accuracy}% accuracy</span>
                            <span className="text-muted-foreground">
                              {round.participants} hospitals, {round.dataPoints.toLocaleString()} images
                            </span>
                          </div>
                          <Progress 
                            value={round.accuracy} 
                            className={`h-2 ${round.round === selectedRound ? 'bg-primary' : ''}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Model Selection for Prediction */}
            <Card className="bg-gradient-hero text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Shield className="h-5 w-5 mr-2" />
                  Use Federated Global Model
                </CardTitle>
                <CardDescription className="text-white/80">
                  Access the privacy-preserving federated model for pneumonia detection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div>
                    <div className="text-lg font-semibold mb-1">96.3% Accuracy</div>
                    <div className="text-sm text-white/80">
                      Trained on {federatedRounds[federatedRounds.length - 1].dataPoints.toLocaleString()} images 
                      from {federatedRounds[federatedRounds.length - 1].participants} hospitals
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => window.location.href = '/prediction'}
                  >
                    Try Federated Model
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-8">
            {/* Centralized vs Federated Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-primary" />
                  Centralized vs Federated Learning
                </CardTitle>
                <CardDescription>
                  Comprehensive comparison of traditional and federated approaches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-medium">Aspect</th>
                        <th className="text-center p-3 font-medium">Centralized Learning</th>
                        <th className="text-center p-3 font-medium">Federated Learning</th>
                        <th className="text-center p-3 font-medium">Winner</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="p-3 font-medium">Model Accuracy</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-warning">
                            {comparisonData.centralized.accuracy}%
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-success">
                            {comparisonData.federated.accuracy}%
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <CheckCircle className="h-5 w-5 text-success mx-auto" />
                        </td>
                      </tr>
                      
                      <tr className="border-b border-border/50">
                        <td className="p-3 font-medium">Data Privacy</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-destructive">
                            {comparisonData.centralized.dataPrivacy}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-success">
                            {comparisonData.federated.dataPrivacy}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <CheckCircle className="h-5 w-5 text-success mx-auto" />
                        </td>
                      </tr>
                      
                      <tr className="border-b border-border/50">
                        <td className="p-3 font-medium">Scalability</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-warning">
                            {comparisonData.centralized.scalability}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-success">
                            {comparisonData.federated.scalability}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <CheckCircle className="h-5 w-5 text-success mx-auto" />
                        </td>
                      </tr>
                      
                      <tr className="border-b border-border/50">
                        <td className="p-3 font-medium">Regulatory Compliance</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-destructive">
                            {comparisonData.centralized.regulations}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-success">
                            {comparisonData.federated.regulations}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <CheckCircle className="h-5 w-5 text-success mx-auto" />
                        </td>
                      </tr>
                      
                      <tr className="border-b border-border/50">
                        <td className="p-3 font-medium">Data Sharing Required</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-destructive">
                            {comparisonData.centralized.dataSharing}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-success">
                            {comparisonData.federated.dataSharing}
                          </Badge>
                        </td>
                        <td className="p-3 text-center">
                          <CheckCircle className="h-5 w-5 text-success mx-auto" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-success mb-2">Federated Learning Advantages</h4>
                      <div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                        <div>• Higher accuracy through diverse data</div>
                        <div>• Complete data privacy preservation</div>
                        <div>• HIPAA and GDPR compliance</div>
                        <div>• Scalable to many institutions</div>
                        <div>• No data centralization required</div>
                        <div>• Reduced legal and ethical barriers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Implementation Notes */}
            <Card className="bg-primary-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Implementation Guidelines</CardTitle>
                <CardDescription>
                  Technical considerations for federated learning deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-primary mb-2">Backend Integration</h4>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• Implement federated aggregation server (Flask/Django)</div>
                    <div>• Set up secure communication channels between hospitals</div>
                    <div>• Add differential privacy mechanisms</div>
                    <div>• Implement model versioning and rollback capabilities</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-primary mb-2">Model Management</h4>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• Store federated model weights securely</div>
                    <div>• Version control for different training rounds</div>
                    <div>• Automated model performance monitoring</div>
                    <div>• A/B testing between centralized and federated models</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-primary mb-2">TODO: Replace Mock Data</h4>
                  <div className="space-y-1 text-muted-foreground">
                    <div>• Connect federatedRounds array to actual training logs</div>
                    <div>• Update hospital data with real participant information</div>
                    <div>• Load comparison metrics from model evaluation results</div>
                    <div>• Integrate with federated learning framework (PySyft, TensorFlow Federated)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FederatedLearningPage;