import React from 'react';
import { Compass, PlusCircle } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = 'No Saved Itineraries Yet',
  description = 'Let our Agentic AI Concierge craft your dream travel itinerary in seconds.',
  actionText = 'Plan Your First Trip',
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-dashed border-slate-300 rounded-2xl space-y-4 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
        <Compass className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
      {onAction && (
        <Button onClick={onAction} icon={PlusCircle}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
