import React from 'react';

export function Card({
  title,
  subtitle,
  icon: Icon,
  badge,
  badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200',
  children,
  footer,
  action,
  className = '',
  headerClassName = ''
}) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col ${className}`}>
      {(title || subtitle || Icon || action) && (
        <div className={`px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4 ${headerClassName}`}>
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                {title && <h3 className="text-lg font-bold text-slate-900">{title}</h3>}
                {badge && (
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeColor}`}>
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6 flex-1">{children}</div>
      {footer && <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 text-xs text-slate-500">{footer}</div>}
    </div>
  );
}

export default Card;
