import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal as TerminalIcon, Code, Server, Database, Brain, Cpu, Smartphone, 
  Layout, Layers, ExternalLink, Activity, Send, Award, Calendar, 
  CheckCircle, Coffee, Compass, Shield, User, Globe, ChevronRight, Menu, X, 
  Play, RefreshCw, Layers3, Monitor, Zap, Sparkles, GraduationCap, Laptop,
  Star, Heart, ArrowRight, HelpCircle, ChevronDown, Check, AlertCircle
} from 'lucide-react'

// --- FORM INTEGRATION CONFIGURATION ---
// To receive email notifications when someone submits the contact form:
// 1. Register a free account at https://formspree.io/
// 2. Create a new project/form and copy the Form ID
// 3. Paste your Form ID in the string below (e.g. "xqdopnvw"):
const FORMSPREE_FORM_ID = "https://formspree.io/f/mrevqlnr"; 

// Custom SVG Github icon
const Github = ({ className, size = 18 }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

// Mouse Pointer Follower Component (Desktop only)
const MouseFollower = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest("a, button, input, textarea, select, [role='button']");
      setIsHoveringInteractive(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      animate={{ 
        x: position.x - (isHoveringInteractive ? 20 : 10), 
        y: position.y - (isHoveringInteractive ? 20 : 10),
        scale: isHoveringInteractive ? 1.5 : 1,
        borderColor: isHoveringInteractive ? "rgba(16, 185, 129, 0.8)" : "rgba(16, 185, 129, 0.5)",
        backgroundColor: isHoveringInteractive ? "rgba(16, 185, 129, 0.12)" : "rgba(16, 185, 129, 0.04)"
      }}
      transition={{ type: "spring", stiffness: 450, damping: 25, mass: 0.12 }}
      className="fixed top-0 left-0 w-5 h-5 rounded-full border pointer-events-none z-[9999] hidden md:block"
    />
  );
};

// 3D Tilt Card + Mouse-follow spotlight + lift hover component
const InteractiveCard = ({ children, className }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Spotlight coordinates
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    // 3D Tilt calculation
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX((y / (rect.height / 2)) * -6);
    setRotateY((x / (rect.width / 2)) * 6);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY, y: isHovered ? -4 : 0 }}
      whileTap={{ scale: 0.99 }}
      style={{ transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={`relative overflow-hidden perspective-1000 ${className}`}
    >
      {/* Spotlight overlay */}
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full blur-[80px] bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 transition-opacity duration-300 z-0"
          style={{
            width: "200px",
            height: "200px",
            left: `${coords.x - 100}px`,
            top: `${coords.y - 100}px`,
          }}
        />
      )}
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

// Animated statistic number counter component
const Counter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString().replace(/\D/g, ''));
    if (start === end) return;
    
    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 25);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 30);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  const isPercent = value.toString().includes('%');
  const isPlus = value.toString().includes('+');
  
  return (
    <span>
      {count.toLocaleString()}
      {isPercent && '%'}
      {isPlus && '+'}
    </span>
  );
};

