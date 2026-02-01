import { useState } from "react";
import { Users, Plus, X } from "lucide-react";

interface Labour {
  id: number;
  name: string;
  daily_wage: number;
  is_present: number;
  total_pay: number;
}

interface LabourModuleProps {
  labourData: Labour[];
  onAddWorker: (name: string, dailyWage: number) => Promise<void>;
  onToggleAttendance: (id: number, isPresent: boolean) => Promise<void>;
  onUpdateTotalPay: (id: number, totalPay: number) => Promise<void>;
}

export default function LabourModule({ labourData, onAddWorker, onToggleAttendance, onUpdateTotalPay }: LabourModuleProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWorkerName, setNewWorkerName] = useState("");
  const [newWorkerWage, setNewWorkerWage] = useState("");
  const [editingPayId, setEditingPayId] = useState<number | null>(null);
  const [editPayValue, setEditPayValue] = useState("");

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newWorkerName && newWorkerWage) {
      await onAddWorker(newWorkerName, parseFloat(newWorkerWage));
      setNewWorkerName("");
      setNewWorkerWage("");
      setShowAddForm(false);
    }
  };

  const handleUpdatePay = async (id: number) => {
    if (editPayValue) {
      await onUpdateTotalPay(id, parseFloat(editPayValue));
      setEditingPayId(null);
      setEditPayValue("");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-yellow-500/30 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-yellow-400" />
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">Labour Management</h2>
          <p className="text-lg text-yellow-300/80 font-semibold">मजदूर प्रबंधन</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-yellow-500/30">
              <th className="text-left py-4 px-4">
                <div className="text-yellow-300 text-lg font-bold">Name</div>
                <div className="text-yellow-400/60 text-sm">नाम</div>
              </th>
              <th className="text-center py-4 px-4">
                <div className="text-yellow-300 text-lg font-bold">Daily Wage</div>
                <div className="text-yellow-400/60 text-sm">दैनिक मजदूरी</div>
              </th>
              <th className="text-center py-4 px-4">
                <div className="text-yellow-300 text-lg font-bold">Attendance</div>
                <div className="text-yellow-400/60 text-sm">उपस्थिति</div>
              </th>
              <th className="text-right py-4 px-4">
                <div className="text-yellow-300 text-lg font-bold">Total Pay</div>
                <div className="text-yellow-400/60 text-sm">कुल वेतन</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {labourData.map((worker) => (
              <tr
                key={worker.id}
                className="border-b border-yellow-500/10 hover:bg-yellow-500/5 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="text-white text-lg font-semibold">{worker.name}</div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="text-green-400 text-lg font-bold">₹{worker.daily_wage}</div>
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => onToggleAttendance(worker.id, worker.is_present === 0)}
                    className={`px-6 py-2 rounded-lg font-bold text-lg transition-all shadow-lg ${
                      worker.is_present
                        ? "bg-green-500 text-black hover:bg-green-400"
                        : "bg-red-500 text-white hover:bg-red-400"
                    }`}
                  >
                    {worker.is_present ? "P" : "A"}
                  </button>
                </td>
                <td className="py-4 px-4 text-right">
                  {editingPayId === worker.id ? (
                    <div className="flex items-center justify-end gap-2">
                      <input
                        type="number"
                        value={editPayValue}
                        onChange={(e) => setEditPayValue(e.target.value)}
                        className="bg-black/60 border border-yellow-500/30 rounded-lg px-3 py-1 text-yellow-400 font-bold w-32 text-right"
                        placeholder="Total Pay"
                      />
                      <button
                        onClick={() => handleUpdatePay(worker.id)}
                        className="bg-green-500 text-black px-3 py-1 rounded-lg font-bold hover:bg-green-400"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => {
                          setEditingPayId(null);
                          setEditPayValue("");
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold hover:bg-red-400"
                      >
                        ✗
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setEditingPayId(worker.id);
                        setEditPayValue(worker.total_pay.toString());
                      }}
                      className="text-yellow-400 text-xl font-extrabold cursor-pointer hover:text-yellow-300"
                    >
                      ₹{worker.total_pay.toLocaleString()}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Worker Form */}
      {showAddForm ? (
        <form onSubmit={handleAddWorker} className="mt-6 bg-black/40 backdrop-blur-sm rounded-xl p-5 border border-yellow-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-yellow-400 text-xl font-bold">Add New Worker</h3>
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
                Worker Name / मजदूर का नाम
              </label>
              <input
                type="text"
                value={newWorkerName}
                onChange={(e) => setNewWorkerName(e.target.value)}
                className="w-full bg-black/60 border border-yellow-500/30 rounded-lg px-4 py-3 text-white text-lg focus:border-yellow-500 focus:outline-none"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="text-yellow-300/80 text-sm font-semibold block mb-2">
                Daily Wage (₹) / दैनिक मजदूरी
              </label>
              <input
                type="number"
                value={newWorkerWage}
                onChange={(e) => setNewWorkerWage(e.target.value)}
                className="w-full bg-black/60 border border-yellow-500/30 rounded-lg px-4 py-3 text-white text-lg focus:border-yellow-500 focus:outline-none"
                placeholder="Enter daily wage"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg py-3 rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl border-2 border-yellow-400"
            >
              Add Worker
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-6 w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-lg py-4 rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-xl border-2 border-yellow-400 flex items-center justify-center gap-2"
        >
          <Plus className="w-6 h-6" />
          Add Worker / मजदूर जोड़ें
        </button>
      )}
    </div>
  );
}