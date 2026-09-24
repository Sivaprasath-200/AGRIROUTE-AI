import React, { useState } from 'react';
import { 
  Store, 
  TrendingUp, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Award, 
  DollarSign, 
  ArrowRight,
  Filter,
  Layers,
  Info
} from 'lucide-react';
import MarketCard from '../components/MarketCard';
import Button from '../components/Button';
import { DEMO_MARKETS, CROPS } from '../data/demoData';
import { evaluateMarkets } from '../utils/calculations';

export function MarketComparisonPage({
  farmerPlan,
  onSelectMarket
}) {
  const [selectedCrop, setSelectedCrop] = useState(farmerPlan?.crop || 'Tomato');
  const [quantity, setQuantity] = useState(farmerPlan?.quantity || 500);

  const evaluatedMarkets = evaluateMarkets(DEMO_MARKETS, selectedCrop, quantity);
  const recommendedMarket = evaluatedMarkets.find(m => m.isRecommended) || evaluatedMarkets[1];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Compare Regional APMC Markets
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
              Demo Data
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Compare travel distances, wholesale prices, freight costs, and net farmer returns across 3 demo APMC Mandis.
          </p>
        </div>

        {/* Quick Simulator Bar */}
        <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 pl-1">Crop:</span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {CROPS.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Quantity:</span>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="300">300 kg</option>
              <option value="500">500 kg (Default)</option>
              <option value="800">800 kg</option>
              <option value="1000">1000 kg</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Prototype Demonstration Notice:</strong>
          <span className="ml-1 text-amber-800">
            Wholesale prices and freight tariffs shown below are predefined demo benchmarks for hackathon presentation and do NOT represent real-time live APMC auctions.
          </span>
        </div>
      </div>

      {/* Market Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {evaluatedMarkets.map(market => (
          <MarketCard
            key={market.id}
            market={market}
            crop={selectedCrop}
            quantity={quantity}
            isRecommended={market.isRecommended}
            isSelected={farmerPlan?.preferredDestination === market.code}
            onSelect={(m) => onSelectMarket && onSelectMarket(m.code)}
          />
        ))}
      </div>

      {/* Structured Comparison Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Detailed Financial Comparison Table</h3>
            <p className="text-xs text-slate-500">Based on {quantity} kg of {selectedCrop}</p>
          </div>
          <div className="text-xs text-slate-400">
            Formula: Estimated Revenue (kg × ₹/kg) - Transport Cost = Estimated Net Return
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Market</th>
                <th className="py-3.5 px-6">Distance</th>
                <th className="py-3.5 px-6">Demand</th>
                <th className="py-3.5 px-6">Wholesale Price</th>
                <th className="py-3.5 px-6">Gross Revenue</th>
                <th className="py-3.5 px-6">Transport Cost</th>
                <th className="py-3.5 px-6">Est. Net Return</th>
                <th className="py-3.5 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {evaluatedMarkets.map(market => (
                <tr 
                  key={market.id}
                  className={`hover:bg-slate-50/70 transition-colors ${
                    market.isRecommended ? 'bg-emerald-50/30 font-semibold' : ''
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{market.code}</div>
                    <div className="text-[11px] text-slate-400">{market.name}</div>
                  </td>
                  <td className="py-4 px-6 font-medium">
                    {market.distance} km
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                      market.demand === 'High' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                      'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {market.demand}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-900 font-bold">
                    ₹{market.cropPrice} / kg
                  </td>
                  <td className="py-4 px-6">
                    ₹{market.grossRevenue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-6 text-amber-700 font-semibold">
                    ₹{market.transportCost.toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-base font-extrabold text-emerald-700">
                      ₹{market.netReturn.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {market.isRecommended ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-600 text-white">
                        <Award className="w-3 h-3" />
                        Best Choice
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Alternative</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table summary note */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong>Recommended Choice: {recommendedMarket.code}</strong> yields the highest net return (<strong>₹{recommendedMarket.netReturn.toLocaleString('en-IN')}</strong>) despite being 6 km further than Market A, because the higher APMC mandi price (₹{recommendedMarket.cropPrice}/kg) outweighs the added freight cost.
          </div>
          {onSelectMarket && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onSelectMarket(recommendedMarket.code)}
            >
              Apply {recommendedMarket.code} to My Plan
            </Button>
          )}
        </div>
      </div>

    </div>
  );
}

export default MarketComparisonPage;