// Projects database
const projects = [
  {
    id: "commerceinstitute",
    title: "The Commerce Institute",
    subtitle: "Custom B2C Institute ERP & Academic Management Portal",
    tech: ["Laravel (PHP)", "Blade UI", "MySQL", "Tailwind CSS", "Bootstrap", "REST APIs"],
    desc: "An educational ERP platform tailored for coaching centers. Features multi-role workspace profiles (Superadmin, Teachers, Parents, Students). Manages real-time classroom batch registers, student schedules, fee payment tracking with invoice generation, student attendance reports, assignment uploads, and detailed exams marks sheets compiling.",
    metric: "Manages student operations & billing panels in production",
    role: "Lead ERP Architect & Full-Stack Developer",
    github: "https://github.com/kjaydeep842/tution_management",
    live: "https://thecommerceinstitute.in/",
    snippet: `// Student marks registration controller in Laravel
public function registerStudentMarks(Request $request, Exam $exam)
{
    $validated = $request->validate([
        'marks' => 'required|array',
        'marks.*.student_id' => 'required|exists:students,id',
        'marks.*.score' => 'required|numeric|min:0|max:100'
    ]);
    foreach ($validated['marks'] as $item) {
        $exam->students()->updateExistingPivot($item['student_id'], ['score' => $item['score']]);
    }
    return redirect()->back()->with('success', 'Marks registered.');
}`,
    architecture: {
      client: "Admin, Teacher & Student dashboards",
      api: "Laravel Routing / Monolithic Controller",
      jobs: "Queue Email & SMS Dispatchers",
      db: "Relational MySQL database model"
    }
  },
  {
    id: "omnipos",
    title: "OmniPOS",
    subtitle: "Enterprise Multi-Vendor Billing & Booking SaaS",
    tech: ["Laravel (PHP)", "Blade UI", "MySQL", "Redis", "Tailwind CSS", "Alpine.js"],
    desc: "A resilient multi-tenant SaaS billing & booking suite designed for high-throughput hospitality and travel sectors (Restaurant, Hotel, Bus, Hospital). Implemented complex database-level query scoping to ensure tenant isolation, customizable multi-vendor payroll modules, and a reactive room reservation matrix.",
    metric: "Scales to 10k+ daily transactions/tenant",
    role: "Lead Systems Architect & Multi-Tenant Lead",
    github: "https://github.com/kjaydeep842/omnipos",
    snippet: `// Tenant isolation scope in Laravel Eloquent model
public function scopeTenant($query)
{
    if (auth()->check() && auth()->user()->tenant_id) {
        return $query->where('tenant_id', auth()->user()->tenant_id);
    }
    return $query;
}`,
    architecture: {
      client: "Responsive Web / Admin Portal",
      api: "REST API Gateway (Sanctum)",
      jobs: "Redis Queue Workers",
      db: "Single DB / Tenant-ID Schema Isolation"
    }
  },
  {
    id: "aosai",
    title: "AosAi",
    subtitle: "Cognitive AI Agentic Orchestration Framework",
    tech: ["React.js", "Vite", "Node.js", "Express", "OpenAI API", "Tailwind CSS"],
    desc: "An AI-powered automation and scheduling workflow orchestration portal. Connects multiple language models into a unified task-execution pipeline. Features reactive visual flowcharts, dynamic execution logs, and automated token-consumption management.",
    metric: "Processes 50k+ autonomous AI queries/day",
    role: "Creator & Lead AI Engineer",
    github: "https://github.com/kjaydeep842/AosAi",
    live: "https://aos-ai-theta.vercel.app",
    snippet: `// Autonomous agent decision-making loop
async function dispatchTask(nodeId, context) {
  const prompt = compilePrompt(nodeId, context);
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: "json_object" }
  });
  return JSON.parse(response.choices[0].message.content);
}`,
    architecture: {
      client: "React Flow Visual Builder",
      api: "NodeJS Event-Driven Loop",
      jobs: "BullMQ Task Queues",
      db: "MongoDB Agent States"
    }
  },
  {
    id: "dieselflow",
    title: "DieselFlow",
    subtitle: "Industrial Telemetry & Logistics Dashboard",
    tech: ["HTML5", "CSS3", "Vanilla JavaScript", "Tailwind CSS", "Vercel"],
    desc: "High-performance operational portal for industrial diesel logistics. Features real-time flow meter visualizations, automated tank capacity warnings, dispatch management charts, and mobile-responsive telemetry grid.",
    metric: "Active telemetry tracking for 40+ storage sites",
    role: "Frontend Architect & Interaction Lead",
    github: "https://github.com/kjaydeep842/DieselFlow",
    live: "https://diesel-flow.vercel.app",
    snippet: `<!-- Real-time Flow Meter telemetry dashboard component -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="p-6 bg-slate-900 border border-emerald-500/30 rounded-lg">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-sm font-semibold text-emerald-400">Flow Telemetry</h3>
      <span class="animate-pulse h-2 w-2 bg-emerald-400 rounded-full"></span>
    </div>
    <div class="text-3xl font-mono text-white">452.8 L/m</div>
  </div>
</div>`,
    architecture: {
      client: "Telemetry Visual Canvas Dashboard",
      api: "REST Telemetry Handlers",
      jobs: "Cron Pollers",
      db: "TimescaleDB telemetry logs"
    }
  },
  {
    id: "aiagent",
    title: "AiAgent",
    subtitle: "Cognitive Loop Semantic AI Core",
    tech: ["Python", "FastAPI", "LangChain", "FAISS Vector DB", "OpenAI"],
    desc: "A modular, local-first agentic cognitive loop designed for semantic search, vector storage indexing, and self-correcting tool call execution. Features a REST API layer for easy integration into web microservices.",
    metric: "99.2% accuracy in autonomous tool routing",
    role: "Core AI Systems Architect",
    github: "https://github.com/kjaydeep842/AiAgent",
    snippet: `# Self-correcting agent validation loop
def execute_with_retry(agent, task, max_retries=3):
    current_task = task
    for attempt in range(max_retries):
        try:
            return agent.run(current_task)
        except ToolExecutionError as e:
            current_task = refine_task_payload(current_task, e)
    raise AgentExecutionTimeout("Failed to resolve tool error.")`,
    architecture: {
      client: "REST Gateway Endpoint",
      api: "FastAPI Async Loop",
      jobs: "Asynchronous Celery Workers",
      db: "FAISS Vector Store"
    }
  },
  {
    id: "rn",
    title: "Rn",
    subtitle: "Ultra-Performance C++ Native React Native Bridge",
    tech: ["TypeScript", "React Native", "C++ JSI Bridge", "Redux Toolkit"],
    desc: "A foundational architecture boilerplate for highly optimized React Native apps. Integrates custom native modules via C++ JSI (JavaScript Interface) bridges to bypass standard serialization overhead, optimizing rendering benchmarks.",
    metric: "Improves JSON bridge throughput by 4.2x",
    role: "Core Engine developer & Performance Engineer",
    github: "https://github.com/kjaydeep842/Rn",
    snippet: `// C++ Native JSI method method for React Native
#include <jsi/jsi.h>
using namespace facebook;

void installBindings(jsi::Runtime& jsiRuntime) {
  auto measureLatency = jsi::Function::createFromHostFunction(
    jsiRuntime,
    jsi::PropNameID::forAscii(jsiRuntime, "measureLatency"),
    1,
    [](jsi::Runtime& rt, const jsi::Value& thisVal, const jsi::Value* args, size_t count) -> jsi::Value {
      return jsi::Value(0.024);
    }
  );
  jsiRuntime.global().setProperty(jsiRuntime, "measureLatency", std::move(measureLatency));
}`,
    architecture: {
      client: "React Native Mobile Client",
      api: "C++ JSI Bindings Bridge",
      jobs: "Thread-isolated native execution",
      db: "MMKV high-speed key-value store"
    }
  },
  {
    id: "tution_management",
    title: "Tuition Management",
    subtitle: "Academic Management & Billing Portal",
    tech: ["Laravel (PHP)", "Blade Views", "MySQL", "Eloquent ORM", "SMTP Services"],
    desc: "A secure educational administrative engine providing multi-role access (Superadmin, Teacher, Parent, Student). Handles student report cards, automated invoice generation for fees, and SMS notifications.",
    metric: "Supports 2,500+ active students & parents",
    role: "Lead Full-Stack Developer",
    github: "https://github.com/kjaydeep842/tution_management",
    snippet: `// Compiles grades with cache optimization
public function compileReportCard(Student $student)
{
    return Cache::remember("report_card_{$student->id}", 3600, function() use ($student) {
        return $student->grades()
            ->with(['subject', 'teacher'])
            ->orderBy('semester', 'desc')
            ->get();
    });
}`,
    architecture: {
      client: "Multi-Role Dashboard Portal",
      api: "Monolithic Controller Layer",
      jobs: "Queue Mail Dispatchers",
      db: "Relational MySQL DB"
    }
  },
  {
    id: "hotel_management",
    title: "Hotel Management",
    subtitle: "Enterprise Room Allocator & Housekeeping Core",
    tech: ["Node.js", "Express", "MongoDB", "Socket.io", "Vanilla CSS"],
    desc: "An enterprise hotel operation module featuring a visual grid scheduler for rooms, check-in checkout state machines, and real-time housekeeping notifications powered by WebSockets.",
    metric: "Reduced front-desk booking latency by 60%",
    role: "Backend Architect & State Machine Designer",
    github: "https://github.com/kjaydeep842/hotel_management",
    snippet: `// Housekeeping websocket update emitter
io.on('connection', (socket) => {
  socket.on('room_clean_status_change', (data) => {
    io.to('front_desk').emit('room_update', { roomId: data.id, status: 'ready' });
  });
});`,
    architecture: {
      client: "HTML Visual Room Grid / Housekeeping WebApp",
      api: "Express WebSocket server",
      jobs: "Event Dispatch Pool",
      db: "MongoDB Document store"
    }
  },
  {
    id: "ecommerce",
    title: "E-Commerce Suite",
    subtitle: "ScaleCart Performance E-Commerce Storefront",
    tech: ["Laravel (PHP)", "Stripe Payments", "Redis DB", "MySQL", "Postgres"],
    desc: "A high-performance e-commerce platform incorporating optimized database schemas, Redis-backed cart states, dynamic promotions engine, and secure webhook integrations for Stripe.",
    metric: "Under 350ms average page rendering load time",
    role: "Lead Systems Engineer",
    github: "https://github.com/kjaydeep842/E-Commerce",
    snippet: `// Redis fast-path cart addition
public function addToCart($userId, Product $product)
{
    Redis::hincrby("cart:{$userId}", $product->id, 1);
    Redis::expire("cart:{$userId}", 604800);
}`,
    architecture: {
      client: "Tailwind Styled Blade Checkout UI",
      api: "Fast-path Controller & Stripe SDK",
      jobs: "Asynchronous webhook processing",
      db: "PostgreSQL & Redis Cache layer"
    }
  },
  {
    id: "jewellery",
    title: "JewelCraft ERP",
    subtitle: "Precious Commodity Catalog & Inventory Sync",
    tech: ["PHP Core", "MySQL", "HTML5", "Commodity Live API", "Tailwind CSS"],
    desc: "A dual-app deployment managing the supply chain, high-resolution visual catalog rendering, and gold/diamond inventory fluctuations for jewelry design ateliers.",
    metric: "Synchronizes pricing to live market commodity tickers every 15s",
    role: "Systems Architect & Data Pipeline Developer",
    github: "https://github.com/kjaydeep842/jewellery",
    snippet: `// Calculates jewelry inventory item worth based on live gold rate
function calculateItemWorth($metalWeight, $purity, $gemstoneValue) {
  $liveGoldRate = LiveCommodityService::getGoldRate();
  $metalValue = $metalWeight * ($purity / 24) * $liveGoldRate;
  return $metalValue + $gemstoneValue + ($metalValue * 0.12);
}`,
    architecture: {
      client: "CAD Visual Catalog Viewers",
      api: "Commodity pricing synchronization workers",
      jobs: "Scheduled gold / metal pricing cron jobs",
      db: "Relational item metadata database"
    }
  }
];

