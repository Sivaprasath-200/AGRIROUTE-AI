import React from 'react';
import { 
  User, 
  MapPin, 
  Scale, 
  Sprout, 
  Store, 
  Truck, 
  ShieldCheck, 
  DollarSign, 
  Navigation, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import TransportCard from '../components/TransportCard';
import RiskCard from '../components/RiskCard';
import RouteCard from '../components/RouteCard';
import { DEMO_MARKETS, CROPS } from '../data/demoData';
import { 
  calculateTransportCost, 
  calculateSpoilageRisk, 
  recommendTransport,
  evaluateMarkets
} from '../utils/calculations';

export function SmartPlanResultPage({
  farmerPlan,
  onNavigate,
  onEditPlan
}) {
  const crop = farmerPlan?.crop || 'Tomato';
  const quantity = Number(farmerPlan?.quantity) || 500;
  const farmerName = farmerPlan?.farmerName || 'Kishore';
  const farmLocation = farmerPlan?.farmLocation || 'Village A';
  const preferredDest = farmerPlan?.preferredDestination || 'Market B';

  // Find destination market
  const targetMarket = DEMO_MARKETS.find(m => m.code === preferredDest) || DEMO_MARKETS[1]; // default Market B
  const distance = targetMarket.distance || 18;

  // Run calculation logic
  const transportCost = calculateTransportCost(distance, quantity, false);
  const spoilageRisk = calculateSpoilageRisk(crop, distance, quantity);
  const transportRec = recommendTransport(quantity);
  const marketAnalysis = evaluateMarkets(DEMO_MARKETS, crop, quantity);
  const bestMarket = marketAnalysis.find(m => m.isRecommended) || targetMarket;

  // Price & revenue
  const pricePerKg = targetMarket.prices[crop] || 25;
  const grossRevenue = quantity * pricePerKg;
  const netReturn = grossRevenue - transportCost;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner / Farmer Identity Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Smart Plan Generated Successfully
            </span>
            <span className="text-xs text-slate-400">Rule-based MVP</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Transport & Market Plan for {farmerName}
          </h1>

          <p className="text-sm text-slate-600">
            Based on your harvest dispatch date of <strong>{farmerPlan?.harvestDate || 'Today'}</strong> from <strong>{farmLocation}</strong>.
          </p>
        </div>

        {/* Farmer Inputs Summary Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
          
          <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Farmer</span>
            <span className="font-bold text-slate-900">{farmerName}</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Produce</span>
            <span className="font-bold text-emerald-700">{crop}</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Quantity</span>
            <span className="font-bold text-slate-900">{quantity} kg</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Origin Farm</span>
            <span className="font-bold text-slate-900">{farmLocation}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onEditPlan}
            className="text-xs"
          >
            Edit
          </Button>
        </div>
      </div>

      {/* 5 Core Required Highlight Cards */}
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 px-1">
          Key Plan Recommendations
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* 1. RECOMMENDED MARKET */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-300 shadow-xs ring-1 ring-emerald-500/20 space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wide">
              <span>Recommended Market</span>
              <Store className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-extrabold text-slate-900 pt-1">
              {targetMarket.code}
            </div>
            <div className="text-xs text-emerald-700 font-semibold truncate">
              {targetMarket.name}
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              Demand: <strong className="text-emerald-700">{targetMarket.demand}</strong>
            </div>
          </div>

          {/* 2. ESTIMATED DISTANCE */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wide">
              <span>Estimated Distance</span>
              <MapPin className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl font-extrabold text-slate-900 pt-1">
              {distance} <span className="text-sm font-medium text-slate-500">km</span>
            </div>
            <div className="text-xs text-slate-500">
              Transit: ~{targetMarket.estimatedTimeMin || 45} mins
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              Road: {targetMarket.roadCondition || 'Paved'}
            </div>
          </div>

          {/* 3. ESTIMATED TRANSPORT COST */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wide">
              <span>Est. Transport Cost</span>
              <Truck className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl font-extrabold text-slate-900 pt-1">
              ₹{transportCost.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-emerald-700 font-medium">
              ₹{(transportCost / quantity).toFixed(1)} / kg freight
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              Standard local freight rate
            </div>
          </div>

          {/* 4. SPOILAGE RISK */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wide">
              <span>Spoilage Risk</span>
              <ShieldCheck className={`w-4 h-4 ${
                spoilageRisk.level === 'LOW' ? 'text-emerald-600' : 
                spoilageRisk.level === 'MEDIUM' ? 'text-amber-600' : 'text-rose-600'
              }`} />
            </div>
            <div className="pt-1">
              <span className={`inline-block px-3 py-0.5 rounded-full text-sm font-extrabold uppercase border ${spoilageRisk.badgeColor}`}>
                {spoilageRisk.level}
              </span>
            </div>
            <div className="text-xs text-slate-500 pt-1">
              Index: {spoilageRisk.score} / 100
            </div>
            <div className="text-[11px] text-slate-400">
              {crop} perishability
            </div>
          </div>

          {/* 5. TRANSPORT PLAN */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wide">
              <span>Transport Plan</span>
              <Truck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-sm font-extrabold text-slate-900 pt-1 leading-snug">
              {transportRec.type}
            </div>
            <div className="text-xs text-emerald-700 font-semibold">
              Save {transportRec.savingsEstimate}
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              Consolidation ready
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid: Visual Route Card & Transport Plan Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Visual Route Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <RouteCard
            farmerLocation={farmLocation}
            collectionPoint="Village Common Collection Point (Shed 1)"
            targetMarket={`${targetMarket.code} (${targetMarket.name})`}
            totalDistance={distance}
            totalTime={`${targetMarket.estimatedTimeMin || 45} mins`}
          />

          {/* Transparent Rule-based Explanation Card */}
          <div className="bg-emerald-50/60 rounded-2xl border border-emerald-200/80 p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Info className="w-4 h-4 text-emerald-700" />
              <span>How this recommendation was generated (Rule-Based Engine)</span>
            </div>
            <div className="text-xs text-emerald-800 space-y-2 leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="font-bold text-emerald-950">1. Transport Pooling:</span>
                <span>Since harvest quantity is {quantity} kg (&ge; 400 kg), our logic recommends <strong>Shared Transport</strong> to prevent paying full dedicated truck fares.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-emerald-950">2. Spoilage Sensitivity:</span>
                <span>{crop} is classified as high/medium sensitivity. However, with distance at {distance} km (&le; 20 km), transport risk is assessed as <strong>LOW</strong>.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-emerald-950">3. Net Revenue Optimization:</span>
                <span>Wholesale price at {targetMarket.code} is ₹{pricePerKg}/kg. Gross revenue is ₹{grossRevenue.toLocaleString('en-IN')}, leaving an estimated net return of <strong>₹{netReturn.toLocaleString('en-IN')}</strong> after freight.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Transport Details & Risk Assessment (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <TransportCard
            recommendation={transportRec}
            quantity={quantity}
            distance={distance}
            estimatedCost={transportCost}
            onViewSharedPool={() => onNavigate('shared')}
          />

          <RiskCard
            riskData={spoilageRisk}
            produce={crop}
            distance={distance}
            quantity={quantity}
          />

        </div>

      </div>

      {/* Quick Navigation to Other Sections */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4">Explore Related Plan Modules</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <button
            onClick={() => onNavigate('markets')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-all duration-150 group"
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-emerald-800 mb-1">
              <span>Compare All 3 Markets</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-slate-500">
              Inspect Market A, B, and C prices, distances, and net returns.
            </p>
          </button>

          <button
            onClick={() => onNavigate('shared')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-all duration-150 group"
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-emerald-800 mb-1">
              <span>Shared Transport Pool</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-slate-500">
              See Farmer A, B & C load sharing and vehicle capacity.
            </p>
          </button>

          <button
            onClick={() => onNavigate('spoilage')}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-all duration-150 group"
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-emerald-800 mb-1">
              <span>Interactive Spoilage Tool</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-xs text-slate-500">
              Test how distance and produce types impact perishability.
            </p>
          </button>

        </div>
      </div>

    </div>
  );
}

export default SmartPlanResultPage;
