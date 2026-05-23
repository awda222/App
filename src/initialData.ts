export interface Project {
  id: string;
  name: string;
  location: string;
  progress: number;
  status: string;
  color: string;
  targetDate: string;
  lead: string;
  description: string;
}

export interface Worker {
  name: string;
  role: string;
  assignedProject: string;
  currentTask: string;
  progress: number;
  productivity: number;
  completedTasks: number;
  delayedTasks: number;
  siteUpdates: string;
  dailyProgress: string[];
  avatar: string;
  status: 'active' | 'stalled' | 'off-site';
}

export interface MaterialItem {
  id: string;
  name: string;
  category: 'Structural' | 'Wood & Finishing' | 'Electrical' | 'Plumbing' | 'Tools & Equipment' | 'Safety Materials';
  subcategory: string;
  qty: number;
  unit: string;
  costPerUnit: number;
  threshold: number;
  supplier: string;
}

export interface MaterialRequest {
  id: string;
  workerName: string;
  materialName: string;
  category: string;
  qty: number;
  unit: string;
  site: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Declined';
  criticality: 'High' | 'Medium' | 'Low';
}

export interface SitePhoto {
  id: string;
  site: string;
  uploadedBy: string;
  comment: string;
  time: string;
  imgUrl: string;
}

export interface DailyReport {
  id: string;
  workerName: string;
  site: string;
  date: string;
  hoursWorked: number;
  workDone: string;
  safetyIncident: boolean;
  notes: string;
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'site-alpha',
    name: 'Site Alpha (Urban Highrise)',
    location: 'Downtown Core Sect-12',
    progress: 82,
    status: 'Column masonry and wiring active. Main structural concrete poured.',
    color: '#FF6B00',
    targetDate: '2026-10-15',
    lead: 'David Chen',
    description: 'A 24-story residential smart-building featuring composite steel structure with pre-cast high-performance components.'
  },
  {
    id: 'site-beta',
    name: 'Site Beta (Suburban Complex)',
    location: 'Westside Meadows Drive',
    progress: 45,
    status: 'Foundation completed. Stalled on plumbing PVC layouts.',
    color: '#FF8C42',
    targetDate: '2026-12-20',
    lead: 'Elena Rodriguez',
    description: 'An expansive modern residential block comprising 8 low-rise modular complexes focusing on sustainable drainage structures.'
  },
  {
    id: 'site-gamma',
    name: 'Site Gamma (Transit Expressway Hub)',
    location: 'Border Crossing Gate B',
    progress: 15,
    status: 'High-volume deep excavation and pile driving validation.',
    color: '#E0E0E0',
    targetDate: '2027-04-10',
    lead: 'Liam Gallagher',
    description: 'A massive logistics terminal with custom grading demands, thick reinforce footings, and high-safety highway alignment requirements.'
  }
];

