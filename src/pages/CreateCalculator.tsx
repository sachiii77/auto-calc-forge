import { CalculatorDescriptionForm } from "@/components/CalculatorDescriptionForm";
import { SEO } from "@/components/SEO";

const CreateCalculator = () => {
  const handleGenerate = (description: string) => {
    // TODO: Implement calculator generation and saving to user's account
    console.log("Generating calculator with description:", description);
  };

  return (
    <>
      <SEO title="Create New Calculator - Everything Calculator" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Create a New Calculator</h1>
        <CalculatorDescriptionForm onGenerate={handleGenerate} isGenerating={false} />
      </div>
    </>
  );
};

export default CreateCalculator;
