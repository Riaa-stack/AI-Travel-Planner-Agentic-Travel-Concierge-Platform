import React from 'react';
import { Clock, MapPin, DollarSign, CloudSun, Users, CheckCircle2 } from 'lucide-react';

export default function Timeline({ activities = [] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-xs text-slate-400 italic p-4 text-center bg-slate-50 rounded-xl">
        No scheduled activities for this segment.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((act, index) => (
        <div
          key={index}
          className={`p-4 rounded-xl shadow-sm transition-all border-l-4 bg-white border-slate-200 hover:border-[#2563EB] group ${
            index === 0 ? 'border-l-[#2563EB]' : 'border-l-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              index === 0 ? 'text-[#2563EB]' : 'text-slate-500'
            }`}>
              {act.time}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
                {act.cost}
              </span>
              {index === 0 && (
                <span className="text-[10px] bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Confirmed
                </span>
              )}
            </div>
          </div>

          <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
            {act.name}
          </h3>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{act.location}</span>
            </div>
            {act.weather && (
              <div className="flex items-center gap-1 text-amber-600">
                <CloudSun className="w-3.5 h-3.5" />
                <span>{act.weather}</span>
              </div>
            )}
            {act.crowdLevel && (
              <div className="flex items-center gap-1 text-purple-600">
                <Users className="w-3.5 h-3.5" />
                <span>{act.crowdLevel}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
