import { useState, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { CalculatorDescriptionForm } from "@/components/CalculatorDescriptionForm";
import { CalculatorRunner } from "@/components/CalculatorRunner";
import { calculatorTemplates, findBestCalculatorTemplate } from "@/data/calculatorTemplates";
import { toast } from "sonner";

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'calculator'>('form');
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(async (description: string) => {
    setIsGenerating(true);
    
    // Simulate AI processing time (reduced for better UX)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find best matching calculator template
    const calculatorType = findBestCalculatorTemplate(description);
    
    setSelectedCalculator(calculatorType);
    setCurrentView('calculator');
    setIsGenerating(false);
    
    toast.success("Calculator generated successfully!");
  }, []);

  const handleBack = useCallback(() => {
    setCurrentView('form');
    setSelectedCalculator(null);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Everything Calculator",
    "applicationCategory": "UtilitiesApplication",
    "description": "AI-powered calculator generator that creates custom calculators instantly",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "AI-Powered Calculator Generation",
      "BMI Calculator",
      "Mortgage Calculator",
      "Compound Interest Calculator",
      "Tip Calculator",
      "Calorie Calculator",
      "GPA Calculator"
    ]
  };

  return (
    <>
      <SEO
        title="Everything Calculator - AI-Powered Calculator Generator"
        description="Describe any calculator you need and get it instantly. Create BMI, mortgage, compound interest, tip, calorie, and GPA calculators powered by AI."
        keywords="calculator generator, AI calculator, BMI calculator, mortgage calculator, compound interest calculator, tip calculator, calorie calculator, GPA calculator"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-bg">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
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
        </main>
      </div>
    </>
  );
};

export default Index;
