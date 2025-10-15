
import { useState, useCallback } from "react";
import { SEO } from "@/components/SEO";
import { CalculatorDescriptionForm } from "@/components/CalculatorDescriptionForm";
import { CalculatorRunner } from "@/components/CalculatorRunner";
import { calculatorTemplates, findBestCalculatorTemplate } from "@/data/calculatorTemplates";
import { toast } from "sonner";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'calculator'>('form');
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { addToHistory } = useCalculatorHistory();

  const handleGenerate = useCallback(async (description: string) => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const calculatorType = findBestCalculatorTemplate(description);
    const calculator = calculatorTemplates[calculatorType];
    
    addToHistory({
      title: calculator.title,
      description: description,
    });
    
    setSelectedCalculator(calculatorType);
    setCurrentView('calculator');
    setIsGenerating(false);
    
    toast.success("Calculator generated successfully!");
  }, [addToHistory]);

  const handleBack = useCallback(() => {
    setCurrentView('form');
    setSelectedCalculator(null);
  }, []);

  return (
    <>
      <SEO
        title="Everything Calculator - AI-Powered Calculator Generator"
        description="Describe any calculator you need and get it instantly. Create BMI, mortgage, compound interest, tip, calorie, and GPA calculators powered by AI."
        keywords="calculator generator, AI calculator, BMI calculator, mortgage calculator, compound interest calculator, tip calculator, calorie calculator, GPA calculator"
      />
      <div className="min-h-screen bg-gradient-bg">
        <main className="container mx-auto px-4 py-8">
          {currentView === 'form' ? (
            <>
              <CalculatorDescriptionForm 
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />
            </>
          ) : selectedCalculator ? (
            <CalculatorRunner
              config={calculatorTemplates[selectedCalculator]}
              onBack={handleBack}
            />
          ) : null}
        </main>
      </div>
    </>
  );
};

export default Index;
