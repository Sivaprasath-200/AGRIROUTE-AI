import React, { useState } from 'react';
import { 
  PlusCircle, 
  MapPin, 
  Calendar, 
  Scale, 
  Store, 
  User, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { CROPS, DEMO_MARKETS, DEFAULT_FARMER_PLAN } from '../data/demoData';

export function FarmerInputPage({ initialPlan, onSubmitPlan, onCancel }) {
  const [formData, setFormData] = useState(initialPlan || DEFAULT_FARMER_PLAN);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cropOptions = CROPS.map(c => ({
    value: c.name,
    label: `${c.icon} ${c.name} (${c.category})`
  }));

  const marketOptions = DEMO_MARKETS.map(m => ({
    value: m.code,
    label: `${m.code} - ${m.name} (${m.distance} km)`
  }));

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.farmerName || !formData.farmerName.trim()) {
      errs.farmerName = 'Please enter farmer or farm contact name';
    }
    if (!formData.farmLocation || !formData.farmLocation.trim()) {
      errs.farmLocation = 'Please specify your village or farm location (e.g. Village A)';
    }
    if (!formData.crop) {
      errs.crop = 'Please select a crop or produce';
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      errs.quantity = 'Please enter a valid harvest quantity in kg (> 0)';
    } else if (Number(formData.quantity) > 15000) {
      errs.quantity = 'Quantity exceeds prototype maximum (15,000 kg)';
    }
    if (!formData.harvestDate) {
      errs.harvestDate = 'Please specify harvest / dispatch date';
    }
    if (!formData.preferredDestination) {
      errs.preferredDestination = 'Please choose a preferred target market';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Small timeout to give feedback
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitPlan({
        ...formData,
        quantity: Number(formData.quantity)
      });
    }, 250);
  };

  const handlePreloadKishore = () => {
    setFormData(DEFAULT_FARMER_PLAN);
    setErrors({});
  };

  const selectedCropObj = CROPS.find(c => c.name === formData.crop) || CROPS[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Page Title & Context */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Create Your Transport Plan
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              Step 1
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Enter your harvest details to generate a cost-effective route, market comparison, and vehicle allocation.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={RotateCcw}
          onClick={handlePreloadKishore}
          title="Fill with demo values (Kishore, Tomato 500kg, Village A)"
        >
          Load Demo Example
        </Button>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Farmer Name */}
            <Input
              label="Farmer Name"
              id="farmer-name"
              placeholder="e.g. Kishore"
              value={formData.farmerName}
              onChange={(e) => handleChange('farmerName', e.target.value)}
              required
              error={errors.farmerName}
              icon={User}
              helperText="Individual or FPO contact"
            />

            {/* Farm Location */}
            <Input
              label="Farm Location"
              id="farm-location"
              placeholder="e.g. Village A"
              value={formData.farmLocation}
              onChange={(e) => handleChange('farmLocation', e.target.value)}
              required
              error={errors.farmLocation}
              icon={MapPin}
              helperText="Example: Village A"
            />

            {/* Crop / Produce Dropdown */}
            <Input
              label="Crop / Produce"
              id="crop"
              options={cropOptions}
              value={formData.crop}
              onChange={(e) => handleChange('crop', e.target.value)}
              required
              error={errors.crop}
              helperText="Perishability classification"
            />

            {/* Quantity in kg */}
            <Input
              label="Quantity (kg)"
              id="quantity"
              type="number"
              min="10"
              max="15000"
              step="10"
              placeholder="e.g. 500"
              value={formData.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              required
              error={errors.quantity}
              icon={Scale}
              helperText="Net harvest payload"
            />

            {/* Harvest Date */}
            <Input
              label="Harvest Date"
              id="harvest-date"
              type="date"
              value={formData.harvestDate}
              onChange={(e) => handleChange('harvestDate', e.target.value)}
              required
              error={errors.harvestDate}
              icon={Calendar}
              helperText="Scheduled pickup day"
            />

            {/* Preferred Destination / Market */}
            <Input
              label="Preferred Destination / Market"
              id="preferred-destination"
              options={marketOptions}
              value={formData.preferredDestination}
              onChange={(e) => handleChange('preferredDestination', e.target.value)}
              required
              error={errors.preferredDestination}
              icon={Store}
              helperText="Benchmark market"
            />

          </div>

          {/* Quick Context / Preview Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3 text-xs text-emerald-900">
            <span className="text-2xl">{selectedCropObj?.icon || '🌱'}</span>
            <div className="space-y-1">
              <span className="font-bold">
                Selected Produce: {formData.crop} ({selectedCropObj?.category || 'Perishable'})
              </span>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                Base perishability sensitivity is <strong>{selectedCropObj?.sensitivity || 'High'}</strong> with an average shelf life of {selectedCropObj?.avgShelfLifeHours || 48} hours. Our rule engine will recommend transport pooling and optimal early-morning transit windows.
              </p>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-[11px] text-slate-400">
              *All inputs are processed locally on the client using prototype rules.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {onCancel && (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={onCancel}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={Sparkles}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Generating Plan...' : 'Generate Smart Plan'}
              </Button>
            </div>
          </div>

        </form>
      </div>

      {/* Helpful Hint Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5">
        <div className="font-semibold text-slate-800 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Demo Presets Available</span>
        </div>
        <p>
          You can test the exact hackathon scenario: <strong>Kishore</strong>, <strong>Village A</strong>, <strong>Tomato</strong>, <strong>500 kg</strong>, and <strong>Market B</strong> to view the benchmark recommendations.
        </p>
      </div>

    </div>
  );
}

export default FarmerInputPage;
