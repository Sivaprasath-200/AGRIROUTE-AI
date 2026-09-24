import React from 'react';
import { 
  Truck, 
  Sprout, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  DollarSign, 
  Clock, 
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export function LandingPage({ onPlanTransport, onViewDemo }) {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-emerald-100/80 rounded-3xl p-6 sm:p-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hackathon MVP • Smart Agriculture Logistics</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            AGRIROUTE <span className="text-emerald-600">AI</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-slate-700 max-w-2xl mx-auto">
            Smart transportation and market planning for small farmers.
          </p>

          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AGRIROUTE AI helps farmers choose a practical transport plan, identify suitable nearby markets, estimate transportation costs, and reduce unnecessary travel.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={onPlanTransport}
            >
              Plan My Transport
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={Truck}
              onClick={onViewDemo}
            >
              View Demo Plan
            </Button>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-100 shadow-2xs text-center">
              <div className="text-xl font-extrabold text-emerald-700">~30%</div>
              <div className="text-xs text-slate-500 font-medium">Shared Cost Savings</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-100 shadow-2xs text-center">
              <div className="text-xl font-extrabold text-slate-800">3 APMC</div>
              <div className="text-xs text-slate-500 font-medium">Market Benchmarks</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-100 shadow-2xs text-center">
              <div className="text-xl font-extrabold text-emerald-700">Low/High</div>
              <div className="text-xs text-slate-500 font-medium">Spoilage Risk Meter</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-emerald-100 shadow-2xs text-center">
              <div className="text-xl font-extrabold text-slate-800">100%</div>
              <div className="text-xs text-slate-500 font-medium">Free Prototype</div>
            </div>
          </div>

        </div>
      </section>

      {/* The Problem Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            The Reality
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3">The Problem Small Farmers Face</h2>
          <p className="text-sm text-slate-600 mt-2">
            Smallholder farmers in remote villages endure disproportionately high logistics friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">Excessive Individual Freight Costs</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Hiring an entire small truck for 300–500 kg loads leads to high per-kg freight, wiping out 25%–40% of harvest profits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">Perishability & Delay Losses</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sensitive crops like tomatoes and bananas deteriorate quickly on rough village roads without timely dispatch planning.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">Opaque Market Comparison</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Farmers travel blindly to the nearest mandi without knowing if a slightly further regional APMC offers higher net returns.
            </p>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-5 relative z-10">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-300 bg-emerald-800/80 px-3 py-1 rounded-full border border-emerald-700">
              Our Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">
              A Direct Digital Assistant Designed for Everyday Farmers
            </h2>
            <p className="text-base text-emerald-100 leading-relaxed">
              AGRIROUTE AI provides small and remote farmers with clean, transparent intelligence:
              instant market comparisons, vehicle load pooling with neighbors, and spoilage risk alerts based on clear, transparent rules.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-emerald-50">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Zero complex hardware or GPS trackers needed</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Simple rule-based calculations without black-box AI</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Automated net return calculation (Revenue - Freight)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Shared transport pool matching for neighboring farms</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Simple 3-Step Flow
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3">How It Works</h2>
          <p className="text-sm text-slate-600 mt-2">
            Generate an actionable dispatch plan in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="text-4xl font-black text-emerald-600/30 mb-2">01</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Enter Harvest Details</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provide farmer name, village origin, crop type (e.g. Tomato, Onion), and volume in kilograms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="text-4xl font-black text-emerald-600/30 mb-2">02</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Smart Rule Engine Evaluates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The engine balances travel distance against Mandi wholesale price to calculate true net revenue and transit perishability.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <div className="text-4xl font-black text-emerald-600/30 mb-2">03</div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Get Route & Shared Transport</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive your recommended market, shared vehicle allocation, route checkpoints, and estimated cost savings.
            </p>
          </div>

        </div>
      </section>

      {/* Key Features Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Platform Capabilities
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3">Key Features</h2>
          <p className="text-sm text-slate-600 mt-2">
            Essential tools for small and marginal farm transportation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2.5">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 w-fit">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Market Comparison</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compare 3 regional markets side-by-side with net return after deducting travel costs.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2.5">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-700 w-fit">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Shared Transport Pooling</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Combine smaller loads (300-500 kg) into a single 1,000 kg mini-truck to slash freight bills.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2.5">
            <div className="p-3 rounded-xl bg-amber-50 text-amber-700 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Produce Spoilage Risk</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Low/Medium/High sensitivity meter based on crop perishability, crate load, and transit distance.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2.5">
            <div className="p-3 rounded-xl bg-purple-50 text-purple-700 w-fit">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Visual Route Planning</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clear route card from Farm Origin to Village Consolidation Point and terminal APMC Mandi.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Footer banner */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Optimize Your Agricultural Freight?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Test the live hackathon prototype with demo data or enter your custom farm quantity.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={onPlanTransport}
            >
              Create Your Transport Plan
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={onViewDemo}
            >
              Explore Kishore’s Tomato Plan
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default LandingPage;
