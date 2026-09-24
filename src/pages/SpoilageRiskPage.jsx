import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Thermometer, 
  Clock, 
  HelpCircle,
  RotateCcw,
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import RiskCard from '../components/RiskCard';
import Button from '../components/Button';
import Input from '../components/Input';
import { CROPS } from '../data/demoData';
import { calculateSpoilageRisk } from '../utils/calculations';

export function SpoilageRiskPage({ farmerPlan }) {
  const [produce, setProduce] = useState(farmerPlan?.crop || 'Tomato');
  const [distance, setDistance] = useState(18);
  const [quantity, setQuantity] = useState(farmerPlan?.quantity || 500);

  const riskResult = calculateSpoilageRisk(produce, distance, quantity);

  const cropOptions = CROPS.map(c => ({
    value: c.name,
    label: `${c.icon} ${c.name} (${c.category})`
  }));

  // Quick preset test buttons
  const setPreset = (cropName, dist, qty) => {
    setProduce(cropName);
    setDistance(dist);
    setQuantity(qty);
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Produce Spoilage Risk Engine
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            Rule-Based
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Estimate harvest transit vulnerability based on produce sensitivity, crate load, and road distance.
        </p>
      </div>

      {/* Preset Scenarios Buttons */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Quick Benchmark Scenarios from Hackathon Prompt:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPreset('Tomato', 18, 500)}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 font-medium transition-colors"
          >
            🍅 Tomato + Short (18 km) &rarr; <span className="font-bold text-emerald-700">LOW</span>
          </button>
          <button
            onClick={() => setPreset('Tomato', 65, 500)}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-800 border border-slate-200 font-medium transition-colors"
          >
            🍅 Tomato + Long (65 km) &rarr; <span className="font-bold text-rose-700">HIGH</span>
          </button>
          <button
            onClick={() => setPreset('Potato', 80, 800)}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 font-medium transition-colors"
          >
            🥔 Potato + Any Distance &rarr; <span className="font-bold text-emerald-700">LOW</span>
          </button>
          <button
            onClick={() => setPreset('Banana', 60, 400)}
            className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-800 border border-slate-200 font-medium transition-colors"
          >
            🍌 Banana + Long (60 km) &rarr; <span className="font-bold text-rose-700">HIGH</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Inputs on Left, Realtime RiskCard on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input Form (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Simulation Inputs</h3>
            <p className="text-xs text-slate-500">Adjust any parameter to re-evaluate the risk output</p>
          </div>

          <div className="space-y-5">
            {/* Input 1: Produce Type */}
            <Input
              label="Produce Type"
              options={cropOptions}
              value={produce}
              onChange={(e) => setProduce(e.target.value)}
              helperText="Perishability profile"
            />

            {/* Input 2: Quantity */}
            <Input
              label="Quantity (kg)"
              type="number"
              min="10"
              max="5000"
              step="50"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              helperText="Load weight stress"
            />

            {/* Input 3: Estimated Distance Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-700">
                <span>Estimated Travel Distance</span>
                <span className="text-base font-extrabold text-emerald-700 lowercase">
                  {distance} km
                </span>
              </div>

              <input
                type="range"
                min="5"
                max="120"
                step="1"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5 km (Local)</span>
                <span>50 km (Regional)</span>
                <span>120 km (Metro)</span>
              </div>
            </div>
          </div>

          {/* Reset button */}
          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              icon={RotateCcw}
              onClick={() => {
                setProduce('Tomato');
                setDistance(18);
                setQuantity(500);
              }}
            >
              Reset to Defaults
            </Button>
          </div>
        </div>

        {/* Right: Output Risk Card (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <RiskCard
            riskData={riskResult}
            produce={produce}
            distance={distance}
            quantity={quantity}
            showControls
          />

          {/* Transparent Logic Rules Reference */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-xs text-slate-700">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-600" />
              <span>Implemented Decision Tree Rules:</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
              <li>
                <strong>Potato & Paddy:</strong> Inherent low perishability &rarr; <em>LOW</em> risk across regular farm journeys.
              </li>
              <li>
                <strong>Tomato:</strong> Sensitive to ambient heat & vibration. Distance &le; 20 km &rarr; <em>LOW</em>; 21–40 km &rarr; <em>MEDIUM</em>; &gt; 40 km &rarr; <em>HIGH</em>.
              </li>
              <li>
                <strong>Banana:</strong> Vulnerable to bruising and premature ripening. Distance &le; 25 km &rarr; <em>LOW</em>; 26–50 km &rarr; <em>MEDIUM</em>; &gt; 50 km &rarr; <em>HIGH</em>.
              </li>
              <li>
                <strong>Quantity Factor:</strong> Very heavy single loads (&ge; 1,200 kg) experience bottom-tier crushing stress.
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}

export default SpoilageRiskPage;
