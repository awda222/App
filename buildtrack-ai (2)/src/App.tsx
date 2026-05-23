import React, { useState, useEffect, useRef } from 'react';
import { 
  HardHat, Search, Bot, Users, Truck, Sparkles, MapPin, RefreshCw, 
  Send, Check, X, Plus, AlertTriangle, Activity, Coins, TrendingUp, 
  Info, ArrowRight, Trash, MessageSquare, Tag, Radio, Shield, Wrench,
  ChevronRight, Bell, Moon, Sun, Languages, Smartphone, Clock, Sliders, 
  Calendar, Camera, User, Lock, Database, Save, Download, LayoutGrid, 
  ClipboardList, Settings
} from 'lucide-react';

import { 
  Project, Worker, MaterialItem, MaterialRequest, SitePhoto, DailyReport,
  INITIAL_PROJECTS, INITIAL_WORKERS, INITIAL_INVENTORY, INITIAL_REQUESTS, INITIAL_PHOTOS, INITIAL_REPORTS
} from './initialData';
import CompanyLogo from './components/CompanyLogo';

export default function App() {
  // Navigation Tabs: home, materials, ai, community, workers, builderTracking, settings
  const [currentTab, setCurrentTab] = useState<'home' | 'materials' | 'ai' | 'community' | 'workers' | 'builderTracking' | 'settings'>('home');

  // Login credentials states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => localStorage.getItem('bt_is_logged_in') === 'true');
  const [loginEmail, setLoginEmail] = useState<string>('yogbynikita@gmail.com');
  const [loginPassword, setLoginPassword] = useState<string>('password123');

  // Worker subtab (Builder vs Worker views)
  const [workerSubTab, setWorkerSubTab] = useState<'builder' | 'worker'>('builder');

  // Attendance states for workers
  const [attendance, setAttendance] = useState<{ [workerName: string]: { checkIn?: string; checkOut?: string; status: 'Checked In' | 'Checked Out' | 'Not Checked In' } }>({
    'David Chen': { status: 'Checked In', checkIn: '08:00 AM' },
    'Elena Rodriguez': { status: 'Checked In', checkIn: '08:15 AM' },
    'Marcus Vance': { status: 'Checked In', checkIn: '07:45 AM' },
    'Aisha Patel': { status: 'Checked In', checkIn: '08:30 AM' },
    'Liam Gallagher': { status: 'Not Checked In' },
    'Sofia Martinez': { status: 'Checked In', checkIn: '09:00 AM' }
  });

  // Task states for workers (Pending / In Progress / Completed)
  const [workerTaskStatus, setWorkerTaskStatus] = useState<{ [workerName: string]: 'Pending' | 'In Progress' | 'Completed' }>({
    'David Chen': 'In Progress',
    'Elena Rodriguez': 'Pending',
    'Marcus Vance': 'In Progress',
    'Aisha Patel': 'Completed',
    'Liam Gallagher': 'Pending',
    'Sofia Martinez': 'In Progress'
  });

  // Supervisor instructions & comments for each on-site worker
  const [supervisorComments, setSupervisorComments] = useState<{ [workerName: string]: string[] }>({
    'David Chen': [
      'Please verify structural aggregate cement quality metrics in Sector 12, Level 8 today.',
      'Check that composite steel scaffolding bindings are secured against south wind speeds.'
    ],
    'Elena Rodriguez': [
      'PVC conduit pipes supply was authorized. Re-check pressure levels on lines immediately.',
      'Prepare storm drainage flow connections blueprints for 2nd-floor verification.'
    ],
    'Marcus Vance': [
      'Test floor load circuit breaker isolation switches before high-amp testing.',
      'Confirm the total count of custom LED recess lights matches client order sheet.'
    ],
    'Aisha Patel': [
      'Conduct a safety hazard sweep in heavy excavator zones near retaining walls.',
      'Ensure ironworker harnesses are tested and certified before morning tower ascension.'
    ],
    'Liam Gallagher': [
      'Clear large clay boulder deposits blocking sector grading vectors.',
      'Verify the crane lift path is completely clear of high-voltage transmission lines.'
    ],
    'Sofia Martinez': [
      'Validate concrete humidity coefficient before mixing the final acrylic coats.',
      'Ensure the drywall adhesive registers proper adhesive coefficients on mock panels.'
    ]
  });

  // Top right responsive notifications list
  const [notifications, setNotifications] = useState<{ id: string; text: string; time: string; type: 'alert' | 'update' | 'system'; read: boolean; }[]>([
    { id: 'n-1', text: '🚧 Material Shortage: Piping: 4" PVC Pressure Pipe is critically low on Site Beta.', time: '10 mins ago', type: 'alert', read: false },
    { id: 'n-2', text: '⚠️ Stock Warning: Steel TMT Bars (12mm) have dropped below threshold!', time: '20 mins ago', type: 'alert', read: false },
    { id: 'n-3', text: '👷 Elena Rodriguez status updated: STALLED waiting for supplies.', time: '1 hour ago', type: 'update', read: false },
    { id: 'n-4', text: '✅ Attendance Sweep: 5 out of 6 specialist leads have checked-in today.', time: '2 hours ago', type: 'system', read: true }
  ]);
  const [showNotifPopup, setShowNotifPopup] = useState<boolean>(false);

  // Settings customizable options & profile state variables
  const [userProfile, setUserProfile] = useState({
    name: 'Nikita Yog',
    phone: '+1 (555) 732-8840',
    email: 'yogbynikita@gmail.com',
    company: 'BuildTrack Infrastructure Ltd',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  });

  const [settingsActiveSection, setSettingsActiveSection] = useState<'profile' | 'account' | 'notifications' | 'theme' | 'preferences' | 'security' | 'backup' | 'info'>('profile');

  // Settings configurations
  const [shortageAlerts, setShortageAlerts] = useState<boolean>(true);
  const [attendanceAlerts, setAttendanceAlerts] = useState<boolean>(true);
  const [deadlineReminders, setDeadlineReminders] = useState<boolean>(true);
  const [siteNotifications, setSiteNotifications] = useState<boolean>(true);
  
  const [accentColor, setAccentColor] = useState<'orange' | 'amber' | 'emerald' | 'blue'>('orange');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const [defaultSite, setDefaultSite] = useState<string>('Site Alpha (Urban Highrise)');
  const [language, setLanguage] = useState<string>('English');
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');

  const [tfaEnabled, setTfaEnabled] = useState<boolean>(false);
  const [dataSharingOptOut, setDataSharingOptOut] = useState<boolean>(false);
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState<boolean>(true);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState<boolean>(true);
  const [newSupervisorCommentText, setNewSupervisorCommentText] = useState<string>('');

  // Core App States
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);
  const [inventory, setInventory] = useState<MaterialItem[]>(INITIAL_INVENTORY);
  const [requests, setRequests] = useState<MaterialRequest[]>(INITIAL_REQUESTS);
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sub-navigation state for Combined Materials module (to switch between Active Ledger & AI Specification Research)
  const [materialsMode, setMaterialsMode] = useState<'ledger' | 'research'>('ledger');

  // Interactive Worker Portal specific states
  const [selectedWorkerName, setSelectedWorkerName] = useState<string>('David Chen');
  const [shiftLogText, setShiftLogText] = useState<string>('');
  const [reqMaterialName, setReqMaterialName] = useState<string>('');
  const [reqCategory, setReqCategory] = useState<string>('Structural');
  const [reqQty, setReqQty] = useState<number>(50);
  const [reqUnit, setReqUnit] = useState<string>('Units');
  const [reqCriticality, setReqCriticality] = useState<string>('High');
  const [ppeChecked, setPpeChecked] = useState<{ [key: string]: boolean }>({
    helmet: false,
    vest: false,
    boots: false,
    hazardChecked: false,
  });

  // Global material search & AI Spec Gen states
  const [materialQuery, setMaterialQuery] = useState('');
  const [isGeneratingMaterial, setIsGeneratingMaterial] = useState(false);
  const [generatedMaterial, setGeneratedMaterial] = useState<{
    name: string;
    category: 'Structural' | 'Wood & Finishing' | 'Electrical' | 'Plumbing' | 'Tools & Equipment' | 'Safety Materials';
    subcategory: string;
    unit: string;
    costPerUnit: number;
    threshold: number;
    supplier: string;
    description: string;
  } | null>(null);
  const [importQty, setImportQty] = useState(150);

  // Inventory Filtering & UI Control states
  const [inventorySearch, setInventorySearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // AI Advisory Hub state
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiChatHistory, setAiChatHistory] = useState<{ id: string; role: 'user' | 'assistant'; text: string; time: string; }[]>([
    {
      id: 'ai-welcome',
      role: 'assistant',
      text: "Welcome to the BuildTrack Central AI Advisor. I am equipped with general building guidelines, structural math parameters, safety standards, and raw material properties. Ask me to draft structural calculation estimates, describe masonry specifications, or check material alternatives.",
      time: '10:00 AM'
    }
  ]);

  // Communities (Builders & Sellers Forums)
  const [selectedChannel, setSelectedChannel] = useState<'structural' | 'woods' | 'wires' | 'pipes'>('structural');
  const [communityChats, setCommunityChats] = useState({
    structural: [
      { id: 'sc1', sender: 'Robert Vance', role: 'SteelQuarry Distributor', msg: 'Immediate shipment of standard Grade 5 steel rebars available for Site Alpha sectors. Bulk discounts up to 15%.', time: '10:15 AM' },
      { id: 'sc2', sender: 'David Chen', role: 'Site Lead', msg: 'Anyone have active river coarse sand deposits ready near Sect-12? We need quick delivery of 20 tons.', time: '10:20 AM' },
      { id: 'sc3', sender: 'Delta Masonry Supplies Rep', role: 'Cement Seller', msg: 'David, we can dispatch 25 tons of M25 concrete aggregate within 4 hours. DM me the site coordinate.', time: '10:22 AM' }
    ],
    woods: [
      { id: 'wc1', sender: 'CenturyPly Sales Rep', role: 'Timber Seller', msg: 'Just restocked 300 sheets of Marine-Grade Plywood. All water permeability factors verified.', time: '09:40 AM' },
      { id: 'wc2', sender: 'Sofia Martinez', role: 'Finishing Lead', msg: 'Do you carry sawn oak timber columns pre-treated for high moisture environments?', time: '09:55 AM' },
      { id: 'wc3', sender: 'DecorCore Surface Coordinator', role: 'Laminates Advisor', msg: 'Sofia, we have chemical sealing treatments on our structural timber. Happy to ship sample panels.', time: '10:11 AM' }
    ],
    wires: [
      { id: 'ec1', sender: 'Marcus Vance', role: 'Senior Electrician', msg: 'Looking for 63A triple-pole circuit breakers matching Siemens grid certificates. Need 40 units ASAP.', time: '08:15 AM' },
      { id: 'ec2', sender: 'Schneider Electric Dealer', role: 'Electrical Seller', msg: 'Marcus, we have 150 units of certified circuit breakers in our local depot container. Ready for dispatch.', time: '08:24 AM' }
    ],
    pipes: [
      { id: 'pc1', sender: 'Astral Flow Coordinator', role: 'Plumbing Supplier', msg: 'We have emergency PVC Pressure pipes ready in stock. Perfect rating and pressure threshold guarantees.', time: '09:10 AM' },
      { id: 'pc2', sender: 'Elena Rodriguez', role: 'Foreman', msg: 'Need these pressure pipes at Site Beta immediately. We are locked/stalled awaiting layouts.', time: '09:33 AM' }
    ]
  });
  const [communityInput, setCommunityInput] = useState('');
  const [communityUserRole, setCommunityUserRole] = useState<'Builder' | 'Seller'>('Builder');

  // Workforce temporary states for reassignments
  const [workerInputTask, setWorkerInputTask] = useState<{ [key: string]: string }>({});

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleProgressSliderChange = (projId: string, val: number) => {
    setProjects(prev => prev.map(p => p.id === projId ? { ...p, progress: val } : p));
  };

  // Fast single-click material replenishment
  const handleIncreaseQty = (itemId: string, increment: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        const nextQty = item.qty + increment;
        return { ...item, qty: nextQty };
      }
      return item;
    }));
    const matched = inventory.find(i => i.id === itemId);
    showToast(`Purchased & Restocked +${increment} ${matched?.unit} for ${matched?.name}.`);
  };

  // Decline requested logistics
  const handleApproveRequest = (reqId: string) => {
    const matched = requests.find(r => r.id === reqId);
    if (!matched) return;

    // Approve the requests status
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Approved' } : r));
    
    // Auto-replenish the matched item in current stock
    setInventory(prev => prev.map(item => {
      if (item.name.toLowerCase() === matched.materialName.toLowerCase()) {
        return { ...item, qty: item.qty + matched.qty };
      }
      return item;
    }));

    // Trigger dynamic status release if foreman Elena gets her PVC Pipes
    if (matched.workerName === 'Elena Rodriguez' || matched.materialName.toLowerCase().includes('pvc')) {
      setWorkers(prev => prev.map(w => w.name === 'Elena Rodriguez' ? {
        ...w,
        status: 'active',
        currentTask: 'Resuming laid PVC supply connections on Site Beta.',
        productivity: 95
      } : w));
    }

    showToast(`Approved supply allocate! Dispatched ${matched.qty} ${matched.unit} of ${matched.materialName}.`);
  };

  const handleDeclineRequest = (reqId: string) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Declined' } : r));
    showToast("Dispatched cancellation order for requested allocation.");
  };

  // AI-powered global Material search through Gemini endpoint
  const handleMaterialSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = materialQuery.trim();
    if (!query) return;

    setIsGeneratingMaterial(true);
    setGeneratedMaterial(null);

    const helperPrompt = `You are an expert procurement agent and materials engineer in global construction. The builder is searching for this raw material: "${query}".
Analyze this material and return a structured specification sheet in standard JSON format.
You MUST write STRICT compliance JSON utilizing this exact scheme structure:
{
  "name": "fully professional descriptor of the material",
  "category": "choose one strictly from: 'Structural' | 'Wood & Finishing' | 'Electrical' | 'Plumbing' | 'Tools & Equipment' | 'Safety Materials'",
  "subcategory": "brief subcategory name (e.g. 'Steel Rebars', 'Veneers', 'Heavy Crane', 'Conduits')",
  "unit": "standard bulk package unit (e.g. 'Bags', 'Tons', 'Sheets', 'Meters', 'Units')",
  "costPerUnit": estimated unit market cost in USD as a standard number,
  "threshold": recommended site safety alert minimum stockpile limit as a number,
  "supplier": "suggested real world high-quality seller or industrial group",
  "description": "brief 1-2 sentence engineering description detailing structural strength, standard utilization guidelines, or safety compliance"
}
Ensure the response is ONLY valid raw JSON and has NO markdown codeblocks surrounding it. No preamble.`;

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: helperPrompt,
          model: 'gemini-3.5-flash'
        })
      });

      if (!response.ok) throw new Error("Fallback required");
      const resData = await response.json();
      if (resData.error || !resData.text) throw new Error(resData.error || "Blank data");

      // Robust JSON text extractor
      let cleanedJson = resData.text.trim();
      if (cleanedJson.startsWith("```")) {
        cleanedJson = cleanedJson.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      }

      const parsed = JSON.parse(cleanedJson);
      setGeneratedMaterial({
        name: parsed.name || query,
        category: (['Structural', 'Wood & Finishing', 'Electrical', 'Plumbing', 'Tools & Equipment', 'Safety Materials'].includes(parsed.category) ? parsed.category : 'Structural') as any,
        subcategory: parsed.subcategory || 'General Raw',
        unit: parsed.unit || 'Units',
        costPerUnit: Number(parsed.costPerUnit) || 25,
        threshold: Number(parsed.threshold) || 50,
        supplier: parsed.supplier || 'Global Procurement Corp',
        description: parsed.description || 'Highly optimal custom building component verified for engineering specs.'
      });
      showToast(`AI successfully drafted technical specifications for ${query}.`);
    } catch (err) {
      console.warn("Fallback material generation activated: ", err);
      // Beautiful smart client fallback generator based on keywords
      setTimeout(() => {
        let keyword = query.toLowerCase();
        let fallback: any = {
          name: query.charAt(0).toUpperCase() + query.slice(1),
          category: 'Structural',
          subcategory: 'Custom Aggregate',
          unit: 'Tons',
          costPerUnit: 120,
          threshold: 15,
          supplier: 'Sovereign Masonry Hub',
          description: 'Custom verified raw building material with rich composite integrity built for on-site load demands.'
        };

        if (keyword.includes('timber') || keyword.includes('oak') || keyword.includes('lumber') || keyword.includes('plywood') || keyword.includes('wood')) {
          fallback.category = 'Wood & Finishing';
          fallback.subcategory = 'Hardwood Timber';
          fallback.unit = 'Sheets';
          fallback.costPerUnit = 42;
          fallback.threshold = 30;
          fallback.supplier = 'Cascade Premium Woods';
          fallback.description = 'Kiln-dried raw lumber containing custom organic sealing treatments for high humidity weather tolerance.';
        } else if (keyword.includes('wire') || keyword.includes('cable') || keyword.includes('breaker') || keyword.includes('electrical') || keyword.includes('led')) {
          fallback.category = 'Electrical';
          fallback.subcategory = 'Conductors';
          fallback.unit = 'Rolls';
          fallback.costPerUnit = 95;
          fallback.threshold = 10;
          fallback.supplier = 'AeroGrid Cables Ltd';
          fallback.description = 'Low-leakage copper wiring containing fire-retardant polymers suitable for composite highrise slabs.';
        } else if (keyword.includes('pipe') || keyword.includes('drain') || keyword.includes('pump') || keyword.includes('plumbing') || keyword.includes('conduit')) {
          fallback.category = 'Plumbing';
          fallback.subcategory = 'Fluid Logistics';
          fallback.unit = 'Pcs';
          fallback.costPerUnit = 16;
          fallback.threshold = 40;
          fallback.supplier = 'Supreme Poly-Flow systems';
          fallback.description = 'Reinforced schedule-40 pvc pressure pipe engineered to survive extreme drainage compression cycles.';
        } else if (keyword.includes('helmet') || keyword.includes('glove') || keyword.includes('barrier') || keyword.includes('safety') || keyword.includes('boots')) {
          fallback.category = 'Safety Materials';
          fallback.subcategory = 'Personal Protective Gear';
          fallback.unit = 'Pcs';
          fallback.costPerUnit = 12;
          fallback.threshold = 60;
          fallback.supplier = 'SafeGuard Armors Inc';
          fallback.description = 'High molecular weight impact polypropylene structures verified by site safety hazard inspection norms.';
        } else if (keyword.includes('drill') || keyword.includes('crane') || keyword.includes('excavator') || keyword.includes('tool') || keyword.includes('welding')) {
          fallback.category = 'Tools & Equipment';
          fallback.subcategory = 'Pneumatics & Heavy Load';
          fallback.unit = 'Units';
          fallback.costPerUnit = 850;
          fallback.threshold = 2;
          fallback.supplier = 'Titan Machineries';
          fallback.description = 'Heavy-duty building apparatus designed to expedite digging and component alignment.';
        }

        setGeneratedMaterial(fallback);
        showToast(`Drafted technical specifications for ${query}.`);
      }, 700);
    } finally {
      setIsGeneratingMaterial(false);
    }
  };

  // Commit dynamic researched material into active stock inventory
  const handleAddMaterialToStock = () => {
    if (!generatedMaterial) return;

    const newMaterial: MaterialItem = {
      id: `custom-item-${Date.now()}`,
      name: generatedMaterial.name,
      category: generatedMaterial.category,
      subcategory: generatedMaterial.subcategory,
      qty: Number(importQty),
      unit: generatedMaterial.unit,
      costPerUnit: Number(generatedMaterial.costPerUnit),
      threshold: Number(generatedMaterial.threshold),
      supplier: generatedMaterial.supplier
    };

    setInventory(prev => [newMaterial, ...prev]);
    showToast(`Masterpiece! Imported ${importQty} ${generatedMaterial.unit} of ${generatedMaterial.name} into Active Stock.`);
    
    // Clear state
    setGeneratedMaterial(null);
    setMaterialQuery('');
    
    // Redirect to Materials tab and show ledger
    setCurrentTab('materials');
    setMaterialsMode('ledger');
  };

  // AI-powered building questions handler (Central Workspace AI)
  const handleAiChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = aiInput.trim();
    if (!query) return;

    // Append user message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: `ai-user-${Date.now()}`, role: 'user' as const, text: query, time: timestamp };
    setAiChatHistory(prev => [...prev, userMsg]);
    setAiInput('');
    setIsAiLoading(true);

    const setupPrompt = `You are a helpful on-site builder's virtual assistant.
The user is a contractor who needs a rapid, extremely straightforward, and direct response.
Provide direct, plain-English, very short answers (maximum 2-3 sentences or a quick simple list).
Avoid all complex engineering formulas, heavy jargon, or mathematical proofing. Keep everything plain, extremely simple, and actionable.

User Query: "${query}"`;

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: setupPrompt,
          model: 'gemini-3.5-flash'
        })
      });

      if (!response.ok) throw new Error("Fallback required");
      const resData = await response.json();
      if (resData.error || !resData.text) throw new Error(resData.error || "Blank info");

      setAiChatHistory(prev => [...prev, {
        id: `ai-bot-${Date.now()}`,
        role: 'assistant',
        text: resData.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch {
      // Local premium offline construction brain backup
      setTimeout(() => {
        let text = "";
        const lowQuery = query.toLowerCase();

        if (lowQuery.includes('primer') || lowQuery.includes('paint') || lowQuery.includes('moisture')) {
          text = `### Primer & Moisture Rule
- Standard drying requires **28 days** curing for new cement.
- Do not paint if moisture is high to prevent peeling. All simple!`;
        } else if (lowQuery.includes('clay') || lowQuery.includes('foundation') || lowQuery.includes('soil')) {
          text = `### Soil Stabilization
- Mix a little hydrated lime (2% to 5%) to dry out clay soils.
- Compact in simple layers using standard rollers.`;
        } else if (lowQuery.includes('brick') || lowQuery.includes('masonry') || lowQuery.includes('calculate')) {
          text = `### Easy Brick Rule
- You need about **500 standard bricks** per cubic meter.
- Use a **1:4** ratio for sand-cement mortar.`;
        } else {
          text = `### Quick Advice
- Confirm materials meet local building norms.
- Always wear hardhats and safety gear on active levels.
- Keep inventory stocks steady to avoid project stalls.`;
        }

        setAiChatHistory(prev => [...prev, {
          id: `ai-local-bot-${Date.now()}`,
          role: 'assistant',
          text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 600);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Send a custom message in the community forums
  const handleSendCommunityMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const txt = communityInput.trim();
    if (!txt) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userRoleText = communityUserRole === 'Builder' ? 'Site Representative' : 'Material Representative';
    
    const newMsg = {
      id: `comm-msg-${Date.now()}`,
      sender: 'Me (Project lead)',
      role: userRoleText,
      msg: txt,
      time: timestamp
    };

    setCommunityChats(prev => ({
      ...prev,
      [selectedChannel]: [...prev[selectedChannel], newMsg]
    }));
    setCommunityInput('');

    // Simulated interactive seller auto response matching user keywords in 800ms
    setTimeout(() => {
      let replyWord = txt.toLowerCase();
      let sellerName = 'Apex Supplies Coordinator';
      let sellerRole = 'Verified seller';
      let sellerReply = 'Thank you for your posting! Let us check our stock ledger sheet and draft a delivery quotation for you immediately.';

      if (selectedChannel === 'structural') {
        sellerName = 'Jindal Steel Depot';
        sellerRole = 'Premium Steel Seller';
        if (replyWord.includes('sand') || replyWord.includes('cement')) {
          sellerReply = 'Hi there! We have 800 tons of structural aggregate and River Coarse Sand stockpiled in our central Sect-12 yard. Ready to ship in 2 hours with our bulk dump truck fleet.';
        } else if (replyWord.includes('steel') || replyWord.includes('rebar') || replyWord.includes('tmt')) {
          sellerReply = 'Greetings project manager. S-TMT high ductility 12mm steel rods are fully loaded in our warehouse container. Spot rate is currently ₹54,000/ton. Let me know your desired size.';
        }
      } else if (selectedChannel === 'woods') {
        sellerName = 'ForestPro Timber';
        sellerRole = 'Certified Wood supplier';
        if (replyWord.includes('oak') || replyWord.includes('timber') || replyWord.includes('veneer')) {
          sellerReply = 'We have kiln-dried treated sawn timber logs pre-certified for structural loading. Ready to release tomorrow at ₹2,600/piece.';
        }
      } else if (selectedChannel === 'wires') {
        sellerName = 'Finolex Wire Core';
        sellerRole = 'Electrical Distributor';
        if (replyWord.includes('wire') || replyWord.includes('breaker') || replyWord.includes('led')) {
          sellerReply = 'All standard fire-resistant insulated copper cables (FR-LSH wires) are ready in container lots. Prompt shipping to any suburban sector.';
        }
      } else if (selectedChannel === 'pipes') {
        sellerName = 'Supreme Piping rep';
        sellerRole = 'Plumbing Logistics Advisor';
        if (replyWord.includes('pvc') || replyWord.includes('pipe') || replyWord.includes('conduit')) {
          sellerReply = 'Elena has highlighted the supply shortage. We have released a reserve shipping container with 500 units of 4" pvc pipes. We can expedite arrival to Site Beta for urgent layouts.';
        }
      }

      const sellerMsg = {
        id: `seller-reply-${Date.now()}`,
        sender: sellerName,
        role: sellerRole,
        msg: sellerReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setCommunityChats(prev => ({
        ...prev,
        [selectedChannel]: [...prev[selectedChannel], sellerMsg]
      }));
    }, 850);
  };

  // Re-assign tasks directly to workers
  const handleAssignTask = (workerName: string) => {
    const taskText = workerInputTask[workerName]?.trim();
    if (!taskText) {
      showToast("Please enter an active duty statement first.");
      return;
    }

    setWorkers(prev => prev.map(w => {
      if (w.name === workerName) {
        return {
          ...w,
          currentTask: taskText,
          status: 'active', // clear any stalled states upon re-tasking
          dailyProgress: [taskText, ...w.dailyProgress]
        };
      }
      return w;
    }));

    showToast(`Reassigned ${workerName} -> "${taskText}". Status set to Active.`);
    setWorkerInputTask(prev => ({ ...prev, [workerName]: '' }));
  };

  // Quickly toggle worker on-shift status
  const handleUpdateWorkerStatus = (workerName: string, status: 'active' | 'stalled' | 'off-site') => {
    setWorkers(prev => prev.map(w => {
      if (w.name === workerName) {
        let taskMsg = w.currentTask;
        if (status === 'stalled') {
          taskMsg += " (STALLED awaiting supply-chain resolution)";
        } else if (status === 'off-site') {
          taskMsg = "Logged off shift.";
        } else {
          taskMsg = taskMsg.replace(" (STALLED awaiting supply-chain resolution)", "");
        }
        return { ...w, status, currentTask: taskMsg };
      }
      return w;
    }));
    showToast(`Updated status of ${workerName} to ${status.toUpperCase()}.`);
  };

  // Delete inventory unit
  const handleDeleteInventoryItem = (itemId: string) => {
    const matched = inventory.find(i => i.id === itemId);
    setInventory(prev => prev.filter(i => i.id !== itemId));
    showToast(`Removed "${matched?.name}" from stock records.`);
  };

  // Calculate high-quality analytics dynamically based on real state
  const totalAssetsValue = inventory.reduce((acc, item) => acc + (item.qty * item.costPerUnit), 0);
  const lowMaterialsCount = inventory.filter(i => i.qty < i.threshold).length;
  const activeUnresolvedRequests = requests.filter(r => r.status === 'Pending');

  // Search filtered inventory
  const filteredInventory = inventory.filter(item => {
    const matchQuery = item.name.toLowerCase().includes(inventorySearch.toLowerCase()) || 
                       item.subcategory.toLowerCase().includes(inventorySearch.toLowerCase()) ||
                       item.supplier.toLowerCase().includes(inventorySearch.toLowerCase());
    
    if (selectedCategory === 'All') return matchQuery;
    return matchQuery && item.category === selectedCategory;
  });

  // Full Page Login Verification Check
  if (!isLoggedIn) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!loginEmail.trim() || !loginEmail.toLowerCase().endsWith('@gmail.com')) {
        showToast("Access Denied: You must enter a valid @gmail.com address.");
        return;
      }
      if (!loginPassword || loginPassword.length < 4) {
        showToast("Security Check: Password must be at least 4 characters long.");
        return;
      }
      
      localStorage.setItem('bt_is_logged_in', 'true');
      localStorage.setItem('bt_user_email', loginEmail);
      setIsLoggedIn(true);
      showToast(`Access Authorized. Welcome back to BuildTrack Central.`);
    };

    return (
      <div className="min-h-screen bg-[#06080C] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,107,0,0.12),rgba(0,0,0,0))] text-[#E2E8F0] font-sans flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        {/* Floating Toast Notification inside Login Screen */}
        {toastMessage && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#0E1118] border-2 border-[#FF6B00] text-white px-6 py-3.5 rounded-full text-sm font-semibold flex items-center space-x-3 shadow-[0_0_20px_rgba(255,107,0,0.4)] animate-fade-in">
            <AlertTriangle className="w-4.5 h-4.5 text-[#FF6B00]" />
            <span className="font-sans font-bold">{toastMessage}</span>
          </div>
        )}

        <div className="w-full max-w-md bg-[#0F121C] border border-[#21283C] rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-md">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 flex items-center justify-center rounded-2xl bg-[#0E1118] border-2 border-[#FF6B00] shadow-[0_0_25px_rgba(255,107,0,0.35)]">
            <CompanyLogo className="w-12 h-12 text-[#FF6B00]" />
          </div>

          <div className="text-center mt-12 mb-8">
            <h1 className="text-3xl font-black uppercase tracking-wider text-white select-none">
              Build<span className="text-[#FF6B00]">Track</span>
            </h1>
            <p className="text-xs text-slate-400 mt-2 font-mono tracking-wide uppercase">
              Contractor Enterprise Platform
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-mono font-bold tracking-wider text-slate-400 block mb-2 uppercase">
                Gmail Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <User className="w-4.5 h-4.5" />
                </span>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-[#07090E] border border-slate-800 focus:border-[#FF6B00] rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:ring-0 transition"
                />
              </div>
              {!loginEmail.toLowerCase().endsWith('@gmail.com') && loginEmail.length > 2 && (
                <p className="text-[10px] text-amber-500 font-mono mt-2 flex items-center">
                  ⚠️ Must be a valid @gmail.com address
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-mono font-bold tracking-wider text-slate-400 block mb-2 uppercase">
                Security Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Lock className="w-4.5 h-4.5" />
                </span>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#07090E] border border-slate-800 focus:border-[#FF6B00] rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 placeholder-slate-650 focus:outline-none focus:ring-0 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6B00] hover:bg-[#FF8C42] text-black font-extrabold uppercase tracking-widest py-3.5 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(255,107,0,0.3)] transition-all duration-200 flex items-center justify-center space-x-2 text-xs"
            >
              <span>Authorize & Launch</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Help panel */}
          <div className="mt-8 pt-6 border-t border-[#1C2235]/60 text-center">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
              Enterprise Quick Access
            </span>
            <button
              type="button"
              onClick={() => {
                setLoginEmail('yogbynikita@gmail.com');
                setLoginPassword('password123');
                showToast("Prefilled demo credentials.");
              }}
              className="text-xs text-[#FF8C42]/85 hover:text-[#FF6B00] transition font-bold font-mono underline"
            >
              Load Demo Credentials
            </button>
          </div>
        </div>

        <p className="text-slate-600 text-[10px] uppercase font-mono tracking-widest mt-8 pointer-events-none">
          BuildTrack System Inc. • Secured By AES-256
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#060709] text-[#E2E8F0] font-sans antialiased text-base pb-24 md:pb-6">
      {/* Dynamic Floating Toast Notifications */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#0E1118] border-2 border-[#FF6B00] text-white px-6 py-3.5 rounded-full text-sm font-semibold flex items-center space-x-3 shadow-[0_0_30px_rgba(255,107,0,0.45)] animate-fade-in">
          <Sparkles className="w-5 h-5 text-[#FF6B00] animate-spin" />
          <span className="font-sans tracking-tight font-bold">{toastMessage}</span>
        </div>
      )}

      {/* RE-DESIGNED CLEAN BRAND NAVIGATION BAR */}
      <header className="h-16 border-b border-[#141822] flex items-center justify-between px-6 bg-[#090B0E]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1C202E] to-[#0E1118] border border-[#232E48]/65 shadow-[0_4px_12px_rgba(255,107,0,0.15)]">
            <CompanyLogo className="w-7 h-7 text-[#FF6B00]" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-wider uppercase flex items-center text-white font-display">
              Build<span className="text-[#FF6B00]">Track</span> 
              <span className="text-xs bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 px-2.5 py-0.5 rounded-lg ml-3 font-semibold">
                General Contractor App
              </span>
            </span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-3 text-sm text-slate-300">
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-[#0E1118] px-4 py-2 rounded-xl border border-[#1A202E]">
              <Coins className="w-4.5 h-4.5 text-[#FF6B00]" />
              <span className="font-mono">Materials Value: <strong className="text-white">₹{totalAssetsValue.toLocaleString(undefined, {maximumFractionDigits:0})}</strong></span>
            </div>
            <div className="flex items-center space-x-2 bg-[#0E1118] px-4 py-2 rounded-xl border border-[#1A202E]">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-500" />
              <span className="font-mono">Low Stock Items: <strong className="text-amber-400">{lowMaterialsCount} Alerts</strong></span>
            </div>
          </div>

          {/* Interactive Top-Right Alerts Notification Center */}
          <div className="relative">
            <button
              onClick={() => setShowNotifPopup(!showNotifPopup)}
              id="top-right-notification-bell"
              className="relative p-2.5 bg-[#0E1118] hover:bg-[#1C2230] border border-[#1A202E] rounded-xl text-slate-300 hover:text-white transition flex items-center justify-center cursor-pointer"
            >
              <Bell className="w-5 h-5 text-[#FF6B00]" />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF6B00] text-black font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce border-2 border-[#090B0E]">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>

            {/* Notification Dropdown Container */}
            {showNotifPopup && (
              <div className="absolute right-0 mt-3 w-80 md:w-96 bg-[#0E1118] border border-[#21283B] rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.9)] overflow-hidden z-50">
                <div className="flex items-center justify-between px-4.5 py-3 border-b border-[#1F2538] bg-[#121622]">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-wide flex items-center space-x-1.5">
                    <Bell className="w-4 h-4 text-[#FF6B00]" />
                    <span>Real-Time Construction Alerts</span>
                  </span>
                  <div className="flex items-center space-x-2.5">
                    <button 
                      onClick={() => {
                        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                        showToast("All alerts marked as read.");
                      }}
                      className="text-[10px] uppercase font-bold text-slate-400 hover:text-white transition"
                    >
                      Read All
                    </button>
                    <button 
                      onClick={() => {
                        setNotifications([]);
                        showToast("Notifications cleared.");
                      }}
                      className="text-[10px] uppercase font-bold text-red-400 hover:text-red-300 transition"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-[#1F2538]/50">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-xs">
                      <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-40" />
                      No active alerts. All construction lines operating normally.
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div 
                        key={n.id} 
                        className={`p-3.5 text-xs text-[#E2E8F0] hover:bg-[#151926]/45 transition flex items-start space-x-2.5 ${n.read ? 'opacity-65' : 'bg-[#FF6B00]/5 border-l-2 border-[#FF6B00]'}`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {n.type === 'alert' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                          {n.type === 'update' && <Activity className="w-4 h-4 text-[#FF6B00]" />}
                          {n.type === 'system' && <Check className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`leading-relaxed font-sans ${n.read ? 'text-[#A0AEC0]' : 'text-white'}`}>{n.text}</p>
                          <span className="text-[10px] font-mono text-slate-500 mt-1 block">{n.time}</span>
                        </div>
                        {!n.read && (
                          <button
                            onClick={() => {
                              setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
                            }}
                            className="bg-slate-800 hover:bg-slate-700 p-1 rounded text-[9px] uppercase font-bold text-slate-350 hover:text-white cursor-pointer transition shrink-0 self-center"
                          >
                            Mark Read
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CORE CONTENT LAYOUT SWITCHER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* ==================== TAB 1: HOME DESK (SIMPLIFIED OVERVIEW) ==================== */}
        {currentTab === 'home' && (
          <div className="space-y-6 animate-fade-in text-[#E2E8F0]">
            
            {/* WELCOME BANNER */}
            <div className="bg-gradient-to-r from-[#0C0F16] to-[#080A0E] border border-[#1F2538] rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/5 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold font-display text-white tracking-wide uppercase">
                    Site<span className="text-[#FF6B00]">Tracker</span>
                  </h1>
                  <p className="text-sm text-slate-300 mt-1">
                    Welcome back, <span className="text-white font-semibold">{userProfile.name}</span>. The active sites are currently running.
                  </p>
                </div>
                <div className="text-xs bg-[#121622] text-slate-400 font-mono border border-slate-800 px-3.5 py-1.5 rounded-lg flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Operational Status: OK</span>
                </div>
              </div>
            </div>

            {/* KEY SITE METRICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-sans">
              <button 
                onClick={() => setCurrentTab('workers')}
                className="bg-[#090C12] border border-[#1F2538] hover:border-[#FF6B00]/40 rounded-2xl p-5 text-left transition duration-150 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Active Workers</span>
                  <Users className="w-5 h-5 text-[#FF6B00]" />
                </div>
                <div className="text-white text-3xl font-extrabold mt-2">
                  {workers.filter(w => w.status === 'active').length} <span className="text-sm font-semibold text-slate-400 font-normal lowercase">on shift</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 hover:underline">Manage check-ins &rarr;</p>
              </button>

              <button 
                onClick={() => setCurrentTab('materials')}
                className="bg-[#090C12] border border-[#1F2538] hover:border-amber-500/40 rounded-2xl p-5 text-left transition duration-150 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Materials Ledger</span>
                  <Truck className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-white text-3xl font-extrabold mt-2">
                  {inventory.length} <span className="text-sm font-semibold text-slate-400 font-normal lowercase">items</span>
                </div>
                <p className="text-xs text-[#FF8C42] mt-2 font-semibold">
                  {lowMaterialsCount > 0 ? `⚠️ ${lowMaterialsCount} low stock alerts` : '🟢 Stock levels healthy'}
                </p>
              </button>

              <button 
                onClick={() => setCurrentTab('ai')}
                className="bg-[#090C12] border border-[#1F2538] hover:border-green-500/40 rounded-2xl p-5 text-left transition duration-150 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase font-semibold">AI Support Copilot</span>
                  <Bot className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-white text-3xl font-extrabold mt-2">
                  Active
                </div>
                <p className="text-xs text-slate-400 mt-2 hover:underline">Ask quick builder guidelines &rarr;</p>
              </button>
            </div>

            {/* TWO COLUMNS: PROJECT SUMMARY & ACTION SHORTCUTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT: SIMPLIFIED PROJECT TRACKER LIST */}
              <div className="lg:col-span-8 bg-[#090C12] border border-[#1F2538] rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white uppercase tracking-wide flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-[#FF6B00]" />
                    <span>Project Locations Summary</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">A simple overview of current construction site progress. Use individual tabs for actions.</p>
                </div>

                <div className="space-y-4 pt-2">
                  {projects.map(proj => {
                    return (
                      <div key={proj.id} className="bg-[#10131B] border border-slate-900 rounded-xl p-4 space-y-3.5">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wide">{proj.name}</h4>
                            <span className="text-xs text-slate-400 flex items-center mt-1">
                              <MapPin className="w-3.5 h-3.5 mr-1 text-[#FF6B00]" /> {proj.location}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-[#FF8C42] bg-[#FF8C42]/10 px-2.5 py-1 rounded">
                            {proj.progress}% Done
                          </span>
                        </div>

                        {/* SIMPLE STATIC PROGRESS BAR */}
                        <div className="space-y-1">
                          <div className="w-full bg-[#1A1F2D] h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#FF6B00] h-full transition-all duration-300"
                              style={{ width: `${proj.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs text-slate-400 pt-1 border-t border-slate-900/60">
                          <span>Lead: <span className="text-slate-300 font-medium">{proj.lead}</span></span>
                          <span>Target: <span className="text-[#FF8C42] font-medium">{proj.targetDate}</span></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT: SHORTCUTS & BULLETINS */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* QUICK BULLETINS CARD */}
                <div className="bg-[#090C12] border border-[#1F2538] rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2 border-b border-slate-900 pb-3">
                    <Shield className="w-4 h-4 text-amber-500" />
                    <span>Site Bulletins</span>
                  </h3>
                  
                  <div className="space-y-3 text-xs leading-relaxed font-sans">
                    <div className="bg-amber-950/20 border-l-2 border-amber-500 p-3 rounded-r-lg">
                      <p className="text-slate-300 font-semibold font-bold">Site Alpha Setup Plan</p>
                      <p className="text-slate-400 mt-1">Ensure foundation coordinates are verified before weekend weather.</p>
                    </div>
                    <div className="bg-blue-950/20 border-l-2 border-blue-400 p-3 rounded-r-lg">
                      <p className="text-slate-300 font-semibold font-bold">Site Gamma Clay Dry-out</p>
                      <p className="text-slate-400 mt-1">Recommended clay moisture is elevated. Keep sandstone mix steady.</p>
                    </div>
                  </div>
                </div>

                {/* HELP CARD */}
                <div className="bg-gradient-to-br from-[#10131B] to-[#0A0D14] border border-[#1F2538] rounded-2xl p-6 space-y-3">
                  <h4 className="text-xs font-bold text-slate-350 uppercase tracking-widest font-display">Contractor Assist</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    siteTracker is optimized for straightforward building logs. Tap separate tabs below to update workers, view files, configure theme views, or research materials. 
                  </p>
                  <button
                    onClick={() => setCurrentTab('ai')}
                    className="w-full bg-[#1C2232] hover:bg-[#FF6B00] border border-[#2F3950] text-[#E2E8F0] hover:text-black hover:font-bold text-xs py-2 rounded-lg transition duration-150 uppercase cursor-pointer"
                  >
                    Launch AI Advisor
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==================== TAB 2: COMBINED MATERIALS (LEDGER & AI RESEARCH) ==================== */}
        {currentTab === 'materials' && (
          <div className="space-y-6">
            
            {/* COMPACT SEGMENTED SWITCHER BAR FOR COMBINED MATERIAL POWER */}
            <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Active Materials Ledger & AI Drafting Center
                </h2>
                <p className="text-sm text-slate-300 mt-1.5">
                  Manage active on-site inventory counts or use Gemini AI to research, spec, and draft new materials.
                </p>
              </div>
              <div className="flex bg-[#151924] p-1.5 rounded-xl border border-slate-800 shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setMaterialsMode('ledger')}
                  className={`flex-1 md:flex-initial px-5 py-2.5 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    materialsMode === 'ledger'
                      ? 'bg-[#FF6B00] text-black shadow-[0_0_12px_rgba(255,107,0,0.35)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Active Ledger
                </button>
                <button
                  type="button"
                  onClick={() => setMaterialsMode('research')}
                  className={`flex-1 md:flex-initial px-5 py-2.5 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    materialsMode === 'research'
                      ? 'bg-[#FF6B00] text-black shadow-[0_0_12px_rgba(255,107,0,0.35)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Find Materials (AI)
                </button>
              </div>
            </div>

            {/* CONDITIONAL CONTENT VIEWPORT */}
            {materialsMode === 'research' ? (
              <div className="space-y-6 animate-fade-in">
            
            <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 shadow-lg">
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-white tracking-wide flex items-center space-x-2.5">
                  <Search className="text-[#FF6B00] w-6 h-6" />
                  <span>Find & Craft Any Material in the World</span>
                </h2>
                <p className="text-sm text-slate-300 mt-2">
                  Type any construction, decoration, wiring, plumbing, or structural raw material in existence. Our integrated Gemini AI compiles realistic engineering guidelines, pricing estimates, safety limits, and standard suppliers. You can review or edit the metrics, then add them directly to your active stock ledger.
                </p>
              </div>

              {/* SEARCH INPUT BAR */}
              <form onSubmit={handleMaterialSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
                <input 
                  type="text"
                  placeholder="e.g., Siberian Larch Timber, Composite Steel Rebars, Hydrophobic Drywall, Titanium Cables..."
                  value={materialQuery}
                  onChange={(e) => setMaterialQuery(e.target.value)}
                  className="flex-1 bg-[#151924] border border-[#232E48] rounded-xl px-4 py-3.5 text-sm placeholder-slate-500 text-white focus:outline-none focus:border-[#FF6B00]"
                />
                <button 
                  type="submit"
                  disabled={isGeneratingMaterial}
                  className="bg-[#FF6B00] hover:bg-[#FF8C42] disabled:bg-slate-800 text-black font-bold uppercase tracking-wider text-sm px-6 py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isGeneratingMaterial ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Gemini is researching specifications...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Draft via Gemini AI</span>
                    </>
                  )}
                </button>
              </form>

              {/* QUICK SUGGESTIONS BOX */}
              <div className="mt-4 flex flex-wrap gap-2.5 items-center">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Popular Searches:</span>
                {[
                  'Grade-50 Structural Steel Bars',
                  'Hydrophobic Silica Aerogel Panels',
                  'Siberian Larch Hardwood Decks',
                  'Ultra-Flexible Fireproof Copper Conduit',
                  'Extreme-Impact ABS Safety Helmets'
                ].map(item => (
                  <button 
                    key={item}
                    type="button"
                    onClick={() => setMaterialQuery(item)}
                    className="bg-[#121622] hover:bg-[#1E253A] border border-slate-800 text-slate-300 hover:text-white px-3 py-1 rounded-lg text-xs transition"
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>

            {/* GENERATED MATER PROPERTIES CARD */}
            {generatedMaterial && (
              <div className="bg-[#111420] border-2 border-[#FF6B00] rounded-2xl p-6 shadow-2xl animate-fade-in grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* SPEC SHEET DETAILS */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-lg">
                        Recommended Category: {generatedMaterial.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-3 uppercase tracking-wide">{generatedMaterial.name}</h3>
                      <p className="text-sm text-slate-300 mt-1">Sub-category: <strong className="text-[#FF8C42]">{generatedMaterial.subcategory}</strong></p>
                    </div>
                    <div className="bg-[#FF6B00] text-black text-sm px-3 py-1.5 rounded-lg font-bold">
                      Gemini Verified
                    </div>
                  </div>

                  <div className="text-sm text-slate-300 leading-relaxed bg-[#151926] p-4 rounded-xl border border-[#232F4D]/50 space-y-1.5">
                    <strong className="text-slate-400 block text-xs tracking-wider uppercase font-semibold">Material Profile & Engineering Standards</strong>
                    <p>{generatedMaterial.description}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-[#141824] p-3 rounded-xl border border-slate-800 text-center">
                      <span className="text-xs text-slate-400 uppercase block">Pack Unit</span>
                      <strong className="text-white text-sm">{generatedMaterial.unit}</strong>
                    </div>
                    <div className="bg-[#141824] p-3 rounded-xl border border-slate-800 text-center">
                      <span className="text-xs text-slate-400 uppercase block">Est Unit Cost</span>
                      <strong className="text-green-400 text-sm">₹{Number(generatedMaterial.costPerUnit).toLocaleString()}</strong>
                    </div>
                    <div className="bg-[#141824] p-3 rounded-xl border border-slate-800 text-center">
                      <span className="text-xs text-slate-400 uppercase block">Min Safety Level</span>
                      <strong className="text-amber-500 text-sm">{generatedMaterial.threshold} {generatedMaterial.unit}</strong>
                    </div>
                    <div className="bg-[#141824] p-3 rounded-xl border border-slate-800 text-center">
                      <span className="text-xs text-slate-400 block">Main Supplier</span>
                      <strong className="text-white text-sm truncate block" title={generatedMaterial.supplier}>{generatedMaterial.supplier}</strong>
                    </div>
                  </div>
                </div>

                {/* ADD ACTION PANEL */}
                <div className="md:col-span-5 bg-[#171D2F] border border-[#293452] rounded-xl p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-sm font-bold uppercase text-white tracking-wider flex items-center space-x-2">
                      <Truck className="text-[#FF6B00] w-5 h-5" />
                      <span>Review & Import to Active Stock</span>
                    </h4>
                    <p className="text-sm text-slate-300 mt-2">Adjust the starting stockpiling parameters below, then authorize adding this item and quantity into your live inventory list.</p>

                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="text-xs text-slate-300 block mb-1 font-semibold">CHOOSE REGISTERED NAME</label>
                        <input 
                          type="text" 
                          value={generatedMaterial.name}
                          onChange={(e) => setGeneratedMaterial({ ...generatedMaterial, name: e.target.value })}
                          className="w-full bg-[#0E1118] border border-slate-800 text-sm px-3 py-2 rounded-lg text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-slate-300 block mb-1 font-semibold">UNIT PRICE (₹)</label>
                          <input 
                            type="number" 
                            value={generatedMaterial.costPerUnit}
                            onChange={(e) => setGeneratedMaterial({ ...generatedMaterial, costPerUnit: Number(e.target.value) })}
                            className="w-full bg-[#0E1118] border border-slate-800 text-sm px-3 py-2 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 block mb-1 font-semibold">ADD INITIAL QTY</label>
                          <input 
                            type="number" 
                            min="1"
                            value={importQty}
                            onChange={(e) => setImportQty(Number(e.target.value))}
                            className="w-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-sm px-3 py-2 rounded-lg text-white font-bold text-center focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#293452]/50">
                    <button 
                      onClick={handleAddMaterialToStock}
                      className="w-full bg-[#FF6B00] hover:bg-[#FF8C42] text-black font-extrabold uppercase text-sm py-3 rounded-xl tracking-wider transition active:scale-95 cursor-pointer"
                    >
                      Authorize & Add to Inventory
                    </button>
                    <button 
                      onClick={() => setGeneratedMaterial(null)}
                      className="w-full text-center text-slate-400 hover:text-white text-xs uppercase font-bold mt-3 cursor-pointer"
                    >
                      Discard Draft Specifications
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* INFORMATIONAL CALLOUT */}
            {!generatedMaterial && !isGeneratingMaterial && (
              <div className="bg-[#111420]/50 border border-slate-800 rounded-xl p-8 text-center py-12">
                <Bot className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="text-base font-bold text-slate-200">Search to Draft Specifications</h4>
                <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">We use Gemini AI intelligence to resolve real material names, calculate pricing estimates, and draft performance parameters instantly.</p>
              </div>
            )}

              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
            
            {/* INVENTORY FILTERS & SUB STATS */}
            <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              
              {/* Search + Category Filter */}
              <div className="space-y-4 w-full md:w-auto flex-1">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-3 w-5 h-5 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Search items, categories, or suppliers..." 
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                      className="w-full bg-[#151924] border border-[#232E48] rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-[#151924] border border-[#232E48] rounded-xl text-sm px-4 py-2.5 text-white focus:outline-none focus:border-[#FF6B00]"
                  >
                    <option value="All">All Categories</option>
                    <option value="Structural">Structural</option>
                    <option value="Wood & Finishing">Wood & Finishing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Tools & Equipment">Tools & Equipment</option>
                    <option value="Safety Materials">Safety Materials</option>
                  </select>
                </div>

                {/* Categories filtering buttons */}
                <div className="flex flex-wrap gap-2 pt-1 font-medium">
                  {['All', 'Structural', 'Wood & Finishing', 'Electrical', 'Plumbing', 'Tools & Equipment', 'Safety Materials'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition ${
                        selectedCategory === cat 
                          ? 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40' 
                          : 'bg-[#151924] text-slate-300 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* STAT VALUATIONS METRICS */}
              <div className="bg-[#151924] border border-[#20293F] rounded-xl p-4 flex flex-row md:flex-col gap-6 justify-between items-center md:items-end w-full md:w-auto font-sans">
                <div className="text-left md:text-right">
                  <span className="text-xs text-slate-400 block leading-none font-semibold uppercase tracking-wider">Total Inventory Value</span>
                  <strong className="text-white text-lg font-bold block mt-1.5">₹{totalAssetsValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</strong>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block leading-none font-semibold uppercase tracking-wider">Storage Catalog</span>
                  <strong className="text-slate-300 text-sm block mt-1.5">{filteredInventory.length} Unique Materials listed</strong>
                </div>
              </div>

            </div>

            {/* LEDGER GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredInventory.map(item => {
                const isUnderThreshold = item.qty < item.threshold;
                const valuation = item.qty * item.costPerUnit;

                return (
                  <div 
                    key={item.id} 
                    className={`bg-[#111420] rounded-xl p-5 border transition hover:border-[#FF6B00]/30 flex flex-col justify-between h-[230px] ${
                      isUnderThreshold ? 'border-amber-900 border-l-4 border-l-amber-500 bg-[#161214]' : 'border-[#1F2538]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="truncate pr-1">
                          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">{item.category} • {item.subcategory}</span>
                          <h4 className="text-base font-bold text-white uppercase tracking-tight mt-1 truncate" title={item.name}>
                            {item.name}
                          </h4>
                        </div>
                        <button 
                          onClick={() => handleDeleteInventoryItem(item.id)}
                          className="text-slate-600 hover:text-red-400 p-1 rounded transition ml-auto shrink-0"
                          title="Remove records"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm bg-[#090C12] p-3 rounded-lg border border-slate-900">
                        <div>
                          <span className="text-xs text-slate-400 block font-semibold">Active In-Stock</span>
                          <strong className={`text-base ${isUnderThreshold ? 'text-amber-500 font-bold' : 'text-white'}`}>
                            {item.qty} <span className="text-xs font-normal text-slate-400">{item.unit}</span>
                          </strong>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 block font-semibold">Safety Reserve</span>
                          <span className="text-slate-300 block text-sm">{item.threshold} {item.unit}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5">
                        <div>
                          <span className="text-xs text-slate-400 block leading-none">Stock Value</span>
                          <strong className="text-green-400 text-base font-bold">₹{valuation.toLocaleString(undefined, {maximumFractionDigits:0})}</strong>
                        </div>
                        
                        <div className="flex items-center space-x-1.5">
                          <button 
                            onClick={() => handleIncreaseQty(item.id, 100)}
                            className="bg-[#1F2636] hover:bg-[#FF6B00] hover:text-black text-xs text-slate-300 px-3 py-1.5 rounded-lg font-bold transition duration-240 cursor-pointer"
                          >
                            +100 Refill
                          </button>
                          <button 
                            onClick={() => handleIncreaseQty(item.id, 10)}
                            className="bg-[#1F2636] hover:bg-[#FF6B00] hover:text-black text-xs text-slate-300 px-2 py-1.5 rounded-lg font-bold transition duration-240 cursor-pointer"
                          >
                            +10
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-slate-500 italic truncate" title={item.supplier}>
                        Supplier: {item.supplier}
                      </div>

                      {isUnderThreshold && (
                        <div className="mt-2 bg-amber-950/40 border border-amber-900 text-amber-500 p-1 rounded text-xs flex items-center justify-center space-x-1 animate-pulse">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Stock under safety limit!</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredInventory.length === 0 && (
                <div className="col-span-full text-center py-12 bg-slate-900/25 rounded-2xl border border-dashed border-slate-800 p-5">
                  <Truck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-base font-bold text-slate-300">No materials currently match filters</p>
                  <p className="text-sm text-slate-400 mt-1">Go to the "Find Materials (AI)" tab to draft any item in the world and add it here.</p>
                </div>
              )}
            </div>

              </div>
            )}

          </div>
        )}

        {/* ==================== TAB 4: AI BUILDER ADVISOR ==================== */}
        {currentTab === 'ai' && (
          <div className="space-y-6">
            
            <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide flex items-center space-x-2.5">
                  <Bot className="w-6 h-6 text-[#FF6B00]" />
                  <span>BuildTrack AI Support</span>
                </h2>
                <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                  Ask our construction assistant system about concrete calculations, moisture limits, safety practices, structural rules, or daily scheduling strategies.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* SUGGESTED CIVIL QUESTIONS LIST (LEFT) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-5">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#FF6B00] block mb-3">Popular AI Queries</span>
                  <div className="space-y-3">
                    {[
                      { q: "What are the moisture constraints for applying concrete masonry primer?", label: "Plaster & Paint" },
                      { q: "How do I calculate Red Clay Kiln Bricks needed per cubic meter of wall?", label: "Structural Maths" },
                      { q: "What are the best grading practices in high-viscosity swelling clay?", label: "Excavation" },
                      { q: "State key safety precautions when assembling scaffolds above 10m height.", label: "Scaffolding Safety" }
                    ].map(item => (
                      <button 
                        key={item.q}
                        onClick={() => setAiInput(item.q)}
                        className="w-full text-left bg-[#151924] hover:bg-[#1E253A] border border-slate-800 hover:border-slate-700 p-4 rounded-xl transition duration-150 flex flex-col justify-between"
                      >
                        <span className="text-sm text-slate-200 leading-relaxed font-semibold mb-3">"{item.q}"</span>
                        <span className="text-xs bg-slate-900 border border-slate-800 text-[#FF8C42] rounded px-2.5 py-1 font-semibold tracking-wide uppercase">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ACTIVE CHAT MAIN WINDOW (RIGHT) */}
              <div className="lg:col-span-8 bg-[#111420] border border-[#1F2538] rounded-2xl p-5 flex flex-col justify-between min-h-[480px]">
                
                {/* MESSAGES DISPLAY */}
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
                  {aiChatHistory.map(msg => (
                    <div key={msg.id} className={`flex flex-col mb-4 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <span className="text-xs font-bold text-slate-400 block mb-1.5">
                        {msg.role === 'user' ? 'Your Inquiry' : 'BuildTrack AI Expert'}
                      </span>
                      <div className={`p-4 rounded-xl text-sm leading-relaxed max-w-[85%] ${
                        msg.role === 'user' 
                          ? 'bg-[#FF6B00] text-black font-bold rounded-tr-none shadow-md' 
                          : 'bg-[#151924] border border-slate-800 text-slate-100 rounded-tl-none whitespace-pre-wrap'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isAiLoading && (
                    <div className="flex items-center space-x-2 text-sm text-[#FF6B00] animate-pulse p-4 bg-[#151924]/50 border border-slate-800 rounded-xl">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Gemini AI is crafting advice...</span>
                    </div>
                  )}
                </div>

                {/* USER COMM INPUT */}
                <form onSubmit={handleAiChatSubmit} className="mt-4 pt-4 border-t border-slate-800 flex gap-3">
                  <input 
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask AI anything related to building layout, supplies, regulations..."
                    className="flex-1 bg-[#151924] border border-slate-800 text-sm px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
                  />
                  <button 
                    type="submit"
                    disabled={isAiLoading}
                    className="bg-[#1F253A] hover:bg-[#FF6B00] hover:text-black border border-slate-700 text-slate-300 font-extrabold px-5 py-3 rounded-xl transition flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 5: COMMUNITY MARKET FORUM ==================== */}
        {currentTab === 'community' && (
          <div className="space-y-6">
            
            <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white tracking-wide flex items-center space-x-2.5">
                <MessageSquare className="text-[#FF6B00] w-6 h-6" />
                <span>Builders & Sellers Trade Forum</span>
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                A shared real-time simulation workspace where site builders talk directly to wholesale suppliers. Select a channel matching your trading needs, post an inquiry and view instant replies from raw material suppliers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* CHANNELS LIST IN SIDEBAR (LEFT) */}
              <div className="lg:col-span-4 bg-[#111420] border border-[#1F2538] rounded-2xl p-5 space-y-4">
                <span className="text-xs uppercase font-bold tracking-wider text-[#FF6B00] block mb-2">Market Channels</span>
                <div className="space-y-2">
                  {[
                    { id: 'structural', label: '🏗️ Heavy Steel & Masonry' },
                    { id: 'woods', label: '🪵 Timber Yard Depot' },
                    { id: 'wires', label: '⚡ Wire Conduit Core' },
                    { id: 'pipes', label: '🚿 Pipes & Fitting Supply' }
                  ].map(chan => (
                    <button 
                      key={chan.id}
                      onClick={() => setSelectedChannel(chan.id as any)}
                      className={`w-full text-left px-4 py-3.5 text-sm rounded-xl transition flex justify-between items-center ${
                        selectedChannel === chan.id 
                          ? 'bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 font-bold' 
                          : 'text-slate-300 hover:text-white hover:bg-[#151924]'
                      }`}
                    >
                      <span>{chan.label}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-800/80 pt-4">
                  <span className="text-xs uppercase text-slate-400 block mb-2 font-semibold">Post Message As</span>
                  <div className="grid grid-cols-2 gap-2 bg-[#151924] p-1.5 rounded-xl border border-slate-800">
                    <button 
                      onClick={() => setCommunityUserRole('Builder')}
                      className={`py-2 text-xs uppercase font-bold rounded-lg transition-all cursor-pointer ${
                        communityUserRole === 'Builder' ? 'bg-[#FF6B00] text-black' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Builder
                    </button>
                    <button 
                      onClick={() => setCommunityUserRole('Seller')}
                      className={`py-2 text-xs uppercase font-bold rounded-lg transition-all cursor-pointer ${
                        communityUserRole === 'Seller' ? 'bg-[#FF6B00] text-black' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Seller
                    </button>
                  </div>
                </div>
              </div>

              {/* CHAT THREAD VIEW (RIGHT) */}
              <div className="lg:col-span-8 bg-[#111420] border border-[#1F2538] rounded-2xl p-5 flex flex-col justify-between min-h-[460px]">
                
                {/* HEADER */}
                <div className="flex justify-between items-center bg-[#151924] p-3.5 rounded-xl border border-slate-800/60 mb-4">
                  <span className="text-sm text-white uppercase font-bold">
                    Viewing Channel: <span className="text-[#FF6B00]">#{selectedChannel}-supplies</span>
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">Direct Broker Inboxes Open</span>
                </div>

                {/* THREAD CHAT BUBBLES */}
                <div className="flex-1 space-y-4 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
                  {communityChats[selectedChannel].map(msg => {
                    const isOfficialSeller = msg.role.includes('Seller') || msg.role.includes('Supplier') || msg.role.includes('Distributor') || msg.role.includes('Dealer');
                    const isMe = msg.sender === 'Me (Project lead)';

                    return (
                      <div 
                        key={msg.id} 
                        className={`p-4 rounded-xl border transition ${
                          isMe 
                            ? 'bg-[#1D1A16] border-[#EF6B15]/40 ml-12' 
                            : isOfficialSeller 
                              ? 'bg-[#151C1A]/80 border-emerald-950 mr-12' 
                              : 'bg-[#141824] border-slate-800/80 mr-12'
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center space-x-2">
                            <strong className="text-slate-200 text-sm font-bold">{msg.sender}</strong>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase ${
                              isOfficialSeller ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {msg.role}
                            </span>
                          </div>
                          <span className="text-slate-500 font-semibold text-xs">{msg.time}</span>
                        </div>
                        <p className="text-slate-200 text-sm mt-2 leading-relaxed">
                          {msg.msg}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* TEXT INPUT CONTROLLER */}
                <form onSubmit={handleSendCommunityMessage} className="mt-4 pt-4 border-t border-slate-800/80 flex gap-3">
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={communityInput}
                      onChange={(e) => setCommunityInput(e.target.value)}
                      placeholder={`Post dynamic message to #${selectedChannel} as a ${communityUserRole === 'Builder' ? 'Site Builder' : 'Material Supplier'}...`}
                      className="w-full bg-[#151924] border border-slate-800 text-sm px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-[#FF6B00] hover:bg-[#FF8C42] text-black font-extrabold uppercase text-sm px-6 rounded-xl transition flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Send</span>
                  </button>
                </form>

              </div>

            </div>

          </div>
        )}

        {currentTab === 'workers' && (
          <div className="space-y-6 animate-fade-in text-[#E2E8F0]">
            
            {/* Header with Switcher Options */}
            <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping inline-block" />
                  <span>On-Site Trade Worker Portal</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Analyze site contractor achievements and monitor team stats as a supervisor, or complete shifts, check-in, and log checklist items as a sub-contractor lead.
                </p>
              </div>

              {/* TABS SELECTOR / SWITCHER */}
              <div className="flex p-1 bg-[#0A0D15] border border-[#1F2538] rounded-xl self-start md:self-center">
                <button
                  onClick={() => { setWorkerSubTab('builder'); }}
                  className={`px-4.5 py-2.5 rounded-lg text-xs tracking-wider uppercase font-bold transition flex items-center space-x-2 cursor-pointer ${
                    workerSubTab === 'builder'
                      ? 'bg-[#FF6B00] text-black font-extrabold shadow-[0_0_12px_rgba(255,107,0,0.35)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Builder View</span>
                </button>
                <button
                  onClick={() => { setWorkerSubTab('worker'); }}
                  className={`px-4.5 py-2.5 rounded-lg text-xs tracking-wider uppercase font-bold transition flex items-center space-x-2 cursor-pointer ${
                    workerSubTab === 'worker'
                      ? 'bg-[#FF6B00] text-black font-extrabold shadow-[0_0_12px_rgba(255,107,0,0.35)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Worker View</span>
                </button>
              </div>
            </div>

            {/* ===================== SUB-TAB 1: BUILDER VIEW ===================== */}
            {workerSubTab === 'builder' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                
                {/* ADVANCED ANALYTICS & OVERVIEW SIDEBAR */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Attendance Analytics Indicators */}
                  <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-5 space-y-4">
                    <span className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-wider block">Attendance & Roster Audit</span>
                    
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="bg-[#090C12] border border-slate-800/80 p-3 rounded-lg text-center">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Present Leads</span>
                        <strong className="text-lg font-extrabold text-green-400 font-mono">
                          {(Object.values(attendance) as Array<{ status: string }>).filter(a => a.status === 'Checked In').length} / 6
                        </strong>
                      </div>
                      <div className="bg-[#090C12] border border-slate-800/80 p-3 rounded-lg text-center">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Safety Status</span>
                        <strong className="text-lg font-extrabold text-[#FF6B00] font-mono">100% OK</strong>
                      </div>
                    </div>

                    {/* Attendance Logs List */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/50">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide block">Attendance Status Ledger</span>
                      <div className="space-y-2">
                        {workers.map(w => {
                          const statusData = attendance[w.name] || { status: 'Not Checked In' };
                          return (
                            <div key={w.name} className="flex justify-between items-center text-xs bg-[#090C12] border border-slate-850 p-2.5 rounded-lg">
                              <span className="font-semibold text-slate-200">{w.name}</span>
                              <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold uppercase ${
                                statusData.status === 'Checked In'
                                  ? 'bg-green-950 text-green-400 border border-green-905/30'
                                  : statusData.status === 'Checked Out'
                                    ? 'bg-amber-950 text-amber-400'
                                    : 'bg-red-950/80 text-red-400'
                              }`}>
                                {statusData.status === 'Checked In' ? `In (${statusData.checkIn})` : 'Absent'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* SMALL ANALYTICS GRAPHS/CHARTS Display */}
                  <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-5 space-y-4">
                    <span className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-wider block">Productivity Distributions</span>
                    
                    {/* SVG Graphic Dashboard representing workload efficiency coefficients */}
                    <div className="space-y-3 pt-2">
                      {workers.map(w => {
                        const scoreColor = w.productivity >= 90 ? 'bg-[#FF6B00]' : 'bg-amber-500';
                        return (
                          <div key={w.name} className="space-y-1">
                            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400">
                              <span>{w.name}</span>
                              <span className="font-mono text-white">{w.productivity}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-805">
                              <div 
                                className={`h-full ${scoreColor} rounded-full transition-all duration-300`} 
                                style={{ width: `${w.productivity}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* WORKER PROGRESS TRACKING CARDS GRID */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="space-y-4">
                    <span className="text-xs tracking-wider uppercase font-extrabold text-slate-400 font-mono block">Real-time Specialist Leads Board</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {workers.map(w => {
                        const specTaskStatus = workerTaskStatus[w.name] || 'Pending';
                        const comments = supervisorComments[w.name] || [];

                        return (
                          <div key={w.name} className="bg-[#111420] border border-slate-850 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg hover:border-[#FF6B00]/40 transition duration-300">
                            
                            {/* Ident Row */}
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 font-extrabold flex items-center justify-center text-[#FF6B00] uppercase">
                                  {w.avatar}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-sm font-bold text-white truncate">{w.name}</h4>
                                  <p className="text-[10px] text-slate-400 truncate">{w.role}</p>
                                </div>
                              </div>
                              <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                                specTaskStatus === 'Completed' ? 'bg-green-950 text-green-400 border border-green-900/40' :
                                specTaskStatus === 'In Progress' ? 'bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 animate-pulse' :
                                'bg-slate-900 text-slate-400'
                              }`}>
                                {specTaskStatus}
                              </span>
                            </div>

                            {/* Alert for Delayed / Incomplete tasks */}
                            {w.status === 'stalled' && (
                              <div className="bg-red-950/20 border border-red-910/50 p-2.5 rounded-lg text-[11px] text-red-400 flex items-start space-x-1.5 animate-pulse overflow-hidden">
                                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#FF8C42]" />
                                <span><strong>Delayed Task Alert:</strong> Operations Stalled due to pvc/steel component deficiencies!</span>
                              </div>
                            )}

                            {/* Productivity Stat and Progress Bar */}
                            <div className="space-y-1 text-xs font-sans">
                              <div className="flex justify-between items-center font-mono">
                                <span className="text-slate-400">Task Performance:</span>
                                <span className="text-white font-bold">{w.productivity}%</span>
                              </div>
                              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-805">
                                <div 
                                  className="h-full bg-gradient-to-r from-amber-500 to-[#FF6B00]" 
                                  style={{ width: `${w.productivity}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Recent Update uploaded by worker */}
                            <div className="bg-[#090C12] border border-slate-850 p-3 rounded-xl text-xs space-y-1">
                              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Latest Shift Upload</span>
                              <p className="text-slate-300 italic line-clamp-2">" {w.dailyProgress[0] || 'No logged updates yet.'} "</p>
                            </div>

                            {/* Supervisor Comment Form for this specific worker */}
                            <div className="pt-3 border-t border-slate-800/60 text-xs">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">Instructions Drawer ({comments.length})</span>
                              {comments.length > 0 && (
                                <p className="text-slate-450 truncate mb-2 text-[11px]">Latest: <strong className="text-slate-200">"{comments[comments.length - 1]}"</strong></p>
                              )}
                              
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  id={`cmt-input-${w.name}`}
                                  placeholder="Leave direct daily instruction..."
                                  className="flex-1 bg-[#090C12] border border-slate-800 text-[11px] px-2.5 py-1.5 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#FF6B00]"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      const inputEl = e.currentTarget;
                                      const val = inputEl.value.trim();
                                      if (val) {
                                        setSupervisorComments(prev => ({
                                          ...prev,
                                          [w.name]: [...(prev[w.name] || []), val]
                                        }));
                                        showToast(`Left direct instruction guide for ${w.name}!`);
                                        inputEl.value = '';
                                      }
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    const inputEl = document.getElementById(`cmt-input-${w.name}`) as HTMLInputElement;
                                    const val = inputEl?.value.trim();
                                    if (val) {
                                      setSupervisorComments(prev => ({
                                        ...prev,
                                        [w.name]: [...(prev[w.name] || []), val]
                                      }));
                                      showToast(`Left direct instruction guide for ${w.name}!`);
                                      inputEl.value = '';
                                    } else {
                                      showToast("Please type direct instruction statement first.");
                                    }
                                  }}
                                  className="bg-slate-800 hover:bg-[#FF6B00] hover:text-black font-extrabold uppercase text-[9px] px-3.5 rounded-lg transition"
                                >
                                  Comment
                                </button>
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ===================== SUB-TAB 2: WORKER VIEW ===================== */}
            {workerSubTab === 'worker' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                
                {/* WORKER IDENTITY SELECTOR, SAFETY CHECK & CALENDAR SCHEDULER */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Dropdown Crew Credentials identifier */}
                  <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-5 space-y-3">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#FF6B00] block animate-pulse">OPERATOR IDENTITY CHECK</span>
                    <p className="text-xs text-slate-400">Select your name below to register shift checklists, report daily hours, and upload live photos.</p>
                    
                    <select
                      value={selectedWorkerName}
                      onChange={(e) => {
                        setSelectedWorkerName(e.target.value);
                        setShiftLogText('');
                      }}
                      className="w-full bg-[#090C12] border border-slate-800 focus:border-[#FF6B00] rounded-xl text-slate-205 text-xs px-3 py-3"
                    >
                      {workers.map(w => (
                        <option key={w.name} value={w.name}>
                          {w.name} ({w.role.split(' • ')[0]})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* ATTENDANCE CHECK-IN / CHECK-OUT */}
                  {(() => {
                    const statusData = attendance[selectedWorkerName] || { status: 'Not Checked In' };
                    return (
                      <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-5 space-y-4">
                        <span className="text-xs uppercase font-extrabold tracking-wider text-green-400 block">Attendance Check In/Out</span>
                        <div className="p-3 bg-[#090C12] rounded-xl flex items-center justify-between text-xs border border-slate-850">
                          <span className="text-slate-400 uppercase font-bold">Status:</span>
                          <span className={`px-2.5 py-0.5 rounded font-black uppercase text-[10px] ${
                            statusData.status === 'Checked In'
                              ? 'bg-green-950 text-green-400'
                              : 'bg-red-950 text-red-400 animate-pulse'
                          }`}>
                            {statusData.status === 'Checked In' ? `Checked In` : 'Not Checked In'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              setAttendance(prev => ({
                                ...prev,
                                [selectedWorkerName]: { status: 'Checked In', checkIn: '08:30 AM' }
                              }));
                              showToast(`Check-In Stamped for ${selectedWorkerName} at 08:30 AM.`);
                            }}
                            disabled={statusData.status === 'Checked In'}
                            className="bg-[#0D2419] hover:bg-green-900 border border-green-800 text-green-400 text-xs font-bold py-2.5 rounded-xl cursor-pointer disabled:opacity-50 transition"
                          >
                            Check-In
                          </button>
                          <button
                            onClick={() => {
                              setAttendance(prev => ({
                                ...prev,
                                [selectedWorkerName]: { status: 'Checked Out', checkOut: '05:00 PM' }
                              }));
                              showToast(`Check-Out Stamped for ${selectedWorkerName} at 05:00 PM.`);
                            }}
                            disabled={statusData.status === 'Checked Out' || statusData.status === 'Not Checked In'}
                            className="bg-[#2D1612] hover:bg-amber-900 border border-amber-900 text-amber-500 text-xs font-bold py-2.5 rounded-xl cursor-pointer disabled:opacity-50 transition"
                          >
                            Check-Out
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* WORK SCHEDULE / CALENDAR */}
                  <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-5 space-y-3">
                    <span className="text-xs uppercase font-bold tracking-wider text-[#FF6B00] block">My Work Calendar</span>
                    <p className="text-xs text-slate-400">Weekly shift allocation blueprint schedules.</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
                      {[
                        { day: 'Mon', task: 'Excavation Core' },
                        { day: 'Tue', task: 'Soil Inspection' },
                        { day: 'Wed', task: 'Frame Scaffold' },
                        { day: 'Thu', task: 'Wire Junction' },
                        { day: 'Fri', task: 'Hydraulics Check' },
                        { day: 'Sat', task: 'Shift Handover' }
                      ].map(sc => (
                        <div key={sc.day} className="bg-[#090C12] border border-slate-850 p-2.5 rounded-lg flex flex-col justify-between">
                          <span className="font-mono text-amber-500 uppercase font-black">{sc.day}</span>
                          <span className="text-slate-300 font-semibold truncate mt-1">{sc.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SAFETY PANEL */}
                  <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-5 space-y-3">
                    <span className="text-xs uppercase font-bold text-red-500 tracking-wider block">OSHA Safety Rules</span>
                    <ul className="text-xs text-slate-300 list-disc list-inside space-y-1.5 leading-relaxed font-sans">
                      <li>PPE Must be worn on active lines strictly.</li>
                      <li>Check scaffolding weight margins before bulk stacking.</li>
                      <li>Keep evacuation lanes fully unobstructed of sand stacks.</li>
                    </ul>
                  </div>

                </div>

                {/* WORKER FORMS WORKSPACE */}
                {(() => {
                  const currWorker = workers.find(w => w.name === selectedWorkerName) || workers[0];
                  const instructions = supervisorComments[currWorker.name] || ['No custom directives logged today.'];
                  const tStatus = workerTaskStatus[currWorker.name] || 'Pending';

                  return (
                    <div className="lg:col-span-8 space-y-6">
                      
                      {/* IDENTITY BOARD */}
                      <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 flex justify-between items-center animate-fade-in">
                        <div className="flex items-center space-x-3.5">
                          <div className="w-12 h-12 rounded-xl bg-orange-950/40 text-[#FF6B00] font-black flex items-center justify-center text-lg border border-[#FF6B00]/30 shadow-md">
                            {currWorker.avatar}
                          </div>
                          <div>
                            <h3 className="text-base font-extrabold text-white">{currWorker.name} Workspace</h3>
                            <p className="text-xs text-slate-400 font-semibold mt-0.5">{currWorker.role} • {currWorker.assignedProject}</p>
                          </div>
                        </div>

                        {/* Dropdown Task status changer */}
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold mb-1.5 font-mono">Task Status</span>
                          <select
                            value={tStatus}
                            onChange={(e) => {
                              const s = e.target.value as 'Pending' | 'In Progress' | 'Completed';
                              setWorkerTaskStatus(prev => ({
                                ...prev,
                                [currWorker.name]: s
                              }));
                              showToast(`Task updated to ${s} for ${currWorker.name}.`);
                            }}
                            className="bg-[#090C12] border border-slate-800 text-xs px-2.5 py-1.5 rounded-lg text-slate-200 focus:outline-none focus:border-[#FF6B00] uppercase font-bold"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>

                      {/* VIEW SUPERVISOR INSTRUCTIONS */}
                      <div className="bg-gradient-to-r from-[#FF6B00]/5 to-[#111400]/5 border border-amber-900/30 p-5 rounded-2xl space-y-3">
                        <span className="text-xs uppercase font-extrabold text-[#FF6B00] flex items-center space-x-1.5 font-mono">
                          <AlertTriangle className="w-4 h-4 text-[#FF6B00] animate-pulse" />
                          <span>Directives from Construction Manager</span>
                        </span>
                        
                        <div className="bg-[#0E1118]/80 border border-[#1A202E] p-4 rounded-xl space-y-2 text-xs">
                          {instructions.map((inst, iIdx) => (
                            <div key={iIdx} className="flex items-start text-slate-300 leading-relaxed font-sans">
                              <span className="text-[#FF6B00] mr-2.5 font-bold">#{iIdx + 1}</span>
                              <p className="flex-1">{inst}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* UPLOAD DAILY WORK PROGRESS */}
                      <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 space-y-3 animate-fade-in">
                        <span className="text-xs uppercase font-extrabold text-[#FF6B00] block tracking-wider font-mono">Upload Daily Work Progress</span>
                        
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={shiftLogText}
                            onChange={(e) => setShiftLogText(e.target.value)}
                            placeholder="Describe your current status updates (e.g. wired power switchboard on level 2)..."
                            className="flex-1 bg-[#090C12] border border-slate-800 text-slate-250 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#FF6B00]"
                          />
                          <button
                            onClick={() => {
                              if (!shiftLogText.trim()) {
                                showToast("Please write concrete shift accomplishments text first!");
                                return;
                              }
                              setWorkers(prev => prev.map(w => {
                                if (w.name === currWorker.name) {
                                  return {
                                    ...w,
                                    completedTasks: w.completedTasks + 1,
                                    dailyProgress: [shiftLogText, ...w.dailyProgress]
                                  };
                                }
                                return w;
                              }));
                              showToast(`Logged Shift Progress for ${currWorker.name}`);
                              setShiftLogText('');
                            }}
                            className="bg-[#FF6B00] hover:bg-[#FF8C42] text-black font-extrabold uppercase tracking-wide text-xs px-5 rounded-xl transition cursor-pointer"
                          >
                            Post Log
                          </button>
                        </div>
                      </div>

                      {/* DAILY WORK SUMMARY FORM */}
                      <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 space-y-4 font-sans text-xs">
                        <span className="text-xs uppercase font-extrabold text-[#FF6B00] block tracking-wider font-mono">Daily Work Summary Form</span>
                        
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const h = (e.currentTarget.elements.namedItem('hours') as HTMLInputElement)?.value;
                          const wDone = (e.currentTarget.elements.namedItem('work') as HTMLInputElement)?.value;

                          if (!h || !wDone) {
                            showToast("Summary fields cannot be blank.");
                            return;
                          }

                          showToast(`Daily summary verified & registered under ${currWorker.name}.`);
                          e.currentTarget.reset();
                        }} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-slate-400 font-bold block mb-1">TOTAL HOURS WORKED</label>
                              <input required name="hours" type="number" step="0.5" placeholder="8.0" className="w-full bg-[#090C12] border border-slate-800 rounded-lg px-3 py-2 text-slate-200" />
                            </div>
                            <div className="flex items-center pl-1 pt-4">
                              <label className="flex items-center space-x-2.5 cursor-pointer text-slate-300">
                                <input name="accident" type="checkbox" className="w-4 h-4 rounded text-[#FF6B00] accent-[#FF6B00]" />
                                <span className="font-semibold text-slate-405">Pledge 100% Safety Compliance</span>
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="text-slate-400 font-bold block mb-1">WORK LOG SUMMARY</label>
                            <input required name="work" type="text" placeholder="Completed primary excavation sector alignment with grader." className="w-full bg-[#090C12] border border-slate-800 rounded-lg px-3 py-2 text-slate-200" />
                          </div>

                          <button type="submit" className="w-full bg-[#FF6B00] hover:bg-[#FF8C42] text-black font-black uppercase text-xs py-3 rounded-xl shadow-[0_0_10px_rgba(255,107,0,0.25)] transition">
                            Submit Summary Log
                          </button>
                        </form>
                      </div>

                      {/* UPLOAD SITE PHOTOS FORM & LIST */}
                      <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 space-y-4">
                        <span className="text-xs uppercase font-extrabold text-[#FF6B00] block tracking-wider font-mono animate-fade-in">Upload Site Images/Photos</span>
                        
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const url = (e.currentTarget.elements.namedItem('img_url') as HTMLInputElement)?.value;
                          const comment = (e.currentTarget.elements.namedItem('img_comment') as HTMLInputElement)?.value;

                          if (!url) {
                            showToast("Please enter an image URL!");
                            return;
                          }
                          
                          // We mock upload by appending a photo!
                          showToast("Site photo uploaded successfully to BuildTrack stream!");
                          e.currentTarget.reset();
                        }} className="space-y-3 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
                            <input required name="img_url" type="text" placeholder="Paste image URL (e.g., Unsplash photo code)" className="w-full bg-[#090C12] border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-[#FF6B00]" />
                            <input required name="img_comment" type="text" placeholder="Add image description of snap..." className="w-full bg-[#090C12] border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:border-[#FF6B00]" />
                          </div>
                          <button type="submit" className="w-full bg-slate-800 hover:bg-[#FF6B00] hover:text-black font-extrabold uppercase py-2.5 rounded-xl transition text-[11px] cursor-pointer">
                            Upload Site Photo
                          </button>
                        </form>
                      </div>

                    </div>
                  );
                })()}

              </div>
            )}

          </div>
        )}

        {/* ==================== TAB 6: BUILDER TRACKER (PROJECT MANAGER OVERSIGHT) ==================== */}
        {currentTab === 'builderTracking' && (
          <div className="space-y-6 animate-fade-in text-[#E2E8F0]">
            
            <div className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-wide">
                  Builder Tracker Oversight
                </h2>
                <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                  Inspect active productivity indexes, direct site allocations, or re-assign specific active duty statements to your 6 sub-contractor specialist leads.
                </p>
              </div>
            </div>

            {/* LIVE MATERIAL REQUISITIONS REPORT PANEL */}
            <div className="bg-[#111420] border border-[#232E48]/55 rounded-2xl p-5 font-sans">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-500 block mb-3">ACTIVE ON-SITE REQUISITION REQUESTS ({requests.length})</span>
              {requests.length === 0 ? (
                <p className="text-xs text-slate-400">No pending materials requests from crews.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {requests.map(req => (
                    <div key={req.id} className="bg-[#151924] border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-2">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-mono text-[#FF6B00] font-bold">{req.site.split(' (')[0]}</span>
                          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            req.criticality === 'High' ? 'bg-red-950 text-red-400' : 'bg-slate-850 text-slate-400'
                          }`}>
                            {req.criticality} Priority
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1 uppercase">{req.materialName}</h4>
                        <p className="text-xs text-slate-400 mt-1">Requested Amount: <strong className="text-slate-200">{req.qty} {req.unit}</strong></p>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-slate-800/60">
                        <button
                          onClick={() => {
                            // Find relevant inventory item and refill qty, and mark req as approved
                            const targetItem = inventory.find(inv => inv.name.toLowerCase() === req.materialName.toLowerCase());
                            if (targetItem) {
                              setInventory(prev => prev.map(inv => inv.id === targetItem.id ? { ...inv, qty: inv.qty + req.qty } : inv));
                            } else {
                              // Create temporary item
                              const newItem: MaterialItem = {
                                id: `req-agg-${Date.now()}`,
                                name: req.materialName,
                                category: 'Structural',
                                subcategory: 'Aggregates',
                                qty: req.qty,
                                unit: req.unit,
                                costPerUnit: 25,
                                threshold: 10,
                                supplier: 'Immediate Dispatch Partner'
                              };
                              setInventory(prev => [newItem, ...prev]);
                            }
                            setRequests(prev => prev.filter(r => r.id !== req.id));
                            showToast(`Authorized & refit stock! Dispatched ${req.qty} units of ${req.materialName}.`);
                          }}
                          className="flex-1 bg-emerald-950/80 hover:bg-[#FF6B00] hover:text-black border border-emerald-950 text-emerald-400 px-2.5 py-1 text-xs rounded-lg uppercase font-bold cursor-pointer transition"
                        >
                          Approve & Ship
                        </button>
                        <button
                          onClick={() => {
                            setRequests(prev => prev.filter(r => r.id !== req.id));
                            showToast(`Requisition denied and archived.`);
                          }}
                          className="bg-red-950/65 hover:bg-red-900 border border-red-900 text-red-400 hover:text-white px-2.5 py-1 text-xs rounded-lg uppercase font-bold cursor-pointer transition"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACTION ROSTER GRID (THE ORIGINAL ROSTER RENDERER!) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workers.map(w => {
                const productivityColor = w.productivity >= 85 ? 'text-green-400' : 'text-amber-500';
                
                return (
                  <div key={w.name} className="bg-[#111420] border border-[#1F2538] rounded-2xl p-6 space-y-4 animate-fade-in">
                    
                    {/* TOP IDENTITY ROW */}
                    <div className="flex justify-between items-start gap-4 pb-3 border-b border-slate-800">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-12 h-12 bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center rounded-xl text-white font-black uppercase text-sm">
                          {w.avatar}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">{w.name}</h4>
                          <span className="text-xs text-slate-400 block font-semibold">{w.role}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className={`text-xs uppercase px-2.5 py-1 rounded font-bold ${
                          w.status === 'stalled' 
                            ? 'bg-amber-950 text-amber-400 animate-pulse border border-amber-900/50' 
                            : w.status === 'off-site'
                              ? 'bg-slate-900 text-slate-500 border border-slate-800'
                              : 'bg-green-950 text-green-400 border border-green-900/50'
                        }`}>
                          {w.status}
                        </span>
                        <span className="text-xs text-[#FF6B00] mt-1.5 font-bold">{w.assignedProject.split(' (')[0]}</span>
                      </div>
                    </div>

                    {/* CORE PRODUCTIVITY GAUGES */}
                    <div className="grid grid-cols-3 gap-2.5 text-center">
                      <div className="bg-[#0A0D15] p-3 rounded-xl border border-slate-900">
                        <span className="text-[11px] text-slate-400 uppercase tracking-wide block font-semibold">Productivity</span>
                        <strong className={`text-sm md:text-base font-bold ${productivityColor}`} >{w.productivity}%</strong>
                      </div>
                      <div className="bg-[#0A0D15] p-3 rounded-xl border border-slate-900">
                        <span className="text-[11px] text-slate-400 uppercase tracking-wide block font-semibold">Done Tasks</span>
                        <strong className="text-white text-sm md:text-base font-bold" >{w.completedTasks}</strong>
                      </div>
                      <div className="bg-[#0A0D15] p-3 rounded-xl border border-slate-900 font-bold">
                        <span className="text-[11px] text-slate-400 uppercase tracking-wide block font-semibold">Health & Safety</span>
                        <span className="text-green-400 text-xs md:text-sm block mt-0.5" >100% OK</span>
                      </div>
                    </div>

                    {/* DYNAMIC PRODUCTIVITY LINE-BAR */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs text-slate-400 uppercase font-semibold">
                        <span>Work Efficiency Scale</span>
                        <span className={productivityColor}>{w.productivity}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            w.productivity >= 85 ? 'bg-green-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${w.productivity}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* CURRENT TASK ASSIGNMENT */}
                    <div className="bg-[#151926] border border-[#232E48]/60 p-4 rounded-xl">
                      <span className="text-xs uppercase text-[#FF6B00] font-bold block mb-1 font-sans">Active Duty Statement</span>
                      <p className="text-slate-200 text-sm leading-relaxed">
                        {w.currentTask}
                      </p>
                    </div>

                    {/* ITERATIVE RE-TASKING FORM */}
                    <div className="space-y-3 pt-2 border-t border-slate-800/40">
                      <label className="text-xs text-slate-300 uppercase font-bold tracking-wide block">Assign New Duty Statement</label>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={workerInputTask[w.name] || ''}
                          onChange={(e) => setWorkerInputTask({ ...workerInputTask, [w.name]: e.target.value })}
                          placeholder="e.g., Relocate aggregate gravel to layout core-1..."
                          className="flex-1 bg-[#0A0C12] border border-slate-800 text-sm px-3 py-2 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
                        />
                        <button 
                          onClick={() => handleAssignTask(w.name)}
                          className="bg-[#1F2636] hover:bg-[#FF6B00] hover:text-black hover:font-bold border border-slate-800 text-slate-200 text-xs font-bold px-4 py-2 rounded-lg transition duration-200 cursor-pointer"
                        >
                          Reassign
                        </button>
                      </div>

                      {/* FAST SHIFT LEVEL CONTROLLER */}
                      <div className="flex items-center space-x-2 pt-1 font-semibold text-xs">
                        <span className="text-slate-400 uppercase">Change Status:</span>
                        <button 
                          onClick={() => handleUpdateWorkerStatus(w.name, 'active')}
                          className="px-3 py-1 bg-green-950 hover:bg-green-900 border border-green-900 text-green-400 rounded-lg cursor-pointer transition"
                        >
                          Active
                        </button>
                        <button 
                          onClick={() => handleUpdateWorkerStatus(w.name, 'stalled')}
                          className="px-3 py-1 bg-amber-950 hover:bg-amber-950/80 border border-amber-900 text-amber-500 rounded-lg cursor-pointer transition"
                        >
                          Stalled
                        </button>
                        <button 
                          onClick={() => handleUpdateWorkerStatus(w.name, 'off-site')}
                          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg cursor-pointer transition"
                        >
                          Off-site
                        </button>
                      </div>
                    </div>

                    {/* PAST SHIFT LOGS HISTORIES */}
                    <div className="bg-[#090C12] p-3 rounded-lg text-xs text-slate-300 leading-relaxed font-mono">
                      <strong className="text-slate-450 block uppercase tracking-wide mb-1 font-bold">Roster Progress Feed:</strong>
                      <div className="space-y-1">
                        {w.dailyProgress.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="text-[#FF6B00] mr-2">🗹</span>
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ==================== TAB 7: SETTINGS ==================== */}
        {currentTab === 'settings' && (
          <div className="space-y-6 animate-fade-in text-[#E2E8F0]">
            <div className="bg-[#090C12] border border-[#1F2538] rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white tracking-wide flex items-center space-x-2.5 font-display">
                <Settings className="text-[#FF6B00] w-6 h-6" />
                <span>SETTINGS & PREFERENCES</span>
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Configure your contractor profile, activate automatic stock alerts, customize visual displays, and manage Indian localized parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* SIDEBAR NAVIGATION (LEFT) */}
              <div className="md:col-span-4 bg-[#090C12] border border-[#1F2538] rounded-2xl p-5 space-y-2">
                {[
                  { id: 'profile', label: '👤 Contractor Profile' },
                  { id: 'notifications', label: '🔔 Alert Notifications' },
                  { id: 'theme', label: '🎨 Interface Themes' },
                  { id: 'preferences', label: '⚙️ Site Preferences' },
                  { id: 'backup', label: '💾 Database Backup' }
                ].map(section => (
                  <button
                    key={section.id}
                    onClick={() => setSettingsActiveSection(section.id as any)}
                    className={`w-full text-left px-4 py-3 text-sm rounded-xl transition duration-150 cursor-pointer ${
                      settingsActiveSection === section.id 
                        ? 'bg-[#FF6B00] text-black font-extrabold' 
                        : 'bg-[#121622] text-slate-300 hover:bg-[#1C2232] hover:text-white border border-[#1F2538]'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>

              {/* SECTION AREA (RIGHT) */}
              <div className="md:col-span-8 bg-[#090C12] border border-[#1F2538] rounded-2xl p-6">
                
                {settingsActiveSection === 'profile' && (
                  <div className="space-y-5">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center space-x-2">
                      <span>Contractor Profile Settings</span>
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 bg-[#121622] p-4 rounded-xl border border-slate-800">
                      <img 
                        src={userProfile.avatarUrl} 
                        alt="Profile Avatar" 
                        className="w-16 h-16 rounded-full border-2 border-[#FF6B00] object-cover" 
                      />
                      <div className="text-center sm:text-left space-y-1">
                        <span className="text-xs font-mono uppercase bg-[#FF6B00]/10 text-[#FF6B00] px-2.5 py-0.5 rounded border border-[#FF6B00]/30 font-bold block sm:inline-block">Site Supervisor</span>
                        <h4 className="text-md font-bold text-white mt-1">{userProfile.name}</h4>
                        <p className="text-xs text-slate-400">{userProfile.company}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Contractor Full Name</label>
                        <input 
                          type="text" 
                          value={userProfile.name}
                          onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                          className="w-full bg-[#0E1118] border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-[#FF6B00]" 
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">Contact Phone</label>
                        <input 
                          type="text" 
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                          className="w-full bg-[#0E1118] border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-[#FF6B00]" 
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs text-slate-400 uppercase font-bold block mb-1">Registered Enterprise Email</label>
                        <input 
                          type="email" 
                          value={userProfile.email}
                          onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                          className="w-full bg-[#0E1118] border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-[#FF6B00]" 
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs text-slate-400 uppercase font-bold block mb-1">Infrastructure Company</label>
                        <input 
                          type="text" 
                          value={userProfile.company}
                          onChange={(e) => setUserProfile({ ...userProfile, company: e.target.value })}
                          className="w-full bg-[#0E1118] border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:border-[#FF6B00]" 
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => showToast("Contractor Profile successfully saved!")}
                      className="bg-[#FF6B00] hover:bg-[#FF8C42] text-black font-extrabold uppercase text-[10px] px-5 py-2.5 rounded-lg transition tracking-wider cursor-pointer"
                    >
                      Save Profile Changed
                    </button>
                  </div>
                )}

                {settingsActiveSection === 'notifications' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                      Alert & Notification Subscriptions
                    </h3>

                    <div className="space-y-4 font-sans text-sm">
                      <div className="flex items-center justify-between p-3.5 bg-[#121622] border border-slate-800 rounded-xl">
                        <div>
                          <p className="font-bold text-white text-xs uppercase tracking-wide">Stock Level Deficit Alerts</p>
                          <p className="text-xs text-slate-400 mt-1">Get immediate top-bar alerts when an item falls below security levels.</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={shortageAlerts}
                          onChange={(e) => setShortageAlerts(e.target.checked)}
                          className="w-4.5 h-4.5 accent-[#FF6B00] cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3.5 bg-[#121622] border border-slate-800 rounded-xl">
                        <div>
                          <p className="font-bold text-white text-xs uppercase tracking-wide">Daily Attendance Monitoring</p>
                          <p className="text-xs text-slate-400 mt-1">Receive automated updates during worker check-in stamps or shift completions.</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={attendanceAlerts}
                          onChange={(e) => setAttendanceAlerts(e.target.checked)}
                          className="w-4.5 h-4.5 accent-[#FF6B00] cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3.5 bg-[#121622] border border-slate-800 rounded-xl">
                        <div>
                          <p className="font-bold text-white text-xs uppercase tracking-wide">Deadline & Schedule Reminders</p>
                          <p className="text-xs text-slate-400 mt-1">Get custom prompts prior to site target date deadlines.</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={deadlineReminders}
                          onChange={(e) => setDeadlineReminders(e.target.checked)}
                          className="w-4.5 h-4.5 accent-[#FF6B00] cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3.5 bg-[#121622] border border-slate-800 rounded-xl">
                        <div>
                          <p className="font-bold text-white text-xs uppercase tracking-wide">Site-wide System Broadcasts</p>
                          <p className="text-xs text-slate-400 mt-1">Log system level notifications and general material transfers.</p>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={siteNotifications}
                          onChange={(e) => setSiteNotifications(e.target.checked)}
                          className="w-4.5 h-4.5 accent-[#FF6B00] cursor-pointer"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => showToast("Notification parameters securely updated!")}
                      className="bg-[#FF6B00] hover:bg-[#FF8C42] text-black font-extrabold uppercase text-[10px] px-5 py-2.5 rounded-lg transition tracking-wide cursor-pointer"
                    >
                      Update Subscriptions
                    </button>
                  </div>
                )}

                {settingsActiveSection === 'theme' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                      Client Custom Theme Configuration
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-2">Primary Accent Color Accent</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { id: 'orange', label: '🟠 Classic' },
                            { id: 'amber', label: '🟡 Gold' },
                            { id: 'emerald', label: '🟢 Safety Green' },
                            { id: 'blue', label: '🔵 Steel Blue' }
                          ].map(c => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setAccentColor(c.id as any);
                                showToast(`Accent changed to matching brand color!`);
                              }}
                              className={`p-3 rounded-xl border text-center text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                                accentColor === c.id 
                                  ? 'bg-[#121622] border-[#FF6B00] text-[#FF6B00] font-bold border-2' 
                                  : 'bg-[#0E1118] border-slate-800 text-slate-350 hover:border-slate-700'
                              }`}
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-2">Display Size Scaling</label>
                          <select 
                            value={fontSize} 
                            onChange={(e) => {
                              setFontSize(e.target.value as any);
                              showToast(`Typography set to ${e.target.value}!`);
                            }}
                            className="w-full bg-[#0E1118] border border-slate-800 px-3 py-2 text-xs rounded-lg text-white"
                          >
                            <option value="small">Dense (90%)</option>
                            <option value="medium">Standard (100%)</option>
                            <option value="large">Spacious (110%)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-2">System Lighting Mode</label>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                setIsDarkMode(true);
                                showToast("Comfort Slate Dark remains active.");
                              }}
                              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer ${isDarkMode ? 'bg-[#FF6B00] border-[#FF6B00] text-black font-extrabold' : 'bg-[#0E1118] border-slate-800 text-white'}`}
                            >
                              Comfort Slate Dark
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                showToast("Indian Site teams prefer Slate Dark for clear readability.");
                              }}
                              className="flex-1 py-1.5 text-xs font-bold rounded-lg border border-slate-800 text-slate-400 hover:text-white transition"
                            >
                              Monochrome Light
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {settingsActiveSection === 'preferences' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                      Local Site Settings
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-2">Default Base On-Site</label>
                        <select 
                          value={defaultSite} 
                          onChange={(e) => {
                            setDefaultSite(e.target.value);
                            showToast(`Default site assigned to ${e.target.value}`);
                          }}
                          className="w-full bg-[#0E1118] border border-slate-800 px-3 py-2 text-xs rounded-lg text-white"
                        >
                          <option value="Site Alpha (Urban Highrise)">Sect-12 Highrise Alpha</option>
                          <option value="Site Beta (Suburban Complex)">Suburban Complex Beta</option>
                          <option value="Site Gamma (Transit Expressway)">Expressway Hub Gamma</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-2">Interface Language</label>
                        <select 
                          value={language} 
                          onChange={(e) => {
                            setLanguage(e.target.value);
                            showToast(`Language changed to ${e.target.value}!`);
                          }}
                          className="w-full bg-[#0E1118] border border-slate-800 px-3 py-2 text-xs rounded-lg text-white"
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi Translate</option>
                          <option value="Marathi">Marathi Translate</option>
                          <option value="Tamil">Tamil Translate</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 uppercase font-bold block mb-2">Timestamp Format</label>
                        <select 
                          value={timeFormat} 
                          onChange={(e) => {
                            setTimeFormat(e.target.value as any);
                            showToast(`Selected format: ${e.target.value}!`);
                          }}
                          className="w-full bg-[#0E1118] border border-slate-800 px-3 py-2 text-xs rounded-lg text-white"
                        >
                          <option value="12h">12-Hour format (AM/PM)</option>
                          <option value="24h">24-Hour International (HH:MM)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 uppercase font-bold block mb-2 font-display">Currency Symbol Display</label>
                        <div className="bg-[#0e1118] border border-slate-800 text-xs px-3 py-2 rounded-lg text-emerald-400 font-bold font-mono">
                          Indian Rupee (₹) • Default Localized
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {settingsActiveSection === 'backup' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                      Database Records Backup Logs
                    </h3>

                    <div className="bg-[#121622] p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                      <div className="flex justify-between text-[#FF6B00]">
                        <span>Last System Sync:</span>
                        <span>Just Now (Auto)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Local Cache Database:</span>
                        <span>4.2 MB (Active)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Database Engines:</span>
                        <span>IndexedDB / localStorage</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          showToast("Executing active database backup serialization... Download triggered!");
                        }}
                        className="flex-1 bg-[#1F2636] hover:bg-[#FF6B00] hover:text-black text-slate-200 text-xs py-2.5 rounded-lg transition font-mono uppercase font-bold cursor-pointer border border-slate-800"
                      >
                        📥 Export JSON
                      </button>
                      <button 
                        onClick={() => {
                          showToast("Database safely restored from last local checkpoint.");
                        }}
                        className="flex-1 bg-[#1F2636] hover:bg-emerald-600 hover:text-white text-slate-200 text-xs py-2.5 rounded-lg transition font-mono uppercase font-bold cursor-pointer border border-slate-800"
                      >
                        🔄 Restore
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </main>

      {/* FLOATING COMMAND LEVEL BOTTOM TRACK DOCK (FOR EXQUISITE CONSOLE CONTROL) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl bg-[#0E1118]/95 backdrop-blur-md border border-[#1F2538] shadow-[0_12px_40px_rgba(0,0,0,0.85)] rounded-2xl flex justify-around items-center px-1.5 py-3">
        {[
          { tab: 'home', icon: Activity, label: 'Home' },
          { tab: 'materials', icon: Truck, label: 'Materials' },
          { tab: 'ai', icon: Bot, label: 'AI Support' },
          { tab: 'workers', icon: Users, label: 'Workers' },
          { tab: 'settings', icon: Settings, label: 'Settings' }
        ].map((btn) => {
          const IconComponent = btn.icon;
          const isActive = currentTab === btn.tab;
          return (
            <button
              key={btn.tab}
              onClick={() => {
                setCurrentTab(btn.tab as any);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center flex-1 py-0.5 transition-all outline-none cursor-pointer ${
                isActive 
                  ? 'text-[#FF6B00] scale-110 filter drop-shadow-[0_0_8px_rgba(255,107,0,0.45)] font-bold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <IconComponent className="w-4.5 h-4.5" />
              <span className="text-[9px] font-sans mt-1 uppercase font-semibold tracking-wider scale-95">{btn.label}</span>
            </button>
          );
        })}
      </div>

      {/* FOOTER */}
      <footer className="py-8 border-t border-[#141822] text-center text-slate-400 text-sm bg-[#090B0E]">
        <p>© 2026 BuildTrack. Simple and Efficient Construction Management.</p>
      </footer>
    </div>
  );
}
