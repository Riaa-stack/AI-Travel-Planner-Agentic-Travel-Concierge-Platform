import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = 'Something Went Wrong',
  message = 'Failed to load itinerary details. Please verify connection and try again.',
  onRetry
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50/60 border border-red-200 rounded-2xl space-y-3 max-w-md mx-auto">
      <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-red-900">{title}</h3>
        <p className="text-xs text-red-700 leading-snug">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} icon={RefreshCw}>
          Retry Action
        </Button>
      )}
    </div>
  );
}
