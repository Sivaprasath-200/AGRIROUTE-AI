import React from 'react';
import { 
  Scale, 
  Store, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Users, 
  TrendingUp, 
  MapPin, 
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';
import Button from '../components/Button';
import TransportCard from '../components/TransportCard';
import RiskCard from '../components/RiskCard';
import MarketCard from '../components/MarketCard';
import RouteCard from '../components/RouteCard';
import { DEMO_MARKETS } from '../data/demoData';
import { 
  calculateTransportCost, 
  calculateSpoilageRisk, 
  recommendTransport,
  evaluateMarkets 
} from '../utils/calculations';

export function DashboardPage({
  farmerPlan,
  onNavigate,
  onEditPlan
}) {
  const crop = farmerPlan?.crop || 'Tomato';
  const quantity = Number(farmerPlan?.quantity) || 500;
  const farmerName = farmerPlan?.farmerName || 'Kishore';
  const farmLocation = farmerPlan?.farmLocation || 'Village A';
  const preferredDest = farmerPlan?.preferredDestination || 'Market B';

  const targetMarket = DEMO_MARKETS.find(m => m.code === preferredDest) || DEMO_MARKETS[1];
  const distance = targetMarket.distance || 18;

  // Run calculation utilities
  const transportCost = calculateTransportCost(distance, quantity, false);
  const spoilageRisk = calculateSpoilageRisk(crop, distance, quantity);
  const transportRec = recommendTransport(quantity);
  const evaluatedMarkets = evaluateMarkets(DEMO_MARKETS, crop, quantity);
  const recommendedMarket = evaluatedMarkets.find(m => m.isRecommended) || evaluatedMarkets[1];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Welcome & Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Welcome back, {farmerName}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Active Plan
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Dispatch overview for {quantity} kg of {crop} from {farmLocation} to {targetMarket.name}.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={onEditPlan}
          >
            Edit Farm Inputs
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => onNavigate('map')}
          >
            Open Route Map
          </Button>
        </div>
      </div>

      {/* 4 REQUIRED DASHBOARD CARDS */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
          Operational Overview
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Produce */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <span>Total Produce</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <Scale className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              {quantity} <span className="text-base font-semibold text-slate-500">kg</span>
            </div>
            <div className="text-xs text-slate-600 font-medium">
              Crop: <strong className="text-slate-900">{crop}</strong>
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              Harvested at {farmLocation}
            </div>
          </div>

          {/* Card 2: Recommended Market */}
          <div className="bg-white p-6 rounded-2xl border border-emerald-300 ring-1 ring-emerald-500/20 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 uppercase tracking-wide">
              <span>Recommended Market</span>
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <Store className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              {targetMarket.code}
            </div>
            <div className="text-xs text-emerald-700 font-semibold truncate">
              {targetMarket.name}
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              Distance: <strong>{distance} km</strong> • High Demand
            </div>
          </div>

          {/* Card 3: Transport Cost */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <span>Transport Cost</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              ₹{transportCost.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-emerald-700 font-medium">
              ₹{(transportCost / quantity).toFixed(1)} / kg freight
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              Save ~₹600 if pooled with neighbors
            </div>
          </div>

          {/* Card 4: Risk Level */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <span>Risk Level</span>
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <div className="pt-1">
              <span className={`inline-block px-3.5 py-1 rounded-full text-base font-black tracking-wide uppercase border ${spoilageRisk.badgeColor}`}>
                {spoilageRisk.level}
              </span>
            </div>
            <div className="text-xs text-slate-600 font-medium">
              Sensitivity: <strong className="text-slate-900">{spoilageRisk.score}/100</strong>
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              Optimal early morning window
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 1: TRANSPORT PLAN */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">1. Transport Plan</h2>
            <p className="text-xs text-slate-500">Vehicle recommendation and dispatch details</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('shared')}
          >
            Explore Full Pool &rarr;
          </Button>
        </div>

        <TransportCard
          recommendation={transportRec}
          quantity={quantity}
          distance={distance}
          estimatedCost={transportCost}
          onViewSharedPool={() => onNavigate('shared')}
        />
      </section>

      {/* SECTION 2: MARKET COMPARISON */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">2. Market Comparison</h2>
            <p className="text-xs text-slate-500">Comparing 3 demo APMC markets for {quantity} kg of {crop}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('markets')}
          >
            Full Comparison View &rarr;
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {evaluatedMarkets.map(m => (
            <MarketCard
              key={m.id}
              market={m}
              crop={crop}
              quantity={quantity}
              isRecommended={m.isRecommended}
              isSelected={targetMarket.code === m.code}
              onSelect={() => onNavigate('markets')}
            />
          ))}
        </div>
      </section>

      {/* SECTION 3: SHARED TRANSPORT & SECTION 4: PRODUCE RISK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SECTION 3: SHARED TRANSPORT (7 cols) */}
        <section className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">3. Shared Transport (Load Pooling)</h2>
              <p className="text-xs text-slate-500">Consolidated vehicle load for Village A farmers</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Optimized (900 kg / 1000 kg)
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Farmer A (Kishore)</span>
              <span className="text-sm font-bold text-slate-800">300 kg</span>
              <span className="text-[10px] text-emerald-700 block font-semibold">Tomato</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Farmer B (Ramesh)</span>
              <span className="text-sm font-bold text-slate-800">400 kg</span>
              <span className="text-[10px] text-emerald-700 block font-semibold">Tomato</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Farmer C (Priya)</span>
              <span className="text-sm font-bold text-slate-800">200 kg</span>
              <span className="text-[10px] text-amber-700 block font-semibold">Onion</span>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 flex items-center justify-between">
            <div>
              <span className="font-bold">Total Load: 900 kg</span> • Status: <strong>Optimized</strong>
              <div className="text-[11px] text-emerald-700">Estimated Shared Vehicle Cost: ₹2,700</div>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('shared')}
            >
              Manage Pool
            </Button>
          </div>
        </section>

        {/* SECTION 4: PRODUCE RISK (5 cols) */}
        <section className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">4. Produce Spoilage Risk</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('spoilage')}
            >
              Test Rules &rarr;
            </Button>
          </div>

          <RiskCard
            riskData={spoilageRisk}
            produce={crop}
            distance={distance}
            quantity={quantity}
          />
        </section>

      </div>

    </div>
  );
}

export default DashboardPage;
