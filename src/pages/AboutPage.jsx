import React from 'react';
import { 
  HelpCircle, 
  Target, 
  Lightbulb, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Truck, 
  TrendingUp, 
  Users, 
  Sprout,
  ArrowRight,
  Code2
} from 'lucide-react';
import Button from '../components/Button';

export function AboutPage({ onGetStarted }) {
  const impacts = [
    {
      title: 'Reduce Unnecessary Transportation Cost',
      desc: 'Eliminates solo truck hiring for small volumes by matching neighboring farmers into a single consolidated freight pool, saving 25%–35% on vehicle expenses.'
    },
    {
      title: 'Improve Transport Planning',
      desc: 'Enables farmers to schedule dispatches during cooler dawn windows, avoiding midday heat bottlenecks on unpaved rural roads.'
    },
    {
      title: 'Reduce Delays & Spoilage',
      desc: 'Rule-based transit vulnerability warnings alert farmers before sending perishable produce (tomatoes, bananas) on high-risk, lengthy routes.'
    },
    {
      title: 'Help Farmers Compare Market Options',
      desc: 'Shows true net earnings (Mandi wholesale gross revenue minus transport cost) instead of blindly choosing the closest or most advertised mandi.'
    },
    {
      title: 'Encourage Shared Transportation',
      desc: 'Fosters village-level cooperation at community panchayat collection points, turning fragmented smallholders into a unified logistical force.'
    }
  ];

  return (
    <div className="space-y-12 pb-16 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          Project Background & Vision
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About AGRIROUTE <span className="text-emerald-600">AI</span>
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Smart Transportation & Market Assistant for small and remote farmers.
        </p>
      </div>

      {/* Problem & Solution Dual Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Problem Card */}
        <div className="bg-white rounded-3xl border border-rose-200/80 p-8 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">The Problem</h2>
            <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                Remote farmers often face severe difficulty transporting produce from farms to motorable roads and regional markets.
              </p>
              <p>
                Because individual harvest volumes are often too small (200–500 kg) to fill a commercial truck, smallholders either pay extortionate private hire rates or sell at a discount to exploitative middle-men at the farm gate.
              </p>
              <p>
                Delays and lack of vehicle coordination also lead to preventable transit spoilage of perishable harvests.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-rose-100 text-xs font-semibold text-rose-700">
            Friction: High per-kg freight, road isolation, price opacity.
          </div>
        </div>

        {/* Solution Card */}
        <div className="bg-emerald-900 text-white rounded-3xl p-8 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-emerald-300 flex items-center justify-center font-bold">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Solution</h2>
            <div className="text-sm text-emerald-100 space-y-3 leading-relaxed">
              <p>
                AGRIROUTE AI provides a simple, direct digital platform to help small and remote farmers plan transport, compare regional markets, and identify shared transportation opportunities.
              </p>
              <p>
                Without requiring complex hardware or confusing AI jargon, our transparent rule engine calculates realistic net returns and guides farmers step-by-step from farm gate to APMC auction floor.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-800 text-xs font-semibold text-emerald-300">
            Engine: Rule-based calculations, transparent tariffs, zero barriers.
          </div>
        </div>

      </div>

      {/* Impact Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Tangible Value
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">Measurable Impact for Rural Agriculture</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How AGRIROUTE AI transforms farm logistics efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {impacts.map((item, index) => (
            <div key={index} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hackathon Prototype Transparency Card */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
            <Code2 className="w-4 h-4 text-emerald-600" />
            Hackathon MVP Note
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Built for Clean Demonstrability & Rapid Adoption
          </h3>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            This MVP intentionally utilizes clean React client logic, structured mock data, and transparent rule-based calculations without black-box AI claims. Ready for immediate local execution and future backend APMC API integrations.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={ArrowRight}
          iconPosition="right"
          onClick={onGetStarted}
          className="shrink-0"
        >
          Try the Transport Planner
        </Button>
      </div>

    </div>
  );
}

export default AboutPage;