export const INITIAL_WORKERS: Worker[] = [
  {
    name: 'David Chen',
    role: 'Site Lead • Masonry',
    assignedProject: 'Site Alpha (Urban Highrise)',
    currentTask: 'Supervising layout of brickwork columns and structural brick binding.',
    progress: 91,
    productivity: 98,
    completedTasks: 42,
    delayedTasks: 1,
    siteUpdates: 'Pre-cast columns positioned perfectly. Speeding up binding layers.',
    dailyProgress: [
      'Validated cement quality benchmarks for batch c-12.',
      'Supervised alignment vectors of column bases.',
      'Checked layout accuracy on 8th-floor masonry margins.'
    ],
    avatar: 'DC',
    status: 'active'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Foreman • Plumbing',
    assignedProject: 'Site Beta (Suburban Complex)',
    currentTask: 'Laying main 4" PVC conduit supply lines. STALLED waiting for Pipes supply.',
    progress: 68,
    productivity: 91,
    completedTasks: 28,
    delayedTasks: 4,
    siteUpdates: 'Plumbing work halted due to inventory deficit of standard diameter PVC pipes.',
    dailyProgress: [
      'Completed underground trench preparation.',
      'Drafted blueprints of floor-2 storm drain flow connections.',
      'Marked out pressure valve zones for approval.'
    ],
    avatar: 'ER',
    status: 'stalled'
  },
  {
    name: 'Marcus Vance',
    role: 'Senior Electrician',
    assignedProject: 'Site Alpha (Urban Highrise)',
    currentTask: 'Wiring Floor-3 auxiliary distribution and junction box switchboards.',
    progress: 75,
    productivity: 85,
    completedTasks: 31,
    delayedTasks: 2,
    siteUpdates: 'Wiring of east wing junction boards proceeding optimally. High switchboard count.',
    dailyProgress: [
      'Laid 400m electrical lines in protective metal conduits.',
      'Installed floor circuit breaker panels and validated insulation ratings.',
      'Tested basic earthing layouts on ground floors.'
    ],
    avatar: 'MV',
    status: 'active'
  },
  {
    name: 'Aisha Patel',
    role: 'Safety Lead Inspector',
    assignedProject: 'Site Gamma (Transit Expressway)',
    currentTask: 'Validating excavation zone soil stabilization and perimeter hazards.',
    progress: 95,
    productivity: 99,
    completedTasks: 50,
    delayedTasks: 0,
    siteUpdates: 'Checked retaining walls. Added secondary wire barriers due to active grader movement.',
    dailyProgress: [
      'Conducted morning toolbox safety talk for heavy excavators.',
      'Inspected safety harnesses for ironworkers.',
      'Validated stability coefficients of retaining trench logs.'
    ],
    avatar: 'AP',
    status: 'active'
  },
  {
    name: 'Liam Gallagher',
    role: 'Heavy Equipment Operator',
    assignedProject: 'Site Gamma (Transit Expressway)',
    currentTask: 'Directing excavator grading and leveling deep foundation footings.',
    progress: 40,
    productivity: 79,
    completedTasks: 12,
    delayedTasks: 3,
    siteUpdates: 'Excavation delayed 3 hours by high-viscosity clay and boulder block.',
    dailyProgress: [
      'Cleared boulder deposits from structural line B.',
      'Leveled initial aggregate material for grade stability.',
      'Submitted crane logistics demand report.'
    ],
    avatar: 'LG',
    status: 'stalled'
  },
  {
    name: 'Sofia Martinez',
    role: 'Finishing Lead • Paint',
    assignedProject: 'Site Beta (Suburban Complex)',
    currentTask: 'Inspecting primary primer coatings on sector-A auxiliary basements.',
    progress: 10,
    productivity: 92,
    completedTasks: 6,
    delayedTasks: 0,
    siteUpdates: 'Primer completed. Base painting will commence once moisture levels register <14%.',
    dailyProgress: [
      'Measured concrete moisture content across cellars.',
      'Mixed chemical primer batch p-08.',
      'Applied test wallpaper adhesive on show-complex walls.'
    ],
    avatar: 'SM',
    status: 'active'
  }
];

