
import { PageHeader } from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCalculatorById } from "@/services/calculatorService";
import { Calculator } from "@/types/calculator";
import { templates, CalculatorTemplate } from "@/data/calculatorTemplates";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CalculatorPage = () => {
    const { id } = useParams<{ id: string }>();
    const [calculator, setCalculator] = useState<Calculator | null>(null);
    const [template, setTemplate] = useState<CalculatorTemplate | null>(null);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const [result, setResult] = useState<{ result: string; breakdown?: string[] } | null>(null);

    useEffect(() => {
        if (id) {
            getCalculatorById(id)
                .then(data => {
                    setCalculator(data);
                    if (data?.templateId) {
                        const foundTemplate = templates.find(t => t.id === data.templateId);
                        setTemplate(foundTemplate || null);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch calculator", error);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleInputChange = (fieldName: string, value: any) => {
        setFormValues(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleCalculate = () => {
        if (template) {
            const calculationResult = template.calculate(formValues);
            setResult(calculationResult);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
                 <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-muted-foreground">Loading calculator...</p>
                </div>
            </div>
        );
    }

    if (!calculator || !template) {
        return (
            <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-destructive">Calculator not found</h1>
                    <p className="text-muted-foreground">The calculator you are looking for could not be loaded.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-bg">
            <PageHeader
                title={calculator.name}
                subtitle={calculator.description}
            />
            <main className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <Card className="p-8 bg-card/50 backdrop-blur-sm rounded-lg shadow-card space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {template.fields.map(field => (
                                <div key={field.name} className="space-y-2">
                                    <label htmlFor={field.name} className="font-medium text-foreground">{field.label}</label>
                                    {field.type === 'select' ? (
                                        <Select onValueChange={value => handleInputChange(field.name, value)} value={formValues[field.name]}>
                                            <SelectTrigger className="bg-background/50">
                                                <SelectValue placeholder={field.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.options?.map(option => (
                                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            type={field.type}
                                            id={field.name}
                                            placeholder={field.placeholder}
                                            value={formValues[field.name] || ''}
                                            onChange={e => handleInputChange(field.name, e.target.value)}
                                            className="bg-background/50"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        <Button onClick={handleCalculate} size="lg" className="w-full">
                            <Sparkles className="w-5 h-5 mr-2" />
                            Calculate
                        </Button>

                        {result && (
                            <Card className="p-6 bg-background/50 shadow-inner mt-6">
                                <h3 className="text-xl font-bold text-primary mb-4">Result</h3>
                                <p className="text-4xl font-bold text-foreground">{result.result}</p>
                                {result.breakdown && (
                                    <ul className="mt-4 space-y-2 text-muted-foreground">
                                        {result.breakdown.map((line, index) => (
                                            <li key={index}>{line}</li>
                                        ))}
                                    </ul>
                                )}
                            </Card>
                        )}
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default CalculatorPage;
