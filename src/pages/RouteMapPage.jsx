import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Truck, 
  Home, 
  Warehouse, 
  Building2, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Info,
  Compass,
  ArrowRight
} from 'lucide-react';
import Button from '../components/Button';
import RouteCard from '../components/RouteCard';
import { DEMO_MARKETS } from '../data/demoData';

export function RouteMapPage({ farmerPlan }) {
  const [selectedMarketCode, setSelectedMarketCode] = useState(
    farmerPlan?.preferredDestination || 'Market B'
  );

  const activeMarket = DEMO_MARKETS.find(m => m.code === selectedMarketCode) || DEMO_MARKETS[1];
  const origin = farmerPlan?.farmLocation || 'Village A';

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Interactive Route Visualizer
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Prototype Map
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Simulated corridor from farm origin to regional APMC mandi destination.
          </p>
        </div>

        {/* Market Switcher */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-semibold text-slate-500 pl-2">Destination:</span>
          {DEMO_MARKETS.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMarketCode(m.code)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedMarketCode === m.code
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {m.code} ({m.distance} km)
            </button>
          ))}
        </div>
      </div>

      {/* Main Full-Size Route Card Component */}
      <RouteCard
        farmerLocation={origin}
        collectionPoint="Village Panchayat Consolidation Point (Shed 1)"
        targetMarket={`${activeMarket.code} (${activeMarket.name})`}
        totalDistance={activeMarket.distance}
        totalTime={`${activeMarket.estimatedTimeMin} mins`}
        showFullMap
      />

      {/* Technical Route Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
            <Home className="w-4 h-4 text-emerald-600" />
            <span>Leg 1: Farm Gate to Consolidation</span>
          </div>
          <div className="text-lg font-bold text-slate-900">2.5 km (Unpaved/Local)</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Produce transported via small trolley or mini-van to avoid blocking main highway lanes.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
            <Warehouse className="w-4 h-4 text-blue-600" />
            <span>Leg 2: Loading & Weighing</span>
          </div>
          <div className="text-lg font-bold text-slate-900">15 - 20 mins Buffer</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Consolidation with Farmer A, B & C batches; digital weighing and vehicle manifest creation.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
            <Building2 className="w-4 h-4 text-purple-600" />
            <span>Leg 3: Highway Transit to APMC</span>
          </div>
          <div className="text-lg font-bold text-slate-900">{activeMarket.distance - 2.5} km (State Highway)</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Direct transit route with smooth surface to protect tender crops from mechanical vibration.
          </p>
        </div>

      </div>

      {/* Map Prototype Disclaimer */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-center justify-between">
        <span>Route visualization – prototype vector diagram for hackathon evaluation.</span>
        <span className="font-semibold text-slate-700">Future integration: Leaflet.js / OpenStreetMap GIS</span>
      </div>

    </div>
  );
}

export default RouteMapPage;
