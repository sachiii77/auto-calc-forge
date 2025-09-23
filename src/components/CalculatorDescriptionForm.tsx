import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Calculator, Zap } from "lucide-react";

interface CalculatorDescriptionFormProps {
  onGenerate: (description: string) => void;
  isGenerating?: boolean;
}

export const CalculatorDescriptionForm = ({ onGenerate, isGenerating = false }: CalculatorDescriptionFormProps) => {
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onGenerate(description.trim());
    }
  };

  const examples = [
    "Mortgage payment calculator with interest rates",
    "Calorie calculator based on age, weight, and activity level",
    "Compound interest calculator for investments",
    "Carbon footprint calculator for daily activities",
    "GPA calculator for students",
    "Tip calculator with split bill options"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium shadow-primary">
          <Sparkles className="w-4 h-4" />
          AI-Powered Calculator Generator
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
          Describe Any Calculator,
          <br />
          Get It Instantly
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Simply describe the calculator you need, and our AI will generate a fully functional calculator for you in seconds.
        </p>
      </div>

      {/* Main Form */}
      <Card className="p-8 shadow-card border-0 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="description" className="text-lg font-semibold text-foreground block">
              What calculator do you need?
            </label>
            <Textarea
              id="description"
              placeholder="Example: A BMI calculator that takes height and weight and shows health categories..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] text-base resize-none border-border/50 focus:border-primary transition-colors"
              disabled={isGenerating}
            />
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            disabled={!description.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Zap className="w-5 h-5 mr-2 animate-pulse" />
                Generating Calculator...
              </>
            ) : (
              <>
                <Calculator className="w-5 h-5 mr-2" />
                Generate Calculator
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center text-foreground">
          Or try one of these examples:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setDescription(example)}
              disabled={isGenerating}
              className="p-4 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg border border-border/30 hover:border-border transition-all duration-200 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};