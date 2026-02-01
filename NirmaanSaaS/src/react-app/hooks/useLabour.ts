import { useState, useEffect } from "react";

interface Labour {
  id: number;
  name: string;
  daily_wage: number;
  is_present: number;
  total_pay: number;
}

export function useLabour() {
  const [labour, setLabour] = useState<Labour[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLabour = async () => {
    try {
      const response = await fetch("/api/labour");
      const data = await response.json();
      setLabour(data);
    } catch (error) {
      console.error("Error fetching labour:", error);
    } finally {
      setLoading(false);
    }
  };

  const addWorker = async (name: string, dailyWage: number) => {
    try {
      await fetch("/api/labour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dailyWage })
      });
      await fetchLabour();
    } catch (error) {
      console.error("Error adding worker:", error);
    }
  };

  const toggleAttendance = async (id: number, isPresent: boolean) => {
    try {
      await fetch(`/api/labour/${id}/attendance`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPresent })
      });
      await fetchLabour();
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const updateTotalPay = async (id: number, totalPay: number) => {
    try {
      await fetch(`/api/labour/${id}/total-pay`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalPay })
      });
      await fetchLabour();
    } catch (error) {
      console.error("Error updating total pay:", error);
    }
  };

  useEffect(() => {
    fetchLabour();
  }, []);

  return { labour, loading, addWorker, toggleAttendance, updateTotalPay, refetch: fetchLabour };
}