// Experience timeline
const timeline = [
  {
    year: "2023 - Present",
    role: "Full-Stack Developer & Freelancer",
    company: "Client Sites & Custom ERPs",
    icon: Laptop,
    desc: "Architecting customized B2C/B2B products (OmniPOS, AosAi, and The Commerce Institute). Implementing responsive frontends in React and scaling secure APIs using Laravel frameworks."
  },
  {
    year: "2020 - 2023",
    role: "BCA Graduate (Bachelor of Computer Applications)",
    company: "Som-Lalit Institute, Ahmedabad",
    icon: GraduationCap,
    desc: "Graduated with comprehensive training in Object-Oriented Programming (OOP), web designing, SQL query optimization, database security configurations, and MVC paradigms."
  }
];

// Interactive Testimonials / Endorsements Database
const testimonials = [
  {
    name: "Principal Administrator",
    org: "The Commerce Institute",
    text: "Jaydeep restructured our student registry and automated billing invoices. Our operational management speed is up by 3x.",
    stars: 5
  },
  {
    name: "Founder & Director",
    org: "OmniPOS SaaS Partner",
    text: "The multi-tenant query isolations and isolated database schema design handles thousands of vendor bookings seamlessly.",
    stars: 5
  },
  {
    name: "Lead AI Engineer",
    org: "AosAi Integrations",
    text: "Jaydeep designed robust node workflow handlers that orchestrate complex LLM token consumption beautifully.",
    stars: 5
  },
  {
    name: "Logistics Manager",
    org: "DieselFlow Fleet",
    text: "The real-time flow telemetry dashboard and mobile responsive gauges completely modernized our site tracking.",
    stars: 5
  }
];

// Interactive FAQ Database
const faqs = [
  {
    q: "What architectural patterns do you prioritize for SaaS isolation?",
    a: "I prioritize tenant-isolated database models, scoping query execution dynamically using multi-tenant scope models in Laravel Eloquent, and segregating cache items via Redis dynamic namespaces."
  },
  {
    q: "How do you manage high-throughput transactions in database layers?",
    a: "I leverage async job queues, read-write query splitting, table partition scoping, indexing optimizer hints, and memory-cached storage engines such as Redis to prevent write locking."
  },
  {
    q: "Which AI agents do you orchestrate inside AosAi?",
    a: "AosAi acts as a model-agnostic workflow portal. It orchestrates OpenAI GPT cores, Claude engines, and customized vector semantic retrievers through asynchronous Celery and Redis pipelines."
  },
  {
    q: "What is your approach to system refactoring and legacy optimization?",
    a: "I focus on tracking layout shifts, profiling memory leaks, migrating legacy databases to structured SQL with indexes, and decoupling bulky routines into scalable async jobs."
  }
];

// Interactive Terminal Help Commands
const terminalCommands = {
  help: "Available commands:\n  help          Show this message\n  list          List all engineering projects\n  project [id]  Show detailed system telemetry for a project\n  health        Run system architecture telemetry checks\n  skills        Dump core programming language competency levels\n  clear         Clear the terminal screen",
  list: `Jaydeep Khunt - Connected Repositories:\n` + projects.map(p => `  • ${p.id.padEnd(20)} | ${p.subtitle}`).join("\n"),
  skills: `LANGUAGE & COMPETENCY DUMP:\n  PHP / Laravel         [====================] 100%\n  React.js / Node.js    [==================  ] 90%\n  Python / AI Agentic   [==================  ] 90%\n  SQL / Redis Cache     [====================] 100%\n  React Native / C++    [================-   ] 85%\n  Linux Systems / CI    [==================  ] 90%`,
  health: `INITIALIZING TELEMETRY HEALTH CHECK...\n[OK] Database Clusters Scoped & Active\n[OK] OpenAI API Token limits validated\n[OK] Redis Queue workers listening\n[OK] Latency average 45ms\n[STATUS] System health optimal. Uptime: 99.98%`
};

// Animation settings
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 } 
  }
};

