
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, User, Send } from "lucide-react";
import { SEO } from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { CallToAction } from "@/components/CallToAction";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

const Contact = () => {
  const form = useForm({
    validate: zodResolver(contactSchema),
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
    toast.success("Your message has been sent!");
    form.reset();
  };

  return (
    <>
      <SEO
        title="Contact Us - Everything Calculator"
        description="Get in touch with the Everything Calculator team. We\'d love to hear from you!"
        keywords="contact, support, feedback, Everything Calculator"
      />
      <div className="min-h-screen bg-gradient-bg">

        <main className="container mx-auto px-4 py-12 space-y-24">
          <PageHeader
            pillText="Get in Touch"
            title="Contact Us"
            subtitle="We\'d love to hear from you! Whether you have a question, a feature request, or just want to say hi, feel free to reach out."
            icon={Mail}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Card className="animate-fade-in border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Your Name"
                      className="pl-10"
                      {...form.getInputProps("name")}
                    />
                    {form.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{form.errors.name}</p>
                    )}
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="pl-10"
                      {...form.getInputProps("email")}
                    />
                    {form.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.errors.email}</p>
                    )}
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-muted-foreground" />
                    <Textarea
                      placeholder="Your Message"
                      className="pl-10 pt-3 min-h-[150px]"
                      {...form.getInputProps("message")}
                    />
                    {form.errors.message && (
                      <p className="text-red-500 text-sm mt-1">{form.errors.message}</p>
                    )}
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-2xl font-bold">Other ways to reach us</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We are a small, dedicated team passionate about creating the best calculator generator in the world. Your feedback is invaluable to us.
                </p>
                <p>
                  For bug reports, please include as much detail as possible, including steps to reproduce the issue. For feature requests, let us know what you\'d like to build!
                </p>
                <p>
                  You can also find us on social media, although email is the best way to get a quick response.
                </p>
              </div>
            </div>
          </div>

          <CallToAction />
        </main>
      </div>
    </>
  );
};

export default Contact; 