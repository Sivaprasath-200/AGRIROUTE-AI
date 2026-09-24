import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 shadow-sm'
  };

  const variantStyles = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow focus:ring-emerald-500 border border-transparent',
    secondary: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 focus:ring-emerald-400',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-emerald-500 shadow-sm',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white focus:ring-slate-700',
    ghost: 'hover:bg-slate-100 text-slate-700 focus:ring-slate-400'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}

export default Button;
