
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createCalculator } from "@/services/calculatorService";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const CreateCalculator = () => {
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!description.trim()) {
        toast({
            title: "Error",
            description: "Please enter a description for your calculator.",
            variant: "destructive",
        });
        return;
    }
    setIsCreating(true);
    try {
        await createCalculator(description);
        toast({
            title: "Success!",
            description: "Your calculator has been created.",
        });
        navigate('/dashboard');
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to create calculator. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <PageHeader
        title="Create a New Calculator"
        subtitle="Describe the calculator you want to build, and our AI will generate it for you."
      />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., A calculator that converts feet and inches to centimeters."
            className="w-full h-48 p-4 text-lg bg-card/50 backdrop-blur-sm border-0 shadow-card"
            disabled={isCreating}
          />
          <Button onClick={handleCreate} size="lg" variant="hero" disabled={isCreating}>
            {isCreating ? (
                <> 
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating...
                </>
            ) : (
                <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Calculator
                </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CreateCalculator;
