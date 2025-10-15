
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const { user, signIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Link to="/" className="flex items-center justify-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Calculator className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="font-bold text-2xl">CalcForge</span>
        </Link>

        <Card className="p-8 space-y-6 shadow-card border-0 bg-card/50 backdrop-blur-sm">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Welcome</h1>
            <p className="text-muted-foreground">Sign in to create and share your calculators</p>
          </div>

          <Button
            onClick={handleSignIn}
            className="w-full"
            variant="hero"
            disabled={loading}
          >
            {loading ? (
              'Loading...'
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Sign In with Google
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
