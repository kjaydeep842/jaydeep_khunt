import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { 
  Terminal, Terminal as TerminalIcon, Code, Server, Database, Brain, Cpu, Smartphone, 
  Layout, Layers, ExternalLink, Activity, Send, Award, Calendar, 
  CheckCircle, Coffee, Compass, Shield, User, Globe, ChevronRight, Menu, X, 
  Play, RefreshCw, Layers3, Monitor, Zap, Sparkles, GraduationCap, Laptop,
  Star, Heart, ArrowRight, HelpCircle, ChevronDown, Check, AlertCircle,
  Plus, Trash, Key, Lock, Unlock, Settings, FolderPlus, MessageSquare, LogOut, ArrowLeft,
  CreditCard
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

// Custom LinkedIn SVG icon
const LinkedIn = ({ className, size = 18 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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

// --- STEAMPUNK DESIGN & ANIMATION COMPONENTS ---

// Preloader loader component
const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-[#f8fafc] z-[99999] flex flex-col justify-center items-center select-none aurora-bg"
    >
      <div className="relative w-[220px] h-[220px] flex items-center justify-center">
        {/* Rotating gears */}
        <img
          src="/assets/images/gear1.png"
          className="w-[110px] h-[110px] object-contain animate-rotate-cw opacity-80 emerald-steampunk-tint"
          alt="gear"
        />
        <img
          src="/assets/images/gear2.png"
          className="absolute w-[80px] h-[80px] object-contain animate-rotate-ccw opacity-65 origin-center emerald-steampunk-tint"
          alt="gear"
        />
        <img
          src="/assets/images/gear3.png"
          className="absolute w-[60px] h-[60px] object-contain animate-rotate-ccw-fast opacity-55 origin-center emerald-steampunk-tint"
          alt="gear"
        />

        {/* Circular progress bar */}
        <svg className="absolute w-[200px] h-[200px] -rotate-90">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="transparent"
            stroke="rgba(16, 185, 129, 0.08)"
            strokeWidth="4"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="transparent"
            stroke="#10b981"
            strokeWidth="4"
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={2 * Math.PI * 90 * (1 - progress / 100)}
            className="transition-all duration-100 ease-out"
          />
        </svg>

        {isReady && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={onComplete}
            className="absolute px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-[10px] font-mono tracking-widest font-bold border border-emerald-500 hover:scale-105 transition-all shadow-xl cursor-pointer"
          >
            ENTER UNIVERSE
          </motion.button>
        )}
      </div>

      <div className="mt-8 font-mono text-xs text-emerald-700/60 tracking-widest uppercase">
        {progress < 100 ? `ESTABLISHING CONNECTION: ${progress}%` : "SYSTEM READY"}
      </div>
    </motion.div>
  );
};

// 3D Tilt Hero Portal component
const HeroPortal = () => {
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] flex items-center justify-center mx-auto">
      {/* Background gear images */}
      <img
        src="/assets/images/portal.png"
        className="absolute w-[95%] h-[95%] object-contain opacity-[0.22] z-0 pointer-events-none emerald-steampunk-tint animate-rotate-cw"
        alt="portal"
      />
      <img
        src="/assets/images/gear2.png"
        className="absolute w-[180px] h-[180px] opacity-[0.15] z-0 pointer-events-none emerald-steampunk-tint animate-rotate-ccw"
        alt="gear2"
      />
      <img
        src="/assets/images/gear3.png"
        className="absolute w-[90px] h-[90px] opacity-[0.12] z-0 pointer-events-none emerald-steampunk-tint animate-rotate-cw-fast"
        alt="gear3"
      />

      {/* 3D tilt video sphere */}
      <InteractiveCard className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-full overflow-hidden border border-emerald-500/30 z-10 shadow-2xl flex items-center justify-center">
        <img
          src="/assets/images/circle1.svg"
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none select-none mix-blend-screen opacity-90 emerald-steampunk-tint"
          alt="portal overlay"
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-[105%] h-[105%] object-cover z-0 scale-[1.03] emerald-steampunk-tint"
          src="https://paralleluniverse.com.ua/wp-content/themes/e-parallel-smooth/images/video1.mp4"
        />
        <div className="absolute inset-0 border border-emerald-500/20 rounded-full z-20 pointer-events-none m-3 animate-rotate-cw" />
        <div className="absolute inset-0 border border-emerald-500/10 rounded-full z-20 pointer-events-none m-6 animate-rotate-ccw" />
      </InteractiveCard>
    </div>
  );
};

