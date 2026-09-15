import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Dropdown({
  label,
  options = [],
  value,
  onChange,
  icon: Icon,
  className = '',
  id,
  ...props
}) {
  const dropdownId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={dropdownId} className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <select
          id={dropdownId}
          value={value}
          onChange={onChange}
          className={`w-full text-xs sm:text-sm bg-[#F8FAFC] border-2 border-slate-900 rounded-2xl ${
            Icon ? 'pl-10' : 'pl-3.5'
          } pr-10 py-2.5 text-slate-900 font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer ${className}`}
          {...props}
        >
          {options.map((opt, idx) => {
            const isObj = typeof opt === 'object';
            const val = isObj ? opt.value : opt;
            const lbl = isObj ? opt.label : opt;
            return (
              <option key={idx} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-700">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
