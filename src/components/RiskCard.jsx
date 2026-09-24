import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  Thermometer, 
  Clock, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function RiskCard({
  riskData,
  produce = 'Tomato',
  distance = 18,
  quantity = 500,
  showControls = false
}) {
  const level = riskData?.level || 'LOW';

  const riskThemes = {
    LOW: {
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600',
      progressColor: 'bg-emerald-500',
      textColor: 'text-emerald-700',
      bgBox: 'bg-emerald-50/50 border-emerald-200'
    },
    MEDIUM: {
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
      progressColor: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgBox: 'bg-amber-50/50 border-amber-200'
    },
    HIGH: {
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      icon: ShieldAlert,
      iconColor: 'text-rose-600',
      progressColor: 'bg-rose-500',
      textColor: 'text-rose-700',
      bgBox: 'bg-rose-50/50 border-rose-200'
    }
  };

  const currentTheme = riskThemes[level] || riskThemes.LOW;
  const StatusIcon = currentTheme.icon;

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm p-6 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
            <StatusIcon className={`w-5 h-5 ${currentTheme.iconColor}`} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Produce Spoilage Risk</h3>
            <p className="text-xs text-slate-500">Transit perishability analysis</p>
          </div>
        </div>

        {/* Big Output Badge */}
        <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase border shadow-2xs ${currentTheme.badgeClass}`}>
          {level} RISK
        </span>
      </div>

      {/* Progress / Meter */}
      <div>
        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
          <span>Perishability Stress Index</span>
          <span className={currentTheme.textColor}>
            {riskData?.score ?? (level === 'LOW' ? 20 : level === 'MEDIUM' ? 55 : 85)} / 100
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${currentTheme.progressColor}`}
            style={{ width: `${riskData?.score ?? (level === 'LOW' ? 20 : level === 'MEDIUM' ? 55 : 85)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>0 (Safe / Durable)</span>
          <span>50 (Moderate Care)</span>
          <span>100 (Critical Perishable)</span>
        </div>
      </div>

      {/* Input Breakdown */}
      <div className="grid grid-cols-3 gap-2 py-1 text-center">
        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 block uppercase font-medium">Produce</span>
          <span className="text-xs font-bold text-slate-800">{produce}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 block uppercase font-medium">Quantity</span>
          <span className="text-xs font-bold text-slate-800">{quantity} kg</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
          <span className="text-[10px] text-slate-400 block uppercase font-medium">Distance</span>
          <span className="text-xs font-bold text-slate-800">{distance} km</span>
        </div>
      </div>

      {/* Rule Explanation */}
      <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${currentTheme.bgBox}`}>
        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-600" />
          <span>Rule Assessment:</span>
        </div>
        <p className="text-slate-700 leading-relaxed">
          {riskData?.reason || `${produce} transported across ${distance} km under demo conditions.`}
        </p>
        {riskData?.advice && (
          <div className="pt-1 text-[11px] text-slate-600 font-medium border-t border-slate-200/50">
            <strong>Transit Advice:</strong> {riskData.advice}
          </div>
        )}
      </div>

      {/* Disclaimer Requirement */}
      <div className="text-[11px] text-slate-400 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
        Prototype risk estimation – not a scientific prediction.
      </div>

    </div>
  );
}

export default RiskCard;
