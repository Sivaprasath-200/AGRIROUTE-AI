import React from 'react';
import { 
  Compass, 
  PlusCircle, 
  Store, 
  Users, 
  ShieldAlert, 
  Map, 
  HelpCircle,
  Home,
  CheckCircle2,
  TrendingUp,
  Leaf
} from 'lucide-react';

export function Sidebar({ activePage, setActivePage, farmerPlan }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass, desc: 'Overview & Recommendations' },
    { id: 'plan', label: 'Plan Transport', icon: PlusCircle, desc: 'Create / Edit Farm Details' },
    { id: 'markets', label: 'Markets', icon: Store, desc: 'Compare 3 APMC Markets' },
    { id: 'shared', label: 'Shared Transport', icon: Users, desc: 'Pooling & Load Sharing' },
    { id: 'spoilage', label: 'Produce Risk', icon: ShieldAlert, desc: 'Transit Perishability Calculator' },
    { id: 'map', label: 'Route Visualizer', icon: Map, desc: 'Farm to Mandi Path' },
    { id: 'about', label: 'About AGRIROUTE', icon: HelpCircle, desc: 'Problem & Hackathon Impact' },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white border-r border-slate-200/80 p-4 lg:min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <div className="space-y-6">
        
        {/* Navigation list */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold tracking-wider uppercase text-slate-400">
            Main Navigation
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 group ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                      : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'
                  }`} />
                  <div className="min-w-0">
                    <div className="text-xs truncate">{item.label}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Current Active Plan Snapshot */}
        {farmerPlan && (
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Active Farmer Plan
              </span>
              <span className="text-[10px] font-semibold bg-emerald-200/70 text-emerald-800 px-2 py-0.5 rounded-md">
                Demo
              </span>
            </div>

            <div className="text-xs space-y-1 text-slate-700 bg-white/80 p-2.5 rounded-xl border border-emerald-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Farmer:</span>
                <span className="font-semibold text-slate-900">{farmerPlan.farmerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Produce:</span>
                <span className="font-semibold text-slate-900">{farmerPlan.crop} ({farmerPlan.quantity} kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Origin:</span>
                <span className="font-semibold text-slate-900">{farmerPlan.farmLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target:</span>
                <span className="font-semibold text-emerald-700">{farmerPlan.preferredDestination}</span>
              </div>
            </div>

            <button
              onClick={() => setActivePage('plan')}
              className="w-full text-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline pt-0.5"
            >
              Modify Plan Details →
            </button>
          </div>
        )}

      </div>

      {/* Footer Info Box */}
      <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 font-medium text-slate-500">
          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          <span>AGRIROUTE AI Hackathon MVP</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          Rule-based smart assistant for smallholder farm freight planning.
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;
