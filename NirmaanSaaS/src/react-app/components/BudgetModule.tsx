interface BudgetModuleProps {
  totalBudget: number;
  totalExpenses: number;
}

export default function BudgetModule({ totalBudget, totalExpenses }: BudgetModuleProps) {
  const remainingBudget = totalBudget - totalExpenses;
  const percentage = (totalExpenses / totalBudget) * 100;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-yellow-500/30 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-yellow-400 tracking-tight">
            Budget Overview
          </h2>
          <p className="text-xl text-yellow-300/80 font-semibold mt-1">
            बजट सारांश (Bajat Summary)
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Total Budget */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20 shadow-lg">
          <p className="text-yellow-300/80 text-lg font-semibold mb-2">
            Total Budget
          </p>
          <p className="text-sm text-yellow-400/60 mb-3">कुल बजट</p>
          <p className="text-4xl font-extrabold text-yellow-400">
            ₹{totalBudget.toLocaleString()}
          </p>
        </div>

        {/* Total Expenses */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 shadow-lg">
          <p className="text-red-300/80 text-lg font-semibold mb-2">
            Total Expenses
          </p>
          <p className="text-sm text-red-400/60 mb-3">कुल खर्च</p>
          <p className="text-4xl font-extrabold text-red-400">
            ₹{totalExpenses.toLocaleString()}
          </p>
        </div>

        {/* Remaining Budget */}
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 shadow-lg">
          <p className="text-green-300/80 text-lg font-semibold mb-2">
            Remaining Budget
          </p>
          <p className="text-sm text-green-400/60 mb-3">शेष बजट</p>
          <p className="text-4xl font-extrabold text-green-400">
            ₹{remainingBudget.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-yellow-300/80 text-lg font-semibold">
            Budget Utilization / बजट उपयोग
          </span>
          <span className="text-2xl font-bold text-yellow-400">
            {percentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-6 border border-yellow-500/20 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-500 ease-out shadow-lg"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}