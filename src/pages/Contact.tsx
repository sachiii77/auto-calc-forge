
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you shortly.",
      variant: "success",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      text: "support@everythingcalculator.com",
      href: "mailto:support@everythingcalculator.com"
    },
    {
      icon: Phone,
      text: "(555) 123-4567",
      href: "tel:5551234567"
    },
    {
      icon: MapPin,
      text: "123 Innovation Drive, Tech City, 12345",
    }
  ];

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch with Everything Calculator"
        description="Have questions or feedback? Contact the Everything Calculator team. We're here to help you with our AI-powered calculator generator."
        keywords="contact calculator generator, support, get in touch, AI calculator help, feedback"
      />
      <div className="min-h-screen bg-gradient-bg">

        <main className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text-primary">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              We'd love to hear from you. Whether you have a question, a feature request, or just want to say hello, feel free to reach out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8 space-y-6 animate-fade-in glass">
              <h2 className="text-3xl font-bold text-foreground">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
                  <Input id="name" type="text" placeholder="Your Name" required className="bg-background/80" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                  <Input id="email" type="email" placeholder="your@email.com" required className="bg-background/80" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                  <Textarea id="message" placeholder="Your message..." required rows={5} className="bg-background/80" />
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Sending..." : <>Send Message <Send className="w-4 h-4 ml-2" /></>}
                </Button>
              </form>
            </Card>

            {/* Contact Details */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Card className="p-8 space-y-4 glass">
                <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
                <ul className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <item.icon className="w-6 h-6 mt-1 text-primary" />
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Card>
              
              <Card className="p-8 h-80 w-full glass">
                {/* Map placeholder */}
                <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                  <p>Map Placeholder</p>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Contact;
