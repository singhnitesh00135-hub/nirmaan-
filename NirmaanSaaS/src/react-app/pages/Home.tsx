import { useEffect } from "react";
import BudgetModule from "@/react-app/components/BudgetModule";
import LabourModule from "@/react-app/components/LabourModule";
import ExpenseModule from "@/react-app/components/ExpenseModule";
import { useBudget } from "@/react-app/hooks/useBudget";
import { useLabour } from "@/react-app/hooks/useLabour";
import { useExpenses } from "@/react-app/hooks/useExpenses";

export default function HomePage() {
  const { budget, refetch: refetchBudget } = useBudget();
  const { labour, addWorker, toggleAttendance, updateTotalPay } = useLabour();
  const { expenses, addExpense } = useExpenses();

  // Refetch budget whenever expenses change to update remaining budget
  useEffect(() => {
    refetchBudget();
  }, [expenses, refetchBudget]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-2xl border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-extrabold text-black tracking-tight">
            NirmaanSaaS
          </h1>
          <p className="text-lg text-black/80 mt-1 font-semibold">
            निर्माण प्रबंधन डैशबोर्ड (Construction Management Dashboard)
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Budget Module */}
        <BudgetModule 
          totalBudget={budget.totalBudget}
          totalExpenses={budget.totalExpenses}
        />

        {/* Two Column Layout for Labour and Expense */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Labour Module */}
          <LabourModule 
            labourData={labour}
            onAddWorker={addWorker}
            onToggleAttendance={toggleAttendance}
            onUpdateTotalPay={updateTotalPay}
          />

          {/* Expense Module */}
          <ExpenseModule 
            expenses={expenses}
            onAddExpense={addExpense}
          />
        </div>
      </main>
    </div>
  );
}