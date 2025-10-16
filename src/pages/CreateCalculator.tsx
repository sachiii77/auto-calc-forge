import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "@/integrations/firebase/client";
import { useAuth } from "@/hooks/useAuth";
import { CalculatorDescriptionForm } from "@/components/CalculatorDescriptionForm";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const db = getFirestore(app);

const CreateCalculator = () => {
  const { user } = useAuth();
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async (description: string) => {
    setIsGenerating(true);
    setGeneratedCode(null);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const fakeGeneratedCode = `
// Generated from description: "${description}"
import React, { useState } from 'react';

const Calculator = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <h1>Simple Calculator</h1>
      <p>Result: {value}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
}

export default Calculator;
    `;

    setGeneratedCode(fakeGeneratedCode);
    setIsGenerating(false);
  };

  const handleSave = async () => {
    if (!generatedCode || !user) {
      if (!user) {
        toast.error("You must be logged in to save a calculator.");
      }
      return;
    }

    setIsSaving(true);
    try {
      await addDoc(collection(db, "calculators"), {
        code: generatedCode,
        createdAt: new Date(),
        userId: user.uid,
      });
      toast.success("Calculator saved successfully!");
    } catch (error) {
      console.error("Error saving calculator:", error);
      toast.error("Failed to save calculator. Please try again.");
    }
    setIsSaving(false);
  };

  return (
    <>
      <SEO title="Create New Calculator - Everything Calculator" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!generatedCode && (
            <CalculatorDescriptionForm
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          )}

          {isGenerating && (
            <Card className="p-8 text-center glass">
              <p className="text-xl font-semibold animate-pulse">
                Generating your calculator...
              </p>
            </Card>
          )}

          {generatedCode && (
            <Card className="p-8 shadow-card border-0 glass animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Your Generated Calculator
              </h2>
              <pre className="bg-secondary/30 p-4 rounded-md overflow-x-auto text-sm">
                <code>{generatedCode}</code>
              </pre>
              <div className="flex justify-center mt-6">
                <Button onClick={handleSave} size="lg" variant="hero" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Calculator"}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateCalculator;
