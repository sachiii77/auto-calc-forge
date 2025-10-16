
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import DynamicCalculator from '@/components/DynamicCalculator';
import { Calculator } from '@/hooks/useCalculatorHistory';

const CalculatorPage = () => {
  const { id } = useParams<{ id: string }>();
  const [calculator, setCalculator] = useState<Calculator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalculator = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'calculators', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCalculator({ id: docSnap.id, ...docSnap.data() } as Calculator);
        } else {
          setError('Calculator not found.');
        }
      } catch (err) {
        setError('Failed to load calculator.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchCalculator();
  }, [id]);

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-64 w-full" />
        </div>
    );
  }

  if (error) {
    return (
        <div className="container mx-auto px-4 py-8">
            <p className="text-red-500 text-center">{error}</p>
        </div>
    );
  }

  if (!calculator) {
    return null; // Or some other placeholder
  }

  return (
    <>
      <SEO title={`Calculator ${calculator.id} - Everything Calculator`} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-card">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Calculator Preview
              </h1>
              <div className="bg-secondary/30 p-4 rounded-md">
                {calculator.code ? (
                  <DynamicCalculator code={calculator.code} />
                ) : (
                  <p>No code available for this calculator.</p>
                )}
              </div>
            </Card>
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
