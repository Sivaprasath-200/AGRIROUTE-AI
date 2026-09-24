import React from 'react';
import { 
  Truck, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Leaf, 
  Percent, 
  Fuel, 
  Scale,
  Sparkles
} from 'lucide-react';
import Button from './Button';

export function TransportCard({
  recommendation,
  quantity = 500,
  distance = 18,
  estimatedCost = 1800,
  onViewSharedPool,
  showActions = true
}) {
  const isShared = recommendation?.isShared ?? (quantity <= 1000);

  return (
    <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-white via-emerald-50/20 to-white shadow-sm p-6 space-y-5">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-sm">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-800">
                AI Transport Logic
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Rule-Based
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
              {recommendation?.type || 'Shared Vehicle Recommended'}
            </h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-500 block">Est. Farmer Freight</span>
          <span className="text-2xl font-black text-slate-900">₹{estimatedCost.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed">
        {recommendation?.description || 
          'Farmers with nearby destinations can share one vehicle to reduce transportation expenses. Consolidating produce at the village collection point lowers per-farmer cost.'}
      </p>

      {/* Key Metrics / Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Vehicle Type</span>
          </div>
          <div className="text-sm font-bold text-slate-900 mt-1">
            {recommendation?.vehicleType || 'Mini Truck (Tata Ace)'}
          </div>
          <span className="text-[11px] text-slate-400">Cap: 1,000 kg</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Vehicle Status</span>
          </div>
          <div className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Optimized (90% Full)
          </div>
          <span className="text-[11px] text-slate-400">Pooled with 2 local farmers</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Shared Economy</span>
          </div>
          <div className="text-sm font-bold text-slate-900 mt-1">
            ~30% Cost Reduction
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Save ₹600 - ₹900/trip</span>
        </div>

      </div>

      {/* Recommendation Explanation Box */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Why this recommendation?
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
          <li>
            Produce quantity of <strong>{quantity} kg</strong> easily fits the village shared vehicle route.
          </li>
          <li>
            Eliminates empty-return empty freight penalties by consolidating at the Village Collection Point.
          </li>
          <li>
            Guaranteed early morning arrival at the APMC Mandi before trading begins.
          </li>
        </ul>
      </div>

      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="text-[11px] text-slate-400">
            *Demo rates derived from standard regional transport tariff averages.
          </div>
          {onViewSharedPool && (
            <Button
              variant="secondary"
              size="sm"
              icon={Users}
              onClick={onViewSharedPool}
            >
              View Shared Pool Details
            </Button>
          )}
        </div>
      )}

    </div>
  );
}

export default TransportCard;
