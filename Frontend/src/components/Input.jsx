import React from 'react';

export default function Input({
  label,
  error,
  icon: Icon,
  type = 'text',
  className = '',
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative rounded-2xl">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full text-xs sm:text-sm bg-[#F8FAFC] border-2 ${
            error ? 'border-rose-600 focus:ring-rose-500' : 'border-slate-900 focus:border-blue-600 focus:ring-blue-500/20'
          } rounded-2xl ${
            Icon ? 'pl-10' : 'pl-3.5'
          } pr-3.5 py-2.5 text-slate-900 font-medium placeholder:text-slate-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus:bg-white focus:outline-none focus:ring-2 transition-all ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] font-medium text-red-500 mt-1">{error}</p>}
    </div>
  );
}
