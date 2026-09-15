import React from 'react';
import { DollarSign, Hotel, Utensils, Bus, Compass, MoreHorizontal } from 'lucide-react';

export default function BudgetCard({ budgets = {}, totalBudget = '$0' }) {
  const currency = totalBudget.includes("₹") ? "INR" : "USD";

  const formatMoney = (amount) =>
    new Intl.NumberFormat(
      currency === "INR" ? "en-IN" : "en-US",
      {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }
    ).format(amount);
  const categories = [
    { label: 'Hotel Budget', value: budgets.hotel || 0, icon: Hotel, color: 'bg-blue-500' },
    { label: 'Food Budget', value: budgets.food || 0, icon: Utensils, color: 'bg-emerald-500' },
    { label: 'Transport Budget', value: budgets.transport || 0, icon: Bus, color: 'bg-amber-500' },
    { label: 'Activity Budget', value: budgets.activity || 0, icon: Compass, color: 'bg-purple-500' },
    { label: 'Miscellaneous', value: budgets.miscellaneous || 0, icon: MoreHorizontal, color: 'bg-slate-400' }
  ];

  const numericTotal = categories.reduce((sum, c) => sum + c.value, 0) || 1;

  return (
    <div className="p-5 bg-[#ECFDF5] border-2 border-emerald-800 text-emerald-950 rounded-3xl shadow-[4px_4px_0px_#15803D] space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-emerald-800">Budget Breakdown</h3>
          <p className="text-xl font-black text-emerald-950 mt-0.5">{totalBudget}</p>
        </div>
        <div className="w-9 h-9 rounded-2xl bg-white border-2 border-emerald-800 text-emerald-800 flex items-center justify-center font-black shadow-[2px_2px_0px_#15803D]">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-3 pt-1 border-t-2 border-emerald-200">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const percentage = Math.min(100, Math.round((cat.value / numericTotal) * 100));

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <Icon className="w-3.5 h-3.5 text-emerald-700" />
                  {cat.label}
                </span>
                <span className="font-black text-emerald-950">
                  {formatMoney(cat.value)} ({percentage}%)
                </span>
              </div>
              <div className="w-full h-2 bg-white border border-emerald-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
