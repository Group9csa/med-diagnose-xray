import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Menu, X, Stethoscope, BarChart3, Network, LogOut, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: "Home", href: "/home", icon: Activity },
    { name: "Prediction", href: "/prediction", icon: Stethoscope },
    { name: "Model Comparison", href: "/comparison", icon: BarChart3 },
    { name: "Federated Learning", href: "/federated", icon: Network },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-medical group-hover:shadow-lg transition-all duration-300">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                  MedVision AI
                </h1>
                <p className="text-xs text-muted-foreground">Pneumonia Detection</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-baseline space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "text-primary bg-primary-light shadow-medical"
                        : "text-muted-foreground hover:text-primary hover:bg-secondary"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="ml-4"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card rounded-lg mt-2 shadow-lg border">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "text-primary bg-primary-light"
                        : "text-muted-foreground hover:text-primary hover:bg-secondary"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;