import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share2, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface CalculatorField {
  name: string;
  label: string;
  type: "number" | "select";
  options?: string[];
  placeholder?: string;
}

interface CalculatorConfig {
  title: string;
  description: string;
  fields: CalculatorField[];
  calculate: (values: Record<string, string>) => { result: string; breakdown?: string[] };
}

interface CalculatorRunnerProps {
  config: CalculatorConfig;
  onBack: () => void;
}

export const CalculatorRunner = ({ config, onBack }: CalculatorRunnerProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ result: string; breakdown?: string[] } | null>(null);

  const handleInputChange = (fieldName: string, value: string) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleCalculate = () => {
    try {
      const calculationResult = config.calculate(values);
      setResult(calculationResult);
    } catch (error) {
      toast.error("Calculation error. Please check your inputs.");
    }
  };

  const handleReset = () => {
    setValues({});
    setResult(null);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Calculator link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const allFieldsFilled = config.fields.every(field => values[field.name] !== undefined && values[field.name] !== "");

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          ← Back to Generator
        </Button>
        <Button variant="outline" onClick={handleShare} className="gap-2">
          <Share2 className="w-4 h-4" />
          Share Calculator
        </Button>
      </div>

      {/* Calculator Title */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="w-3 h-3" />
            AI Generated
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{config.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Fields */}
        <Card className="p-6 space-y-6 shadow-card">
          <h2 className="text-xl font-semibold text-foreground">Input Values</h2>
          
          <div className="space-y-4">
            {config.fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  {field.label}
                </label>
                {field.type === "number" ? (
                  <Input
                    type="number"
                    placeholder={field.placeholder}
                    value={values[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="transition-colors focus:border-primary"
                  />
                ) : (
                  <select
                    value={values[field.name] || ""}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleCalculate}
              disabled={!allFieldsFilled}
              variant="hero"
              className="flex-1"
            >
              Calculate
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="icon"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Results */}
        <Card className="p-6 space-y-6 shadow-card">
          <h2 className="text-xl font-semibold text-foreground">Results</h2>
          
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-primary rounded-lg text-primary-foreground">
                <div className="text-sm opacity-90">Result</div>
                <div className="text-2xl font-bold">{result.result}</div>
              </div>
              
              {result.breakdown && result.breakdown.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground">Breakdown:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {result.breakdown.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-secondary rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p>Fill in the values and click Calculate to see results</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};