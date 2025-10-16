import { useState, useEffect } from "react";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Calculator {
  id: string;
  code: string;
  createdAt: Timestamp;
  // Add any other fields from your Firestore document
}

export const useCalculatorHistory = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<Calculator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const q = query(collection(db, "calculators"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const calculators = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Calculator[];
        setHistory(calculators);
      } catch (error) {
        console.error("Error fetching calculator history:", error);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [user]);

  return { history, loading };
};
