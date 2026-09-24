import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import FarmerInputPage from './pages/FarmerInputPage';
import SmartPlanResultPage from './pages/SmartPlanResultPage';
import DashboardPage from './pages/DashboardPage';
import MarketComparisonPage from './pages/MarketComparisonPage';
import SharedTransportPage from './pages/SharedTransportPage';
import SpoilageRiskPage from './pages/SpoilageRiskPage';
import RouteMapPage from './pages/RouteMapPage';
import AboutPage from './pages/AboutPage';
import { DEFAULT_FARMER_PLAN } from './data/demoData';

const STORAGE_KEY = 'agriroute_ai_farmer_plan';

export function App() {
  const [activePage, setActivePage] = useState('landing');
  const [farmerPlan, setFarmerPlan] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_FARMER_PLAN;
    } catch {
      return DEFAULT_FARMER_PLAN;
    }
  });

  // Persist plan to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(farmerPlan));
    } catch (e) {
      console.warn('Failed to save plan to localStorage:', e);
    }
  }, [farmerPlan]);

  const handleResetDemo = () => {
    setFarmerPlan(DEFAULT_FARMER_PLAN);
    setActivePage('dashboard');
  };

  const handlePlanSubmit = (newPlan) => {
    setFarmerPlan(newPlan);
    setActivePage('result');
  };

  const handleSelectMarket = (marketCode) => {
    setFarmerPlan(prev => ({
      ...prev,
      preferredDestination: marketCode
    }));
    setActivePage('dashboard');
  };

  // Determine if layout should show sidebar
  // Landing page has its own standalone presentation
  const isLanding = activePage === 'landing';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onResetDemo={handleResetDemo}
        hasActivePlan={Boolean(farmerPlan)}
      />

      {/* Main Content Area */}
      {isLanding ? (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
          <LandingPage
            onPlanTransport={() => setActivePage('plan')}
            onViewDemo={() => setActivePage('dashboard')}
          />
        </main>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
          {/* Sidebar */}
          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
            farmerPlan={farmerPlan}
          />

          {/* Inner Page Viewport */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
            {activePage === 'plan' && (
              <FarmerInputPage
                initialPlan={farmerPlan}
                onSubmitPlan={handlePlanSubmit}
                onCancel={() => setActivePage('dashboard')}
              />
            )}

            {activePage === 'result' && (
              <SmartPlanResultPage
                farmerPlan={farmerPlan}
                onNavigate={setActivePage}
                onEditPlan={() => setActivePage('plan')}
              />
            )}

            {activePage === 'dashboard' && (
              <DashboardPage
                farmerPlan={farmerPlan}
                onNavigate={setActivePage}
                onEditPlan={() => setActivePage('plan')}
              />
            )}

            {activePage === 'markets' && (
              <MarketComparisonPage
                farmerPlan={farmerPlan}
                onSelectMarket={handleSelectMarket}
              />
            )}

            {activePage === 'shared' && (
              <SharedTransportPage
                farmerPlan={farmerPlan}
              />
            )}

            {activePage === 'spoilage' && (
              <SpoilageRiskPage
                farmerPlan={farmerPlan}
              />
            )}

            {activePage === 'map' && (
              <RouteMapPage
                farmerPlan={farmerPlan}
              />
            )}

            {activePage === 'about' && (
              <AboutPage
                onGetStarted={() => setActivePage('plan')}
              />
            )}
          </main>
        </div>
      )}

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span>AGRIROUTE AI • Smart Transportation & Market Assistant for Farmers</span>
          </div>
          <div>
            Built with React & Vite • Hackathon MVP Edition
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
