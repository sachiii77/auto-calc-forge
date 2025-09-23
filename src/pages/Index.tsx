import { useState } from "react";
import { CalculatorDescriptionForm } from "@/components/CalculatorDescriptionForm";
import { CalculatorRunner } from "@/components/CalculatorRunner";
import { calculatorTemplates, findBestCalculatorTemplate } from "@/data/calculatorTemplates";
import { toast } from "sonner";

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'calculator'>('form');
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (description: string) => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Find best matching calculator template
    const calculatorType = findBestCalculatorTemplate(description);
    
    setSelectedCalculator(calculatorType);
    setCurrentView('calculator');
    setIsGenerating(false);
    
    toast.success("Calculator generated successfully!");
  };

  const handleBack = () => {
    setCurrentView('form');
    setSelectedCalculator(null);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {currentView === 'form' ? (
          <CalculatorDescriptionForm 
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        ) : selectedCalculator ? (
          <CalculatorRunner
            config={calculatorTemplates[selectedCalculator]}
            onBack={handleBack}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Index;
