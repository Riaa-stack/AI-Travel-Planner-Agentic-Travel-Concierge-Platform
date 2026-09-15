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
    <div className="bg-[#FEF3C7] border-2 border-amber-800 rounded-3xl p-6 shadow-[4px_4px_0px_#B45309] space-y-5">
      <div className="flex items-center justify-between border-b-2 border-amber-300 pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">Agentic Trip Blueprint</span>
          <p className="text-xl sm:text-2xl font-black text-amber-950">{summary.destination || 'Custom Journey'}</p>
        </div>
        <span className="bg-amber-800 text-white font-black text-xs px-3.5 py-1.5 rounded-2xl border border-amber-950 shadow-[2px_2px_0px_#B45309]">
          {days} Days Schedule
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-3.5 bg-white border-2 border-amber-800 rounded-2xl shadow-[2px_2px_0px_#B45309] space-y-1">
              <div className="flex items-center gap-1.5">
                <div className={`p-1 rounded-lg border border-amber-800 ${item.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider">{item.label}</span>
              </div>
              <p className="text-xs font-black text-slate-900 truncate">{item.value || 'N/A'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
