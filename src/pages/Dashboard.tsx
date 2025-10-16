
import { useAuth } from "@/hooks/useAuth";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { user } = useAuth();
  const { history, loading } = useCalculatorHistory();

  return (
    <>
      <SEO title="Dashboard - Everything Calculator" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button asChild>
                <Link to="/create">Create New Calculator</Link>
            </Button>
        </div>
        <p className="text-lg mb-8">Welcome back, {user?.displayName || user?.email}!</p>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Your Saved Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : history.length > 0 ? (
              <ul className="space-y-4">
                {history.map((calc) => (
                  <li key={calc.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <Link to={`/calculator/${calc.id}`} className="block hover:bg-secondary/20 p-4 rounded-md transition-colors">
                      <h3 className="text-xl font-semibold text-primary truncate">Calculator #{calc.id}</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Created on: {new Date(calc.createdAt?.toDate()).toLocaleDateString()}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't created any calculators yet.</p>
                <Button asChild variant="hero">
                    <Link to="/create">Create Your First Calculator</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