// Scroll Draw Lines component
const ScrollDrawLines = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="absolute inset-y-0 left-0 right-0 pointer-events-none z-0 overflow-hidden">
      <svg className="absolute left-4 top-0 h-full w-24 opacity-20 hidden md:block" style={{ minHeight: "100%" }}>
        <motion.path
          d="M 10,0 Q 50,500 10,1000 T 10,2000 T 10,3000 T 10,4000"
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
          style={{ pathLength }}
        />
      </svg>
      <svg className="absolute right-4 top-0 h-full w-24 opacity-20 hidden md:block" style={{ minHeight: "100%" }}>
        <motion.path
          d="M 80,0 Q 40,500 80,1000 T 80,2000 T 80,3000 T 80,4000"
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
          style={{ pathLength }}
        />
      </svg>
    </div>
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
    live: "https://omnipos-demo.vercel.app",
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
    iconType: "Laptop",
    desc: "Architecting customized B2C/B2B products (OmniPOS, AosAi, and The Commerce Institute). Implementing responsive frontends in React and scaling secure APIs using Laravel frameworks."
  },
  {
    year: "2020 - 2023",
    role: "BCA Graduate (Bachelor of Computer Applications)",
    company: "Som-Lalit Institute, Ahmedabad",
    iconType: "GraduationCap",
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

// Interactive FAQ Accordion component with rotating arrows & smooth height transitions
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

// Helper function to return icon based on project id
const getProjectIcon = (id) => {
  switch(id) {
    case "commerceinstitute": return <GraduationCap className="text-emerald-500" size={20} />;
    case "omnipos": return <Monitor className="text-cyan-500" size={20} />;
    case "aosai": return <Brain className="text-purple-500" size={20} />;
    case "dieselflow": return <Activity className="text-amber-500" size={20} />;
    case "aiagent": return <Cpu className="text-indigo-500" size={20} />;
    case "rn": return <Smartphone className="text-blue-500" size={20} />;
    case "tution_management": return <Layers className="text-emerald-500" size={20} />;
    case "hotel_management": return <Database className="text-teal-500" size={20} />;
    case "ecommerce": return <Monitor className="text-indigo-500" size={20} />;
    case "jewellery": return <Award className="text-amber-500" size={20} />;
    default: return <Code className="text-emerald-500" size={20} />;
  }
};

export default function App() {
  // PERSISTED DATA STATES FOR ADMIN MANAGEMENT
  const [allProjects, setAllProjects] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : projects;
  });

  const [allTimeline, setAllTimeline] = useState(() => {
    const saved = localStorage.getItem('portfolio_timeline');
    return saved ? JSON.parse(saved) : timeline;
  });

  const [allTestimonials, setAllTestimonials] = useState(() => {
    const saved = localStorage.getItem('portfolio_testimonials');
    return saved ? JSON.parse(saved) : testimonials;
  });

  const [allInquiries, setAllInquiries] = useState(() => {
    const saved = localStorage.getItem('portfolio_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedProject, setSelectedProject] = useState(() => {
    const saved = localStorage.getItem('portfolio_projects');
    const projs = saved ? JSON.parse(saved) : projects;
    return projs[0] || null;
  });

  // NAVIGATION & ROUTING VIEWS
  const [currentView, setCurrentView] = useState("portfolio"); // "portfolio", "admin", "project-detail"
  const [detailProjectId, setDetailProjectId] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminTab, setAdminTab] = useState("projects"); // "projects", "timeline", "testimonials", "inquiries"
  const [loginError, setLoginError] = useState("");

  // Form states for Admin Adding Items
  const [newProj, setNewProj] = useState({
    id: "", title: "", subtitle: "", tech: "", desc: "", metric: "", role: "", github: "", live: "", snippet: "", client: "", api: "", jobs: "", db: ""
  });
  const [newTime, setNewTime] = useState({
    year: "", role: "", company: "", iconType: "Laptop", desc: ""
  });
  const [newTestimonial, setNewTestimonial] = useState({
    name: "", org: "", text: "", stars: 5
  });

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

  // Third-Party Integrations Hub States
  const [activeIntegration, setActiveIntegration] = useState("stripe");
  const [integrationCategory, setIntegrationCategory] = useState("payments");
  const [integrationLogs, setIntegrationLogs] = useState([
    "INTEGRATION TELEMETRY ENGINE ONLINE...",
    "READY TO SIMULATE THIRD-PARTY API HANDSHAKES."
  ]);
  const [integrationProcessing, setIntegrationProcessing] = useState(false);

  // Playground Forms
  const [stripeForm, setStripeForm] = useState({ email: "customer@example.com", amount: 49.00, event: "payment_intent.succeeded" });
  const [paypalForm, setPaypalForm] = useState({ amount: 79.00, clientEmail: "paypal-buyer@example.com" });
  const [razorpayForm, setRazorpayForm] = useState({ amount: 1500, phone: "9876543210" });
  const [cashfreeForm, setCashfreeForm] = useState({ name: "Rohan Sharma", vpa: "rohan@okhdfc" });
  const [whatsappForm, setWhatsappForm] = useState({ phone: "+91 99999 88888", template: "order_confirmation", name: "Jaydeep Khunt" });
  const [twilioForm, setTwilioForm] = useState({ phone: "+1 555 9823", mode: "send" }); // 'send' or 'verify'
  const [twilioInputOtp, setTwilioInputOtp] = useState("");
  const [twilioSentOtp, setTwilioSentOtp] = useState("");
  const [twilioVerified, setTwilioVerified] = useState(null); // null, true, false
  const [appointlyForm, setAppointlyForm] = useState({ date: new Date().toISOString().split('T')[0], slot: "02:30 PM", name: "David Miller", email: "david@example.com" });
  const [googleCalendarForm, setGoogleCalendarForm] = useState({ title: "ERP Architecture Consult", duration: 60 });
  const [slackForm, setSlackForm] = useState({ message: "Production deployment successful. Status: green. Latency: 42ms.", channel: "#ops-alerts" });

  // Interactive Live Previews States
  const [whatsappMessages, setWhatsappMessages] = useState([
    { id: "init_1", text: "Welcome to the WhatsApp API sandbox channel. Output templates will display here.", time: "10:30 AM", sender: "bot" }
  ]);
  const [stripeInvoices, setStripeInvoices] = useState([]);
  const [paypalReceipts, setPaypalReceipts] = useState([]);
  const [razorpayOrders, setRazorpayOrders] = useState([]);
  const [cashfreeOrders, setCashfreeOrders] = useState([]);
  const [appointlyBookings, setAppointlyBookings] = useState([]);
  const [googleEvents, setGoogleEvents] = useState([]);
  const [slackFeeds, setSlackFeeds] = useState([
    { id: "init_slack", channel: "#ops-alerts", message: "System online. Integration webhook monitoring active.", time: "10:30 AM" }
  ]);

  const simulateIntegrationCall = async (e) => {
    if (e) e.preventDefault();
    setIntegrationProcessing(true);

    const log = (msg, delay) => new Promise(resolve => {
      setTimeout(() => {
        setIntegrationLogs(prev => [...prev, msg]);
        resolve();
      }, delay);
    });

    const timestamp = new Date().toLocaleTimeString();
    
    if (activeIntegration === 'stripe') {
      const { email, amount, event } = stripeForm;
      const txId = 'ch_' + Math.random().toString(36).substring(2, 10);
      const custId = 'cus_' + Math.random().toString(36).substring(2, 10);
      
      setIntegrationLogs([
        `[${timestamp}] INITIATING STRIPE WEBHOOK DISPATCH SIMULATION...`,
        `Payload Event Target: ${event}`,
        `HTTP Method: POST | URL: https://api.jaydeep.dev/api/webhooks/stripe`,
        `Header: Stripe-Signature: t=${Math.floor(Date.now()/1000)},v1=sig_mock_sha256_...`,
        `Header: Content-Type: application/json`
      ]);

      await log(`>> SERIALIZING TRANSACTION DETAILS FOR ${email}...`, 300);
      await log(`>> Body: { "id": "${txId}", "object": "event", "type": "${event}", "data": { "object": { "id": "pi_${txId}", "amount": ${amount * 100}, "customer": "${custId}", "receipt_email": "${email}" } } }`, 200);
      await log(`>> DISPATCHING REQUEST TO BACKEND ROUTE...`, 450);
      await log(`>> WAITING FOR SERVER RESPONSE...`, 300);
      
      setTimeout(async () => {
        setIntegrationLogs(prev => [
          ...prev,
          `<< RESPONSE RECEIVED FROM SERVER: 200 OK (Latency: 142ms)`,
          `<< Body: { "success": true, "message": "Event processed", "eventId": "evt_${txId}" }`,
          `==================================================`,
          `SUCCESS: Stripe webhook parsed. Invoice generated and database records synced.`
        ]);
        
        const newInvoice = {
          id: 'INV-' + Math.floor(100000 + Math.random() * 900000),
          email,
          amount,
          status: 'PAID',
          date: new Date().toLocaleTimeString()
        };
        setStripeInvoices(prev => [newInvoice, ...prev]);
        setIntegrationProcessing(false);
      }, 900);
    }
    else if (activeIntegration === 'paypal') {
      const { amount, clientEmail } = paypalForm;
      const orderId = 'PAYID-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      
      setIntegrationLogs([
        `[${timestamp}] INITIATING PAYPAL CHECKOUT CAPTURE API...`,
        `HTTP Method: POST | URL: https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
        `Header: Authorization: Bearer A21A...mock_token_key`,
        `Header: Content-Type: application/json`
      ]);

      await log(`>> SENDING ORDER CAPTURE FOR ORDER_ID: ${orderId}...`, 350);
      await log(`>> PAYPAL DEPLOYMENT PENDING USER AUTHORIZATION...`, 400);
      await log(`>> PROCESSOR RESPONSE RECEIVED: 201 Created`, 300);
      
      setTimeout(async () => {
        setIntegrationLogs(prev => [
          ...prev,
          `<< RESPONSE RECEIVED FROM SERVER: 200 OK (Latency: 284ms)`,
          `<< Body: { "id": "${orderId}", "status": "COMPLETED", "payer": { "email_address": "${clientEmail}" }, "purchase_units": [{ "amount": { "currency_code": "USD", "value": "${amount}" } }] }`,
          `==================================================`,
          `SUCCESS: PayPal order captured and ledger transaction updated.`
        ]);
        
        const newReceipt = {
          orderId,
          email: clientEmail,
          amount,
          status: 'COMPLETED',
          time: new Date().toLocaleTimeString()
        };
        setPaypalReceipts(prev => [newReceipt, ...prev]);
        setIntegrationProcessing(false);
      }, 900);
    }
    else if (activeIntegration === 'razorpay') {
      const { amount, phone } = razorpayForm;
      const orderId = 'order_' + Math.random().toString(36).substring(2, 8).toUpperCase();
      
      setIntegrationLogs([
        `[${timestamp}] INITIATING RAZORPAY CUSTOM CHECKOUT LINK GENERATION...`,
        `HTTP Method: POST | URL: https://api.razorpay.com/v1/payment_links`,
        `Header: Authorization: Basic rzp_key_id_...`,
        `Header: Content-Type: application/json`
      ]);

      await log(`>> Parameters: { "amount": ${amount * 100}, "currency": "INR", "accept_partial": false, "customer": { "contact": "${phone}" } }`, 300);
      await log(`>> INITIATING SIGNATURE VERIFICATION HANDSHAKE...`, 400);
      
      setTimeout(async () => {
        setIntegrationLogs(prev => [
          ...prev,
          `<< RESPONSE RECEIVED FROM SERVER: 200 OK (Latency: 115ms)`,
          `<< Body: { "id": "plink_${orderId}", "short_url": "https://rzp.io/i/${orderId}", "status": "issued" }`,
          `==================================================`,
          `SUCCESS: Razorpay order link generated and webhook setup initialized.`
        ]);
        
        const newOrder = {
          orderId,
          phone,
          amount,
          url: `https://rzp.io/i/${orderId}`,
          time: new Date().toLocaleTimeString()
        };
        setRazorpayOrders(prev => [newOrder, ...prev]);
        setIntegrationProcessing(false);
      }, 800);
    }
    else if (activeIntegration === 'cashfree') {
      const { name, vpa } = cashfreeForm;
      const orderId = 'CF-' + Date.now().toString().slice(-6);
      
      setIntegrationLogs([
        `[${timestamp}] INITIATING CASHFREE UPI QR INTENT DISPATCH...`,
        `HTTP Method: POST | URL: https://sandbox.cashfree.com/pg/orders`,
        `Header: x-api-version: 2023-08-01`,
        `Header: x-client-id: cf_sandbox_id_...`
      ]);

      await log(`>> Parameters: { "order_id": "${orderId}", "order_amount": 299.00, "customer_details": { "customer_name": "${name}" } }`, 300);
      await log(`>> GENERATING TRANSACTION UPI LINK INTENT FOR VPA [${vpa}]...`, 400);
      
      setTimeout(async () => {
        setIntegrationLogs(prev => [
          ...prev,
          `<< RESPONSE RECEIVED FROM SERVER: 200 OK (Latency: 180ms)`,
          `<< Body: { "order_status": "ACTIVE", "cf_order_id": "${orderId}", "payment_session_id": "session_${orderId}" }`,
          `==================================================`,
          `SUCCESS: Cashfree UPI transaction order initialized for client verification.`
        ]);
        
        const newOrder = {
          orderId,
          name,
          vpa,
          amount: 299.00,
          status: 'ACTIVE',
          time: new Date().toLocaleTimeString()
        };
        setCashfreeOrders(prev => [newOrder, ...prev]);
        setIntegrationProcessing(false);
      }, 900);
    }
    else if (activeIntegration === 'whatsapp') {
      const { phone, template, name } = whatsappForm;
      const messageId = 'wamid.HBgMOTE5' + Math.random().toString(36).substring(2, 12).toUpperCase();
      
      setIntegrationLogs([
        `[${timestamp}] INITIALIZING WHATSAPP BUSINESS CLOUD API DISPATCH...`,
        `HTTP Method: POST | URL: https://graph.facebook.com/v17.0/10928374928374/messages`,
        `Header: Authorization: Bearer EAAG...mock_bearer_token`,
        `Header: Content-Type: application/json`
      ]);

      await log(`>> Compiling Message Template: [${template}]`, 250);
      await log(`>> Mapping Variables: { "1": "${name}", "2": "https://jaydeep.dev" }`, 200);
      await log(`>> Targeting recipient endpoint: ${phone}`, 300);
      await log(`>> Transmitting raw block payloads to Meta API server...`, 300);
      
      setTimeout(async () => {
        setIntegrationLogs(prev => [
          ...prev,
          `<< RESPONSE RECEIVED: 200 OK (Latency: 215ms)`,
          `<< Body: { "messaging_product": "whatsapp", "contacts": [{ "input": "${phone}", "wa_id": "${phone.replace(/\D/g, '')}" }], "messages": [{ "id": "${messageId}" }] }`,
          `==================================================`,
          `SUCCESS: WhatsApp template message dispatched and queued on Meta Business Servers.`
        ]);
        
        const messageText = template === 'order_confirmation' 
          ? `Hi ${name}! Your order has been confirmed. Track status: https://jaydeep.dev` 
          : `Hello ${name}. Your verification code is ${Math.floor(100000 + Math.random() * 900000)}. Valid for 10 minutes.`;
          
        const newChat = {
          id: messageId,
          text: messageText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: 'bot'
        };
        
        setWhatsappMessages(prev => [...prev, newChat]);
        setIntegrationProcessing(false);
      }, 900);
    }
    else if (activeIntegration === 'twilio') {
      const { phone, mode } = twilioForm;
      
      if (mode === 'send') {
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        setTwilioSentOtp(otpCode);
        setTwilioVerified(null);
        setTwilioInputOtp("");

        setIntegrationLogs([
          `[${timestamp}] INITIATING TWILIO TRANSACTION SMS & OTP PROTOCOL...`,
          `HTTP Method: POST | URL: https://api.twilio.com/2010-04-01/Accounts/ACmock.../Messages.json`,
          `Header: Authorization: Basic ACmock_sid_...`
        ]);

        await log(`>> Parameters: { "To": "${phone}", "From": "+15017122661", "Body": "Your verification code is: ${otpCode}" }`, 300);
        await log(`>> Queueing SMS on Twilio Telephony Network...`, 400);

        setTimeout(async () => {
          setIntegrationLogs(prev => [
            ...prev,
            `<< RESPONSE RECEIVED: 201 Created (Latency: 156ms)`,
            `<< Body: { "sid": "SM${Math.random().toString(36).substring(2, 10)}", "status": "queued", "to": "${phone}" }`,
            `==================================================`,
            `SUCCESS: OTP sent via Twilio SMS. Input the code to verify.`
          ]);
          setTwilioForm(prev => ({ ...prev, mode: 'verify' }));
          setIntegrationProcessing(false);
        }, 900);
      } else {
        setIntegrationLogs([
          `[${timestamp}] INITIATING TWILIO OTP VERIFICATION CHECK...`,
          `HTTP Method: POST | URL: https://api.jaydeep.dev/api/communications/twilio/verify-otp`,
          `Checking user input [${twilioInputOtp}] against active code...`
        ]);

        await log(`>> Running validation logic...`, 300);

        setTimeout(async () => {
          if (twilioInputOtp === twilioSentOtp) {
            setIntegrationLogs(prev => [
              ...prev,
              `<< VERIFICATION MATCH DETECTED (HTTP 200 OK)`,
              `==================================================`,
              `SUCCESS: Twilio OTP code matches! Phone number verified successfully.`
            ]);
            setTwilioVerified(true);
          } else {
            setIntegrationLogs(prev => [
              ...prev,
              `<< VERIFICATION ERROR: Code mismatch (HTTP 400 Bad Request)`,
              `==================================================`,
              `FAILED: OTP verification failed. Correct code was ${twilioSentOtp}.`
            ]);
            setTwilioVerified(false);
          }
          setIntegrationProcessing(false);
        }, 800);
      }
    }
    else if (activeIntegration === 'appointly') {
      const { name, email, date, slot } = appointlyForm;
      const bookingId = 'apt_' + Math.random().toString(36).substring(2, 8);
      
      setIntegrationLogs([
        `[${timestamp}] CONNECTING APPOINTLY MEETING API...`,
        `HTTP Method: POST | URL: https://api.appointly.io/v1/appointments`,
        `Header: Authorization: Bearer apt_token_...`,
        `Header: Content-Type: application/json`
      ]);

      await log(`>> Parameters: { "name": "${name}", "email": "${email}", "date": "${date}", "slot": "${slot}" }`, 300);
      await log(`>> CHECKING APPOINTLY SCHEDULER CONFLICT ENGINE...`, 400);
      await log(`>> GENERATING VIRTUAL MEETING LINKS...`, 300);

      setTimeout(async () => {
        setIntegrationLogs(prev => [
          ...prev,
          `<< RESPONSE RECEIVED: 201 Created (Latency: 312ms)`,
          `<< Body: { "id": "${bookingId}", "status": "confirmed", "meeting_link": "https://meet.google.com/xyz-mock", "booking_time": "${date} ${slot}" }`,
          `==================================================`,
          `SUCCESS: Appointly booking created. Synchronizing invite to client & developer calendar.`
        ]);
        
        const newBooking = {
          id: bookingId,
          name,
          email,
          date,
          slot,
          meetUrl: 'https://meet.google.com/xyz-mock',
          time: new Date().toLocaleTimeString()
        };
        setAppointlyBookings(prev => [newBooking, ...prev]);
        setIntegrationProcessing(false);
      }, 900);
    }
    else if (activeIntegration === 'google_calendar') {
      const { title, duration } = googleCalendarForm;
      const eventId = 'ge_' + Math.random().toString(36).substring(2, 12);
      
      setIntegrationLogs([
        `[${timestamp}] SYNCHRONIZING EVENT WITH GOOGLE CALENDAR REST API...`,
        `HTTP Method: POST | URL: https://www.googleapis.com/calendar/v3/calendars/primary/events`,
        `Header: Authorization: Bearer OAuth2.0_token_...`,
        `Header: Content-Type: application/json`
      ]);

      await log(`>> Refreshing expired OAuth Access Token using Refresh Token...`, 300);
      await log(`>> Active OAuth Token established. Sending event payload...`, 200);
      await log(`>> Payload: { "summary": "${title}", "start": { "dateTime": "${timestamp}" }, "end": { "dateTime": "${new Date(Date.now() + duration * 60000).toISOString()}" } }`, 200);

      setTimeout(async () => {
        setIntegrationLogs(prev => [
          ...prev,
          `<< RESPONSE RECEIVED: 200 OK (Latency: 240ms)`,
          `<< Body: { "kind": "calendar#event", "id": "${eventId}", "htmlLink": "https://calendar.google.com/...", "status": "confirmed" }`,
          `==================================================`,
          `SUCCESS: Two-way calendar sync cycle complete. Event scheduled.`
        ]);
        
        const newEvent = {
          id: eventId,
          title,
          duration,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setGoogleEvents(prev => [newEvent, ...prev]);
        setIntegrationProcessing(false);
      }, 900);
    }
    else if (activeIntegration === 'slack') {
      const { message, channel } = slackForm;
      
      setIntegrationLogs([
        `[${timestamp}] DEPLOYING WEBHOOK ALERT PACKET TO SLACK CHANNELS...`,
        `HTTP Method: POST | URL: https://hooks.slack.com/services/DUMMY_WORKSPACE/DUMMY_CHANNEL/DUMMY_TOKEN`,
        `Header: Content-Type: application/json`
      ]);

      await log(`>> Compiling JSON message payload...`, 300);
      await log(`>> Body: { "channel": "${channel}", "username": "Jaydeep Integration Bot", "text": "${message}" }`, 200);

      setTimeout(async () => {
        setIntegrationLogs(prev => [
          ...prev,
          `<< RESPONSE RECEIVED: 200 OK`,
          `<< Raw Response Body: "ok"`,
          `==================================================`,
          `SUCCESS: Alert successfully routed to Slack Workspace channel [${channel}].`
        ]);
        
        const newMsg = {
          id: 'slack_' + Date.now(),
          channel,
          message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setSlackFeeds(prev => [newMsg, ...prev]);
        setIntegrationProcessing(false);
      }, 800);
    }
  };

  const handleCategoryChange = (catId) => {
    setIntegrationCategory(catId);
    const mockInts = [
      { id: "stripe", category: "payments" },
      { id: "paypal", category: "payments" },
      { id: "razorpay", category: "payments" },
      { id: "cashfree", category: "payments" },
      { id: "whatsapp", category: "communications" },
      { id: "twilio", category: "communications" },
      { id: "appointly", category: "productivity" },
      { id: "google_calendar", category: "productivity" },
      { id: "slack", category: "telemetry" }
    ];
    const firstInCat = mockInts.find(i => i.category === catId);
    if (firstInCat) {
      setActiveIntegration(firstInCat.id);
    }
  };
  
  const [uptime, setUptime] = useState("99.983%");
  const [coffeeCounter, setCoffeeCounter] = useState(14203);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  
  const terminalScreenRef = useRef(null);
  const paymentLogsScreenRef = useRef(null);

  // Monitor scroll for header background, progress bar, and active nav section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      const sections = ["about", "skills", "projects", "experience", "payments", "faq", "contact"];
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

  // Hash-based subpage routing listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#admin") {
        setCurrentView("admin");
        window.scrollTo(0, 0);
      } else if (hash.startsWith("#project-")) {
        const id = hash.replace("#project-", "");
        setDetailProjectId(id);
        setCurrentView("project-detail");
        window.scrollTo(0, 0);
      } else {
        setCurrentView("portfolio");
        if (hash) {
          const id = hash.substring(1);
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };
    
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Load-time scroll jump corrector
  useEffect(() => {
    if (window.location.hash && window.location.hash !== "#admin" && !window.location.hash.startsWith("#project-")) {
      const targetHash = window.location.hash;
      history.replaceState(null, null, ' ');
      
      const timer = setTimeout(() => {
        history.replaceState(null, null, targetHash);
        const id = targetHash.substring(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  // Terminal scroll to bottom
  useEffect(() => {
    if (terminalScreenRef.current) {
      terminalScreenRef.current.scrollTop = terminalScreenRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Payment logs scroll to bottom
  useEffect(() => {
    if (paymentLogsScreenRef.current) {
      paymentLogsScreenRef.current.scrollTop = paymentLogsScreenRef.current.scrollHeight;
    }
  }, [integrationLogs]);

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
      const proj = allProjects.find(p => p.id === pId);
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

  // Encrypted transmission + Local CRM submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactState.name || !contactState.email || !contactState.message) return;
    
    setIsSending(true);
    setSendSuccess(false);
    setSendingLogs([]);

    const addLog = async (logText, delay = 450) => {
      setSendingLogs(prev => [...prev, logText]);
      await new Promise(resolve => setTimeout(resolve, delay));
    };

    try {
      await addLog("INITIALIZING SECURE PROTOCOL HANDSHAKE...");
      await addLog("ESTABLISHING SSH CHANNEL WITH BACKEND SERVER...");
      await addLog("ENCRYPTING PAYLOAD WITH AES-256 GCM...");
      await addLog("TRANSMITTING ENCRYPTED PACKET BLOCKS TO API...");

      const response = await fetch('/api/contact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: contactState.name,
          email: contactState.email,
          message: contactState.message
        })
      });

      if (!response.ok) {
        throw new Error("API responded with an error status: " + response.status);
      }

      await addLog("SECURE SMTP LINK ROUTED SUCCESSFULLY...");
      await addLog("DISPATCHING OWNER NOTIFICATION & USER THANK-YOU EMAIL...");
      await addLog("VERIFYING INTEGRITY CHECK (HMAC-SHA256)...");
      await addLog("TRANSMISSION COMPLETED SUCCESSFULLY.");
      
      // Save Inquiry to local state and storage (for local CRM dashboard)
      const newInquiry = {
        id: Date.now(),
        name: contactState.name,
        email: contactState.email,
        message: contactState.message,
        date: new Date().toLocaleString()
      };
      const updatedInquiries = [...allInquiries, newInquiry];
      setAllInquiries(updatedInquiries);
      localStorage.setItem('portfolio_inquiries', JSON.stringify(updatedInquiries));
      
      setIsSending(false);
      setSendSuccess(true);
      setContactState({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      await addLog("WARNING: API transmission failed. Server might be offline.");
      await addLog("FALLING BACK TO LOCAL STORAGE PERSISTENCE...");
      
      // Fallback: Save to Local Storage CRM
      const newInquiry = {
        id: Date.now(),
        name: contactState.name,
        email: contactState.email,
        message: contactState.message,
        date: new Date().toLocaleString()
      };
      const updatedInquiries = [...allInquiries, newInquiry];
      setAllInquiries(updatedInquiries);
      localStorage.setItem('portfolio_inquiries', JSON.stringify(updatedInquiries));
      
      setIsSending(false);
      setSendSuccess(true);
      setContactState({ name: "", email: "", message: "" });
    }

    setTimeout(() => {
      setSendSuccess(false);
      setSendingLogs([]);
    }, 8000);
  };

  // ADMIN SUBMIT HANDLERS
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === "admin") {
      setAdminLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Access key denied. Secure handshake failed.");
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProj.id || !newProj.title) return;
    
    const formattedProj = {
      ...newProj,
      tech: newProj.tech.split(",").map(t => t.trim()),
      architecture: {
        client: newProj.client || "Web Client",
        api: newProj.api || "REST Gateway",
        jobs: newProj.jobs || "Sync Workers",
        db: newProj.db || "Database"
      }
    };
    const updated = [formattedProj, ...allProjects];
    setAllProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    setNewProj({
      id: "", title: "", subtitle: "", tech: "", desc: "", metric: "", role: "", github: "", live: "", snippet: "", client: "", api: "", jobs: "", db: ""
    });
  };

  const handleAddTimeline = (e) => {
    e.preventDefault();
    if (!newTime.year || !newTime.role) return;

    const formattedTime = {
      ...newTime,
      icon: newTime.iconType === "Laptop" ? Laptop : GraduationCap
    };
    const updated = [formattedTime, ...allTimeline];
    setAllTimeline(updated);
    localStorage.setItem('portfolio_timeline', JSON.stringify(updated));
    setNewTime({ year: "", role: "", company: "", iconType: "Laptop", desc: "" });
  };

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.text) return;

    const updated = [newTestimonial, ...allTestimonials];
    setAllTestimonials(updated);
    localStorage.setItem('portfolio_testimonials', JSON.stringify(updated));
    setNewTestimonial({ name: "", org: "", text: "", stars: 5 });
  };

  const handleDeleteProject = (id) => {
    const updated = allProjects.filter(p => p.id !== id);
    setAllProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    if (selectedProject.id === id) {
      setSelectedProject(updated[0] || null);
    }
  };

  const handleDeleteTimeline = (idx) => {
    const updated = allTimeline.filter((_, i) => i !== idx);
    setAllTimeline(updated);
    localStorage.setItem('portfolio_timeline', JSON.stringify(updated));
  };

  const handleDeleteTestimonial = (idx) => {
    const updated = allTestimonials.filter((_, i) => i !== idx);
    setAllTestimonials(updated);
    localStorage.setItem('portfolio_testimonials', JSON.stringify(updated));
  };

  const handleClearInquiries = () => {
    setAllInquiries([]);
    localStorage.setItem('portfolio_inquiries', JSON.stringify([]));
  };

  const getTimelineIcon = (item) => {
    if (item.iconType === "GraduationCap" || item.role?.toLowerCase().includes("bca") || item.role?.toLowerCase().includes("student")) {
      return GraduationCap;
    }
    return Laptop;
  };

  const titleWords = "Designing Resilient Systems".split(" ");
  const subtitleWords = "With Performance Architecture".split(" ");

  // RENDER DEDICATED FULL-SCREEN PROJECT DETAIL VIEW
  if (currentView === "project-detail") {
    const proj = allProjects.find(p => p.id === detailProjectId) || selectedProject;
    
    return (
      <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans text-slate-700 pb-16 aurora-bg">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 relative z-10 space-y-8">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <a href="#" className="inline-flex items-center gap-2 text-sm font-mono font-bold text-emerald-600 hover:text-emerald-700">
              <ArrowLeft size={16} /> Back to Portfolio
            </a>
            <div className="flex items-center gap-2">
              <a href={proj.github} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all">
                <Github size={14} /> Repository
              </a>
              {proj.live && (
                <a href={proj.live} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-md">
                  <ExternalLink size={14} /> Launch Live Demo
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 px-3 py-1 rounded-full font-bold">
                  PROJECT REPORT
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 mt-4 tracking-tight">
                  {proj.title}
                </h1>
                <p className="text-sm font-mono text-slate-500 mt-2">{proj.subtitle}</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white space-y-4">
                <h3 className="text-base font-bold font-display text-slate-900 uppercase tracking-wide">Core Architecture Overview</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">{proj.desc}</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white space-y-4">
                <h3 className="text-base font-bold font-display text-slate-900 uppercase tracking-wide">Role & Systems Integration</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  <strong>Responsibility:</strong> {proj.role}<br />
                  <strong>Telemetry Metric:</strong> {proj.metric}
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white space-y-4">
                <h3 className="text-base font-bold font-display text-slate-900 uppercase tracking-wide">Technology Stack Matrix</h3>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t, idx) => (
                    <span key={idx} className="text-xs font-mono bg-slate-100 text-emerald-800 px-3 py-1 rounded-full border border-slate-200/60 font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="h-[240px] border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-950 relative">
                <ProjectMockup projectId={proj.id} />
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 font-mono text-xs">
                <h4 className="text-[10px] text-slate-400 uppercase tracking-widest mb-3 font-bold">Architecture Schema</h4>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Client:</span>
                    <span className="text-slate-800 font-semibold">{proj.architecture.client}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Routing API:</span>
                    <span className="text-slate-800 font-semibold">{proj.architecture.api}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Worker Jobs:</span>
                    <span className="text-slate-800 font-semibold">{proj.architecture.jobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Data Store:</span>
                    <span className="text-slate-800 font-semibold">{proj.architecture.db}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Source Implementation Snippet</h4>
                  <button 
                    onClick={() => handleCopyCode(proj.snippet)}
                    className="text-[10px] font-mono text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer p-1 font-bold"
                  >
                    {copiedCode ? <CheckCircle size={10} /> : <Code size={10} />}
                    {copiedCode ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200 max-h-[200px] overflow-y-auto">
                  <pre className="p-4 font-mono text-[11px] text-emerald-400 leading-relaxed overflow-x-auto whitespace-pre">
                    <code>{proj.snippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER PORTFOLIO ADMIN COMMAND DASHBOARD
  if (currentView === "admin") {
    return (
      <div className="min-h-screen bg-[#070b14] relative overflow-hidden font-sans text-slate-300 pb-16">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 pointer-events-none z-0" />
        
        {!adminLoggedIn ? (
          <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
            <InteractiveCard className="w-full max-w-md">
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/20 bg-[#0c1224] space-y-6 shadow-2xl text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <Lock size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-display text-white">Secure Admin Terminal</h2>
                  <p className="text-xs text-slate-500 mt-1 font-mono">Verify key authorization to bypass shield</p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input 
                    type="password"
                    required
                    placeholder="Enter access key..."
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[#070b14] border border-slate-800 text-white focus:outline-none focus:border-emerald-500 transition-all font-mono text-sm text-center"
                  />
                  {loginError && <p className="text-xs text-red-400 font-mono flex items-center gap-1.5 justify-center"><AlertCircle size={12} /> {loginError}</p>}
                  <button type="submit" className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all">
                    <Key size={16} /> Authenticate Session
                  </button>
                </form>
                
                <p className="text-[10px] text-slate-600 font-mono mt-4">💡 Demo default access password: <span className="text-emerald-500">admin</span></p>
                <a href="#" className="inline-block text-xs font-mono text-slate-500 hover:text-slate-300 mt-2">← Back to Portfolio</a>
              </div>
            </InteractiveCard>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 relative z-10 space-y-8">
            <div className="flex justify-between items-center border-b border-slate-800 pb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Settings size={22} className="animate-spin" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white font-display">Command Center</h1>
                  <p className="text-xs text-slate-500 font-mono">Local CRM & data persistence gateway</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a href="#" className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors">
                  <ArrowLeft size={14} /> Back to Site
                </a>
                <button onClick={() => { setAdminLoggedIn(false); setAdminPassword(""); }} className="px-3 py-2 rounded-lg bg-red-900/40 border border-red-500/30 hover:bg-red-800/40 text-red-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                  <LogOut size={14} /> Terminate
                </button>
              </div>
            </div>

            {/* Admin Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-3 flex flex-col gap-2 font-mono text-xs">
                {[
                  { id: "projects", label: "Manage Projects", icon: FolderPlus },
                  { id: "timeline", label: "Manage Timeline", icon: Calendar },
                  { id: "testimonials", label: "Client Reviews", icon: Award },
                  { id: "inquiries", label: "Inquiries Inbox", count: allInquiries.length, icon: MessageSquare }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id)}
                      className={`w-full text-left p-3.5 rounded-lg flex justify-between items-center transition-all cursor-pointer border ${
                        adminTab === tab.id
                          ? "bg-emerald-600 border-emerald-500 text-white shadow-md"
                          : "bg-[#0c1224] border-slate-800 text-slate-400 hover:bg-slate-800/60"
                      }`}
                    >
                      <span className="flex items-center gap-2"><Icon size={14} /> {tab.label}</span>
                      {tab.count !== undefined && <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-1.5 py-0.5 rounded text-[10px] font-bold">{tab.count}</span>}
                    </button>
                  );
                })}
              </div>

              <div className="md:col-span-9 glass-panel p-6 rounded-2xl border border-slate-800 bg-[#0c1224] space-y-6">
                
                {/* PROJECTS MANAGEMENT */}
                {adminTab === "projects" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold font-display text-white">Add New Engineering Project</h3>
                    <form onSubmit={handleAddProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <input type="text" required placeholder="Project unique ID (e.g. omnipos)..." value={newProj.id} onChange={(e) => setNewProj({...newProj, id: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      <input type="text" required placeholder="Project title..." value={newProj.title} onChange={(e) => setNewProj({...newProj, title: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      <input type="text" required placeholder="Subtitle / Short description..." value={newProj.subtitle} onChange={(e) => setNewProj({...newProj, subtitle: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none col-span-1 sm:col-span-2" />
                      <input type="text" required placeholder="Tech Stack (comma separated)..." value={newProj.tech} onChange={(e) => setNewProj({...newProj, tech: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none col-span-1 sm:col-span-2" />
                      <textarea required placeholder="Full project description..." value={newProj.desc} onChange={(e) => setNewProj({...newProj, desc: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none col-span-1 sm:col-span-2 h-20 resize-none" />
                      <input type="text" required placeholder="Telemetry Metric (e.g. Uptime)..." value={newProj.metric} onChange={(e) => setNewProj({...newProj, metric: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      <input type="text" required placeholder="Developer Role..." value={newProj.role} onChange={(e) => setNewProj({...newProj, role: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      <input type="text" required placeholder="Github URL..." value={newProj.github} onChange={(e) => setNewProj({...newProj, github: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      <input type="text" placeholder="Live Demo Link (optional)..." value={newProj.live} onChange={(e) => setNewProj({...newProj, live: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      <textarea required placeholder="Source implementation snippet..." value={newProj.snippet} onChange={(e) => setNewProj({...newProj, snippet: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none col-span-1 sm:col-span-2 h-24 resize-none" />
                      
                      <div className="col-span-1 sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <input type="text" placeholder="Client Layer..." value={newProj.client} onChange={(e) => setNewProj({...newProj, client: e.target.value})} className="p-2.5 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                        <input type="text" placeholder="API Routing..." value={newProj.api} onChange={(e) => setNewProj({...newProj, api: e.target.value})} className="p-2.5 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                        <input type="text" placeholder="Worker jobs..." value={newProj.jobs} onChange={(e) => setNewProj({...newProj, jobs: e.target.value})} className="p-2.5 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                        <input type="text" placeholder="Data Store..." value={newProj.db} onChange={(e) => setNewProj({...newProj, db: e.target.value})} className="p-2.5 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      </div>
                      
                      <button type="submit" className="col-span-1 sm:col-span-2 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer text-center flex items-center justify-center gap-2">
                        <Plus size={16} /> Deploy Project to LocalState
                      </button>
                    </form>

                    <div className="border-t border-slate-800 pt-6">
                      <h4 className="text-sm font-semibold text-slate-400 mb-3">Stored Projects Registry</h4>
                      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
                        {allProjects.map(p => (
                          <div key={p.id} className="flex justify-between items-center bg-[#070b14] p-3 rounded border border-slate-800 text-xs font-mono">
                            <div>
                              <span className="font-bold text-white">{p.title}</span>
                              <span className="text-[10px] text-slate-500 block">ID: {p.id}</span>
                            </div>
                            <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded cursor-pointer">
                              <Trash size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TIMELINE MANAGEMENT */}
                {adminTab === "timeline" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold font-display text-white">Add Roadmap Checkpoint</h3>
                    <form onSubmit={handleAddTimeline} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <input type="text" required placeholder="Timeline Year (e.g. 2023 - Present)..." value={newTime.year} onChange={(e) => setNewTime({...newTime, year: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      <input type="text" required placeholder="Role Title..." value={newTime.role} onChange={(e) => setNewTime({...newTime, role: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      <input type="text" required placeholder="Company / Institution Name..." value={newTime.company} onChange={(e) => setNewTime({...newTime, company: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      <select value={newTime.iconType} onChange={(e) => setNewTime({...newTime, iconType: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none">
                        <option value="Laptop">Professional (Laptop)</option>
                        <option value="GraduationCap">Academic (Graduation Cap)</option>
                      </select>
                      <textarea required placeholder="Timeline description details..." value={newTime.desc} onChange={(e) => setNewTime({...newTime, desc: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none col-span-1 sm:col-span-2 h-20 resize-none" />
                      
                      <button type="submit" className="col-span-1 sm:col-span-2 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer text-center flex items-center justify-center gap-2">
                        <Plus size={16} /> Deploy Timeline Event
                      </button>
                    </form>

                    <div className="border-t border-slate-800 pt-6">
                      <h4 className="text-sm font-semibold text-slate-400 mb-3">Timeline Registry</h4>
                      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
                        {allTimeline.map((t, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-[#070b14] p-3 rounded border border-slate-800 text-xs font-mono">
                            <div>
                              <span className="font-bold text-white">{t.role}</span>
                              <span className="text-[10px] text-slate-500 block">{t.year} | {t.company}</span>
                            </div>
                            <button onClick={() => handleDeleteTimeline(idx)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded cursor-pointer">
                              <Trash size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TESTIMONIALS MANAGEMENT */}
                {adminTab === "testimonials" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold font-display text-white">Add Client Review</h3>
                    <form onSubmit={handleAddTestimonial} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <input type="text" required placeholder="Client / Recommender Name..." value={newTestimonial.name} onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      <input type="text" required placeholder="Organization / Venture..." value={newTestimonial.org} onChange={(e) => setNewTestimonial({...newTestimonial, org: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none" />
                      <select value={newTestimonial.stars} onChange={(e) => setNewTestimonial({...newTestimonial, stars: parseInt(e.target.value)})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none">
                        <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                        <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                        <option value="3">⭐⭐⭐ (3 Stars)</option>
                      </select>
                      <textarea required placeholder="Recommendation text..." value={newTestimonial.text} onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})} className="p-3 rounded bg-[#070b14] border border-slate-800 text-white focus:border-emerald-500 outline-none col-span-1 sm:col-span-2 h-20 resize-none" />
                      
                      <button type="submit" className="col-span-1 sm:col-span-2 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer text-center flex items-center justify-center gap-2">
                        <Plus size={16} /> Deploy Testimonial
                      </button>
                    </form>

                    <div className="border-t border-slate-800 pt-6">
                      <h4 className="text-sm font-semibold text-slate-400 mb-3">Reviews Registry</h4>
                      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
                        {allTestimonials.map((t, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-[#070b14] p-3 rounded border border-slate-800 text-xs font-mono">
                            <div>
                              <span className="font-bold text-white">{t.name}</span>
                              <span className="text-[10px] text-slate-500 block">{t.org} | {t.stars} stars</span>
                            </div>
                            <button onClick={() => handleDeleteTestimonial(idx)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded cursor-pointer">
                              <Trash size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* INQUIRIES INBOX */}
                {adminTab === "inquiries" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold font-display text-white">Client Inquiry Messages</h3>
                      {allInquiries.length > 0 && (
                        <button onClick={handleClearInquiries} className="px-3 py-1.5 rounded bg-red-950/30 border border-red-500/20 hover:bg-red-900/30 text-red-400 text-xs font-mono cursor-pointer flex items-center gap-1.5">
                          <Trash size={12} /> Clear Inbox
                        </button>
                      )}
                    </div>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {allInquiries.length === 0 ? (
                        <div className="text-center py-12 text-slate-600 font-mono text-xs">
                          <MessageSquare size={32} className="mx-auto mb-3 text-slate-700" />
                          NO MESSAGES RECEIVED YET.<br />
                          Inbound communications will index here.
                        </div>
                      ) : (
                        allInquiries.map((inq) => (
                          <div key={inq.id} className="bg-[#070b14] p-5 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                            <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-900 pb-2">
                              <div>
                                <span className="text-slate-400">From:</span> <span className="text-white font-bold">{inq.name}</span>
                                <span className="text-slate-500 ml-2">({inq.email})</span>
                              </div>
                              <span className="text-[10px] text-slate-500">{inq.date}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed bg-[#0a0f1d] p-3 rounded border border-slate-900/60 whitespace-pre-wrap select-text font-sans text-sm">
                              {inq.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // STANDARD PORTFOLIO MAIN LAYOUT VIEW
  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans select-none text-slate-700 pb-12 aurora-bg animate-fade-in">
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
      
      {/* Navigation Header - Always Glassmorphic for scroll fix */}
      <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 shadow-sm border-b border-slate-200/80 backdrop-blur-md py-3" 
          : "bg-white/75 shadow-xs border-b border-slate-100/50 backdrop-blur-md py-4"
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
            { id: "payments", label: "payments" },
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
          className="md:hidden text-slate-600 hover:text-slate-900 transition-colors p-1 font-semibold"
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
            <a href="#payments" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 hover:text-emerald-600 py-2 border-b border-slate-100 uppercase tracking-wider">payments</a>
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

            {/* ── LinkedIn Profile Card ── */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              {/* Avatar with animated ring */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-400 to-emerald-600 animate-spin" style={{ padding: '3px', borderRadius: '9999px', animationDuration: '4s' }}>
                  <div className="w-full h-full rounded-full bg-white" />
                </div>
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white shadow-lg shadow-emerald-500/20">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQF1ysuE4Eg9Tg/profile-displayphoto-scale_200_200/B56ZxLBzWTIEAY-/0/1770785292078?e=2147483647&v=beta&t=82Y9WDiRPPFsJ7aXEFgZx6l_GkI4tgMrWTJmTTMufS4"
                    alt="Jaydeep Khunt – LinkedIn Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=Jaydeep+Khunt&background=10b981&color=fff&size=128&bold=true`;
                    }}
                  />
                </div>
                {/* Online dot */}
                <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>

              {/* Name + badge */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg font-extrabold font-display text-slate-900 leading-tight">Jaydeep Khunt</h1>
                  <a
                    href="https://linkedin.com/in/jaydeeppatel28"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/25 text-[#0A66C2] text-[10px] font-bold font-mono hover:bg-[#0A66C2]/20 transition-colors"
                  >
                    <LinkedIn size={10} /> LinkedIn
                  </a>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Full Stack Developer · Systems Architect</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                    <Sparkles size={9} className="animate-spin" /> SYSTEM_INIT: ONLINE
                  </span>
                </div>
              </div>
            </motion.div>
            
            {/* Flex Wrap Responsive Character Reveal */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display leading-tight text-slate-900 tracking-tight flex flex-wrap gap-x-2 gap-y-1 sm:gap-x-3">
              {titleWords.map((word, wordIdx) => {
                const globalWordOffset = titleWords.slice(0, wordIdx).join("").length;
                return (
                  <span key={`title-w-${wordIdx}`} className="inline-block whitespace-nowrap">
                    {Array.from(word).map((char, charIdx) => {
                      const globalIdx = globalWordOffset + charIdx;
                      return (
                        <motion.span 
                          key={`title-c-${charIdx}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.15, delay: globalIdx * 0.03, ease: "easeOut" }}
                          className="inline-block text-slate-900"
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                    {wordIdx < titleWords.length - 1 && <span className="inline-block">&nbsp;</span>}
                  </span>
                );
              })}
              <span className="w-full"></span>
              {subtitleWords.map((word, wordIdx) => {
                const titleTotalChars = titleWords.join("").length;
                const globalWordOffset = subtitleWords.slice(0, wordIdx).join("").length;
                return (
                  <span key={`sub-w-${wordIdx}`} className="inline-block whitespace-nowrap">
                    {Array.from(word).map((char, charIdx) => {
                      const globalIdx = titleTotalChars + globalWordOffset + charIdx;
                      return (
                        <motion.span 
                          key={`sub-c-${charIdx}`}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.15, delay: globalIdx * 0.03, ease: "easeOut" }}
                          className="inline-block bg-gradient-to-r from-emerald-600 via-cyan-600 to-amber-600 bg-clip-text text-transparent text-glow-emerald"
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                    {wordIdx < subtitleWords.length - 1 && <span className="inline-block">&nbsp;</span>}
                  </span>
                );
              })}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
              {(() => {
                const paragraphText = "Hello, I am Jaydeep Khunt, a Full Stack Developer & Systems Architect. Graduating with a BCA degree from Som-Lalit Institute (Ahmedabad), I started my working career in 2023. I architect enterprise ERP management portals, multi-tenant SaaS structures, and automated AI orchestration modules while actively taking on freelance projects.";
                const paragraphWords = paragraphText.split(" ");
                const titleTotalChars = titleWords.join("").length + subtitleWords.join("").length;
                
                return paragraphWords.map((word, wordIdx) => {
                  const globalWordOffset = paragraphWords.slice(0, wordIdx).join("").length;
                  return (
                    <span key={`p-w-${wordIdx}`} className="inline-block whitespace-nowrap">
                      {Array.from(word).map((char, charIdx) => {
                        const globalIdx = titleTotalChars + globalWordOffset + charIdx;
                        return (
                          <motion.span
                            key={`p-c-${charIdx}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.1, delay: globalIdx * 0.005, ease: "easeIn" }}
                            className="inline"
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                      {wordIdx < paragraphWords.length - 1 && <span className="inline">&nbsp;</span>}
                    </span>
                  );
                });
              })()}
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
            <div className="flex flex-wrap gap-3 pt-2">
              <motion.a 
                href="#projects" 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold flex items-center gap-2 shadow-md shadow-emerald-500/10 transition-all cursor-pointer text-sm"
              >
                Explore Portfolio <ChevronRight size={18} />
              </motion.a>
              <motion.a 
                href="https://github.com/kjaydeep842" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer text-sm"
              >
                <Github size={18} /> GitHub
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/jaydeeppatel28" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold flex items-center gap-2 transition-all shadow-sm shadow-blue-500/20 cursor-pointer text-sm"
              >
                <LinkedIn size={18} /> LinkedIn
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
              <div ref={terminalScreenRef} className="p-4 sm:p-5 h-[280px] overflow-y-auto font-mono text-[11px] sm:text-xs space-y-3 bg-[#0a0f1d]">
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
              <span className="flex items-center gap-1"><Activity size={10} className="text-emerald-600 animate-pulse" /> Pipeline: Active</span>
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
            <div className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold animate-pulse">Architectural Pillars</div>
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
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-100 pb-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold">Active Engineering Artifacts</div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900">Systems Portfolio</h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-sans">
                Explore an interactive grid of scalable SaaS architectures, enterprise ERP modules, and high-performance system integrations. Click any card to view detailed specifications, telemetry data, and source implementation blueprints.
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 flex-shrink-0 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
              {[
                { id: "all", label: "All Systems" },
                { id: "saas", label: "SaaS & ERP Hubs" },
                { id: "ai", label: "AI & Telemetry" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setProjectFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 cursor-pointer ${
                    projectFilter === tab.id
                      ? "bg-white text-emerald-700 shadow-sm border border-emerald-500/10"
                      : "text-slate-600 hover:text-slate-800 hover:bg-white/40"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-4"
          >
            <AnimatePresence mode="popLayout">
              {allProjects
                .filter(p => {
                  if (projectFilter === "saas") {
                    return ["commerceinstitute", "omnipos", "tution_management", "hotel_management", "ecommerce", "jewellery"].includes(p.id);
                  }
                  if (projectFilter === "ai") {
                    return ["aosai", "dieselflow", "aiagent", "rn"].includes(p.id);
                  }
                  return true;
                })
                .map((proj) => {
                  const isSaaS = ["commerceinstitute", "omnipos", "tution_management", "hotel_management", "ecommerce", "jewellery"].includes(proj.id);
                  return (
                    <motion.div
                      key={proj.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      onClick={() => {
                        window.location.hash = `#project-${proj.id}`;
                      }}
                      className="glass-panel rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between hover:border-emerald-500/35 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 cursor-pointer relative overflow-hidden group min-h-[290px] bg-white/70 backdrop-blur-md"
                    >
                      {/* Interactive glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="space-y-4 relative z-10">
                        {/* Terminal status bar */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-[9px] font-mono text-emerald-700 bg-emerald-500/10 border border-emerald-500/15 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Node
                          </span>
                        </div>

                        {/* Project Identifier / Icon */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-500/30 group-hover:bg-emerald-50/50 transition-all duration-300">
                            {getProjectIcon(proj.id)}
                          </div>
                          <div>
                            <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">{proj.title}</h3>
                            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider leading-none mt-0.5">{isSaaS ? "SaaS Platform" : "System Engine"}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-3">
                          {proj.desc}
                        </p>

                        {/* Tech pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.tech.slice(0, 3).map((t, idx) => (
                            <span key={idx} className="text-[9px] font-mono bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-200/50 font-semibold">
                              {t}
                            </span>
                          ))}
                          {proj.tech.length > 3 && (
                            <span className="text-[9px] font-mono text-emerald-600 font-bold px-1 py-0.5">
                              +{proj.tech.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom row */}
                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                        {/* Telemetry metadata */}
                        <div className="min-w-0 pr-2">
                          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest block leading-none font-bold">Telemetry</span>
                          <span className="text-[10px] font-semibold text-slate-700 font-sans truncate block mt-1 flex items-center gap-1.5">
                            <Activity size={10} className="text-emerald-500 animate-pulse flex-shrink-0" /> {proj.metric}
                          </span>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                          <a 
                            href={proj.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors"
                            title="View Repository"
                          >
                            <Github size={14} />
                          </a>
                          <a 
                            href={`#project-${proj.id}`}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/30 text-emerald-700 text-[10px] font-mono font-bold flex items-center gap-1 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300 shadow-sm"
                          >
                            Specs <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </motion.div>
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
            <div className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold animate-pulse">Academic & Work Journey</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900">Experience Roadmap</h2>
            <p className="text-slate-600 text-sm sm:text-base font-sans">A chronicle mapping out my BCA graduation and active working careers.</p>
          </div>

          <div className="relative border-l border-slate-200 max-w-4xl mx-auto pl-5 sm:pl-8 space-y-12">
            {allTimeline.map((item, idx) => {
              const IconComponent = getTimelineIcon(item);
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
            <div className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold animate-pulse">Endorsements & Recommendations</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900">Client Reviews</h2>
            <p className="text-slate-600 text-sm sm:text-base font-sans">Feedback compiled from enterprise software integrations and custom projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {allTestimonials.map((t, idx) => (
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

        {/* SECURE PAYMENTS SANDBOX SECTION */}
        <motion.section 
          id="payments"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={sectionVariants}
          className="space-y-8"
        >
          {(() => {
            const categoriesList = [
              { id: "payments", label: "Payments", desc: "Credit Card, UPI, Webhooks" },
              { id: "communications", label: "Messaging", desc: "WhatsApp API, SMS" },
              { id: "productivity", label: "Productivity", desc: "Appointly, Calendars" },
              { id: "telemetry", label: "Dev Alerts", desc: "Slack, Webhooks" }
            ];

            const integrationsList = [
              { id: "stripe", name: "Stripe Gateway", category: "payments", status: "Production Certified", icon: CreditCard, desc: "Robust payment processing including credit cards, apple pay, subscription checkouts, and custom webhook-based database sync." },
              { id: "paypal", name: "PayPal Sandbox", category: "payments", status: "Active API", icon: CreditCard, desc: "Global PayPal SDK implementation with secure order creation, validation handshakes, and capture payouts." },
              { id: "razorpay", name: "Razorpay (India)", category: "payments", status: "Production Certified", icon: CreditCard, desc: "Indian currency payment gateway integration with custom Razorpay Checkout JS options, signature validation, and payment links." },
              { id: "cashfree", name: "Cashfree PG", category: "payments", status: "Active API", icon: CreditCard, desc: "Cashfree API implementation with high-availability UPI intent QR codes, payouts, and automated vendor order split." },
              { id: "whatsapp", name: "WhatsApp Cloud API", category: "communications", status: "Connected", icon: MessageSquare, desc: "Meta cloud gateway integration using template messages, dynamic variables, custom interactive reply buttons, and inbound webhook listener." },
              { id: "twilio", name: "Twilio SMS", category: "communications", status: "Connected", icon: Smartphone, desc: "Transactional text messaging, custom alert systems, and secure 2-Factor OTP verification services." },
              { id: "appointly", name: "Appointly API", category: "productivity", status: "Connected", icon: Calendar, desc: "Appointly scheduling portal integration with virtual Google Meet generation, duration check, and slot double-booking block." },
              { id: "google_calendar", name: "Google Calendar", category: "productivity", status: "OAuth Active", icon: Calendar, desc: "Two-way client calendar event replication using OAuth 2.0 refresh flow, calendar rest updates, and event syncing." },
              { id: "slack", name: "Slack / Discord", category: "telemetry", status: "Active Webhooks", icon: Zap, desc: "System warning logs, CRM lead capture notices, and payment failure notifications routed to team workspace channels." }
            ];

            const getIntegrationIcon = (id) => {
              switch(id) {
                case 'stripe':
                case 'paypal':
                case 'razorpay':
                case 'cashfree':
                  return <CreditCard size={18} className="text-emerald-600" />;
                case 'whatsapp':
                  return <MessageSquare size={18} className="text-emerald-600" />;
                case 'twilio':
                  return <Smartphone size={18} className="text-emerald-600" />;
                case 'appointly':
                case 'google_calendar':
                  return <Calendar size={18} className="text-emerald-600" />;
                case 'slack':
                  return <Zap size={18} className="text-emerald-600" />;
                default:
                  return <Code size={18} className="text-emerald-600" />;
              }
            };

            return (
              <>
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <div className="text-xs font-mono text-emerald-600 uppercase tracking-widest font-bold">API Ecosystem</div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900">Third-Party & API Integrations</h2>
                  <p className="text-slate-600 text-sm sm:text-base font-sans">
                    Explore live, interactive simulations of various payment gateways, messaging APIs, productivity tools, and webhook channels implemented in my applications.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left Column: Category selector and Integration buttons */}
                  <div className="lg:col-span-4 flex flex-col space-y-6">
                    {/* Category tabs */}
                    <div className="bg-slate-100/80 p-1 rounded-xl border border-slate-200 grid grid-cols-2 gap-1">
                      {categoriesList.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`py-2 px-3 rounded-lg text-center transition-all flex flex-col items-center justify-center ${
                            integrationCategory === cat.id
                              ? "bg-white text-emerald-600 shadow-sm border border-slate-200/50"
                              : "text-slate-600 hover:text-slate-800 hover:bg-slate-200/50"
                          }`}
                        >
                          <span className="text-xs font-bold font-display">{cat.label}</span>
                          <span className="text-[9px] font-sans text-slate-400 hidden sm:inline">{cat.desc}</span>
                        </button>
                      ))}
                    </div>

                    {/* Integrations list for selected category */}
                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[420px] pr-1">
                      {integrationsList
                        .filter((item) => item.category === integrationCategory)
                        .map((item) => {
                          const isSelected = activeIntegration === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => setActiveIntegration(item.id)}
                              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                                isSelected
                                  ? "border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-500 shadow-sm"
                                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                              }`}
                            >
                              <div className={`p-2 rounded-lg ${isSelected ? 'bg-emerald-100/50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                {getIntegrationIcon(item.id)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-slate-900 font-display truncate">{item.name}</span>
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                                    isSelected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    {item.status}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 font-sans mt-1 line-clamp-2 leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* Right Column: Playground Panel, Live Preview, and Telemetry Console */}
                  <div className="lg:col-span-8 flex flex-col space-y-6">
                    {/* Selected Integration Playground Card */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
                      
                      {/* Integration Details & Form */}
                      <div className="flex-1 space-y-5">
                        <div>
                          <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                            {getIntegrationIcon(activeIntegration)}
                            {integrationsList.find(i => i.id === activeIntegration)?.name}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-sans mt-1.5">
                            {integrationsList.find(i => i.id === activeIntegration)?.desc}
                          </p>
                        </div>

                        {/* Simulator Forms */}
                        <form onSubmit={simulateIntegrationCall} className="space-y-4 pt-3 border-t border-slate-100">
                          
                          {/* Stripe Form */}
                          {activeIntegration === 'stripe' && (
                            <div className="space-y-3">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Customer Email</label>
                                <input 
                                  type="email" 
                                  value={stripeForm.email}
                                  onChange={(e) => setStripeForm(prev => ({ ...prev, email: e.target.value }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Amount ($)</label>
                                  <input 
                                    type="number" 
                                    value={stripeForm.amount}
                                    onChange={(e) => setStripeForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    required
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Webhook Event Type</label>
                                  <select 
                                    value={stripeForm.event}
                                    onChange={(e) => setStripeForm(prev => ({ ...prev, event: e.target.value }))}
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  >
                                    <option value="payment_intent.succeeded">payment_intent.succeeded</option>
                                    <option value="customer.subscription.created">subscription.created</option>
                                    <option value="invoice.payment_failed">invoice.payment_failed</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* PayPal Form */}
                          {activeIntegration === 'paypal' && (
                            <div className="space-y-3">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Payer PayPal Email</label>
                                <input 
                                  type="email" 
                                  value={paypalForm.clientEmail}
                                  onChange={(e) => setPaypalForm(prev => ({ ...prev, clientEmail: e.target.value }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  required
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Order Amount (USD)</label>
                                <input 
                                  type="number" 
                                  value={paypalForm.amount}
                                  onChange={(e) => setPaypalForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  required
                                />
                              </div>
                            </div>
                          )}

                          {/* Razorpay Form */}
                          {activeIntegration === 'razorpay' && (
                            <div className="space-y-3">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Customer Phone</label>
                                <input 
                                  type="text" 
                                  value={razorpayForm.phone}
                                  onChange={(e) => setRazorpayForm(prev => ({ ...prev, phone: e.target.value }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  required
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Amount (INR ₹)</label>
                                <input 
                                  type="number" 
                                  value={razorpayForm.amount}
                                  onChange={(e) => setRazorpayForm(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  required
                                />
                              </div>
                            </div>
                          )}

                          {/* Cashfree Form */}
                          {activeIntegration === 'cashfree' && (
                            <div className="space-y-3">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Customer Name</label>
                                <input 
                                  type="text" 
                                  value={cashfreeForm.name}
                                  onChange={(e) => setCashfreeForm(prev => ({ ...prev, name: e.target.value }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  required
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">UPI ID / VPA</label>
                                <input 
                                  type="text" 
                                  value={cashfreeForm.vpa}
                                  onChange={(e) => setCashfreeForm(prev => ({ ...prev, vpa: e.target.value }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  placeholder="username@upi"
                                  required
                                />
                              </div>
                            </div>
                          )}

                          {/* WhatsApp Business API Form */}
                          {activeIntegration === 'whatsapp' && (
                            <div className="space-y-3">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Recipient Phone Number</label>
                                <input 
                                  type="text" 
                                  value={whatsappForm.phone}
                                  onChange={(e) => setWhatsappForm(prev => ({ ...prev, phone: e.target.value }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Template Name</label>
                                  <select 
                                    value={whatsappForm.template}
                                    onChange={(e) => setWhatsappForm(prev => ({ ...prev, template: e.target.value }))}
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  >
                                    <option value="order_confirmation">order_confirmation</option>
                                    <option value="auth_otp">auth_otp</option>
                                  </select>
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Variable (Name)</label>
                                  <input 
                                    type="text" 
                                    value={whatsappForm.name}
                                    onChange={(e) => setWhatsappForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Twilio SMS Form */}
                          {activeIntegration === 'twilio' && (
                            <div className="space-y-3">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Phone Number</label>
                                <input 
                                  type="text" 
                                  disabled={twilioForm.mode === 'verify'}
                                  value={twilioForm.phone}
                                  onChange={(e) => setTwilioForm(prev => ({ ...prev, phone: e.target.value }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:bg-slate-100 disabled:text-slate-500"
                                  required
                                />
                              </div>
                              
                              {twilioForm.mode === 'verify' && (
                                <div className="space-y-2 p-3 bg-amber-50/70 rounded-lg border border-amber-200 animate-fade-in">
                                  <div className="text-[9px] font-mono font-bold text-amber-800">ENTER VERIFICATION CODE SENT TO PHONE:</div>
                                  <div className="flex gap-2">
                                    <input 
                                      type="text"
                                      maxLength={6}
                                      value={twilioInputOtp}
                                      onChange={(e) => setTwilioInputOtp(e.target.value)}
                                      className="flex-1 px-3 py-1 border border-slate-200 rounded-lg text-xs text-center font-mono font-bold tracking-widest focus:outline-none focus:ring-1 focus:ring-amber-500"
                                      placeholder="******"
                                    />
                                    <button 
                                      type="button" 
                                      onClick={() => {
                                        setTwilioForm(prev => ({ ...prev, mode: 'send' }));
                                        setTwilioVerified(null);
                                      }}
                                      className="px-2.5 py-1 text-[9px] bg-slate-200 hover:bg-slate-300 font-bold rounded-lg transition-colors"
                                    >
                                      Edit Phone
                                    </button>
                                  </div>
                                  {twilioVerified === true && <p className="text-[9px] text-emerald-600 font-bold">✓ OTP Verified Successfully!</p>}
                                  {twilioVerified === false && <p className="text-[9px] text-rose-600 font-bold">✗ Invalid code. Try again (Correct: {twilioSentOtp})</p>}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Appointly Form */}
                          {activeIntegration === 'appointly' && (
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Booking Date</label>
                                  <input 
                                    type="date" 
                                    value={appointlyForm.date}
                                    onChange={(e) => setAppointlyForm(prev => ({ ...prev, date: e.target.value }))}
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    required
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Time Slot</label>
                                  <select 
                                    value={appointlyForm.slot}
                                    onChange={(e) => setAppointlyForm(prev => ({ ...prev, slot: e.target.value }))}
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  >
                                    <option value="09:00 AM">09:00 AM</option>
                                    <option value="10:30 AM">10:30 AM</option>
                                    <option value="02:30 PM">02:30 PM</option>
                                    <option value="04:00 PM">04:00 PM</option>
                                  </select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Client Name</label>
                                  <input 
                                    type="text" 
                                    value={appointlyForm.name}
                                    onChange={(e) => setAppointlyForm(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    required
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Client Email</label>
                                  <input 
                                    type="email" 
                                    value={appointlyForm.email}
                                    onChange={(e) => setAppointlyForm(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Google Calendar Form */}
                          {activeIntegration === 'google_calendar' && (
                            <div className="space-y-3">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Calendar Event Title</label>
                                <input 
                                  type="text" 
                                  value={googleCalendarForm.title}
                                  onChange={(e) => setGoogleCalendarForm(prev => ({ ...prev, title: e.target.value }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  required
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Duration (Minutes)</label>
                                <select 
                                  value={googleCalendarForm.duration}
                                  onChange={(e) => setGoogleCalendarForm(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                >
                                  <option value="30">30 Minutes</option>
                                  <option value="60">1 Hour</option>
                                  <option value="90">1.5 Hours</option>
                                </select>
                              </div>
                            </div>
                          )}

                          {/* Slack Form */}
                          {activeIntegration === 'slack' && (
                            <div className="space-y-3">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Target Slack Channel</label>
                                <select 
                                  value={slackForm.channel}
                                  onChange={(e) => setSlackForm(prev => ({ ...prev, channel: e.target.value }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                >
                                  <option value="#ops-alerts">#ops-alerts</option>
                                  <option value="#crm-leads">#crm-leads</option>
                                  <option value="#general">#general</option>
                                </select>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Telemetry Message Payload</label>
                                <textarea 
                                  value={slackForm.message}
                                  onChange={(e) => setSlackForm(prev => ({ ...prev, message: e.target.value }))}
                                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 h-16 font-sans resize-none"
                                  required
                                />
                              </div>
                            </div>
                          )}

                          {/* Execute Simulator Button */}
                          <button
                            type="submit"
                            disabled={integrationProcessing}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed mt-2"
                          >
                            {integrationProcessing ? (
                              <>
                                <RefreshCw size={12} className="animate-spin" />
                                Processing Simulation...
                              </>
                            ) : (
                              <>
                                <Play size={10} />
                                {activeIntegration === 'twilio' && twilioForm.mode === 'verify' ? "Verify OTP Code" : `Trigger ${activeIntegration} API`}
                              </>
                            )}
                          </button>
                        </form>
                      </div>

                      {/* Right / Live Visual Output Preview */}
                      <div className="w-full md:w-[240px] bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between min-h-[280px]">
                        <div className="w-full h-full flex flex-col justify-start">
                          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-200/60 pb-1.5 mb-3">
                            Live Preview Window
                          </span>

                          {/* WhatsApp Live Preview */}
                          {activeIntegration === 'whatsapp' && (
                            <div className="flex-1 flex flex-col justify-between bg-[#efeae2] border border-slate-200 rounded-lg p-2 font-sans overflow-hidden max-h-[220px]">
                              {/* Mobile chat screen */}
                              <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-[9px] scrollbar-thin">
                                {whatsappMessages.map((msg) => (
                                  <div 
                                    key={msg.id}
                                    className={`p-2 rounded-lg max-w-[85%] leading-relaxed ${
                                      msg.sender === 'bot' 
                                        ? 'bg-white ml-auto text-slate-800 rounded-tr-none shadow-xs' 
                                        : 'bg-emerald-100 text-slate-800 shadow-xs'
                                    }`}
                                  >
                                    <p className="break-words">{msg.text}</p>
                                    <span className="text-[7px] text-slate-400 block text-right mt-0.5">{msg.time}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="bg-white p-1 rounded-full border border-slate-200 text-[8px] text-slate-400 pl-2 mt-2">
                                Type a message...
                              </div>
                            </div>
                          )}

                          {/* Twilio SMS Live Preview */}
                          {activeIntegration === 'twilio' && (
                            <div className="flex-1 flex flex-col justify-center items-center p-4 bg-slate-900 text-white rounded-lg border border-slate-800 text-center font-sans space-y-3 max-h-[220px]">
                              <Smartphone size={24} className="text-emerald-400" />
                              <div className="space-y-1">
                                <h4 className="font-bold text-[11px]">Twilio SMS Hub</h4>
                                <p className="text-[9px] text-slate-400 leading-normal">
                                  {twilioForm.mode === 'send' 
                                    ? "Awaiting trigger code dispatch."
                                    : "SMS queued on node gateway. Verification active."}
                                </p>
                              </div>
                              {twilioForm.mode === 'verify' && (
                                <div className="bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 font-mono text-emerald-400 font-bold text-[11px] tracking-wider">
                                  OTP: {twilioSentOtp}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Stripe Live Preview */}
                          {activeIntegration === 'stripe' && (
                            <div className="flex-1 overflow-y-auto space-y-2 max-h-[220px] pr-1 scrollbar-thin">
                              {stripeInvoices.length === 0 ? (
                                <div className="text-center py-10 text-[9px] text-slate-400 font-sans">
                                  No simulated invoices. Trigger a Stripe webhook.
                                </div>
                              ) : (
                                stripeInvoices.map((inv, idx) => (
                                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs text-[9px] font-sans space-y-1 animate-fade-in">
                                    <div className="flex items-center justify-between font-bold">
                                      <span className="text-slate-800">{inv.id}</span>
                                      <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full text-[7px]">{inv.status}</span>
                                    </div>
                                    <div className="text-slate-500 truncate">{inv.email}</div>
                                    <div className="border-t border-slate-100 mt-1 pt-1 flex items-center justify-between font-bold text-slate-900">
                                      <span>Total Paid</span>
                                      <span>${inv.amount.toFixed(2)}</span>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          )}

                          {/* PayPal Live Preview */}
                          {activeIntegration === 'paypal' && (
                            <div className="flex-1 overflow-y-auto space-y-2 max-h-[220px] pr-1 scrollbar-thin">
                              {paypalReceipts.length === 0 ? (
                                <div className="text-center py-10 text-[9px] text-slate-400 font-sans">
                                  No receipts. Run a simulated PayPal order.
                                </div>
                              ) : (
                                paypalReceipts.map((rec, idx) => (
                                  <div key={idx} className="bg-[#003087]/5 border border-[#003087]/10 rounded-lg p-2.5 text-[9px] font-sans space-y-1 animate-fade-in">
                                    <div className="flex items-center justify-between font-bold">
                                      <span className="text-[#003087]">PayPal Receipt</span>
                                      <span className="text-blue-600 bg-blue-50 px-1 rounded-full text-[7px] font-mono">{rec.status}</span>
                                    </div>
                                    <div className="text-slate-500 font-mono truncate">{rec.orderId}</div>
                                    <div className="border-t border-slate-200/50 mt-1 pt-1 flex items-center justify-between font-bold text-slate-950">
                                      <span>Captured</span>
                                      <span>${rec.amount.toFixed(2)} USD</span>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          )}

                          {/* Razorpay Live Preview */}
                          {activeIntegration === 'razorpay' && (
                            <div className="flex-1 overflow-y-auto space-y-2 max-h-[220px] pr-1 scrollbar-thin">
                              {razorpayOrders.length === 0 ? (
                                <div className="text-center py-10 text-[9px] text-slate-400 font-sans">
                                  No links generated. Run a simulated order.
                                </div>
                              ) : (
                                razorpayOrders.map((ord, idx) => (
                                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-2.5 text-[9px] font-sans space-y-1.5 animate-fade-in">
                                    <div className="font-bold text-slate-800">plink_{ord.orderId}</div>
                                    <div className="text-slate-500">To: {ord.phone}</div>
                                    <div className="font-bold text-slate-950">₹{ord.amount} INR</div>
                                    <a 
                                      href={ord.url} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="block text-center py-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded transition-colors text-[8px]"
                                    >
                                      Payment Link (Simulated)
                                    </a>
                                  </div>
                                ))
                              )}
                            </div>
                          )}

                          {/* Cashfree Live Preview */}
                          {activeIntegration === 'cashfree' && (
                            <div className="flex-1 overflow-y-auto space-y-2 max-h-[220px] pr-1 scrollbar-thin">
                              {cashfreeOrders.length === 0 ? (
                                <div className="text-center py-10 text-[9px] text-slate-400 font-sans">
                                  No UPI QR intents created.
                                </div>
                              ) : (
                                cashfreeOrders.map((ord, idx) => (
                                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-2.5 text-[9px] font-sans space-y-1 animate-fade-in">
                                    <div className="flex justify-between items-center font-bold text-slate-800">
                                      <span>{ord.orderId}</span>
                                      <span className="px-1 text-[7px] bg-amber-50 text-amber-700 border border-amber-200 rounded-full">{ord.status}</span>
                                    </div>
                                    <div className="text-slate-500 font-mono truncate">{ord.vpa}</div>
                                    <div className="text-right font-bold text-slate-950 mt-1">₹{ord.amount.toFixed(2)}</div>
                                  </div>
                                ))
                              )}
                            </div>
                          )}

                          {/* Appointly Live Preview */}
                          {activeIntegration === 'appointly' && (
                            <div className="flex-1 overflow-y-auto space-y-2 max-h-[220px] pr-1 scrollbar-thin">
                              {appointlyBookings.length === 0 ? (
                                <div className="text-center py-10 text-[9px] text-slate-400 font-sans">
                                  No bookings scheduled.
                                </div>
                              ) : (
                                appointlyBookings.map((bk, idx) => (
                                  <div key={idx} className="bg-white border border-slate-200 rounded-lg p-2.5 text-[9px] font-sans space-y-1 animate-fade-in shadow-xs">
                                    <div className="flex justify-between items-center font-bold text-slate-900">
                                      <span>Meeting Confirmed</span>
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <div className="text-slate-600 truncate">{bk.name}</div>
                                    <div className="text-emerald-700 font-mono text-[8px] bg-emerald-50 p-1 rounded">
                                      {bk.date} @ {bk.slot}
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          )}

                          {/* Google Calendar Live Preview */}
                          {activeIntegration === 'google_calendar' && (
                            <div className="flex-1 overflow-y-auto space-y-2 max-h-[220px] pr-1 scrollbar-thin">
                              {googleEvents.length === 0 ? (
                                <div className="text-center py-10 text-[9px] text-slate-400 font-sans">
                                  No synced events.
                                </div>
                              ) : (
                                googleEvents.map((ev, idx) => (
                                  <div key={idx} className="bg-white border-l-2 border-l-blue-600 border border-slate-200 rounded-r-lg p-2 text-[9px] font-sans space-y-1 animate-fade-in">
                                    <div className="font-bold text-slate-900">{ev.title}</div>
                                    <div className="text-slate-500">{ev.duration} mins | {ev.date}</div>
                                  </div>
                                ))
                              )}
                            </div>
                          )}

                          {/* Slack Webhooks Live Preview */}
                          {activeIntegration === 'slack' && (
                            <div className="flex-1 flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-lg p-2 font-sans max-h-[220px] text-slate-300">
                              {/* Slack message screen mockup */}
                              <div className="flex-1 overflow-y-auto space-y-1.5 text-[8px] scrollbar-thin">
                                {slackFeeds.map((feed) => (
                                  <div key={feed.id} className="space-y-0.5 border-b border-slate-800 pb-1 animate-fade-in">
                                    <div className="flex items-center gap-1">
                                      <span className="font-bold text-white">Slack Bot</span>
                                      <span className="text-slate-500">{feed.time}</span>
                                    </div>
                                    <p className="text-slate-300 leading-normal font-sans text-[8px]">{feed.message}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Terminal Logs for Integrations */}
                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300 shadow-xl relative overflow-hidden flex flex-col h-[240px]">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                        <div className="flex items-center gap-1.5">
                          <Terminal size={14} className="text-emerald-500" />
                          <span>Integration Telemetry console</span>
                        </div>
                        <button 
                          onClick={() => setIntegrationLogs(["INTEGRATION TELEMETRY ENGINE ONLINE...", "FEED CLEARED."])}
                          className="hover:text-slate-300 transition-colors text-[9px]"
                        >
                          Clear Feed
                        </button>
                      </div>
                      
                      <div ref={paymentLogsScreenRef} className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                        {integrationLogs.map((log, i) => (
                          <div key={i} className={`leading-relaxed break-all ${
                            log.startsWith('ERROR:') || log.startsWith('FAILED:') ? 'text-rose-400 font-bold' : 
                            log.startsWith('SUCCESS:') ? 'text-emerald-400 font-bold' : 
                            log.startsWith('======') ? 'text-slate-600' :
                            log.startsWith('INITIATING') || log.startsWith('[') ? 'text-cyan-400 font-bold' :
                            'text-slate-300'
                          }`}>
                            {log.startsWith('======') ? log : `> ${log}`}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
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
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fade-in"
        >
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 font-mono text-xs font-semibold animate-pulse">
              <Shield size={14} /> SECURE COMMUNICATIONS SHIELD
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900">
              Establish Connection
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              Have an academic portal installation, multi-tenant billing architecture, or customized web solution you want built? 
              Transmit a coordinate message here. 
            </p>

            {/* Direct Connect Profiles - Color Full Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <motion.a 
                href="tel:+918238812890"
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/5 border border-emerald-500/20 text-slate-800 flex flex-col justify-between h-[110px] transition-all relative overflow-hidden shadow-sm cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/10 rounded-full blur-lg" />
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Smartphone size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-emerald-600 font-bold">Call Me</div>
                  <div className="text-xs font-mono font-bold mt-0.5 text-slate-800">+91 82388 12890</div>
                </div>
              </motion.a>

              <motion.a 
                href="mailto:kjaydeep842@gmail.com"
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/15 to-cyan-600/5 border border-cyan-500/20 text-slate-800 flex flex-col justify-between h-[110px] transition-all relative overflow-hidden shadow-sm cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/10 rounded-full blur-lg" />
                <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-600">
                  <Send size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-cyan-600 font-bold">Email</div>
                  <div className="text-[11px] font-mono font-bold mt-0.5 text-slate-800 truncate block w-full">kjaydeep842@gmail.com</div>
                </div>
              </motion.a>

              <motion.a 
                href="https://linkedin.com/in/jaydeeppatel28" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/15 to-indigo-600/5 border border-indigo-500/20 text-slate-800 flex flex-col justify-between h-[110px] transition-all relative overflow-hidden shadow-sm cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500/10 rounded-full blur-lg" />
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                  <Globe size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-indigo-600 font-bold">LinkedIn</div>
                  <div className="text-xs font-mono font-bold mt-0.5 text-slate-800">jaydeeppatel28</div>
                </div>
              </motion.a>
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
                    <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 animate-bounce">
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
            <a href="#admin" className="text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-1"><Settings size={12} /> admin</a>
            <a href="https://github.com/kjaydeep842" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors">github</a>
            <a href="#about" className="hover:text-emerald-600 transition-colors">top</a>
          </div>
        </div>
      </footer>

      {/* Checkout modals removed */}
    </div>
  )
}
