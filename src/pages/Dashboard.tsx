
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, Calculator, Calendar, User, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCalculators, deleteCalculator } from "@/services/calculatorService";
import { Calculator as CalculatorType } from "@/types/calculator";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [calculators, setCalculators] = useState<CalculatorType[]>([]);
  const [isLoadingCalculators, setIsLoadingCalculators] = useState(true);

  const fetchCalculators = () => {
    if (user) {
      getCalculators()
        .then(data => {
          setCalculators(data);
          setIsLoadingCalculators(false);
        })
        .catch(error => {
          console.error("Failed to fetch calculators", error);
          setIsLoadingCalculators(false);
        });
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchCalculators();
  }, [user]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    try {
        await deleteCalculator(id);
        fetchCalculators(); // Refetch calculators after deletion
        toast({ title: "Calculator deleted successfully" });
    } catch (error) {
        console.error("Failed to delete calculator", error);
        toast({ title: "Failed to delete calculator", variant: "destructive" });
    }
  };

  if (loading || isLoadingCalculators) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const totalUses = calculators.reduce((acc, calc) => acc + (calc.uses || 0), 0);
  const creationTime = user.metadata.creationTime;
  const daysActive = creationTime ? Math.ceil((new Date().getTime() - new Date(creationTime).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="min-h-screen bg-gradient-bg">
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium shadow-primary">
              <Sparkles className="w-4 h-4" />
              Dashboard
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Welcome back!
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Manage your calculators and track your creations
            </p>
          </div>

          {/* User Info Card */}
          <Card className="p-6 space-y-4 shadow-card border-0 bg-card/50 backdrop-blur-sm animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {user.email}
                </h2>
                <p className="text-muted-foreground">
                  Member since {creationTime ? new Date(creationTime).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <Card className="p-6 space-y-2 shadow-card border-0 bg-card/50 backdrop-blur-sm">
              <Calculator className="w-8 h-8 text-primary" />
              <div className="text-3xl font-bold text-foreground">{calculators.length}</div>
              <p className="text-muted-foreground">Calculators Created</p>
            </Card>

            <Card className="p-6 space-y-2 shadow-card border-0 bg-card/50 backdrop-blur-sm">
              <Calendar className="w-8 h-8 text-primary" />
              <div className="text-3xl font-bold text-foreground">{daysActive}</div>
              <p className="text-muted-foreground">Days Active</p>
            </Card>

            <Card className="p-6 space-y-2 shadow-card border-0 bg-card/50 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-primary" />
              <div className="text-3xl font-bold text-foreground">{totalUses}</div>
              <p className="text-muted-foreground">Total Uses</p>
            </Card>
          </div>

          {/* Recent Calculators */}
          <Card className="p-8 space-y-6 shadow-card border-0 bg-card/50 backdrop-blur-sm animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground">Your Calculators</h2>
            
            {isLoadingCalculators ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading calculators...</p>
              </div>
            ) : calculators.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <Calculator className="w-16 h-16 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    No calculators yet
                  </h3>
                  <p className="text-muted-foreground">
                    Create your first calculator to get started
                  </p>
                </div>
                <Button variant="hero" size="lg" onClick={() => navigate('/create')}>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Your First Calculator
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {calculators.map(calc => (
                  <li key={calc.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer"
                    onClick={() => navigate(`/calculator/${calc.id}`)}>
                    <div className="flex-grow">
                      <p className="font-semibold text-foreground">{calc.name}</p>
                      <p className="text-sm text-muted-foreground">Created on {new Date(calc.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="font-semibold text-foreground">{calc.uses}</p>
                      <p className="text-sm text-muted-foreground">Uses</p>
                    </div>
                    <Button variant="destructive" size="icon" onClick={(e) => handleDelete(calc.id, e)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
