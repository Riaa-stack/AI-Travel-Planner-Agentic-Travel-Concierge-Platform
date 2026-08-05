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
      className={`rounded-2xl border ${
        glass 
          ? 'bg-white/70 backdrop-blur-md border-white/40 shadow-xs' 
          : 'bg-white border-slate-200/80 shadow-xs'
      } ${
        hoverEffect ? 'hover:shadow-md hover:border-slate-300 transition-all duration-200' : ''
      } ${padding} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
