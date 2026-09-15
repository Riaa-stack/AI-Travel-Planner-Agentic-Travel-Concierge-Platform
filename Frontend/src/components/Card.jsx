import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  glass = false,
  padding = 'p-5',
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-3xl border-2 border-slate-900 ${
        glass 
          ? 'bg-white/90 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),4px_4px_0px_#0F172A]' 
          : 'bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),4px_4px_0px_#0F172A]'
      } ${
        hoverEffect ? 'hover:-translate-y-0.5 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),6px_6px_0px_#0F172A] transition-all duration-200' : ''
      } ${padding} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
