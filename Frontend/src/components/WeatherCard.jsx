import React from 'react';
import { CloudSun, Thermometer, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="p-5 bg-[#E0F2FE] border-2 border-sky-800 text-sky-950 rounded-3xl shadow-[4px_4px_0px_#0369A1] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-200 border border-sky-800 flex items-center justify-center">
            <CloudSun className="w-5 h-5 text-sky-800" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-widest text-sky-900">AI Weather Forecast</h3>
        </div>
        <span className="text-[10px] bg-sky-800 text-white px-2.5 py-1 rounded-full font-black border border-sky-950 shadow-[1px_1px_0px_#0369A1]">
          Live Sync
        </span>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <div>
          <span className="text-2xl sm:text-3xl font-black text-sky-950 tracking-tight">{weather.temperature}</span>
          <p className="text-xs font-bold text-sky-800 mt-0.5">{weather.condition}</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-white border-2 border-sky-800 flex items-center justify-center shadow-[2px_2px_0px_#0369A1]">
          <Thermometer className="w-5 h-5 text-sky-800" />
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t-2 border-sky-200 text-xs">
        {weather.warnings && (
          <div className="flex items-start gap-2 bg-amber-100 p-2.5 rounded-xl border-2 border-amber-600 text-amber-950 shadow-[2px_2px_0px_#B45309]">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span className="text-[11px] font-bold leading-tight">{weather.warnings}</span>
          </div>
        )}
        {weather.activitySuitability && (
          <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border-2 border-sky-800 text-sky-950 shadow-[2px_2px_0px_#0369A1]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="text-[11px] font-bold leading-tight">{weather.activitySuitability}</span>
          </div>
        )}
      </div>
    </div>
  );
}
