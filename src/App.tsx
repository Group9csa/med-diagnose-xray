import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import PredictionPage from "./pages/PredictionPage";
import ModelComparisonPage from "./pages/ModelComparisonPage";
import FederatedLearningPage from "./pages/FederatedLearningPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-background">
                    <Navigation />
                    <Homepage />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/prediction"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-background">
                    <Navigation />
                    <PredictionPage />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/comparison"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-background">
                    <Navigation />
                    <ModelComparisonPage />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/federated"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-background">
                    <Navigation />
                    <FederatedLearningPage />
                  </div>
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
