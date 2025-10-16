
import { useParams } from "react-router-dom";
import { useCalculatorHistory } from "@/hooks/useCalculatorHistory";
import { SEO } from "@/components/SEO";

const CalculatorPage = () => {
  const { id } = useParams();
  const { history } = useCalculatorHistory();
  const calculator = history[Number(id)];

  if (!calculator) {
    return <div>Calculator not found.</div>;
  }

  return (
    <>
      <SEO title={`${calculator.title} - Everything Calculator`} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{calculator.title}</h1>
        <p className="text-lg mb-8">{calculator.description}</p>
        {/* TODO: Render the actual calculator component based on the generated code */}
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-center text-gray-500">
            Calculator component will be rendered here.
          </p>
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
