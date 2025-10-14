import { useState, useEffect } from "react";

export interface CalculatorHistoryItem {
  id: string;
  title: string;
  description: string;
  timestamp: number;
}

export const useCalculatorHistory = () => {
  const [history, setHistory] = useState<CalculatorHistoryItem[]>(() => {
    const saved = localStorage.getItem("calculator-history");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("calculator-history", JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: Omit<CalculatorHistoryItem, "id" | "timestamp">) => {
    const newItem: CalculatorHistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setHistory((prev) => [newItem, ...prev].slice(0, 10)); // Keep last 10
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("calculator-history");
  };

  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return { history, addToHistory, clearHistory, removeFromHistory };
};
