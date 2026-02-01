import { useState, useEffect } from "react";

interface Expense {
  id: number;
  category: string;
  amount: number;
  expense_date: string;
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/expenses");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (category: string, amount: number, date: string) => {
    try {
      await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, amount, date })
      });
      await fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return { expenses, loading, addExpense, refetch: fetchExpenses };
}