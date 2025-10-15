
import { templates, CalculatorTemplate } from "@/data/calculatorTemplates";

// A simple keyword-based search to simulate AI matching
const getTemplateByKeywords = (description: string): CalculatorTemplate | null => {
    const lowercasedDescription = description.toLowerCase();

    if (lowercasedDescription.includes('bmi') || (lowercasedDescription.includes('body') && lowercasedDescription.includes('mass'))) {
        return templates.find(t => t.id === 'bmi-calculator') || null;
    }

    if (lowercasedDescription.includes('interest') && lowercasedDescription.includes('simple')) {
        return templates.find(t => t.id === 'simple-interest-calculator') || null;
    }

    if (lowercasedDescription.includes('integrate') || lowercasedDescription.includes('derivative') || lowercasedDescription.includes('symbolic') || lowercasedDescription.includes('math')) {
        return templates.find(t => t.id === 'symbolic-math-calculator') || null;
    }

    // Fallback to null if no template is found
    return null;
}


// Simulate an async API call to the AI service
export const generateCalculator = async (description: string): Promise<CalculatorTemplate | null> => {
    console.log("Generating calculator for description:", description);
    
    // In a real implementation, this would be a network request to your AI backend.
    // Here, we simulate a delay to mimic a network call.
    await new Promise(resolve => setTimeout(resolve, 1500));

    const template = getTemplateByKeywords(description);
    
    if (!template) {
        console.error("No matching calculator template found.");
        return null;
    }

    console.log("Found matching template:", template.title);
    return template;
};