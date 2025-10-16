import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthForm = () => {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-card-foreground">Welcome</h1>
        <p className="text-muted-foreground">Sign in to create and save your calculators.</p>
      </div>
      <Button onClick={signIn} className="w-full">
        Sign In with Google
      </Button>
    </div>
  );
};
