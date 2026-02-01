import { useState, useEffect } from "react";

interface BudgetData {
  totalBudget: number;
  totalExpenses: number;
  remainingBudget: number;
}

export function useBudget() {
  const [budget, setBudget] = useState<BudgetData>({
    totalBudget: 0,
    totalExpenses: 0,
    remainingBudget: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchBudget = async () => {
    try {
      const response = await fetch("/api/budget");
      const data = await response.json();
      setBudget(data);
    } catch (error) {
      console.error("Error fetching budget:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, []);

  return { budget, loading, refetch: fetchBudget };
}