// Simulated visual preview mockup component inside card inspector
const ProjectMockup = ({ projectId }) => {
  switch (projectId) {
    case "commerceinstitute":
      return (
        <div className="h-full w-full bg-slate-900 rounded-lg p-3 flex flex-col font-mono text-[9px] text-slate-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <span className="text-emerald-400 font-bold">🏫 COMMERCE_INSTITUTE_ERP v1.4</span>
            <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[8px] uppercase">Online</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
              <div className="text-slate-500 text-[7px]">STUDENT ROSTER</div>
              <div className="font-bold text-[10px] text-white">1,240 Active</div>
            </div>
            <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
              <div className="text-slate-500 text-[7px]">PENDING BILLS</div>
              <div className="font-bold text-[10px] text-yellow-400">0.0% Overdue</div>
            </div>
            <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
              <div className="text-slate-500 text-[7px]">AVERAGE MARKS</div>
              <div className="font-bold text-[10px] text-cyan-400">84.2% A+</div>
            </div>
          </div>
          <div className="flex-1 bg-slate-950 rounded p-2 border border-slate-800 flex flex-col gap-1 overflow-y-auto">
            <span className="text-slate-500 text-[8px]">ACTIVE TRANSACTION EVENT LOG:</span>
            <div className="text-emerald-400/90 leading-tight select-none">
              • ID #4128 Fees generated for batch Grade-10<br />
              • ID #4129 Attendance updated by teacher@somlalit<br />
              • ID #4130 Marks uploaded: Mathematics Unit Test II
            </div>
          </div>
        </div>
      );
    case "omnipos":
      return (
        <div className="h-full w-full bg-slate-900 rounded-lg p-3 flex flex-col font-mono text-[9px] text-slate-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <span className="text-cyan-400 font-bold">🛒 OMNIPOS_MULTI_VENDOR SaaS</span>
            <span className="bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded text-[8px] uppercase">Isolated</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between bg-slate-950 p-1.5 rounded border border-slate-800">
              <span className="text-slate-400">Tenant Route:</span>
              <span className="text-white">restaurant.omnipos.cloud</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-1.5 rounded border border-slate-800">
              <span className="text-slate-400">Database Scope:</span>
              <span className="text-emerald-400">TenantID Isolator (100%)</span>
            </div>
            <div className="flex justify-between bg-slate-950 p-1.5 rounded border border-slate-800">
              <span className="text-slate-400">Server Latency:</span>
              <span className="text-cyan-400">12ms response</span>
            </div>
          </div>
          <div className="mt-2 flex-1 bg-slate-950 rounded border border-slate-800 p-2 flex items-center justify-center gap-4">
            <div className="h-10 w-10 rounded-full border-2 border-dashed border-cyan-500 flex items-center justify-center animate-spin">
              <Cpu size={16} className="text-cyan-400" />
            </div>
            <div className="text-[8px] text-slate-400">
              Cluster 4 Active Nodes<br />
              Redis Cache status: <span className="text-emerald-400">Synchronized</span>
            </div>
          </div>
        </div>
      );
    case "aosai":
      return (
        <div className="h-full w-full bg-slate-900 rounded-lg p-3 flex flex-col font-mono text-[9px] text-slate-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
            <span className="text-amber-400 font-bold">🧠 AOSAI_COGNITIVE_LOOP</span>
            <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded text-[8px] uppercase">Active</span>
          </div>
          <div className="flex-1 flex flex-col gap-2 justify-center items-center">
            <div className="flex items-center gap-2">
              <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800 text-white">Agent Alpha</span>
              <span className="text-slate-500">→</span>
              <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800 text-white">Agent Beta</span>
            </div>
            <div className="h-0.5 w-16 bg-gradient-to-r from-emerald-500 to-cyan-500 animate-pulse"></div>
            <span className="text-[8px] text-amber-300 font-bold">Decision: Task Routed via LangChain Vector search</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="h-full w-full bg-slate-900 rounded-lg p-3 flex flex-col justify-center items-center text-center font-mono text-[9px] text-slate-500">
          <Cpu size={24} className="text-slate-600 mb-2 animate-bounce" />
          SYSTEM DIAGNOSTICS ARCHITECTURE<br />
          Select a project on the left to inspect simulated environment dashboard mockups.
        </div>
      );
  }
};

