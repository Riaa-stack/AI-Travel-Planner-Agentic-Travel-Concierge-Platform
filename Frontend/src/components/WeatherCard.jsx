import React from 'react';
import { CloudSun, Thermometer, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="p-5 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CloudSun className="w-6 h-6 text-amber-300 animate-pulse" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-sky-100">AI Weather Forecast</h3>
        </div>
        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold backdrop-blur-xs">Live Sync</span>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">{weather.temperature}</span>
          <p className="text-xs font-medium text-sky-100 mt-0.5">{weather.condition}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center">
          <Thermometer className="w-5 h-5 text-amber-200" />
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-white/20 text-xs">
        {weather.warnings && (
          <div className="flex items-start gap-2 bg-amber-500/20 p-2 rounded-lg border border-amber-300/30">
            <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <span className="text-amber-100 text-[11px] leading-tight">{weather.warnings}</span>
          </div>
        )}
        {weather.activitySuitability && (
          <div className="flex items-start gap-2 bg-white/10 p-2 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
            <span className="text-sky-50 text-[11px] leading-tight">{weather.activitySuitability}</span>
          </div>
        )}
      </div>
    </div>
  );
}
