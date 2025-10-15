
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const CallToAction = () => {
  return (
    <section className="max-w-3xl mx-auto text-center space-y-6 p-8 rounded-2xl bg-gradient-primary/10 border border-primary/20 animate-fade-in">
      <h2 className="text-3xl font-bold text-foreground">
        Join Our Community
      </h2>
      <p className="text-muted-foreground">
        Be part of the calculator revolution. Start creating your own custom
        calculators today.
      </p>
      <Button variant="hero" size="lg" asChild>
        <Link to="/">
          <Sparkles className="w-5 h-5 mr-2" />
          Get Started Free
        </Link>
      </Button>
    </section>
  );
};
