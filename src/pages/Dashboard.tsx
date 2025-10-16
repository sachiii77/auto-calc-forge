
import { useAuth } from "@/hooks/useAuth";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

const Dashboard = () => {
  const { user } = useAuth();
  const { history } = useCalculatorHistory();

  return (
    <>
      <SEO title="Dashboard - Everything Calculator" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg mb-8">Welcome, {user?.email}</p>

        <Card>
          <CardHeader>
            <CardTitle>Your Calculator History</CardTitle>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <ul>
                {history.map((item, index) => (
                  <li key={index} className="mb-4">
                    <Link to={`/calculator/${index}`} className="text-blue-500 hover:underline">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-gray-500">{item.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You haven't generated any calculators yet.</p>
            )}
          </CardContent>
        </Card>

        <div className="mt-8">
          <Button asChild>
            <Link to="/create">Create a New Calculator</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
