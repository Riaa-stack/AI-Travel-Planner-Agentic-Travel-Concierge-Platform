import React from 'react';
import { Lightbulb, Info, CheckCircle2 } from 'lucide-react';

export default function TravelTipCard({ title = 'AI Travel Concierge Tip', description, type = 'info' }) {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200/80 rounded-2xl flex items-start gap-3 shadow-2xs">
      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
        <Lightbulb className="w-4 h-4 text-amber-300" />
      </div>
      <div>
        <h4 className="text-xs font-bold text-blue-900">{title}</h4>
        <p className="text-[11px] text-blue-800/80 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
