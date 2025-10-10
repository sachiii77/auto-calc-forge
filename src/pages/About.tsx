import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Users, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Zap,
      title: "Speed & Simplicity",
      description: "We believe creating calculators should take seconds, not hours."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Every feature we build is designed with our users' needs in mind."
    },
    {
      icon: Heart,
      title: "Quality First",
      description: "We're committed to delivering high-quality, reliable calculators every time."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We leverage the latest AI technology to make calculator creation effortless."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Everything Calculator",
    "description": "Learn about our mission to make calculator creation accessible to everyone through AI-powered technology.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Everything Calculator",
      "description": "AI-powered calculator generator platform",
      "foundingDate": "2024",
      "url": typeof window !== "undefined" ? window.location.origin : ""
    }
  };

  return (
    <>
      <SEO
        title="About Us - Our Mission to Democratize Calculator Creation"
        description="Learn about Everything Calculator's mission to make calculator creation accessible to everyone. Empowering 5,000+ users with AI-powered calculator generation."
        keywords="about calculator generator, AI calculator mission, calculator creation platform, custom calculator tools"
        type="article"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-bg">
        <Navigation />
        
        <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium shadow-primary">
            <Sparkles className="w-4 h-4" />
            About CalcForge
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold gradient-text-primary">
            Empowering Everyone to Create Calculators
          </h1>
          
          <p className="text-xl text-muted-foreground">
            We're on a mission to make calculator creation accessible to everyone, from students to professionals.
          </p>
        </div>

        {/* Story Section */}
        <section className="max-w-4xl mx-auto space-y-12 mb-16">
          <article className="p-8 space-y-6 shadow-card border-0 glass animate-fade-in rounded-lg">
            <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                CalcForge was born from a simple observation: creating custom calculators was unnecessarily difficult. 
                Whether you needed a BMI calculator, mortgage calculator, or any specialized tool, you either had to 
                hire a developer or spend hours learning to code.
              </p>
              <p>
                We knew there had to be a better way. By combining the power of artificial intelligence with 
                intuitive design, we created a platform where anyone can generate professional-grade calculators 
                in seconds, simply by describing what they need.
              </p>
              <p>
                Today, thousands of users rely on CalcForge to create calculators for education, business, health, 
                finance, and more. We're proud to be democratizing access to custom calculation tools.
              </p>
            </div>
          </article>

          {/* Mission Section */}
          <section className="text-center space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              To make calculator creation so simple and fast that anyone can bring their calculation ideas to life, 
              empowering better decision-making through accessible tools.
            </p>
          </section>

          {/* Values Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="p-6 space-y-4 hover-lift glass"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center" aria-label={value.title}>
                  <value.icon className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            ))}
          </section>

          {/* Stats Section */}
          <section className="p-8 bg-gradient-primary text-primary-foreground shadow-primary border-0 animate-fade-in rounded-lg" aria-label="Platform statistics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-primary-foreground/80">Calculators Generated</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <div className="text-primary-foreground/80">Happy Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-primary-foreground/80">Uptime</div>
              </div>
            </div>
          </section>
        </section>

        {/* CTA Section */}
        <section className="max-w-3xl mx-auto text-center space-y-6 p-8 rounded-2xl bg-gradient-primary/10 border border-primary/20 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground">
            Join Our Community
          </h2>
          <p className="text-muted-foreground">
            Be part of the calculator revolution. Start creating your own custom calculators today.
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

export default About;