export const INITIAL_INVENTORY: MaterialItem[] = [
  // STRUCTURAL MATERIALS
  { id: 'mat-1', name: 'Cement (OPC-53 Grade)', category: 'Structural', subcategory: 'Cement', qty: 450, unit: 'Bags', costPerUnit: 380, threshold: 100, supplier: 'UltraTech Cement Corp' },
  { id: 'mat-2', name: 'Reinforce Steel Bars', category: 'Structural', subcategory: 'Steel', qty: 28, unit: 'Tons', costPerUnit: 53000, threshold: 10, supplier: 'Tata Steel Enterprise' },
  { id: 'mat-3', name: 'Steel TMT Bars (12mm)', category: 'Structural', subcategory: 'TMT Bars', qty: 8, unit: 'Tons', costPerUnit: 56000, threshold: 15, supplier: 'Jindal Steel & Power' }, // LOW STOCK!
  { id: 'mat-4', name: 'Red Clay Kiln Bricks', category: 'Structural', subcategory: 'Bricks', qty: 7800, unit: 'Units', costPerUnit: 7, threshold: 2000, supplier: 'Delta Masonry Supplies' },
  { id: 'mat-5', name: 'Hollow Concrete Blocks', category: 'Structural', subcategory: 'Blocks', qty: 1400, unit: 'Units', costPerUnit: 50, threshold: 400, supplier: 'Apex Blockworks' },
  { id: 'mat-6', name: 'River Coarse Sand', category: 'Structural', subcategory: 'Sand', qty: 45, unit: 'Tons', costPerUnit: 1800, threshold: 12, supplier: 'Earthy Silt Logistics' },
  { id: 'mat-7', name: 'Crushed Granite Gravel', category: 'Structural', subcategory: 'Gravel', qty: 52, unit: 'Tons', costPerUnit: 1500, threshold: 15, supplier: 'StoneQuarry Inc' },
  { id: 'mat-8', name: 'Ready-Mix Concrete (M25)', category: 'Structural', subcategory: 'Concrete', qty: 85, unit: 'Cu.m', costPerUnit: 4200, threshold: 20, supplier: 'Con-Build ReadyMix' },
  { id: 'mat-9', name: 'Polished Quartz Stone', category: 'Structural', subcategory: 'Stone', qty: 15, unit: 'Cu.m', costPerUnit: 7500, threshold: 5, supplier: 'Everast Stone Quarry' },
  { id: 'mat-10', name: 'Matt Glaze Slate Tiles', category: 'Structural', subcategory: 'Tiles', qty: 650, unit: 'Sq.ft', costPerUnit: 60, threshold: 150, supplier: 'Titan Ceramics' },

  // WOOD & FINISHING
  { id: 'mat-11', name: 'Marine-Grade Plywood', category: 'Wood & Finishing', subcategory: 'Plywood', qty: 110, unit: 'Sheets', costPerUnit: 1200, threshold: 30, supplier: 'Centuryply Woodworks' },
  { id: 'mat-12', name: 'Sawn Oak Timber Columns', category: 'Wood & Finishing', subcategory: 'Timber', qty: 45, unit: 'Pcs', costPerUnit: 2500, threshold: 15, supplier: 'ForestPro Timber' },
  { id: 'mat-13', name: 'Matte Wood Laminates', category: 'Wood & Finishing', subcategory: 'Laminates', qty: 80, unit: 'Sheets', costPerUnit: 950, threshold: 20, supplier: 'DecorCore Surface' },
  { id: 'mat-14', name: 'Teak Flush Doors', category: 'Wood & Finishing', subcategory: 'Doors', qty: 24, unit: 'Pcs', costPerUnit: 8500, threshold: 10, supplier: 'Integrity Door Systems' },
  { id: 'mat-15', name: 'Double-glazed UPVC Windows', category: 'Wood & Finishing', subcategory: 'Windows', qty: 35, unit: 'Pcs', costPerUnit: 12000, threshold: 8, supplier: 'WinGuard Glass & UPVC' },
  { id: 'mat-16', name: 'Clear Tempered Glass', category: 'Wood & Finishing', subcategory: 'Glass', qty: 18, unit: 'Sheets', costPerUnit: 4500, threshold: 5, supplier: 'Apex Glass Mills' },
  { id: 'mat-17', name: 'Acrylic WeatherCoat Paint', category: 'Wood & Finishing', subcategory: 'Paint', qty: 45, unit: 'Cans', costPerUnit: 1800, threshold: 15, supplier: 'Sherwin Paints' },
  { id: 'mat-18', name: 'Plaster of Paris (POP)', category: 'Wood & Finishing', subcategory: 'POP', qty: 180, unit: 'Bags', costPerUnit: 350, threshold: 25, supplier: 'PlasterKraft Indus' },
  { id: 'mat-19', name: 'Textured Geometric Wallpaper', category: 'Wood & Finishing', subcategory: 'Wallpapers', qty: 12, unit: 'Rolls', costPerUnit: 2200, threshold: 4, supplier: 'LuxeWalls Co' },

  // ELECTRICAL
  { id: 'mat-20', name: 'Fire-Retardant Copper Wiring', category: 'Electrical', subcategory: 'Wiring', qty: 18, unit: 'Rolls', costPerUnit: 5500, threshold: 5, supplier: 'Finolex Cables' },
  { id: 'mat-21', name: 'Modular Switches Panel Board', category: 'Electrical', subcategory: 'Switches', qty: 150, unit: 'Pcs', costPerUnit: 450, threshold: 40, supplier: 'Schneider Electric' },
  { id: 'mat-22', name: 'Ultra-LED Recess Lights', category: 'Electrical', subcategory: 'Lights', qty: 320, unit: 'Pcs', costPerUnit: 350, threshold: 50, supplier: 'Philips Professional' },
  { id: 'mat-23', name: 'Load Main Distribution Panels', category: 'Electrical', subcategory: 'Panels', qty: 4, unit: 'Units', costPerUnit: 35000, threshold: 2, supplier: 'L&T Switchgears' },
  { id: 'mat-24', name: '120kVA Diesel Generator Set', category: 'Electrical', subcategory: 'Generators', qty: 2, unit: 'Units', costPerUnit: 450000, threshold: 1, supplier: 'Cummins Power' },
  { id: 'mat-25', name: 'Flexible Metal Conduits', category: 'Electrical', subcategory: 'Conduits', qty: 450, unit: 'Meters', costPerUnit: 150, threshold: 100, supplier: 'PipingTech Indus' },
  { id: 'mat-26', name: '63A Triple-Pole Circuit Breakers', category: 'Electrical', subcategory: 'Circuit breakers', qty: 85, unit: 'Pcs', costPerUnit: 1200, threshold: 15, supplier: 'Siemens Grid' },

  // PLUMBING
  { id: 'mat-27', name: 'Piping: 4" PVC Pressure Pipe', category: 'Plumbing', subcategory: 'Pipes', qty: 12, unit: 'Pcs', costPerUnit: 650, threshold: 50, supplier: 'Supreme Piping systems' }, // LOW STOCK!
  { id: 'mat-28', name: 'High-Temp CPVC Fitting Valves', category: 'Plumbing', subcategory: 'Valves', qty: 40, unit: 'Units', costPerUnit: 450, threshold: 15, supplier: 'Astral Flow-Pipes' },
  { id: 'mat-29', name: 'Horizontal 1000L Overhead Tanks', category: 'Plumbing', subcategory: 'Tanks', qty: 8, unit: 'Units', costPerUnit: 6500, threshold: 3, supplier: 'Sintex Containers' },
  { id: 'mat-30', name: '2HP Heavy-Duty Submersible Pumps', category: 'Plumbing', subcategory: 'Pumps', qty: 3, unit: 'Units', costPerUnit: 22000, threshold: 2, supplier: 'Kirloskar Machinery' },
  { id: 'mat-31', name: 'Stainless Steel Bathroom Faucets', category: 'Plumbing', subcategory: 'Bathroom fittings', qty: 55, unit: 'Pcs', costPerUnit: 1800, threshold: 12, supplier: 'Kohler Designs' },
  { id: 'mat-32', name: 'Main Trench Storm Drainage Pipes', category: 'Plumbing', subcategory: 'Drainage systems', qty: 20, unit: 'Pcs', costPerUnit: 4500, threshold: 8, supplier: 'GeoDrain Infrastructure' },

  // TOOLS & EQUIPMENT
  { id: 'mat-33', name: 'Heavy Demolition Rotary Drills', category: 'Tools & Equipment', subcategory: 'Drills', qty: 15, unit: 'Units', costPerUnit: 12000, threshold: 5, supplier: 'Bosch Power' },
  { id: 'mat-34', name: 'Crawler Hydraulic Excavators', category: 'Tools & Equipment', subcategory: 'Excavators', qty: 3, unit: 'Units', costPerUnit: 2800000, threshold: 1, supplier: 'Caterpillar Heavy' },
  { id: 'mat-35', name: 'Hydraulic Cabin Crawler Cranes', category: 'Tools & Equipment', subcategory: 'Cranes', qty: 2, unit: 'Units', costPerUnit: 12500000, threshold: 1, supplier: 'Liebherr Systems' },
  { id: 'mat-36', name: 'Galvanized Framing Scaffolding', category: 'Tools & Equipment', subcategory: 'Scaffolding', qty: 120, unit: 'Frames', costPerUnit: 2200, threshold: 30, supplier: 'SafeRack Structures' },
  { id: 'mat-37', name: 'Full Retractable Harness Kits', category: 'Tools & Equipment', subcategory: 'Safety equipment', qty: 65, unit: 'Kits', costPerUnit: 3200, threshold: 15, supplier: 'GuardSafety Net' },
  { id: 'mat-38', name: 'Diesel Concrete Mixers (200L)', category: 'Tools & Equipment', subcategory: 'Mixers', qty: 4, unit: 'Units', costPerUnit: 75000, threshold: 2, supplier: 'Sonalika Machineries' },
  { id: 'mat-39', name: 'ARC Multi-Voltage Welding Machines', category: 'Tools & Equipment', subcategory: 'Welding machines', qty: 6, unit: 'Units', costPerUnit: 22000, threshold: 2, supplier: 'Miller Electric' },

  // SAFETY MATERIALS
  { id: 'mat-40', name: 'Extreme Impact ABS Helmets', category: 'Safety Materials', subcategory: 'Helmets', qty: 124, unit: 'Pcs', costPerUnit: 450, threshold: 50, supplier: 'MSA Safety Core' },
  { id: 'mat-41', name: 'Cut-Resistant Grip Leather Gloves', category: 'Safety Materials', subcategory: 'Gloves', qty: 220, unit: 'Pairs', costPerUnit: 150, threshold: 60, supplier: 'TuffShield Gloves' },
  { id: 'mat-42', name: 'Fluorescent Safety Reflector Jackets', category: 'Safety Materials', subcategory: 'Jackets', qty: 165, unit: 'Pcs', costPerUnit: 250, threshold: 40, supplier: 'TuffShield Gloves' },
  { id: 'mat-43', name: 'Reinforced Shank Steel-Toe Boots', category: 'Safety Materials', subcategory: 'Boots', qty: 85, unit: 'Pairs', costPerUnit: 1500, threshold: 20, supplier: 'Timberland Safety' },
  { id: 'mat-44', name: 'Expanding Retractable Safety Barriers', category: 'Safety Materials', subcategory: 'Safety barriers', qty: 45, unit: 'Units', costPerUnit: 2200, threshold: 10, supplier: 'Apex Guardrail' }
];

