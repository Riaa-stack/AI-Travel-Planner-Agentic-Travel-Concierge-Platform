import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

export default function MarkerPopup({ name, address, coordinates, type = 'activity', onNavigate, onDrawRoute }) {
  const typeBadgeColors = {
    activity: 'bg-blue-100 text-blue-700 border-blue-200',
    hotel: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    tourist: 'bg-amber-100 text-amber-700 border-amber-200'
  };

  return (
    <div className="p-3.5 max-w-[240px] space-y-2.5 font-['Poppins'] text-slate-800">
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${typeBadgeColors[type] || typeBadgeColors.activity}`}>
          {type}
        </span>
        {coordinates && (
          <span className="text-[9px] text-slate-400 font-mono">
            {coordinates[0]?.toFixed(3)}, {coordinates[1]?.toFixed(3)}
          </span>
        )}
      </div>

      <div>
        <h4 className="text-xs font-bold text-slate-900 leading-snug">{name}</h4>
        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{address}</p>
      </div>

      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
        <button
          onClick={() => onNavigate && onNavigate(coordinates, name)}
          className="flex-1 flex items-center justify-center gap-1 py-1 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-colors"
        >
          <Navigation className="w-3 h-3" /> Navigate
        </button>
        <button
          onClick={() => onDrawRoute && onDrawRoute(coordinates)}
          className="flex-1 flex items-center justify-center gap-1 py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition-colors"
        >
          <Compass className="w-3 h-3 text-sky-600" /> Draw Route
        </button>
      </div>
    </div>
  );
}
