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
    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Budget Breakdown</h3>
          <p className="text-lg font-extrabold text-slate-900">{totalBudget} </p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const percentage = Math.min(100, Math.round((cat.value / numericTotal) * 100));

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  {cat.label}
                </span>
                <span className="font-bold text-slate-900">
                  {formatMoney(cat.value)} ({percentage}%)
                </span>              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
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