export const INITIAL_REQUESTS: MaterialRequest[] = [
  {
    id: 'req-1',
    workerName: 'Elena Rodriguez',
    materialName: 'Piping: 4" PVC Pressure Pipe',
    category: 'Plumbing',
    qty: 60,
    unit: 'Pcs',
    site: 'Site Beta (Suburban Complex)',
    date: '2026-05-20',
    status: 'Pending',
    criticality: 'High'
  },
  {
    id: 'req-2',
    workerName: 'David Chen',
    materialName: 'Steel TMT Bars (12mm)',
    category: 'Structural',
    qty: 12,
    unit: 'Tons',
    site: 'Site Alpha (Urban Highrise)',
    date: '2026-05-21',
    status: 'Pending',
    criticality: 'High'
  },
  {
    id: 'req-3',
    workerName: 'Liam Gallagher',
    materialName: 'Cement (OPC-53 Grade)',
    category: 'Structural',
    qty: 100,
    unit: 'Bags',
    site: 'Site Gamma (Transit Expressway)',
    date: '2026-05-21',
    status: 'Approved',
    criticality: 'Medium'
  }
];

export const INITIAL_PHOTOS: SitePhoto[] = [
  {
    id: 'photo-1',
    site: 'Site Alpha (Urban Highrise)',
    uploadedBy: 'David Chen',
    comment: 'Laying out eighth level columns. Brick alignment verified.',
    time: '2 hours ago',
    imgUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'photo-2',
    site: 'Site Gamma (Transit Expressway)',
    uploadedBy: 'Liam Gallagher',
    comment: 'Retaining walls checked and reinforced ahead of evening excavation.',
    time: '4 hours ago',
    imgUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=500&q=80'
  }
];

export const INITIAL_REPORTS: DailyReport[] = [
  {
    id: 'rep-1',
    workerName: 'David Chen',
    site: 'Site Alpha (Urban Highrise)',
    date: '2026-05-20',
    hoursWorked: 8.5,
    workDone: 'Aligned column vectors on 8th level. Mixed composite M25 block binders.',
    safetyIncident: false,
    notes: 'Weather: Clear. Soil moisture normal.'
  },
  {
    id: 'rep-2',
    workerName: 'Elena Rodriguez',
    site: 'Site Beta (Suburban Complex)',
    date: '2026-05-20',
    hoursWorked: 6,
    workDone: 'Plumbing trenches dug. Delayed concrete pouring because of PVC conduit shortage.',
    safetyIncident: false,
    notes: 'Work halted at 14:00 awaiting supply chain action.'
  }
];
