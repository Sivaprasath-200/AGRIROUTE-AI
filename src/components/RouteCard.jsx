import React from 'react';
import { 
  MapPin, 
  Navigation, 
  ArrowDown, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Warehouse, 
  Home, 
  Truck,
  Layers
} from 'lucide-react';

export function RouteCard({
  farmerLocation = 'Village A',
  collectionPoint = 'Village Panchayat Consolidation Point',
  targetMarket = 'Market B (District APMC Hub)',
  totalDistance = 18,
  totalTime = '45 mins',
  showFullMap = false
}) {
  const steps = [
    {
      index: 1,
      title: 'Farm Origin',
      location: farmerLocation,
      detail: 'Farm gate collection, crate loading',
      distance: '0 km',
      icon: Home,
      badge: 'Start',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      index: 2,
      title: 'Collection Point',
      location: collectionPoint,
      detail: 'Shared vehicle consolidation & check-in',
      distance: '2.5 km',
      icon: Warehouse,
      badge: 'Consolidation Hub',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    {
      index: 3,
      title: 'Destination',
      location: targetMarket,
      detail: 'APMC wholesale auction & unloading bay',
      distance: `${totalDistance} km`,
      icon: Building2,
      badge: 'Final Market',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
    }
  ];

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Planned Transport Route</h3>
            <p className="text-xs text-slate-500">From farm origin to terminal market</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            {totalDistance} km total
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            ~{totalTime}
          </span>
        </div>
      </div>

      {/* Map visual canvas (CSS styled professional terrain grid) */}
      <div className="relative bg-slate-900 text-white p-6 overflow-hidden min-h-[200px] flex flex-col justify-between">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#10b981 1px, transparent 1px), radial-gradient(#10b981 1px, #0f172a 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }}
        />

        {/* Prototype Watermark Label */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-slate-800/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-xs">
            <Layers className="w-3 h-3" />
            Route visualization – prototype
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline-block">
            GPS Vector Simulation • Clear Roadway
          </span>
        </div>

        {/* Illustrated Route Path */}
        <div className="relative z-10 my-4 sm:my-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            
            {/* Step 1: Farm Origin */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-3.5 rounded-xl backdrop-blur-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shrink-0 font-bold text-sm">
                1
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Farm Origin</span>
                <p className="text-xs font-semibold text-white truncate">{farmerLocation}</p>
                <p className="text-[10px] text-slate-400">0 km</p>
              </div>
            </div>

            {/* Step 2: Collection Point */}
            <div className="bg-slate-800/80 border border-blue-500/40 p-3.5 rounded-xl backdrop-blur-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/40 shrink-0 font-bold text-sm">
                2
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-blue-400">Collection Point</span>
                <p className="text-xs font-semibold text-white truncate">{collectionPoint}</p>
                <p className="text-[10px] text-slate-400">+2.5 km</p>
              </div>
            </div>

            {/* Step 3: Target Market */}
            <div className="bg-slate-800/80 border border-purple-500/40 p-3.5 rounded-xl backdrop-blur-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40 shrink-0 font-bold text-sm">
                3
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-purple-400">Destination</span>
                <p className="text-xs font-semibold text-white truncate">{targetMarket}</p>
                <p className="text-[10px] text-slate-400">{totalDistance} km total</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom map status bar */}
        <div className="relative z-10 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-2.5">
          <span>Highway condition: <strong>Clear / Motorable</strong></span>
          <span className="text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Direct corridor approved for agricultural transport
          </span>
        </div>
      </div>

      {/* Step by Step Flow Breakdown */}
      <div className="p-5 bg-white">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
          Route Transit Stages
        </h4>

        <div className="space-y-4 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200" />

          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={st.index} className="relative flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center text-slate-700 shadow-xs z-10 group-hover:border-emerald-500 transition-colors">
                  <Icon className="w-4 h-4 text-slate-600 group-hover:text-emerald-600" />
                </div>
                <div className="flex-1 bg-slate-50/70 hover:bg-slate-50 border border-slate-100 rounded-xl p-3 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900">{st.title}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${st.badgeColor}`}>
                      {st.badge}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-700 mt-0.5">{st.location}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{st.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default RouteCard;
