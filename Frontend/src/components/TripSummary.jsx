import React from 'react';
import { MapPin, DollarSign, Sparkles, Users, Gauge, Compass } from 'lucide-react';

export default function TripSummary({ summary = {}, days = 5 }) {
  const items = [
    { label: 'Destination', value: summary.destination, icon: MapPin, color: 'text-[#2563EB] bg-blue-50' },
    { label: 'Total Budget', value: summary.budget, icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Travel Style', value: summary.travelStyle, icon: Sparkles, color: 'text-purple-600 bg-purple-50' },
    { label: 'Travelers', value: summary.travelerCategory, icon: Users, color: 'text-amber-600 bg-amber-50' },
    { label: 'Recommended Pace', value: summary.recommendedPace, icon: Gauge, color: 'text-sky-600 bg-sky-50' },
    { label: 'Est. Net Cost', value: summary.estimatedCost, icon: Compass, color: 'text-indigo-600 bg-indigo-50' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Agentic Trip Blueprint</span>
          <p className="text-lg font-bold text-[#0F172A]">{summary.destination || 'Custom Journey'}</p>
        </div>
        <span className="bg-[#2563EB] text-white font-bold text-xs px-3 py-1 rounded-full shadow-xs">
          {days} Days Schedule
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5">
                <div className={`p-1 rounded-md ${item.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
              </div>
              <p className="text-xs font-bold text-[#0F172A] truncate">{item.value || 'N/A'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