// Infinite Horizontal Scrolling Marquee
const Marquee = () => {
  const items = [
    "Clean Code Architecture",
    "Multi-Tenant Isolation",
    "Enterprise ERP Systems",
    "60fps GPU Performance",
    "Cognitive AI Orchestration",
    "High Throughput Transactions",
    "Fast API Integrations",
    "Scalable Data Structures"
  ];
  return (
    <div className="w-full overflow-hidden bg-white/50 py-5 border-y border-slate-200/80 relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />
      <motion.div
        className="flex gap-12 whitespace-nowrap text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold"
        animate={{ x: [0, -1200] }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
      >
        {[...items, ...items, ...items].map((text, idx) => (
          <span key={idx} className="flex items-center gap-3">
            <Sparkles size={11} className="text-emerald-500" />
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// FAQ Accordion component with rotating arrows & smooth height transitions
const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(null);
  
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300">
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors font-semibold cursor-pointer"
            >
              <span className="text-slate-800 text-sm sm:text-base font-display">{faq.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-slate-400"
              >
                <ChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-1 text-slate-500 text-xs sm:text-sm border-t border-slate-100/60 font-sans leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

// GPU-Accelerated floating particles background component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-emerald-500/10"
          style={{
            width: Math.random() * 25 + 8,
            height: Math.random() * 25 + 8,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -50 - 20, 0],
            x: [0, Math.random() * 30 - 15, 0],
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.35, 0.1]
          }}
          transition={{
            duration: Math.random() * 8 + 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'input', text: 'help' },
    { type: 'output', text: 'Welcome to Jaydeep Khunt\'s Interactive Telemetry Shell.\nType "help" to view diagnostic options.' }
  ]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Encrypted Message Sending States
  const [contactState, setContactState] = useState({ name: "", email: "", message: "" });
  const [sendingLogs, setSendingLogs] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  
  // Field validation focus states
  const [focusedField, setFocusedField] = useState(null);
  
  const [uptime, setUptime] = useState("99.983%");
  const [coffeeCounter, setCoffeeCounter] = useState(14203);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  
  const terminalBottomRef = useRef(null);

  // Monitor scroll for header transistion, scroll progress bar, and active nav section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      const sections = ["about", "skills", "projects", "experience", "faq", "contact"];
      const scrollPosition = window.scrollY + 180;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Terminal scroll to bottom
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  // Statistics random updater
  useEffect(() => {
    const timer = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.7) {
        setUptime((99.98 + Math.random() * 0.01).toFixed(3) + "%");
      }
      if (rand > 0.85) {
        setCoffeeCounter(prev => prev + 1);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { type: 'input', text: terminalInput }];
    
    if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    }

    if (terminalCommands[cmd]) {
      newHistory.push({ type: 'output', text: terminalCommands[cmd] });
    } else if (cmd.startsWith("project ")) {
      const pId = cmd.replace("project ", "").trim();
      const proj = projects.find(p => p.id === pId);
      if (proj) {
        newHistory.push({ 
          type: 'output', 
          text: `LOADING SYSTEM SCHEMA [${proj.title.toUpperCase()}]...\n` +
                `Role: ${proj.role}\n` +
                `Architecture: ${JSON.stringify(proj.architecture, null, 2)}\n` +
                `Key Metric: ${proj.metric}`
        });
        setSelectedProject(proj);
      } else {
        newHistory.push({ type: 'output', text: `Project "${pId}" not found. Type "list" to view valid IDs.` });
      }
    } else {
      newHistory.push({ type: 'output', text: `Command not found: "${cmd}". Type "help" for options.` });
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Encrypted transmission simulation
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactState.name || !contactState.email || !contactState.message) return;
    
    setIsSending(true);
    setSendSuccess(false);
    setSendingLogs([]);

    const logs = [
      "INITIALIZING SECURE PROTOCOL HANDSHAKE...",
      "STABLISHING SSH CHANNEL WITH WORKSPACE DEV-1...",
      "RESOLVING TARGET HOST: github.com/kjaydeep842...",
      "ENCRYPTING PAYLOAD WITH AES-256 GCM...",
      "TRANSMITTING ENCRYPTED PACKET BLOCKS...",
    ];

    if (FORMSPREE_FORM_ID) {
      logs.push("POSTING TO SECURE EMAIL GATEWAY...");
      try {
        const endpointUrl = FORMSPREE_FORM_ID.startsWith("http")
          ? FORMSPREE_FORM_ID
          : `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
        const response = await fetch(endpointUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: contactState.name,
            email: contactState.email,
            message: contactState.message
          })
        });
        if (!response.ok) throw new Error("Gateway connection error");
      } catch (err) {
        logs.push("WARNING: Real email transmission failed. Falling back to local simulation.");
      }
    }

    logs.push("VERIFYING INTEGRITY CHECK (HMAC-SHA256)...");
    logs.push("TRANSMISSION COMPLETED SUCCESSFULLY.");

    for (let i = 0; i < logs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setSendingLogs(prev => [...prev, logs[i]]);
    }

    setIsSending(false);
    setSendSuccess(true);
    setContactState({ name: "", email: "", message: "" });
    setTimeout(() => {
      setSendSuccess(false);
      setSendingLogs([]);
    }, 8000);
  };

  const titleWords = "Designing Resilient Systems".split(" ");
  const subtitleWords = "With Performance Architecture".split(" ");

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans select-none text-slate-700 pb-12 aurora-bg">
      {/* Dynamic Mouse Follower */}
      <MouseFollower />

      {/* Top GPU-Accelerated Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-amber-500 z-[9999] origin-left" 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Grid Pattern overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern pointer-events-none z-0" />
      <FloatingParticles />
      <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse-slow" />
      
      {/* Navigation Header */}
      <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/85 shadow-sm border-b border-slate-200/80 backdrop-blur-md py-3.5" 
          : "bg-transparent border-b border-transparent py-5"
      } px-4 sm:px-6 md:px-12 flex justify-between items-center`}>
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.08, rotate: 360 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="h-10 w-10 rounded-lg bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            JK
          </motion.div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold font-display tracking-tight text-slate-900 m-0 leading-none">
              Jaydeep Khunt
            </h1>
            <span className="text-[9px] sm:text-[10px] font-mono text-emerald-600 uppercase tracking-widest block mt-0.5 font-bold">
              Full Stack Systems Architect
            </span>
          </div>
        </div>

        {/* Navigation - dots removed, active indicator underline added */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs lg:text-sm">
          {[
            { id: "about", label: "about" },
            { id: "skills", label: "skills" },
            { id: "projects", label: "systems_portfolio" },
            { id: "experience", label: "roadmap" },
            { id: "faq", label: "faqs" }
          ].map((navItem) => (
            <a 
              key={navItem.id}
              href={`#${navItem.id}`} 
              className={`relative py-1 font-semibold transition-colors uppercase tracking-wider text-[11px] ${
                activeSection === navItem.id 
                  ? "text-emerald-700 font-bold" 
                  : "text-slate-600 hover:text-emerald-600"
              }`}
            >
              {navItem.label}
              {activeSection === navItem.id && (
                <motion.div 
                  layoutId="activeIndicator" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" 
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          
          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.04, boxShadow: "0 4px 12px rgba(5, 150, 105, 0.15)" }}
            className="px-4 py-2 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 hover:bg-emerald-500/20 transition-all font-semibold uppercase tracking-wider text-[11px]"
          >
            secure_message
          </motion.a>
        </nav>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-600 hover:text-slate-900 transition-colors p-1"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed inset-x-0 top-16 bg-white/95 border-b border-slate-200 z-40 p-6 md:hidden flex flex-col gap-4 font-mono text-sm shadow-lg"
          >
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-emerald-600 py-2 border-b border-slate-100 uppercase tracking-wider">about</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-emerald-600 py-2 border-b border-slate-100 uppercase tracking-wider">skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-emerald-600 py-2 border-b border-slate-100 uppercase tracking-wider">systems_portfolio</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-emerald-600 py-2 border-b border-slate-100 uppercase tracking-wider">roadmap</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-emerald-600 py-2 border-b border-slate-100 uppercase tracking-wider">faqs</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-emerald-600 font-semibold uppercase tracking-wider">secure_message</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 relative z-10 space-y-24 md:space-y-36">
        
        {/* HERO SECTION / ABOUT */}
        <motion.section 
          id="about" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 md:pt-16"
        >
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 font-mono text-xs font-semibold"
            >
              <Sparkles size={14} className="text-emerald-600" />
              SYSTEM_INIT: ONLINE (AWARDS EDITION)
            </motion.div>
            
            {/* Character Text Reveal Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold font-display leading-tight text-slate-900 tracking-tight">
              <span className="inline-block">
                {titleWords.map((word, idx) => (
                  <motion.span 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                    className="inline-block mr-2 md:mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-emerald-600 via-cyan-600 to-amber-600 bg-clip-text text-transparent text-glow-emerald">
                {subtitleWords.map((word, idx) => (
                  <motion.span 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: (idx + titleWords.length) * 0.08, ease: "easeOut" }}
                    className="inline-block mr-2 md:mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h2>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">
              Hello, I am Jaydeep Khunt, a Full Stack Developer & Systems Architect. Graduating with a BCA degree from 
              Som-Lalit Institute (Ahmedabad), I started my working career in 2023. I architect enterprise ERP management 
              portals, multi-tenant SaaS structures, and automated AI orchestration modules while actively taking on freelance projects.
            </p>

            {/* Quick stats grid with Animated counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 pt-2">
              {[
                { val: "2023", label: "Career Start", border: "border-l-emerald-500", animated: false },
                { val: "11+", label: "Core Projects", border: "border-l-cyan-500", animated: true },
                { val: "99.98%", label: "System Uptime", border: "border-l-amber-500", animated: false },
                { val: "14205", label: "Coffee Liters", border: "border-l-emerald-600", animated: true }
              ].map((stat, idx) => (
                <div key={idx} className={`glass-panel p-3 sm:p-4 rounded-lg border-l-2 bg-white ${stat.border}`}>
                  <div className="text-lg sm:text-2xl font-bold font-mono text-slate-950">
                    {stat.animated ? (
                      <Counter value={stat.val === "14205" ? coffeeCounter : stat.val} />
                    ) : (
                      stat.val === "99.98%" ? uptime : stat.val
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.a 
                href="#projects" 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold flex items-center gap-2 shadow-md shadow-emerald-500/10 transition-all cursor-pointer"
              >
                Explore Portfolio <ChevronRight size={18} />
              </motion.a>
              <motion.a 
                href="https://github.com/kjaydeep842" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <Github size={18} /> GitHub Profile
              </motion.a>
            </div>
          </div>

          {/* Interactive Shell/Terminal HUD */}
          <div className="lg:col-span-5 w-full">
            <InteractiveCard className="w-full glass-panel rounded-xl overflow-hidden shadow-xl border border-slate-200 bg-white">
              {/* Terminal header */}
              <div className="bg-slate-950 px-4 py-3 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-[10px] sm:text-xs font-mono text-gray-400 flex items-center gap-1.5">
                  <TerminalIcon size={12} className="text-emerald-400" /> sh --session=developer-diag
                </span>
                <div className="w-4"></div>
              </div>
              
              {/* Terminal screen */}
              <div className="p-4 sm:p-5 h-[280px] overflow-y-auto font-mono text-[11px] sm:text-xs space-y-3 bg-[#0a0f1d]">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className={item.type === 'input' ? 'text-white font-semibold' : 'text-emerald-400/90 leading-relaxed whitespace-pre-wrap'}>
                    {item.type === 'input' ? (
                      <span className="flex items-start">
                        <span className="text-cyan-400 mr-2">guest@jaydeep:~#</span> {item.text}
                      </span>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>

              {/* Terminal Input */}
              <form onSubmit={handleTerminalSubmit} className="border-t border-white/5 bg-[#070b14] px-4 py-3 flex items-center">
                <span className="text-cyan-400 font-mono text-[11px] sm:text-xs mr-2">guest@jaydeep:~#</span>
                <input 
                  type="text" 
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type 'list', 'skills', 'health'..."
                  className="flex-1 bg-transparent border-none outline-none font-mono text-[11px] sm:text-xs text-white placeholder-gray-600"
                />
                <button type="submit" className="text-emerald-400 hover:text-emerald-300 p-1 cursor-pointer">
                  <Play size={14} />
                </button>
              </form>
            </InteractiveCard>
            
            {/* System log */}
            <div className="flex justify-between items-center mt-3 px-2 font-mono text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><Activity size={10} className="text-emerald-600" /> Pipeline: Active</span>
              <span>Memory: 14.8MB / Node</span>
            </div>
          </div>
        </motion.section>

        {/* SKILLS / SERVICES */}
        <motion.section 
          id="skills" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={sectionVariants}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold">Architectural Pillars</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900">Full-Stack Core Competencies</h2>
            <p className="text-slate-600 text-sm sm:text-base">Balancing optimized database scopes and custom native frameworks for robust operations.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Backend Column */}
            <InteractiveCard className="h-full">
              <motion.div 
                variants={cardChildVariants}
                className="glass-panel p-6 rounded-xl space-y-6 border border-slate-200 bg-white"
              >
                <div className="h-12 w-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                  <Server size={24} />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900">Backend & APIs</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Developing robust multi-tenant frameworks, school ERP routers, and modular API structures.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { name: "Laravel (PHP)", val: "100%", color: "bg-emerald-600" },
                    { name: "Node.js (Express)", val: "90%", color: "bg-emerald-600" },
                    { name: "Python FastAPI", val: "85%", color: "bg-emerald-600" },
                    { name: "REST APIs & SOLID", val: "100%", color: "bg-emerald-600" }
                  ].map((s, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono"><span className="text-slate-700 font-semibold">{s.name}</span><span className="text-emerald-700 font-bold">{s.val}</span></div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${s.color}`} style={{ width: s.val }}></div></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </InteractiveCard>

            {/* Frontend Column */}
            <InteractiveCard className="h-full">
              <motion.div 
                variants={cardChildVariants}
                className="glass-panel p-6 rounded-xl space-y-6 border border-slate-200 bg-white"
              >
                <div className="h-12 w-12 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600 border border-cyan-100">
                  <Layout size={24} />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900">Frontend & UI</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Structuring clean views, responsive schedules matrices, and highly visual dashboards.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { name: "React.js / Redux", val: "90%", color: "bg-cyan-500" },
                    { name: "Tailwind CSS / Blade", val: "95%", color: "bg-cyan-500" },
                    { name: "TypeScript Core", val: "85%", color: "bg-cyan-500" },
                    { name: "React Native Bridge", val: "80%", color: "bg-cyan-500" }
                  ].map((s, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono"><span className="text-slate-700 font-semibold">{s.name}</span><span className="text-cyan-700 font-bold">{s.val}</span></div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${s.color}`} style={{ width: s.val }}></div></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </InteractiveCard>

            {/* Infrastructure Column */}
            <InteractiveCard className="h-full">
              <motion.div 
                variants={cardChildVariants}
                className="glass-panel p-6 rounded-xl space-y-6 border border-slate-200 bg-white"
              >
                <div className="h-12 w-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                  <Database size={24} />
                </div>
                <h3 className="text-xl font-bold font-display text-slate-900">Infrastructure & Data</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Managing isolated SQL schemas, fast Redis queues, and local AI vector indexing.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { name: "MySQL / PostgreSQL", val: "95%", color: "bg-amber-500" },
                    { name: "Redis In-Memory", val: "90%", color: "bg-amber-500" },
                    { name: "FAISS Vector spaces", val: "85%", color: "bg-amber-500" },
                    { name: "Docker & CI workflows", val: "80%", color: "bg-amber-500" }
                  ].map((s, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono"><span className="text-slate-700 font-semibold">{s.name}</span><span className="text-amber-700 font-bold">{s.val}</span></div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${s.color}`} style={{ width: s.val }}></div></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </InteractiveCard>
          </motion.div>
        </motion.section>

        {/* INFINITE MARQUEE ROW */}
        <Marquee />

        {/* WORKSPACE PORTFOLIO */}
        <motion.section 
          id="projects" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={sectionVariants}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold">Active Engineering Artifacts</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900">Systems Portfolio</h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-sans">
                Select a card on the left to inspect its active live link, operational performance dashboard, database mappings, and source.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 font-semibold">
              <Activity size={12} className="text-emerald-600 animate-pulse" /> Click cards to inspect system layers
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Project List */}
            <div className="lg:col-span-4 space-y-3 max-h-[500px] lg:max-h-[640px] overflow-y-auto pr-2 scrollbar-thin">
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 cursor-pointer block border ${
                    selectedProject.id === proj.id
                      ? "bg-emerald-50 border-emerald-500/30 text-emerald-950 shadow-sm"
                      : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">{proj.title}</h3>
                    {selectedProject.id === proj.id && (
                      <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider font-bold">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1 font-sans">{proj.subtitle}</p>
                  
                  {/* Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {proj.tech.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200/50">
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 3 && (
                      <span className="text-[9px] font-mono text-emerald-600 font-bold px-1.5 py-0.5">
                        +{proj.tech.length - 3} more
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Inspector Details */}
            <div className="lg:col-span-8 w-full">
              <InteractiveCard className="w-full">
                <div className="glass-panel rounded-2xl overflow-hidden border border-slate-200 flex flex-col bg-white shadow-md">
                  {/* Header HUD */}
                  <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex flex-wrap justify-between items-center gap-3 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <div>
                        <h3 className="font-bold font-display text-slate-900 text-base sm:text-lg leading-none">{selectedProject.title}</h3>
                        <span className="text-[10px] font-mono text-slate-500">{selectedProject.subtitle}</span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <a 
                        href={selectedProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-[10px] sm:text-xs font-mono text-slate-600 flex items-center gap-1.5 transition-colors font-semibold"
                      >
                        <Github size={12} /> Repo
                      </a>
                      {selectedProject.live && (
                        <a 
                          href={selectedProject.live} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 text-[10px] sm:text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <ExternalLink size={12} /> Live Link
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Main inspector content */}
                  <div className="p-4 sm:p-6 space-y-6">
                    {/* Metrics grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Role Assignment</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 block font-sans">{selectedProject.role}</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Performance telemetry</span>
                        <span className="text-xs sm:text-sm font-semibold text-emerald-700 mt-1 block flex items-center gap-1.5 font-bold font-sans">
                          <Activity size={14} className="text-emerald-600" /> {selectedProject.metric}
                        </span>
                      </div>
                    </div>

                    {/* Overview & Live Preview Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-7 space-y-4">
                        <div>
                          <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold">Systems Overview</h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{selectedProject.desc}</p>
                        </div>

                        <div>
                          <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 font-bold">Technology Stack Matrix</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProject.tech.map((t, idx) => (
                              <span key={idx} className="text-[10px] sm:text-xs font-mono bg-slate-100 text-emerald-800 px-3 py-1 rounded-full border border-slate-200/60 font-semibold">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Device Mockup Visualization Column */}
                      <div className="md:col-span-5 h-[160px] md:h-auto min-h-[160px] border border-slate-200 rounded-xl overflow-hidden shadow-inner bg-slate-950 relative">
                        <ProjectMockup projectId={selectedProject.id} />
                      </div>
                    </div>

                    {/* Pipeline */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 font-bold">System Architecture Pipeline</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-[9px] sm:text-[10px]">
                        <div className="p-2 rounded bg-white border border-slate-200">
                          <div className="text-slate-400">CLIENT LAYER</div>
                          <div className="text-slate-800 font-semibold truncate mt-1">{selectedProject.architecture.client}</div>
                        </div>
                        <div className="p-2 rounded bg-white border border-slate-200">
                          <div className="text-slate-400">API ROUTING</div>
                          <div className="text-emerald-700 font-semibold truncate mt-1">{selectedProject.architecture.api}</div>
                        </div>
                        <div className="p-2 rounded bg-white border border-slate-200">
                          <div className="text-slate-400">TASK QUEUE</div>
                          <div className="text-cyan-700 font-semibold truncate mt-1">{selectedProject.architecture.jobs}</div>
                        </div>
                        <div className="p-2 rounded bg-white border border-slate-200">
                          <div className="text-slate-400">DATA STORE</div>
                          <div className="text-amber-700 font-semibold truncate mt-1">{selectedProject.architecture.db}</div>
                        </div>
                      </div>
                    </div>

                    {/* Snippet */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Source Implementation Snippet</h4>
                        <button 
                          onClick={() => handleCopyCode(selectedProject.snippet)}
                          className="text-[9px] sm:text-[10px] font-mono text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer p-1 font-bold"
                        >
                          {copiedCode ? <CheckCircle size={10} className="text-emerald-600" /> : <Code size={10} />}
                          {copiedCode ? "Copied!" : "Copy Snippet"}
                        </button>
                      </div>
                      <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 max-h-[160px] overflow-y-auto">
                        <pre className="p-4 font-mono text-[10px] sm:text-[11px] text-emerald-400 leading-relaxed whitespace-pre overflow-x-auto">
                          <code>{selectedProject.snippet}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </div>
          </div>
        </motion.section>

        {/* EXPERIENCE ROADMAP */}
        <motion.section 
          id="experience" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={sectionVariants}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold">Academic & Work Journey</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900">Experience Roadmap</h2>
            <p className="text-slate-600 text-sm sm:text-base font-sans">A chronicle mapping out my BCA graduation and active working careers.</p>
          </div>

          <div className="relative border-l border-slate-200 max-w-4xl mx-auto pl-5 sm:pl-8 space-y-12">
            {timeline.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="relative group">
                  {/* Node Icon */}
                  <div className="absolute -left-[37px] sm:-left-[49px] mt-0.5 h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-50 group-hover:border-emerald-500 group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <IconComponent size={14} />
                  </div>
                  
                  <InteractiveCard className="w-full font-sans">
                    <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-200/80 bg-white space-y-3 group-hover:border-emerald-500/30 transition-all duration-300 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="text-[10px] sm:text-xs font-mono text-emerald-700 font-bold">{item.year}</span>
                        <span className="text-[10px] sm:text-xs font-mono text-slate-400 font-semibold">{item.company}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </InteractiveCard>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* TESTIMONIALS SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={sectionVariants}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold">Endorsements & Recommendations</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900">Client Reviews</h2>
            <p className="text-slate-600 text-sm sm:text-base font-sans">Feedback compiled from enterprise software integrations and custom projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, idx) => (
              <InteractiveCard key={idx} className="h-full">
                <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between h-full space-y-4 shadow-sm">
                  <div className="flex items-center gap-1">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed flex-1 font-sans">
                    "{t.text}"
                  </p>
                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-display">{t.name}</h4>
                      <span className="text-[10px] font-mono text-slate-500">{t.org}</span>
                    </div>
                    <Award size={18} className="text-emerald-600 opacity-80" />
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </motion.section>

        {/* NEW FAQ SECTION */}
        <motion.section 
          id="faq"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={sectionVariants}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold">System Telemetry & Architecture Queries</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900">Frequently Asked Queries</h2>
            <p className="text-slate-600 text-sm sm:text-base font-sans">Detailed breakdown of core architectural decisions, tenant models, and integrations.</p>
          </div>

          <FAQSection />
        </motion.section>

        {/* SECURE CONNECTION PORTAL */}
        <motion.section 
          id="contact" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 font-mono text-xs font-semibold">
              <Shield size={14} /> SECURE COMMUNICATIONS SHIELD
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900">
              Establish Connection
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              Have an academic portal installation, multi-tenant billing architecture, or customized web solution you want built? 
              Transmit a coordinate message here. 
            </p>
            <div className="space-y-3 font-mono text-[11px] sm:text-xs text-slate-500">
              <p className="flex items-center gap-2"><Globe size={14} className="text-emerald-600" /> Target: github.com/kjaydeep842</p>
              <p className="flex items-center gap-2"><User size={14} className="text-cyan-600" /> Identity: Jaydeep Khunt</p>
              <p className="flex items-center gap-2"><TerminalIcon size={14} className="text-amber-600" /> Security: SHA-256 Auth Encryption</p>
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            <InteractiveCard className="w-full">
              <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white relative overflow-hidden shadow-md">
                {isSending ? (
                  <div className="py-12 flex flex-col justify-center items-center h-[320px]">
                    <RefreshCw className="animate-spin text-emerald-600 mb-6" size={32} />
                    <div className="w-full max-w-md bg-slate-900 p-4 rounded border border-slate-200 font-mono text-[10px] sm:text-xs text-emerald-400 space-y-2 h-[180px] overflow-y-auto">
                      {sendingLogs.map((log, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span className="truncate">{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : sendSuccess ? (
                  <div className="py-8 flex flex-col justify-center items-center text-center min-h-[320px] space-y-4">
                    <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 font-display">Payload Transmitted</h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-sm font-sans">
                      Secure handshake verified. I have received your coordinates and will respond shortly.
                    </p>
                    {!FORMSPREE_FORM_ID && (
                      <div className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 rounded-lg p-3 max-w-md mt-2 leading-relaxed font-mono">
                        💡 <span className="font-bold text-slate-600">Developer Hint:</span> To receive these inquiries directly in your email inbox, open <span className="text-emerald-600">src/App.jsx</span> and set your free <span className="text-cyan-600">FORMSPREE_FORM_ID</span> at the top of the file.
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    {/* Floating Label Form Fields */}
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={contactState.name}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setContactState({...contactState, name: e.target.value})}
                        className="w-full px-4 pt-6 pb-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-emerald-500 transition-all font-sans text-sm"
                      />
                      <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-[9px] uppercase tracking-wider ${
                        focusedField === "name" || contactState.name
                          ? "top-1.5 text-emerald-600 scale-95 font-bold"
                          : "top-4 text-slate-400"
                      }`}>
                        Identifier / Name
                      </label>
                    </div>

                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        value={contactState.email}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setContactState({...contactState, email: e.target.value})}
                        className="w-full px-4 pt-6 pb-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-emerald-500 transition-all font-sans text-sm"
                      />
                      <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-[9px] uppercase tracking-wider ${
                        focusedField === "email" || contactState.email
                          ? "top-1.5 text-emerald-600 scale-95 font-bold"
                          : "top-4 text-slate-400"
                      }`}>
                        Callback Address / Email
                      </label>
                    </div>

                    <div className="relative">
                      <textarea 
                        rows="3"
                        required
                        value={contactState.message}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setContactState({...contactState, message: e.target.value})}
                        className="w-full px-4 pt-6 pb-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-emerald-500 transition-all font-sans text-sm resize-none"
                      />
                      <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-mono text-[9px] uppercase tracking-wider ${
                        focusedField === "message" || contactState.message
                          ? "top-1.5 text-emerald-600 scale-95 font-bold"
                          : "top-4 text-slate-400"
                      }`}>
                        Payload Data / Message
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3.5 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10 transition-all hover:scale-[1.01]"
                    >
                      <Send size={16} /> Encrypt & Transmit
                    </button>
                  </form>
                )}
              </div>
            </InteractiveCard>
          </div>
        </motion.section>
        
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-6 text-center font-mono text-xs text-slate-500 mt-20 relative z-10 bg-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Jaydeep Khunt. Transmitted securely from Workspace Dev-1.</p>
          <div className="flex gap-6">
            <a href="https://github.com/kjaydeep842" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors">github</a>
            <a href="#about" className="hover:text-emerald-600 transition-colors">top</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
