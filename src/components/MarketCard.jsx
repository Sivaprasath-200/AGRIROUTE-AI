import React from 'react';
import { 
  Store, 
  MapPin, 
  TrendingUp, 
  Truck, 
  CheckCircle, 
  DollarSign, 
  Award,
  ArrowRight
} from 'lucide-react';
import Button from './Button';

export function MarketCard({
  market,
  crop = 'Tomato',
  quantity = 500,
  isRecommended = false,
  onSelect,
  isSelected = false
}) {
  const demandColors = {
    High: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    Medium: 'bg-amber-100 text-amber-800 border-amber-300',
    Low: 'bg-slate-100 text-slate-700 border-slate-300'
  };

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-200 bg-white flex flex-col justify-between overflow-hidden ${
        isRecommended
          ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
          : isSelected
          ? 'border-emerald-400 shadow-sm ring-1 ring-emerald-400/30'
          : 'border-slate-200 shadow-sm hover:border-slate-300 hover:shadow'
      }`}
    >
      {/* Recommended Ribbon */}
      {isRecommended && (
        <div className="bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 text-center tracking-wide uppercase flex items-center justify-center gap-1.5 shadow-xs">
          <Award className="w-3.5 h-3.5" />
          Recommended Market
        </div>
      )}

      <div className="p-5 flex-1 space-y-4">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-lg">{market.code || market.name}</span>
              <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                Demo Data
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{market.name}</p>
          </div>

          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${demandColors[market.demand] || demandColors.Medium}`}>
            {market.demand} Demand
          </span>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Distance</span>
            </div>
            <div className="text-base font-bold text-slate-800 mt-1">
              {market.distance} <span className="text-xs font-normal text-slate-500">km</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Est. Price</span>
            </div>
            <div className="text-base font-bold text-slate-800 mt-1">
              ₹{market.cropPrice || market.prices?.[crop] || 25} <span className="text-xs font-normal text-slate-500">/kg</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <Truck className="w-3.5 h-3.5 text-amber-600" />
              <span>Transport Cost</span>
            </div>
            <div className="text-base font-bold text-slate-800 mt-1">
              ₹{market.transportCost?.toLocaleString('en-IN') || 1800}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>Est. Revenue</span>
            </div>
            <div className="text-base font-bold text-slate-800 mt-1">
              ₹{market.grossRevenue?.toLocaleString('en-IN') || (quantity * (market.cropPrice || 25)).toLocaleString('en-IN')}
            </div>
          </div>

        </div>

        {/* Net Return Highlight Box */}
        <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
          isRecommended 
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
            : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
              Estimated Net Return
            </div>
            <div className="text-[10px] text-slate-400">Revenue - Transport Cost</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-extrabold text-emerald-700">
              ₹{market.netReturn?.toLocaleString('en-IN')}
            </div>
            {market.profitMargin && (
              <div className="text-[11px] font-semibold text-emerald-600">
                {market.profitMargin}% net margin
              </div>
            )}
          </div>
        </div>

        {/* Road & Transit notes */}
        <div className="text-xs text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2.5">
          <span>Road: <strong className="text-slate-700">{market.roadCondition || 'Highway'}</strong></span>
          <span>Transit: ~{market.estimatedTimeMin || 40} mins</span>
        </div>

      </div>

      {/* Card Action */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-100">
        <Button
          variant={isRecommended ? 'primary' : 'outline'}
          size="sm"
          className="w-full justify-center"
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => onSelect && onSelect(market)}
        >
          {isSelected ? 'Currently Selected' : `Select ${market.code || 'Market'}`}
        </Button>
      </div>

    </div>
  );
}

export default MarketCard;
