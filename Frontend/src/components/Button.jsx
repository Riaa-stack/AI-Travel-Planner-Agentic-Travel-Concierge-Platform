import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  loading = false,
  className = '',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-extrabold rounded-2xl border-2 border-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#0F172A]';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-[3px_3px_0px_#0F172A] focus:ring-blue-500',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-[3px_3px_0px_#0F172A] focus:ring-slate-700',
    outline: 'bg-white hover:bg-slate-50 text-slate-900 shadow-[3px_3px_0px_#0F172A] focus:ring-slate-300',
    accent: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-[3px_3px_0px_#0F172A] focus:ring-indigo-500',
    ghost: 'bg-transparent border-transparent text-slate-800 hover:bg-slate-100 hover:border-slate-900 focus:ring-slate-300',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-[3px_3px_0px_#0F172A] focus:ring-rose-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2',
    lg: 'px-6 py-2.5 text-sm sm:text-base gap-2.5'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
}
