import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Calculator, TrendingUp, Heart, DollarSign, Ruler, Flame, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const calculators = [
    {
      icon: Heart,
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index based on height and weight with health category recommendations.",
      category: "Health",
      color: "bg-red-500"
    },
    {
      icon: DollarSign,
      title: "Mortgage Calculator",
      description: "Calculate monthly payments, total interest, and amortization schedule for home loans.",
      category: "Finance",
      color: "bg-green-500"
    },
    {
      icon: TrendingUp,
      title: "Investment Return Calculator",
      description: "Project your investment growth with compound interest over time.",
      category: "Finance",
      color: "bg-blue-500"
    },
    {
      icon: Flame,
      title: "Calorie Calculator",
      description: "Calculate daily calorie needs based on age, weight, height, and activity level.",
      category: "Health",
      color: "bg-orange-500"
    },
    {
      icon: Ruler,
      title: "Unit Converter",
      description: "Convert between different units of measurement including length, weight, and temperature.",
      category: "Tools",
      color: "bg-purple-500"
    },
    {
      icon: Briefcase,
      title: "Salary Calculator",
      description: "Calculate net salary after taxes, deductions, and benefits.",
      category: "Finance",
      color: "bg-indigo-500"
    },
    {
      icon: Calculator,
      title: "GPA Calculator",
      description: "Calculate your Grade Point Average based on course grades and credits.",
      category: "Education",
      color: "bg-teal-500"
    },
    {
      icon: DollarSign,
      title: "Tip Calculator",
      description: "Calculate tip amounts and split bills among multiple people.",
      category: "Tools",
      color: "bg-yellow-500"
    },
    {
      icon: TrendingUp,
      title: "Retirement Calculator",
      description: "Plan your retirement savings with projections based on contributions and returns.",
      category: "Finance",
      color: "bg-cyan-500"
    }
  ];

  const categories = ["All", "Finance", "Health", "Tools", "Education"];

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium shadow-primary">
            <Sparkles className="w-4 h-4" />
            Calculator Gallery
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Explore Example Calculators
          </h1>
          
          <p className="text-xl text-muted-foreground">
            See what's possible with CalcForge. These are just a few examples of the calculators you can create.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Calculator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {calculators.map((calc, index) => (
            <Card 
              key={index}
              className="p-6 space-y-4 hover:shadow-card transition-all duration-300 hover:scale-[1.02] animate-fade-in border-0 bg-card/50 backdrop-blur-sm cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-lg ${calc.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <calc.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary">{calc.category}</Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {calc.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {calc.description}
                </p>
              </div>
              
              <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Try Calculator →
              </Button>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6 p-8 rounded-2xl bg-gradient-primary/10 border border-primary/20 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground">
            Create Your Own Custom Calculator
          </h2>
          <p className="text-muted-foreground">
            These are just examples. You can create any calculator you can imagine in seconds with AI.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Building Now
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
