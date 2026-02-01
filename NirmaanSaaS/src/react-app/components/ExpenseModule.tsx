import { useState } from "react";
import { Receipt, Plus, X } from "lucide-react";

interface Expense {
  id: number;
  category: string;
  amount: number;
  expense_date: string;
}

interface ExpenseModuleProps {
  expenses: Expense[];
  onAddExpense: (category: string, amount: number, date: string) => Promise<void>;
}

export default function ExpenseModule({ expenses, onAddExpense }: ExpenseModuleProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory && newAmount && newDate) {
      await onAddExpense(newCategory, parseFloat(newAmount), newDate);
      setNewCategory("");
      setNewAmount("");
      setNewDate(new Date().toISOString().split('T')[0]);
      setShowAddForm(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-yellow-500/30 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Receipt className="w-8 h-8 text-yellow-400" />
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">Expense Tracking</h2>
          <p className="text-lg text-yellow-300/80 font-semibold">खर्च ट्रैकिंग</p>
        </div>
      </div>

      {/* Expense List */}
      <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all shadow-lg"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-white text-xl font-bold">{expense.category}</h3>
                <p className="text-gray-400 text-sm mt-1">{expense.expense_date}</p>
              </div>
              <div className="text-red-400 text-2xl font-extrabold">
                ₹{expense.amount.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        {expenses.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No expenses recorded yet
          </div>
        )}
      </div>

      {/* Total Expenses Summary */}
      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-5 border-2 border-red-500/30 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-red-300/80 text-lg font-semibold">Total Expenses</p>
            <p className="text-sm text-red-400/60">कुल खर्च</p>
          </div>
          <p className="text-red-400 text-3xl font-extrabold">
            ₹{totalExpenses.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Add Expense Form */}
      {showAddForm ? (
        <form onSubmit={handleAddExpense} className="bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-yellow-400 text-xl font-bold">Add New Expense</h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-red-400 hover:text-red-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-yellow-300/80 text-sm font-semibold block mb-2">
                Category / श्रेणी
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-black/60 border border-yellow-500/30 rounded-lg px-4 py-3 text-white text-lg focus:border-yellow-500 focus:outline-none"
                placeholder="e.g., Cement, Steel, Transport"
                required
              />
            </div>
            <div>
              <label className="text-yellow-300/80 text-sm font-semibold block mb-2">
                Amount (₹) / राशि
              </label>
              <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="w-full bg-black/60 border border-yellow-500/30 rounded-lg px-4 py-3 text-white text-lg focus:border-yellow-500 focus:outline-none"
                placeholder="Enter amount"
                required
              />
            </div>
            <div>
              <label className="text-yellow-300/80 text-sm font-semibold block mb-2">
                Date / तारीख
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full bg-black/60 border border-yellow-500/30 rounded-lg px-4 py-3 text-white text-lg focus:border-yellow-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg py-3 rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl border-2 border-yellow-400"
            >
              Add Expense
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg py-4 rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl border-2 border-yellow-400 flex items-center justify-center gap-2"
        >
          <Plus className="w-6 h-6" />
          Add Expense / खर्च जोड़ें
        </button>
      )}
    </div>
  );
}