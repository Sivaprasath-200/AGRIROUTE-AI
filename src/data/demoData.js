// Demo data for AGRIROUTE AI Prototype MVP

export const CROPS = [
  {
    id: 'Tomato',
    name: 'Tomato',
    category: 'Perishable',
    icon: '🍅',
    avgShelfLifeHours: 48,
    sensitivity: 'High',
    defaultPricePerKg: 25,
    unit: 'kg'
  },
  {
    id: 'Onion',
    name: 'Onion',
    category: 'Semi-Perishable',
    icon: '🧅',
    avgShelfLifeHours: 360,
    sensitivity: 'Low',
    defaultPricePerKg: 30,
    unit: 'kg'
  },
  {
    id: 'Potato',
    name: 'Potato',
    category: 'Non-Perishable',
    icon: '🥔',
    avgShelfLifeHours: 720,
    sensitivity: 'Low',
    defaultPricePerKg: 20,
    unit: 'kg'
  },
  {
    id: 'Banana',
    name: 'Banana',
    category: 'Perishable',
    icon: '🍌',
    avgShelfLifeHours: 96,
    sensitivity: 'Medium',
    defaultPricePerKg: 35,
    unit: 'kg'
  },
  {
    id: 'Paddy',
    name: 'Paddy / Grain',
    category: 'Grain',
    icon: '🌾',
    avgShelfLifeHours: 2160,
    sensitivity: 'Low',
    defaultPricePerKg: 22,
    unit: 'kg'
  },
  {
    id: 'Vegetables',
    name: 'Mixed Vegetables',
    category: 'Perishable',
    icon: '🥬',
    avgShelfLifeHours: 60,
    sensitivity: 'Medium',
    defaultPricePerKg: 28,
    unit: 'kg'
  }
];

export const DEMO_MARKETS = [
  {
    id: 'market-a',
    code: 'Market A',
    name: 'Market A (Taluk Sub-Mandi)',
    distance: 12, // in km
    demand: 'Medium',
    roadCondition: 'Paved Village Road',
    estimatedTimeMin: 30,
    facilities: ['Electronic Weighing', 'Covered Unloading Yard'],
    prices: {
      Tomato: 22,
      Onion: 27,
      Potato: 18,
      Banana: 31,
      Paddy: 21,
      Vegetables: 24
    }
  },
  {
    id: 'market-b',
    code: 'Market B',
    name: 'Market B (District APMC Hub)',
    distance: 18, // in km
    demand: 'High',
    roadCondition: 'State Highway',
    estimatedTimeMin: 45,
    facilities: ['Cold Storage Buffer', 'Direct Buyer Auction', 'Digital Payment Terminal', 'Farmer Canteen'],
    prices: {
      Tomato: 25,
      Onion: 32,
      Potato: 22,
      Banana: 36,
      Paddy: 23,
      Vegetables: 29
    }
  },
  {
    id: 'market-c',
    code: 'Market C',
    name: 'Market C (Metro Wholesale Terminal)',
    distance: 30, // in km
    demand: 'Medium',
    roadCondition: '4-Lane Express Highway',
    estimatedTimeMin: 70,
    facilities: ['Inter-state Logistics', 'Bulk Wholesalers', 'Packaging Support'],
    prices: {
      Tomato: 24,
      Onion: 29,
      Potato: 20,
      Banana: 33,
      Paddy: 22,
      Vegetables: 26
    }
  }
];

export const SHARED_POOL_MEMBERS = [
  {
    id: 'pool-1',
    farmerName: 'Kishore (You)',
    crop: 'Tomato',
    quantity: 300,
    village: 'Village A (East)',
    status: 'Ready for Pickup',
    shareFactor: 0.33
  },
  {
    id: 'pool-2',
    farmerName: 'Ramesh Patel',
    crop: 'Tomato',
    quantity: 400,
    village: 'Village A (North Sector)',
    status: 'Confirmed',
    shareFactor: 0.44
  },
  {
    id: 'pool-3',
    farmerName: 'Priya Sundaram',
    crop: 'Onion',
    quantity: 200,
    village: 'Green Valley Road',
    status: 'Confirmed',
    shareFactor: 0.23
  }
];

export const DEFAULT_VEHICLE = {
  name: 'Mini Freight Truck (Tata Ace / Pickup)',
  capacityKg: 1000,
  baseTripCost: 2700,
  fuelRatePerKm: 35,
  co2SavedPercent: 42
};

export const SAMPLE_ROUTE_NODES = [
  {
    step: 1,
    title: 'Farm Origin',
    subtitle: 'Village A farm gate (Unpaved access lane)',
    icon: 'Sprout',
    badge: 'Origin',
    distanceFromPrev: '0 km',
    notes: 'Load crates at farm gate by 6:00 AM'
  },
  {
    step: 2,
    title: 'Collection Point',
    subtitle: 'Village Panchayat Community Shed (Motorable Road)',
    icon: 'PackageCheck',
    badge: 'Consolidation',
    distanceFromPrev: '2.5 km',
    notes: 'Merge produce with Ramesh and Priya into shared vehicle'
  },
  {
    step: 3,
    title: 'Market B Hub',
    subtitle: 'District APMC Wholesale Mandi, Gate 2',
    icon: 'Store',
    badge: 'Destination',
    distanceFromPrev: '15.5 km',
    notes: 'Unload at Auction Bay 4 for high-demand early trading'
  }
];

export const DEFAULT_FARMER_PLAN = {
  farmerName: 'Kishore',
  farmLocation: 'Village A',
  crop: 'Tomato',
  quantity: 500,
  harvestDate: new Date().toISOString().split('T')[0],
  preferredDestination: 'Market B'
};
