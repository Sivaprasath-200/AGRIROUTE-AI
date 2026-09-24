import React, { useState } from 'react';
import { 
  Sprout, 
  Truck, 
  Compass, 
  Store, 
  Users, 
  ShieldAlert, 
  Map, 
  HelpCircle,
  Menu,
  X,
  PlusCircle,
  RotateCcw
} from 'lucide-react';
import Button from './Button';

export function Navbar({ activePage, setActivePage, onResetDemo, hasActivePlan }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Sprout },
    { id: 'plan', label: 'Plan Transport', icon: PlusCircle },
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'markets', label: 'Compare Markets', icon: Store },
    { id: 'shared', label: 'Shared Transport', icon: Users },
    { id: 'spoilage', label: 'Produce Risk', icon: ShieldAlert },
    { id: 'map', label: 'Route Map', icon: Map },
    { id: 'about', label: 'About', icon: HelpCircle },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  AGRIROUTE <span className="text-emerald-600">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Smart Transportation & Market Assistant</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              icon={RotateCcw}
              onClick={onResetDemo}
              title="Reset to default demo data"
            >
              Reset Demo
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={PlusCircle}
              onClick={() => handleNavClick('plan')}
            >
              Plan Transport
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Button
              variant="primary"
              size="md"
              icon={PlusCircle}
              onClick={() => handleNavClick('plan')}
              className="w-full"
            >
              Plan Transport
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={RotateCcw}
              onClick={onResetDemo}
              className="w-full"
            >
              Reset to Demo Data
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
