import React from 'react';
import { Clock, MapPin, DollarSign, CloudSun, Users, Navigation } from 'lucide-react';

export default function ActivityCard({ activity }) {
  if (!activity) return null;

  return (
    <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-2xs hover:shadow-md transition-all space-y-2">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{activity.name}</h4>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg shrink-0">
          {activity.cost}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
        <span className="flex items-center gap-1 text-blue-600 font-semibold">
          <Clock className="w-3.5 h-3.5" />
          {activity.time}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          {activity.location}
        </span>
        {activity.weather && (
          <span className="flex items-center gap-1 text-amber-600">
            <CloudSun className="w-3.5 h-3.5" />
            {activity.weather}
          </span>
        )}
        {activity.crowdLevel && (
          <span className="flex items-center gap-1 text-purple-600">
            <Users className="w-3.5 h-3.5" />
            {activity.crowdLevel} Crowd
          </span>
        )}
      </div>
    </div>
  );
}
