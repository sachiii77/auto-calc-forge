
import { AuthForm } from "@/components/AuthForm";
import { SEO } from "@/components/SEO";

const Auth = () => {
  return (
    <>
      <SEO title="Sign In / Sign Up - Everything Calculator" />
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </>
  );
};

export default Auth;
