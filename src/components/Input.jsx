import React from 'react';

export function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helperText,
  icon: Icon,
  options = null,
  disabled = false,
  className = '',
  min,
  max,
  step
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : 'input');

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center justify-between">
          <span>
            {label} {required && <span className="text-rose-500">*</span>}
          </span>
          {helperText && <span className="text-[11px] font-normal lowercase text-slate-400">{helperText}</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {options ? (
          <select
            id={inputId}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            className={`w-full rounded-xl border bg-white py-2.5 px-3.5 text-sm text-slate-800 transition duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              Icon ? 'pl-10' : ''
            } ${error ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 hover:border-slate-400'} ${
              disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''
            }`}
          >
            {options.map((opt) => (
              <option key={opt.value ?? opt} value={opt.value ?? opt}>
                {opt.label ?? opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={`w-full rounded-xl border bg-white py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 transition duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              Icon ? 'pl-10' : ''
            } ${error ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 hover:border-slate-400'} ${
              disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''
            }`}
          />
        )}
      </div>

      {error && <p className="text-xs text-rose-500 font-medium mt-0.5">{error}</p>}
    </div>
  );
}

export default Input;
