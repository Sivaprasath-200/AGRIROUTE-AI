import React, { useState } from 'react';
import { 
  Users, 
  Truck, 
  CheckCircle2, 
  Scale, 
  PlusCircle, 
  Trash2, 
  TrendingDown, 
  Leaf, 
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { DEFAULT_VEHICLE } from '../data/demoData';

export function SharedTransportPage({ farmerPlan }) {
  // Pre-loaded farmers strictly matching prompt:
  // Farmer A - Tomato - 300 kg
  // Farmer B - Tomato - 400 kg
  // Farmer C - Onion - 200 kg
  // Vehicle Capacity: 1000 kg
  // Total Load: 900 kg
  // Vehicle Status: Optimized
  // Estimated Shared Cost: ₹2,700
  const [poolMembers, setPoolMembers] = useState([
    { id: 1, name: 'Farmer A (Kishore)', crop: 'Tomato', qty: 300, village: 'Village A (East Sector)' },
    { id: 2, name: 'Farmer B (Ramesh)', crop: 'Tomato', qty: 400, village: 'Village A (North Sector)' },
    { id: 3, name: 'Farmer C (Priya)', crop: 'Onion', qty: 200, village: 'Village A (Crossroad)' },
  ]);

  const vehicleCapacity = DEFAULT_VEHICLE.capacityKg; // 1000 kg
  const estimatedSharedTripCost = DEFAULT_VEHICLE.baseTripCost; // ₹2,700

  // Calculate totals
  const totalLoadKg = poolMembers.reduce((sum, m) => sum + Number(m.qty || 0), 0);
  const remainingCapacity = Math.max(0, vehicleCapacity - totalLoadKg);
  const loadPercentage = Math.min(100, Math.round((totalLoadKg / vehicleCapacity) * 100));

  // Determine status
  let vehicleStatus = 'Available';
  let statusBadge = 'bg-blue-100 text-blue-800 border-blue-300';
  if (totalLoadKg >= 850 && totalLoadKg <= vehicleCapacity) {
    vehicleStatus = 'Optimized';
    statusBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  } else if (totalLoadKg > vehicleCapacity) {
    vehicleStatus = 'Overloaded';
    statusBadge = 'bg-rose-100 text-rose-800 border-rose-300';
  } else if (totalLoadKg >= 500) {
    vehicleStatus = 'Good Load';
    statusBadge = 'bg-amber-100 text-amber-800 border-amber-300';
  }

  // Cost split per farmer (proportionate to weight)
  const soloEstimatedCost = 1800; // if hired independently
  const totalSoloCost = poolMembers.length * soloEstimatedCost; // e.g. 3 * 1800 = 5400
  const totalSavings = totalSoloCost - estimatedSharedTripCost; // 5400 - 2700 = 2700

  // Quick reset to exact prompt scenario
  const handleResetToDemo = () => {
    setPoolMembers([
      { id: 1, name: 'Farmer A (Kishore)', crop: 'Tomato', qty: 300, village: 'Village A (East Sector)' },
      { id: 2, name: 'Farmer B (Ramesh)', crop: 'Tomato', qty: 400, village: 'Village A (North Sector)' },
      { id: 3, name: 'Farmer C (Priya)', crop: 'Onion', qty: 200, village: 'Village A (Crossroad)' },
    ]);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Shared Transport
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Load Pooling
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Farmers with nearby destinations can share one vehicle to reduce transportation expenses.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleResetToDemo}
          icon={Truck}
        >
          Reset to 900kg Scenario
        </Button>
      </div>

      {/* 4 Summary Cards strictly following section 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Vehicle Capacity */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wide">
            <span>Vehicle Capacity</span>
            <Scale className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 pt-1">
            {vehicleCapacity} <span className="text-sm font-semibold text-slate-500">kg</span>
          </div>
          <div className="text-xs text-slate-500">
            Mini Truck (Tata Ace / Pickup)
          </div>
        </div>

        {/* Total Load */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wide">
            <span>Total Load</span>
            <Truck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 pt-1">
            {totalLoadKg} <span className="text-sm font-semibold text-slate-500">kg</span>
          </div>
          <div className="text-xs text-emerald-700 font-semibold">
            {remainingCapacity} kg remaining headroom
          </div>
        </div>

        {/* Vehicle Status */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-300 ring-1 ring-emerald-500/20 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wide">
            <span>Vehicle Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="pt-1">
            <span className={`inline-block px-3 py-1 rounded-full text-base font-extrabold uppercase border ${statusBadge}`}>
              {vehicleStatus}
            </span>
          </div>
          <div className="text-xs text-slate-500 pt-1">
            {loadPercentage}% capacity utilized
          </div>
        </div>

        {/* Estimated Shared Cost */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wide">
            <span>Estimated Shared Cost</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 pt-1">
            ₹{estimatedSharedTripCost.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-500">
            Split across {poolMembers.length} farmers
          </div>
        </div>

      </div>

      {/* Capacity Utilization Progress Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-600" />
            Vehicle Payload Fill Status ({totalLoadKg} kg / {vehicleCapacity} kg)
          </span>
          <span className="text-emerald-700 font-extrabold">{loadPercentage}% Full</span>
        </div>

        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              totalLoadKg > vehicleCapacity ? 'bg-rose-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, loadPercentage)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>0 kg (Empty)</span>
          <span>Optimal Target: 850 - 1000 kg</span>
          <span>Max: 1000 kg</span>
        </div>
      </div>

      {/* Farmers Pooling Table & Split Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Farmers In Pool (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Current Farmers in Shared Route</h3>
              <p className="text-xs text-slate-500">Consolidating at Village Panchayat Community Shed</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              3 Confirmed
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {poolMembers.map((member) => {
              const shareFraction = totalLoadKg > 0 ? (member.qty / totalLoadKg) : 0;
              const memberShareCost = Math.round(estimatedSharedTripCost * shareFraction);
              const soloCost = 1800;
              const farmerSavings = soloCost - memberShareCost;

              return (
                <div key={member.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">{member.name}</div>
                      <div className="text-xs text-slate-500">
                        {member.village} • <span className="font-semibold text-emerald-700">{member.crop}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-slate-900">{member.qty} kg</div>
                      <div className="text-[11px] text-slate-400">
                        ({Math.round((member.qty / vehicleCapacity) * 100)}% load)
                      </div>
                    </div>

                    <div className="text-right pl-3 border-l border-slate-100">
                      <div className="text-sm font-bold text-emerald-700">₹{memberShareCost}</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">
                        Saves ₹{farmerSavings}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explanation Quote required in prompt */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/90 text-xs text-emerald-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-emerald-950">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Shared Transport Principle:
            </div>
            <p className="italic text-emerald-800 leading-relaxed">
              "Farmers with nearby destinations can share one vehicle to reduce transportation expenses."
            </p>
          </div>
        </div>

        {/* Right: Group Savings Summary & Driver Dispatch (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wide">
              <span>Collective Logistics Impact</span>
              <Leaf className="w-4 h-4 text-emerald-400" />
            </div>

            <div>
              <div className="text-xs text-slate-300">Total Group Savings</div>
              <div className="text-3xl font-black text-white mt-1">
                ₹{totalSavings.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-emerald-400 mt-1">
                Instead of paying 3 separate individual hires (₹5,400 total)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Carbon Reduction</span>
                <span className="font-bold text-white">42% fewer vehicle trips</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Transit Dispatch</span>
                <span className="font-bold text-white">5:30 AM Tomorrow</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
              Pickup Sequence: Village A (East) &rarr; Village A (North) &rarr; APMC Mandi Gate 2.
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900">How Shared Billing Works</h4>
            <div className="text-xs text-slate-600 space-y-2">
              <p>
                1. <strong>Fair Pro-rata Split:</strong> Each farmer pays directly according to their harvest weight share.
              </p>
              <p>
                2. <strong>One Collection Point:</strong> Farmers bring produce to the panchayat community shelter 2.5 km away.
              </p>
              <p>
                3. <strong>Pre-verified Scale:</strong> Weights are recorded on the community digital weighbridge before departure.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default SharedTransportPage;
