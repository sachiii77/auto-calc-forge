import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap, Code2, Share2, History, Lock, Palette, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description: "Describe your calculator in plain English, and our advanced AI will generate a fully functional calculator instantly.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get your custom calculator in seconds, not hours. No coding required, no complex setup.",
      color: "text-accent"
    },
    {
      icon: Code2,
      title: "Production Ready",
      description: "All calculators are fully functional with proper validation, error handling, and responsive design.",
      color: "text-success"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your calculators with anyone via a simple link. Perfect for teams and clients.",
      color: "text-warning"
    },
    {
      icon: History,
      title: "Calculator History",
      description: "Access all your previously generated calculators anytime. Never lose your work.",
      color: "text-primary"
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We respect your privacy and never share your information.",
      color: "text-destructive"
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description: "Every calculator comes with a modern, professional design that looks great on any device.",
      color: "text-accent"
    },
    {
      icon: Rocket,
      title: "Always Improving",
      description: "We continuously add new calculator types and features based on user feedback.",
      color: "text-success"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": features.map((feature, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": feature.title,
      "description": feature.description
    }))
  };

  return (
    <>
      <SEO
        title="Features - AI Calculator Generator"
        description="Discover powerful features: AI-powered generation, lightning-fast creation, production-ready calculators, secure & private, beautiful design, and more."
        keywords="calculator features, AI generation, fast calculator creation, secure calculator, calculator history"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-bg">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium shadow-primary">
            <Sparkles className="w-4 h-4" />
            Powerful Features
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold gradient-text-primary">
            Everything You Need to Create Calculators
          </h1>
          
          <p className="text-xl text-muted-foreground">
            From simple calculators to complex financial tools, we've got you covered with powerful features designed for ease and efficiency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 space-y-4 hover:shadow-card transition-all duration-300 hover:scale-[1.02] animate-fade-in border-0 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center ${feature.color}`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto text-center space-y-6 p-8 rounded-2xl bg-gradient-primary/10 border border-primary/20 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to Create Your Calculator?
          </h2>
          <p className="text-muted-foreground">
            Join thousands of users who are already using CalcForge to generate custom calculators instantly.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/">
              <Sparkles className="w-5 h-5 mr-2" />
              Get Started Free
            </Link>
          </Button>
        </section>
      </main>
    </div>
    </>
  );
};

export default Features;
