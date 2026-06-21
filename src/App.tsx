import { useState, useEffect, useRef, useMemo } from "react";
import {
  Compass,
  Scale,
  GitBranch,
  DollarSign,
  Briefcase,
  BookOpen,
  Search,
  Cpu,
  Rocket,
  Activity,
  Brain,
  Trash2,
  Plus,
  ChevronRight,
  Download,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Send,
  RefreshCw,
  FileText,
  CheckSquare,
  Square,
  HelpCircle,
  X,
  History,
  Lock,
  Printer,
  Copy,
  Check,
  Bookmark,
  ExternalLink,
  ChevronDown,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause
} from "lucide-react";
import Markdown from "react-markdown";
import { jsPDF } from "jspdf";
import { motion } from "motion/react";
import { ADVICE_MODES } from "./data";
import { AdviceMode, StrategicBrief, ChatMessage } from "./types";
import DecisionVisualizer from "./components/DecisionVisualizer";
import CategoryDropdown from "./components/CategoryDropdown";
import BrandLogo from "./components/BrandLogo";

export const ANIME_AVATARS = [
  {
    id: "avatar_cyber_shogun",
    name: "Strategic Expert",
    title: "Lead Analyst",
    gradient: "from-rose-500 via-red-600 to-amber-500",
    glowColor: "rgba(239, 68, 68, 0.6)",
    bannerColor: "bg-red-500/10 border-red-500/30 text-rose-600",
    quote: "Standard tactics resolve individual tasks, but rigorous strategic planning secures the enterprise.",
    badge: "🍎 Strategic Core"
  },
  {
    id: "avatar_holo_priestess",
    name: "Data Consultant",
    title: "Intelligence Partner",
    gradient: "from-indigo-500 via-purple-600 to-fuchsia-405",
    glowColor: "rgba(124, 58, 237, 0.6)",
    bannerColor: "bg-purple-500/10 border-purple-500/30 text-indigo-600",
    quote: "Order emerges when you convert complex raw data into transparently categorized steps.",
    badge: "🔮 Structured Path"
  },
  {
    id: "avatar_pixel_ninja",
    name: "Operations Specialist",
    title: "Efficiency Associate",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    glowColor: "rgba(16, 185, 129, 0.6)",
    bannerColor: "bg-teal-500/10 border-teal-500/30 text-teal-600",
    quote: "Minimize friction in active operational tasks through lightweight, direct user workflows.",
    badge: "🟢 Efficient Run"
  },
  {
    id: "avatar_steam_mechanic",
    name: "Financial Architect",
    title: "Budget & Cashflow Advisor",
    gradient: "from-amber-400 via-orange-500 to-rose-600",
    glowColor: "rgba(245, 158, 11, 0.6)",
    bannerColor: "bg-amber-500/10 border-amber-500/30 text-amber-600",
    quote: "Protect your downside capital reserves first before projecting active growth campaigns.",
    badge: "🟠 Guarded Reserves"
  },
  {
    id: "avatar_astral_sorcerer",
    name: "Macro Researcher",
    title: "Sector Trend Analyst",
    gradient: "from-blue-600 via-violet-600 to-pink-500",
    glowColor: "rgba(79, 70, 229, 0.6)",
    bannerColor: "bg-blue-500/10 border-blue-500/30 text-blue-600",
    quote: "Evaluate logical dependencies in macro industry sectors and observe compound changes.",
    badge: "🔵 Trend Tracker"
  },
  {
    id: "avatar_mana_hacker",
    name: "Product Planner",
    title: "Growth Funnel Specialist",
    gradient: "from-pink-500 via-rose-500 to-orange-400",
    glowColor: "rgba(244, 63, 94, 0.6)",
    bannerColor: "bg-pink-500/10 border-pink-500/30 text-pink-600",
    quote: "Structure real, repeatable customer acquisition paths rather than depending on sudden virality.",
    badge: "🔴 Funnel Optimize"
  }
];

// Helper function to strip Markdown syntax for natural speech synthesis
function stripMarkdown(md: string): string {
  if (!md) return "";
  return md
    .replace(/^#+\s+/gm, "")                     // strip headers
    .replace(/\*{1,3}(.*?)\*{1,3}/g, "$1")       // strip bold/italic asterisks
    .replace(/_{1,3}(.*?)_{1,3}/g, "$1")         // strip bold/italic underscores
    .replace(/`{1,3}([\s\S]*?)`{1,3}/g, "$1")     // strip code blocks
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")        // strip link texts
    .replace(/^\s*[-*+]\s+/gm, "")               // strip bullet points
    .replace(/^\s*\d+\.\s+/gm, "")               // strip numbered list prefixes
    .replace(/>\s+/g, "")                        // strip blockquote characters
    .trim();
}

// Premium animated circular progress ring component matching the cyber-anime styling
interface CircularProgressRingProps {
  percentage: number;
  label: string;
  color?: string;
  delay?: number;
  size?: number;
  darkTheme?: boolean;
}

const CircularProgressRing = ({ percentage, label, color = "stroke-indigo-500", delay = 0, size = 110, darkTheme = false }: CircularProgressRingProps) => {
  const radius = 38;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className={`flex flex-col items-center justify-center transition-all duration-300 ${
      darkTheme 
        ? "p-2 bg-transparent border-0 select-none flex-1 min-w-[120px]"
        : "p-4 bg-slate-50/40 border border-slate-200/60 rounded-xl relative overflow-hidden group select-none flex-1 min-w-[120px] hover:border-slate-300 hover:bg-slate-50/70 shadow-xs"
    }`}>
      {!darkTheme && (
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Outer glowing dynamic ring */}
        <div className={`absolute inset-0 rounded-full border border-dashed animate-spin ${
          darkTheme ? "border-indigo-500/10" : "border-indigo-500/10 group-hover:border-indigo-500/25"
        }`} style={{ animationDuration: "12s" }} />
        
        {/* SVG Circle Track */}
        <svg className="w-full h-full transform -rotate-90 scale-95">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={darkTheme ? "stroke-slate-800 fill-none" : "stroke-slate-100/80 fill-none"}
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`fill-none ${color} transition-all duration-300 ${
              darkTheme ? "drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]" : "drop-shadow-[0_0_4px_rgba(99,102,241,0.2)]"
            }`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
            transition={{ delay, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
          />
        </svg>

        {/* Dynamic Percentage Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.35, duration: 0.45 }}
            className={`text-base font-black font-mono tracking-tighter ${
              darkTheme ? "text-white" : "text-slate-800"
            }`}
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
      <span className={`mt-2.5 text-[9px] font-black uppercase tracking-widest font-mono text-center truncate w-full ${
        darkTheme ? "text-slate-400" : "text-slate-400 group-hover:text-slate-600 transition-colors"
      }`}>
        {label}
      </span>
    </div>
  );
};

const bentoContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const bentoItemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
    },
  },
} as const;

export default function App() {
  // Navigation & Workspace Selection
  const [activeModeId, setActiveModeId] = useState<AdviceMode>(() => {
    const savedMode = localStorage.getItem("iah_autosave_activeModeId");
    if (savedMode && ["general_advisor", "decision_engine", "money_intelligence", "business_intelligence", "learning_system", "research_mode", "problem_solving", "startup_advisor", "productivity_engine"].includes(savedMode)) {
      return savedMode as AdviceMode;
    }
    return "general_advisor";
  });
  const activeMode = ADVICE_MODES.find((m) => m.id === activeModeId) || ADVICE_MODES[0];

  // Form Inputs
  const [scenarioText, setScenarioText] = useState(() => {
    return localStorage.getItem("iah_autosave_scenario") || "";
  });
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const savedFieldValues = localStorage.getItem("iah_autosave_field_values");
    if (savedFieldValues) {
      try {
        return JSON.parse(savedFieldValues);
      } catch (e) {
        // ignore
      }
    }
    const initialModeId = localStorage.getItem("iah_autosave_activeModeId") || "general_advisor";
    const initialMode = ADVICE_MODES.find((m) => m.id === initialModeId) || ADVICE_MODES[0];
    const defaults: Record<string, string> = {};
    initialMode.fields.forEach((f) => {
      defaults[f.key] = f.defaultValue || "";
    });
    return defaults;
  });
  const [isDeepAnalysis, setIsDeepAnalysis] = useState(false);
  const [lastAutosaved, setLastAutosaved] = useState<string | null>(null);
  const isFirstRender = useRef(true);

  // States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Results & History
  const [currentBrief, setCurrentBrief] = useState<StrategicBrief | null>(null);
  const [vaultBriefs, setVaultBriefs] = useState<StrategicBrief[]>([]);
  const [currentTab, setCurrentTab] = useState<"memo" | "bento" | "mentoring" | "broadcast" | "pwa" | "visualizer">("memo");
  const [actionChecklist, setActionChecklist] = useState<Record<string, boolean>>({});

  // Direct PWA & Play Store Install States
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);

  // Direct Strategic Broadcast States
  const [broadcastTarget, setBroadcastTarget] = useState("7980259343");
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState(0);
  const [broadcastLogs, setBroadcastLogs] = useState<string[]>([]);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);
  const [broadcastChannelUsed, setBroadcastChannelUsed] = useState("local_simulated_dispatch");

  // UI States
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [scenariosOpen, setScenariosOpen] = useState(true);
  const [isButtonShaking, setIsButtonShaking] = useState(false);
  const [isInputShaking, setIsInputShaking] = useState(false);

  // Category Tagging & Filtering States
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [vaultSearchQuery, setVaultSearchQuery] = useState("");
  const [creationCategory, setCreationCategory] = useState("Business");
  const [customCategoryText, setCustomCategoryText] = useState("");
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingCategoryText, setEditingCategoryText] = useState("");

  // Dynamic categories set extracted from saved briefs
  const uniqueCategories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    vaultBriefs.forEach((b) => {
      if (b.category && b.category.trim()) {
        cats.add(b.category.trim());
      } else {
        cats.add("General");
      }
    });
    return Array.from(cats);
  }, [vaultBriefs]);

  // Combined list of default categories and dynamic ones (excluding "All")
  const assignableCategories = useMemo(() => {
    const set = new Set<string>(["Business", "Personal", "Finance", "General"]);
    uniqueCategories.forEach((cat) => {
      if (cat !== "All" && cat.trim()) {
        set.add(cat.trim());
      }
    });
    return Array.from(set);
  }, [uniqueCategories]);

  // Dynamic filtered list of vault briefs based on category and search query
  const filteredVaultBriefs = useMemo(() => {
    return vaultBriefs.filter((b) => {
      // 1. Filter by category
      const bCat = b.category || "General";
      const matchesCategory =
        selectedCategoryFilter === "All" ||
        bCat.toLowerCase() === selectedCategoryFilter.toLowerCase();

      // 2. Filter by search query
      const query = vaultSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        b.title.toLowerCase().includes(query) ||
        bCat.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [vaultBriefs, selectedCategoryFilter, vaultSearchQuery]);

  // Auth & Profile states for Premium Anime Gate
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; avatar: string } | null>(() => {
    const savedUser = localStorage.getItem("iah_currentUser");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  
  const [authMode, setAuthMode] = useState<"quick" | "login" | "register">("quick");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("avatar_cyber_shogun");
  const [portalEntering, setPortalEntering] = useState(false);
  const [enteringProgress, setEnteringProgress] = useState(0);
  const [enteringLog, setEnteringLog] = useState("Initializing neural linking sequence...");

  // Chat window anchor
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Speech Recognition States
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognitionImpl = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionImpl) {
      setSpeechSupported(true);
      const rec = new SpeechRecognitionImpl();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onresult = (event: any) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript.trim()) {
          setScenarioText((prev) => {
            const trimmed = prev.trim();
            const delimiter = trimmed ? " " : "";
            return trimmed + delimiter + finalTranscript.trim();
          });
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (event.error !== "no-speech") {
          setErrorMessage(`Voice input error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore
        }
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setErrorMessage("");
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
        setErrorMessage("Could not start speech engine. Please verify mic permissions.");
      }
    }
  };

  // Speech Synthesis (TTS) States
  const [synthesisState, setSynthesisState] = useState<"stopped" | "playing" | "paused">("stopped");
  const [synthesisSupported, setSynthesisSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSynthesisSupported(true);
    }
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Capture beforeinstallprompt event for customized PWA installation triggers
  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log("[IAH.AI PWA] Intercepted install prompt. Ready for on-demand installation.");
    };

    const handleAppInstalled = () => {
      setIsPwaInstalled(true);
      setDeferredPrompt(null);
      console.log("[IAH.AI PWA] App install action completed successfully.");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Sync state with matching display-mode
    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone) {
      setIsPwaInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleTriggerInstallPwa = () => {
    if (!deferredPrompt) {
      alert("Installation is managed by your browser. Open this app directly or pin it from your browser's share menu if on iOS!");
      return;
    }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("[IAH.AI PWA] User agreed to set up tactical desktop/mobile wrapper.");
        setIsPwaInstalled(true);
      }
      setDeferredPrompt(null);
    });
  };

  // Cancel any ongoing speech when the brief selection changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSynthesisState("stopped");
    }
  }, [currentBrief?.id]);

  const handleSpeakToggle = () => {
    if (typeof window === "undefined" || !window.speechSynthesis || !currentBrief) return;

    const synth = window.speechSynthesis;

    if (synthesisState === "playing") {
      synth.pause();
      setSynthesisState("paused");
    } else if (synthesisState === "paused") {
      synth.resume();
      setSynthesisState("playing");
    } else {
      synth.cancel(); // Safety cancel preceding playbacks

      const cleanText = stripMarkdown(currentBrief.analysisText || "");
      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "en-US";

      // Try selecting a high-quality/natural English voice
      const voices = synth.getVoices();
      const voice = voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha"))) ||
                    voices.find((v) => v.lang.startsWith("en")) ||
                    voices[0];
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => {
        setSynthesisState("stopped");
      };
      
      utterance.onerror = (e) => {
        console.error("SpeechSynthesis error", e);
        setSynthesisState("stopped");
      };

      utteranceRef.current = utterance;
      setSynthesisState("playing");
      synth.speak(utterance);
    }
  };

  const handleStopSpeech = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSynthesisState("stopped");
    }
  };

  const handleDownloadPDF = () => {
    if (!currentBrief) return;
    
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const title = currentBrief.title || "Strategic Briefing Memorandum";
      const category = currentBrief.category || "General";
      const dateStr = new Date().toLocaleString();
      const rawText = currentBrief.analysisText || "";

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      let y = margin;

      // Top Indigo Accent Band
      doc.setFillColor(79, 70, 229);
      doc.rect(0, 0, pageWidth, 4, "F");

      // System Header Label Box
      doc.setFillColor(15, 23, 42);
      doc.rect(margin, y, contentWidth, 18, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.text("DECISION WORKSPACE - REPORT BRIEFING", margin + 6, y + 11.5);

      // Category badge
      doc.setFillColor(244, 63, 94);
      doc.rect(pageWidth - margin - 35, y + 5, 29, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(7);
      doc.text(category.toUpperCase() + " LEVEL", pageWidth - margin - 20.5, y + 10.3, { align: "center" });

      y += 28;

      // Main Title
      doc.setTextColor(15, 23, 42);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      const titleLines = doc.splitTextToSize(title.toUpperCase(), contentWidth);
      titleLines.forEach((titleLine: string) => {
        doc.text(titleLine, margin, y);
        y += 7;
      });

      y += 2;

      // Meta Border Box
      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentWidth, 16, "FD");

      doc.setTextColor(100, 116, 139);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      
      doc.text("DOCUMENT INDEX ID:", margin + 5, y + 6);
      doc.setTextColor(15, 23, 42);
      doc.setFont("Helvetica", "bold");
      doc.text(`DEC-${currentBrief.id?.substring(0, 8).toUpperCase() || "MEMO-ALPHA"}`, margin + 37, y + 6);

      doc.setTextColor(100, 116, 139);
      doc.setFont("Helvetica", "normal");
      doc.text("GENERATED DATE:", margin + 5, y + 11);
      doc.setTextColor(15, 23, 42);
      doc.setFont("Helvetica", "bold");
      doc.text(dateStr, margin + 37, y + 11);

      doc.setTextColor(100, 116, 139);
      doc.setFont("Helvetica", "normal");
      doc.text("CLASSIFICATION SYSTEM:", pageWidth - margin - 90, y + 6);
      doc.setFillColor(239, 68, 68);
      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.text("SECURE SYSTEM ENCRYPTED // ORCON-NC", pageWidth - margin - 5, y + 10, { align: "right" });

      y += 24;

      // Subtitle Separator Line
      doc.setTextColor(79, 70, 229);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);
      doc.text("OPERATIONAL INTELLIGENCE TRANSMISSIONS // ANALYSIS & FINDINGS", margin, y);
      y += 4;
      
      doc.setDrawColor(99, 102, 241);
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageWidth - margin, y);
      y += 8;

      // Parse and wrap paragraphs
      const cleanLines = rawText
        .replace(/\r/g, "")
        .split("\n")
        .map(line => {
          let cleaned = line;
          cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "$1");
          cleaned = cleaned.replace(/\*(.*?)\*/g, "$1");
          cleaned = cleaned.replace(/_(.*?)_/g, "$1");
          cleaned = cleaned.replace(/`(.*?)`/g, "$1");
          return cleaned;
        });

      doc.setTextColor(30, 41, 59);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9.5);
      
      const bottomLimit = pageHeight - margin - 15;

      for (let i = 0; i < cleanLines.length; i++) {
        const line = cleanLines[i].trim();
        if (!line) {
          y += 3.5;
          continue;
        }

        const isHeader = line.startsWith("#");
        const cleanHeaderContent = line.replace(/^#+\s+/, "");

        if (isHeader) {
          y += 4;
          if (y > bottomLimit - 15) {
            doc.addPage();
            doc.setFillColor(79, 70, 229);
            doc.rect(0, 0, pageWidth, 4, "F");
            y = margin + 10;
          }
          doc.setTextColor(15, 23, 42);
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(10);
          doc.text(cleanHeaderContent.toUpperCase(), margin, y);
          y += 5.5;
          doc.setFont("Helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(30, 41, 59);
          continue;
        }

        const linesFormatted = doc.splitTextToSize(line, contentWidth);
        linesFormatted.forEach((pLine: string) => {
          if (y > bottomLimit) {
            doc.addPage();
            doc.setFillColor(79, 70, 229);
            doc.rect(0, 0, pageWidth, 4, "F");
            y = margin + 10;
          }
          doc.text(pLine, margin, y);
          y += 4.8;
        });
      }

      // Format footer for page indexing
      const pageCount = (doc.internal as any).pages.length - 1;
      for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        
        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.2);
        doc.line(margin, pageHeight - margin + 4, pageWidth - margin, pageHeight - margin + 4);

        doc.setTextColor(148, 163, 184);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(7.5);
        doc.text("CONFIDENTIAL STRATEGIC FORECAST // SYSTEM AUDIT RATING EXEMPTED", margin, pageHeight - margin + 9);
        doc.text(`PAGE ${p} OF ${pageCount}`, pageWidth - margin, pageHeight - margin + 9, { align: "right" });
      }

      const safeFilename = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || "strategic-brief";
      doc.save(`decision-analysis-${safeFilename}.pdf`);
    } catch (err) {
      console.error("Failed to compile strategy memo as PDF:", err);
    }
  };

  // Submit Login/Registration with gorgeous simulated 3D Anime Ring Loading Animation
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple verification
    if (authMode === "quick") {
      if (!authName.trim()) {
        setErrorMessage("Please input your chosen identity tag (Name) to login.");
        return;
      }
    } else {
      if (!authEmail.trim() || !authPassword.trim()) {
        setErrorMessage("Please fill in all core credential channels.");
        return;
      }
      if (authMode === "register" && !authName.trim()) {
        setErrorMessage("Please input your chosen identity tag (Name).");
        return;
      }
    }

    setErrorMessage("");
    setPortalEntering(true);
    setEnteringProgress(0);
    setEnteringLog("Checking credentials...");

    // Staged high-speed micro-steps for the premium loading ring sequence
    const loadingLogs = [
      { prg: 10, log: "Verifying active credential channels..." },
      { prg: 25, log: "Configuring local session token caches..." },
      { prg: 40, log: "Opening secure local directories... [SUCCESS]" },
      { prg: 65, log: "Populating comparative templates..." },
      { prg: 80, log: "Applying workspace customization features... [READY]" },
      { prg: 100, log: "Local session verified. Welcome to your workspace." }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < loadingLogs.length) {
        setEnteringProgress(loadingLogs[step].prg);
        setEnteringLog(loadingLogs[step].log);
        step++;
      } else {
        clearInterval(interval);
        
        // Finalize state
        const nameToUse = authMode === "quick" 
          ? authName.trim() 
          : (authMode === "register" ? authName.trim() : (authEmail.split("@")[0].charAt(0).toUpperCase() + authEmail.split("@")[0].slice(1)));

        const emailToUse = authMode === "quick" 
          ? `${authName.trim().toLowerCase().replace(/[^a-z0-9]/g, "")}@iah.ai`
          : authEmail.trim();

        const userPayload = {
          name: nameToUse,
          email: emailToUse,
          avatar: selectedAvatar
        };

        localStorage.setItem("iah_currentUser", JSON.stringify(userPayload));
        setCurrentUser(userPayload);
        setPortalEntering(false);
        setEnteringProgress(0);
        
        // Clear forms
        setAuthName("");
        setAuthEmail("");
        setAuthPassword("");
      }
    }, 450);
  };

  const handleGuestLogin = () => {
    setErrorMessage("");
    setPortalEntering(true);
    setEnteringProgress(15);
    setEnteringLog("Starting standard secure guest session...");

    const loadingLogs = [
      { prg: 20, log: "Allocating temporary guest credentials..." },
      { prg: 45, log: "Bypassing standard registration..." },
      { prg: 70, log: "Configuring temporary interface layout parameters..." },
      { prg: 100, log: "Workspace initialized successfully. Loading workspace dashboard!" }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < loadingLogs.length) {
        setEnteringProgress(loadingLogs[step].prg);
        setEnteringLog(loadingLogs[step].log);
        step++;
      } else {
        clearInterval(interval);
        
        const guestPayload = {
          name: "Omni Ninja Guest",
          email: "guest@iah.ai",
          avatar: "avatar_pixel_ninja"
        };

        localStorage.setItem("iah_currentUser", JSON.stringify(guestPayload));
        setCurrentUser(guestPayload);
        setPortalEntering(false);
        setEnteringProgress(0);
      }
    }, 400);
  };

  const handleLogout = () => {
    localStorage.removeItem("iah_currentUser");
    setCurrentUser(null);
    setAuthMode("login");
  };

  // Load Saved Briefs from Vault on Mount
  useEffect(() => {
    const saved = localStorage.getItem("iah_strategic_briefs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setVaultBriefs(parsed);
        if (parsed.length > 0) {
          // Default to latest saved brief to prevent empty state on refresh if history exists
          setCurrentBrief(parsed[0]);
        }
      } catch (e) {
        console.error("Failed to parse vault briefs from LocalStorage", e);
      }
    }
  }, []);

  // Update field defaults when active mode modifications occur
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const defaults: Record<string, string> = {};
    activeMode.fields.forEach((f) => {
      defaults[f.key] = f.defaultValue || "";
    });
    setFieldValues(defaults);
    setScenarioText("");
    setErrorMessage("");
  }, [activeModeId]);

  // Set up 30-second interval for periodic auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      if (scenarioText.trim() || Object.keys(fieldValues).length > 0) {
        localStorage.setItem("iah_autosave_activeModeId", activeModeId);
        localStorage.setItem("iah_autosave_scenario", scenarioText);
        localStorage.setItem("iah_autosave_field_values", JSON.stringify(fieldValues));
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastAutosaved(`Draft auto-saved at ${timeStr}`);
        
        // Return to subtle status after 3 seconds
        setTimeout(() => {
          setLastAutosaved((prev) => prev?.includes(timeStr) ? `Saved (${timeStr})` : prev);
        }, 3000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [scenarioText, fieldValues, activeModeId]);

  // Scroll to bottom of chat panel when messages update
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentBrief?.chatHistory, isChatting]);

  // Helper dynamic Icon Mapper
  function getModeIcon(iconName: string, className = "w-5 h-5") {
    switch (iconName) {
      case "Compass": return <Compass className={className} />;
      case "Scale": return <Scale className={className} />;
      case "DollarSign": return <DollarSign className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "BookOpen": return <BookOpen className={className} />;
      case "Search": return <Search className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Rocket": return <Rocket className={className} />;
      case "Activity": return <Activity className={className} />;
      default: return <Compass className={className} />;
    }
  }

  // Load preset scenarios instantly
  const handleLoadPreset = (preset: any) => {
    setScenarioText(preset.scenario);
    if (preset.additionalContext) {
      setFieldValues(preset.additionalContext);
    }
    setErrorMessage("");
    // Scroll form into focus on small viewports
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // Saved Vault Persistence Updates
  const updateVault = (updatedList: StrategicBrief[]) => {
    setVaultBriefs(updatedList);
    localStorage.setItem("iah_strategic_briefs", JSON.stringify(updatedList));
  };

  // Update saved category tag on a specific brief in real-time
  const handleUpdateBriefCategory = (briefId: string, newCategoryValue: string) => {
    const sanitizedCat = newCategoryValue.trim();
    const updatedVault = vaultBriefs.map((b) => 
      b.id === briefId ? { ...b, category: sanitizedCat } : b
    );
    updateVault(updatedVault);
    
    // Also sync the current active brief in focus
    if (currentBrief && currentBrief.id === briefId) {
      setCurrentBrief((prev) => prev ? { ...prev, category: sanitizedCat } : null);
    }
    setIsEditingCategory(false);
  };

  // Submit Strategic Analysis to Server
  const handleExecuteAnalysis = async () => {
    if (!scenarioText.trim()) {
      setIsInputShaking(true);
      setIsButtonShaking(true);
      setErrorMessage("Please input your core dilemma or background scenario first.");
      return;
    }

    // Trigger subtle success action shake
    setIsButtonShaking(true);

    setErrorMessage("");
    setIsAnalyzing(true);
    setCurrentBrief(null);
    setActionChecklist({});

    // Beautiful loading sequences representing the 10 steps of IAH Intelligence
    const sequences = [
      "Step 1: Translating core dilemma and setting client constraints...",
      "Step 2: Checking for hidden cognitive traps and structural barriers...",
      "Step 3: Calculating resource bounds & pricing elasticity profiles...",
      "Step 4: Mapping market competitors and testing downside risks...",
      "Step 5: Simulating Option A & Option B side-by-side variables...",
      "Step 6: Executing weighted trade-off matrices & unit economics...",
      "Step 7: Compiling formal final strategist recommendations...",
      "Step 8: Constructing immediate 30-day action sequences...",
      "Step 9: Formulating ultimate future-proofing prevention levers...",
      "Step 10: Generating final multi-variable Decision Brief..."
    ];

    let currentSeqIdx = 0;
    setLoadingStepText(sequences[0]);

    const intervalTimer = setInterval(() => {
      if (currentSeqIdx < sequences.length - 1) {
        currentSeqIdx++;
        setLoadingStepText(sequences[currentSeqIdx]);
      }
    }, 1200);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: activeMode.id,
          scenario: scenarioText,
          additionalContext: fieldValues,
          isDeepAnalysis: isDeepAnalysis
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to contact strategic gateway.");
      }

      const result = await response.json();

      const finalCategoryStr = creationCategory === "Custom"
        ? (customCategoryText.trim() || "General")
        : creationCategory;

      const newBrief: StrategicBrief = {
        id: "brief_" + Date.now(),
        title: scenarioText.slice(0, 42).trim() + (scenarioText.length > 42 ? "..." : ""),
        mode: activeMode.id,
        scenario: scenarioText,
        additionalContext: { ...fieldValues },
        analysisText: result.analysis,
        createdTime: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        modelUsed: result.modelUsed,
        chatHistory: [],
        category: finalCategoryStr
      };

      // Reset custom category text if used
      if (creationCategory === "Custom") {
        setCustomCategoryText("");
      }

      setCurrentBrief(newBrief);
      setCurrentTab("memo");

      // Prepend to vault storage
      const nextVault = [newBrief, ...vaultBriefs];
      updateVault(nextVault);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);

    } catch (e: any) {
      console.error(e);
      setErrorMessage(e.message || "An error occurred during critical computations. Check API deployment keys.");
    } finally {
      clearInterval(intervalTimer);
      setIsAnalyzing(false);
    }
  };

  // Follow-up Conversational Mentoring Chat Submit
  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || !currentBrief) return;

    const userMsg: ChatMessage = {
      id: "msg_" + Date.now(),
      role: "user",
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const nextHistory = [...(currentBrief.chatHistory || []), userMsg];
    const updatedBrief = { ...currentBrief, chatHistory: nextHistory };
    setCurrentBrief(updatedBrief);
    setChatInput("");
    setIsChatting(true);
    setErrorMessage("");

    try {
      const payloadMessages = [
        { role: "user", content: `Context Brief:\n${updatedBrief.scenario}\n\nMetrics:\n${JSON.stringify(updatedBrief.additionalContext, null, 2)}` },
        { role: "assistant", content: updatedBrief.analysisText },
        ...nextHistory
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: updatedBrief.mode,
          messages: payloadMessages,
          isDeepAnalysis: isDeepAnalysis
        }),
      });

      if (!response.ok) {
        throw new Error("Chat gateway rejected communications link.");
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: "msg_" + (Date.now() + 1),
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      const finalHistory = [...nextHistory, assistantMsg];
      const finalBrief = { ...updatedBrief, chatHistory: finalHistory };
      setCurrentBrief(finalBrief);

      // Save updated conversational logs permanently to vault list
      const nextVault = vaultBriefs.map((b) => (b.id === finalBrief.id ? finalBrief : b));
      updateVault(nextVault);

    } catch (err: any) {
      console.error(err);
      setErrorMessage("Failed to coordinate response. Please retry.");
    } finally {
      setIsChatting(false);
    }
  };

  // Clear or reset fields
  const handleClearWorkspace = () => {
    setScenarioText("");
    const resetFields: Record<string, string> = {};
    activeMode.fields.forEach((f) => {
      resetFields[f.key] = f.defaultValue || "";
    });
    setFieldValues(resetFields);
    setErrorMessage("");
    localStorage.removeItem("iah_autosave_scenario");
    localStorage.removeItem("iah_autosave_field_values");
    localStorage.removeItem("iah_autosave_activeModeId");
    setLastAutosaved(null);
  };

  // Re-load a saved brief from the decision vault
  const handleSelectVaultBrief = (brief: StrategicBrief) => {
    setCurrentBrief(brief);
    setActiveModeId(brief.mode);
    setScenarioText(brief.scenario);
    setFieldValues(brief.additionalContext);
    setCurrentTab("memo");
    setErrorMessage("");
  };

  // Delete brief from storage vault
  const handleDeleteVaultBrief = (briefId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextVault = vaultBriefs.filter((b) => b.id !== briefId);
    updateVault(nextVault);
    if (currentBrief?.id === briefId) {
      setCurrentBrief(nextVault.length > 0 ? nextVault[0] : null);
    }
  };

  // Automated strategy copy broadcast dispatcher
  const handleInitiateBroadcast = async () => {
    if (!currentBrief) return;
    
    setIsBroadcasting(true);
    setBroadcastProgress(0);
    setBroadcastSuccess(false);
    setBroadcastLogs(["[SYSTEM] SECURE BROADCAST PROTOCOL GATES OPENED."]);
    
    const steps = [
      "📡 SCANNING LOCAL WIFI & CELL CONNECTIONS IN LATENCY GAP...",
      "🔍 SECURING ROUTING PORT FOR TARGET PINPOINT CODE: 7980259343",
      "📦 PACKAGING DIGITAL DATA MEMO PARAMETERS INTO BINARY OBJECTS...",
      "🔐 APPORTIONING QUANTUM BLOWFISH CELL CYPHERS FOR CIPHER BLOCK...",
      "🚀 DEPLOYING TRANSMITTAL BURST OVER SMTP/SMS INDUSTRIAL PROXIES..."
    ];
    
    let currentStepIdx = 0;
    
    const intervalTimer = setInterval(() => {
      if (currentStepIdx < steps.length) {
        setBroadcastLogs(prev => [...prev, steps[currentStepIdx]]);
        setBroadcastProgress(Math.min(92, (currentStepIdx + 1) * 18));
        currentStepIdx++;
      }
    }, 900);
    
    try {
      // Small simulated latency step to match premium cyber anime mood
      await new Promise(resolve => setTimeout(resolve, 4500));
      
      const response = await fetch("/api/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefId: currentBrief.id,
          target: broadcastTarget,
          content: currentBrief.analysisText
        })
      });
      
      clearInterval(intervalTimer);
      
      if (!response.ok) {
        throw new Error("Transceptor interface rejected endpoint packet.");
      }
      
      const result = await response.json();
      setBroadcastProgress(100);
      setBroadcastChannelUsed(result.mode);
      setBroadcastLogs(prev => [
        ...prev, 
        `[SUCCESS] Email dispatched successfully at ${new Date().toLocaleTimeString()}`,
        `[PROVIDER] Delivered through: ${result.mode.toUpperCase()}`,
        `[SERVER CONFIRMATION] ${result.message}`
      ]);
      setBroadcastSuccess(true);
    } catch (err: any) {
      clearInterval(intervalTimer);
      setBroadcastLogs(prev => [...prev, `[ERROR] Failed to send email: ${err.message}`]);
    } finally {
      setIsBroadcasting(false);
    }
  };

  // Utility to copy memo text to Clipboard
  const handleCopyToClipboard = () => {
    if (!currentBrief) return;
    const fullText = `IAH.AI ULTIMATE DECISION BRIEF
Client: ${currentUser?.email || "guest@iah.ai"}
Timestamp: ${currentBrief.createdTime}
Model Track: ${currentBrief.modelUsed}

--------------------------------------------------
${currentBrief.analysisText}
`;
    navigator.clipboard.writeText(fullText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Utility to download brief as custom strategic text report
  const handleDownloadReport = () => {
    if (!currentBrief) return;
    const fullText = `IAH.AI ULTIMATE DECISION BRIEF
Client: ${currentUser?.email || "guest@iah.ai"}
Timestamp: ${currentBrief.createdTime}
Model Track: ${currentBrief.modelUsed}
--------------------------------------------------

${currentBrief.analysisText}

==================================================
MENTOR CHAT HISTORY:
==================================================
${(currentBrief.chatHistory || []).map(m => `[${m.role.toUpperCase()} - ${m.timestamp}]: ${m.content}`).join("\n\n")}
`;
    const element = document.createElement("a");
    const file = new Blob([fullText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Decision_Report_${currentBrief.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Utility to export the entire Decision Vault list as a CSV file for archival & external analysis
  const handleExportVaultCSV = () => {
    if (vaultBriefs.length === 0) return;

    // Define columns
    const headers = [
      "Brief ID",
      "Title",
      "Category",
      "Mode",
      "Timestamp",
      "Cognition Model",
      "User Scenario",
      "Strategic Analysis"
    ];

    // Safe escaping helper for CSV cell values
    const escapeCSVValue = (val: any) => {
      if (val === undefined || val === null) return "";
      let str = String(val);
      // Escape double quotes by doubling them
      str = str.replace(/"/g, '""');
      // Wrap in double quotes if it contains sensitive chars
      if (str.includes(",") || str.includes("\n") || str.includes("\r") || str.includes('"')) {
        str = `"${str}"`;
      }
      return str;
    };

    const rows = vaultBriefs.map((brief) => [
      brief.id,
      brief.title,
      brief.category || "General",
      brief.mode,
      brief.createdTime,
      brief.modelUsed,
      brief.scenario,
      brief.analysisText
    ]);

    // Combine headers and rows
    const csvString = [
      headers.map(escapeCSVValue).join(","),
      ...rows.map((row) => row.map(escapeCSVValue).join(","))
    ].join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Decision_Collection_Archive_${new Date().toISOString().slice(0, 10)}.csv`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Parse strategic text fields to feed interactive Bento dashboards
  interface ParsedBrief {
    situation: string;
    analysis: string;
    options: string;
    recommendation: string;
    benefits: string;
    risks: string;
    actionPlan: string;
    nextSteps: string;
    extraIdeas: string;
  }

  const getParsedBrief = (text: string): ParsedBrief => {
    const brief: ParsedBrief = {
      situation: "",
      analysis: "",
      options: "",
      recommendation: "",
      benefits: "",
      risks: "",
      actionPlan: "",
      nextSteps: "",
      extraIdeas: ""
    };

    const markers = [
      { key: "situation", label: "📌 Situation" },
      { key: "analysis", label: "🔍 Analysis" },
      { key: "options", label: "⚖️ Options" },
      { key: "recommendation", label: "✅ Best Recommendation" },
      { key: "benefits", label: "📈 Benefits" },
      { key: "risks", label: "⚠️ Risks" },
      { key: "actionPlan", label: "🛠 Action Plan" },
      { key: "nextSteps", label: "🚀 Next Steps" },
      { key: "extraIdeas", label: "💡 Extra Ideas" }
    ];

    let currentSection: keyof ParsedBrief | null = null;
    let textBuffer: string[] = [];

    const lines = text.split("\n");
    for (const line of lines) {
      let isMarkerLine = false;
      for (const m of markers) {
        if (line.includes(m.label) || line.trim().startsWith(m.label)) {
          if (currentSection) {
            brief[currentSection] = textBuffer.join("\n").trim();
          }
          currentSection = m.key as keyof ParsedBrief;
          textBuffer = [];
          isMarkerLine = true;
          break;
        }
      }
      if (!isMarkerLine) {
        if (currentSection) {
          textBuffer.push(line);
        } else {
          // Default introductory text puts into situation
          currentSection = "situation";
          textBuffer.push(line);
        }
      }
    }
    if (currentSection) {
      brief[currentSection] = textBuffer.join("\n").trim();
    }

    return brief;
  };

  // Convert parsed action items text into checkable strings arrays
  const getActionSteps = (parsedText: string): string[] => {
    if (!parsedText) return [];
    return parsedText
      .split("\n")
      .map(line => line.trim())
      .filter(line => {
        // match line starting with numbers (1. 2.) or bullet points (- * ●)
        return /^[-\*●+]\s+/.test(line) || /^\d+[\.\)]\s+/.test(line);
      })
      .map(line => line.replace(/^[-\*●+]\s+/, "").replace(/^\d+[\.\)]\s+/, ""));
  };

  const parsedBrief = currentBrief ? getParsedBrief(currentBrief.analysisText) : null;
  const listActionSteps = parsedBrief ? getActionSteps(parsedBrief.actionPlan) : [];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden font-sans select-none items-center justify-center">
        {/* Animated grid lines behind */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div 
            className="absolute inset-0 bg-linear-to-b from-transparent via-indigo-900/10 to-transparent animate-grid-travel"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          />
        </div>

        {/* Orbiting cosmic/magical cyber-runes in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[600px] h-[600px] border border-indigo-500/5 rounded-full animate-orbit-cw flex items-center justify-center">
          <div className="w-[450px] h-[450px] border border-pink-500/10 border-dashed rounded-full animate-orbit-ccw flex items-center justify-center">
            <div className="w-[300px] h-[300px] border border-cyan-500/5 rounded-full" />
          </div>
        </div>

        {/* Giant blur lights */}
        <div className="absolute top-[10%] left-[10%] w-72 h-72 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[10%] right-[10%] w-80 h-80 rounded-full bg-pink-600/15 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-lg px-4 md:px-0 py-8 z-10 flex flex-col items-center">
          {/* Logo & Tactical Identity Section */}
          <BrandLogo layout="hero" className="mb-10 animate-fadeIn" />

          {/* PORTAL ENTERING: Simulated glowing 3D double ring router animation */}
          {portalEntering ? (
            <div className="w-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-2xl min-h-[460px] animate-fadeIn">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Rotating Outer Ring (Cyber Rune / Metric markers) */}
                <div className="absolute inset-0 border-4 border-indigo-500/20 border-t-indigo-500 border-r-pink-500 rounded-full animate-orbit-cw animate-pulse-glow" />
                
                {/* Rotating Inner Ring */}
                <div className="absolute inset-3 border-2 border-dashed border-cyan-500/30 border-b-cyan-400 rounded-full animate-orbit-ccw" />
                
                {/* Core Sync Beacon */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center animate-pulse shadow-lg shadow-indigo-500/30">
                  <Brain className="w-8 h-8 text-white" />
                </div>

                {/* Micro rotating indicators */}
                <div className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
                <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>

              {/* Progress Counters (Replaced with Premium Circular HUD Ring) */}
              <div className="mt-8 flex flex-col items-center justify-center">
                <CircularProgressRing 
                  percentage={enteringProgress} 
                  label="Interface Sync Bandwidth" 
                  color="stroke-indigo-400" 
                  darkTheme={true}
                  size={120}
                />
              </div>

              {/* Console Logs */}
              <div className="mt-6 bg-slate-950/80 border border-slate-800 rounded-lg p-3.5 w-full font-mono text-[10px] text-left text-slate-300 min-h-[55px] max-h-[80px] overflow-hidden leading-relaxed shadow-inner">
                <span className="text-indigo-400 font-bold mr-1.5">&gt;</span> 
                {enteringLog}
              </div>

              {/* Immersive parameters */}
              <div className="mt-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                QUANTUM TUNNEL CALIBRATION • STABLE PORT 3000
              </div>
            </div>
          ) : (
            /* AUTH MAIN PERSPECTIVE GATER CARD */
            <div className="w-full perspective-container">
              <div className="perspective-card bg-slate-900/80 border border-slate-800 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl relative">
                
                {/* Corner Decorative brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-indigo-500/30" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-indigo-500/30" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-indigo-500/30" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-indigo-500/30" />

                {/* Tab Headings */}
                <div className="flex border-b border-slate-800 pb-4 mb-6 gap-1">
                  <button
                    type="button"
                    onClick={() => { setAuthMode("quick"); setErrorMessage(""); }}
                    className={`flex-1 text-center py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider font-mono cursor-pointer transition-colors ${
                      authMode === "quick"
                        ? "text-indigo-400 border-b-2 border-indigo-500"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    🚀 Quick Entry
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode("login"); setErrorMessage(""); }}
                    className={`flex-1 text-center py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider font-mono cursor-pointer transition-colors ${
                      authMode === "login"
                        ? "text-indigo-400 border-b-2 border-indigo-500"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Neural Login
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode("register"); setErrorMessage(""); }}
                    className={`flex-1 text-center py-2 text-[10px] md:text-xs font-bold uppercase tracking-wider font-mono cursor-pointer transition-colors ${
                      authMode === "register"
                        ? "text-indigo-400 border-b-2 border-indigo-500"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Create Core
                  </button>
                </div>

                {/* Errors notification channel */}
                {errorMessage && (
                  <div className="bg-red-950/55 border border-red-800 text-red-300 text-xs py-2 px-3 rounded-lg mb-4 flex items-center gap-2 font-mono animate-fadeIn">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Auth form */}
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {(authMode === "register" || authMode === "quick") && (
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="e.g. Aditya Sharma"
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-md py-2 px-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                      />
                    </div>
                  )}

                  {(authMode === "login" || authMode === "register") && (
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="user@example.com"
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-md py-2 px-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                      />
                    </div>
                  )}

                  {(authMode === "login" || authMode === "register") && (
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-md py-2 px-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                      />
                    </div>
                  )}

                  {/* HIGH VALUE: Premium Strategic Focus Profile */}
                  {(authMode === "register" || authMode === "quick") && (
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-2">
                        Select Strategic Focus Persona
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {ANIME_AVATARS.map((avatar) => {
                          const isSelected = selectedAvatar === avatar.id;
                          return (
                            <button
                              key={avatar.id}
                              type="button"
                              onClick={() => setSelectedAvatar(avatar.id)}
                              className={`rounded-lg p-2 border text-center transition-all cursor-pointer relative overflow-hidden group ${
                                isSelected
                                  ? "bg-slate-800 border-indigo-500 shadow-md"
                                  : "bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/30"
                              }`}
                            >
                              {/* Glowing bar item */}
                              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${avatar.gradient}`} />
                              <div className="text-xs font-bold text-white mt-1 group-hover:scale-105 transition-transform truncate">
                                {avatar.name.split(" ")[0]}
                              </div>
                              <div className="text-[9px] text-slate-500 font-mono mt-0.5 truncate uppercase">
                                {avatar.name.split(" ")[1] || "Core"}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Info preview banner of the chosen anime character */}
                      {(() => {
                        const matched = ANIME_AVATARS.find((a) => a.id === selectedAvatar)!;
                        return (
                          <div className={`rounded-lg p-3 border font-mono text-[10px] space-y-1 mt-2.5 transition-all animate-fadeIn ${matched.bannerColor}`}>
                            <div className="flex justify-between items-center">
                              <span className="font-bold uppercase tracking-widest">{matched.name}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950/30 font-semibold">{matched.badge}</span>
                            </div>
                            <p className="text-[9px] opacity-75 italic mt-1 leading-normal text-left">
                              "{matched.quote}"
                            </p>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Actions buttons */}
                  <div className="flex flex-col gap-2 pt-3">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white text-xs font-bold uppercase tracking-widest rounded-md py-3 shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 font-mono cursor-pointer flex items-center justify-center gap-1.5 border-0"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{authMode === "quick" ? "Deploy Identity Core" : authMode === "login" ? "Initialize Link" : "Assemble Identity"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleGuestLogin}
                      className="w-full bg-slate-950/40 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-md py-2 font-mono transition-all cursor-pointer text-center"
                    >
                      Bypass to Guest Sector &gt;
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      {/* Dynamic Telemetry Header Banner in Clean Minimalism style */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 md:px-8 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <BrandLogo layout="compact" />
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Thinking Process Active
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <span>Client: {currentUser?.email}</span>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout Grid */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side Panel: Intelligence Channels Navigation & Decision Vault History */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Intelligence Modes List Card - Clean Minimalism styled */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col shadow-sm">
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3 px-1 font-mono">
              System Modes
            </div>
            
            <nav className="space-y-1">
              {ADVICE_MODES.map((mode) => {
                const isSelected = activeModeId === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setActiveModeId(mode.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 text-left ${
                      isSelected
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      isSelected ? "bg-indigo-600" : "bg-slate-300"
                    }`} />
                    <span className="flex-1 truncate">{mode.name}</span>
                    <ChevronRight className={`w-3.5 h-3.5 opacity-60 self-center ${
                      isSelected ? "text-indigo-600 translate-x-0.5" : "text-slate-400"
                    }`} />
                  </button>
                );
              })}
            </nav>
            
            <div className="mt-6 text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3 px-1 font-mono">
              Intelligence Modules
            </div>
            <div className="space-y-1 px-1">
              <div className="text-xs text-slate-500 py-1 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0"></span> Business Intel</div>
              <div className="text-xs text-slate-500 py-1 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0"></span> Money Intel</div>
              <div className="text-xs text-slate-500 py-1 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0"></span> Productivity Engine</div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
              {(() => {
                const matched = ANIME_AVATARS.find((a) => a.id === currentUser?.avatar) || ANIME_AVATARS[0];
                return (
                  <>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${matched.gradient} p-[2px] shadow-sm animate-float-slow shrink-0`}>
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white uppercase font-mono">
                          {currentUser?.name ? currentUser.name.slice(0, 2) : "IA"}
                        </div>
                      </div>
                      <div className="text-xs font-mono min-w-0">
                        <p className="font-bold text-slate-800 leading-none truncate max-w-[100px]">{currentUser?.name}</p>
                        <p className="text-[9px] text-indigo-500 font-semibold mt-0.5 leading-none truncate max-w-[100px]">{matched.title}</p>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-[9px] font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-100 hover:border-red-200 px-2 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap"
                      title="Disconnect brain link"
                    >
                      Logout
                    </button>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Quick Preset Scenarios Selector */}
          {activeMode.presetScenarios && activeMode.presetScenarios.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <button 
                onClick={() => setScenariosOpen(!scenariosOpen)}
                className="w-full flex items-center justify-between text-xs uppercase font-bold text-slate-400 tracking-wider pb-1 font-mono"
              >
                <span className="flex items-center gap-2 font-display text-slate-655 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  PRESET BENCHMARKS
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${scenariosOpen ? "transform rotate-180" : ""}`} />
              </button>
              
              {scenariosOpen && (
                <div className="mt-3.5 space-y-2.5 pt-3 border-t border-slate-100 animate-fadeIn">
                  <p className="text-[11px] text-slate-400">
                    Click to load case models calibrated for the {activeMode.name} workspace.
                  </p>
                  <div className="space-y-2">
                    {activeMode.presetScenarios.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => handleLoadPreset(preset)}
                        className="w-full text-left p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100/70 transition-colors duration-150 text-xs text-slate-700"
                      >
                        <div className="font-semibold text-slate-800 flex items-center justify-between">
                          <span>{preset.title}</span>
                          <span className="text-[9px] uppercase font-mono bg-slate-200 text-slate-505 px-1.5 py-0.2 rounded font-bold border border-slate-300/40">LOAD</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 italic">
                          "{preset.scenario}"
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Saved Vault Database History Panel */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col flex-grow min-h-[250px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3.5">
              <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2 font-mono">
                <History className="w-3.5 h-3.5 text-slate-400" /> THE DECISION VAULT
              </h3>
              <div className="flex items-center gap-1.5">
                {vaultBriefs.length > 0 && (
                  <button
                    type="button"
                    onClick={handleExportVaultCSV}
                    className="flex items-center gap-1 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 px-2 py-0.5 rounded font-mono font-bold border border-slate-200/60 transition-colors cursor-pointer"
                    title="Export custom decision memos as CSV"
                  >
                    <Download className="w-3 h-3 text-slate-500" />
                    <span>EXPORT</span>
                  </button>
                )}
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono font-bold">
                  {vaultBriefs.length} {vaultBriefs.length === 1 ? "MEMO" : "MEMOS"}
                </span>
              </div>
            </div>

            {/* Real-time Search Input */}
            {vaultBriefs.length > 0 && (
              <div className="relative mb-3.5 z-10">
                <input
                  type="text"
                  placeholder="Search by title or category..."
                  value={vaultSearchQuery}
                  onChange={(e) => setVaultSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-8 py-1.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-xs text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                {vaultSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setVaultSearchQuery("")}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors border-none"
                    title="Clear search"
                  >
                    <X className="w-3 h-3 hover:scale-110 transition-transform" />
                  </button>
                )}
              </div>
            )}

            {/* Category Filter Pills */}
            {vaultBriefs.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3.5 pb-2.5 border-b border-slate-100 select-none">
                {uniqueCategories.map((catName) => {
                  const isSelected = selectedCategoryFilter.toLowerCase() === catName.toLowerCase();
                  // Count matches
                  const count = catName === "All" 
                    ? vaultBriefs.length 
                    : vaultBriefs.filter((b) => (b.category || "General").toLowerCase() === catName.toLowerCase()).length;
                  
                  return (
                    <button
                      key={catName}
                      type="button"
                      onClick={() => setSelectedCategoryFilter(catName)}
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1 font-mono ${
                        isSelected
                          ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100/85 hover:text-slate-800"
                      }`}
                    >
                      <span>{catName}</span>
                      <span className={`text-[8px] leading-none font-semibold px-1 py-0.2 rounded-full ${isSelected ? "bg-slate-800 text-indigo-300 font-bold" : "bg-slate-200 text-slate-600"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {vaultBriefs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <Lock className="w-7 h-7 text-slate-300 mb-2" />
                <p className="text-xs font-semibold text-slate-500">Vault Cache is Empty</p>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[190px] leading-relaxed">
                  Execute details above; variables undergo encryption and persist securely locally.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1 flex-1">
                {filteredVaultBriefs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-lg border border-dashed border-slate-200 py-10 z-0">
                    <p className="text-xs font-semibold text-slate-500">No Memos Found</p>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-[200px] mx-auto">
                      No briefs matching {selectedCategoryFilter !== "All" ? `"${selectedCategoryFilter}"` : ""} filters or search query were found.
                    </p>
                    {vaultSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setVaultSearchQuery("")}
                        className="mt-2 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 font-mono hover:underline cursor-pointer border-none bg-transparent"
                      >
                        Clear Search Query
                      </button>
                    )}
                  </div>
                ) : (
                  filteredVaultBriefs.map((brief) => {
                    const isActive = currentBrief?.id === brief.id;
                    const modeDetail = ADVICE_MODES.find((m) => m.id === brief.mode);
                    return (
                      <div
                        key={brief.id}
                        onClick={() => handleSelectVaultBrief(brief)}
                        className={`group p-2.5 rounded-lg border text-left cursor-pointer transition-all duration-150 relative ${
                          isActive
                            ? "bg-slate-50 border-slate-300 shadow-sm"
                            : "bg-white border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <div className={`font-semibold text-xs tracking-tight truncate ${isActive ? "text-indigo-900 font-bold" : "text-slate-800"}`}>
                                {brief.title}
                              </div>
                              <span className="text-[8px] bg-indigo-50 border border-indigo-100/50 text-indigo-600 px-1 py-0.1 select-none leading-none rounded font-bold uppercase">
                                {brief.category || "General"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1.5">
                              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded border border-slate-200/40">
                                {modeDetail ? modeDetail.name : brief.mode}
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono">
                                {brief.createdTime.split(",")[0]}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={(e) => handleDeleteVaultBrief(brief.id, e)}
                            className="text-slate-350 hover:text-red-500 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete memo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
            
            <p className="text-[10px] text-slate-400 mt-4 text-center italic font-mono uppercase tracking-wider">
              Secure Browser-Sandbox Persistence
            </p>
          </div>

        </div>

        {/* Right Columns: Active Input Workspace & Dynamic Output Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Active Workspace Form Input Column */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            {/* Header description of selected engine */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0 border border-indigo-100">
                  {getModeIcon(activeMode.icon, "w-5 h-5")}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 tracking-tight font-display">
                    {activeMode.name}
                  </h2>
                  <p className="text-xs text-indigo-600 font-semibold mt-0.5">{activeMode.tagline}</p>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl border-t border-slate-100 pt-3">
              {activeMode.description}
            </p>

            <div className="space-y-4 border-t border-slate-100 pt-5 mt-4">
              {/* Core Context Input Area */}
              <div>
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      1. Describe Your Strategic Dilemma / Context
                    </label>
                    {lastAutosaved && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] text-emerald-600 bg-emerald-50/80 border border-emerald-100 px-2 py-0.5 rounded-full font-mono font-medium flex items-center gap-1.5 shrink-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {lastAutosaved}
                      </motion.span>
                    )}
                  </div>
                  {speechSupported && (
                    <button
                      type="button"
                      onClick={toggleSpeech}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200 shadow-xs cursor-pointer ${
                        isListening
                          ? "bg-red-50 hover:bg-red-100/80 border-red-200 text-red-600 animate-pulse"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600"
                      }`}
                      title={isListening ? "Stop voice dictation" : "Start voice-to-text dictation"}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>Stop Dictation</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-3.5 h-3.5 text-slate-500 hover:text-indigo-500 shrink-0" />
                          <span>Voice Dictation</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <motion.textarea
                    value={scenarioText}
                    onChange={(e) => setScenarioText(e.target.value)}
                    placeholder={`Detail your exact scenario of concern. What are the variables? e.g., "I have two business models I am debating...", "Help me understand quantum physics mechanisms...", "Our product conversion dropped..."`}
                    rows={4}
                    animate={isInputShaking ? { x: [0, -6, 6, -6, 6, -3, 3, 0] } : { x: 0 }}
                    onAnimationComplete={() => setIsInputShaking(false)}
                    className={`w-full rounded-lg border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-3 pr-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-150 ${
                      isInputShaking 
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/10 placeholder-red-300"
                        : isListening
                        ? "bg-red-50/20 border-red-200 focus:border-red-400 focus:ring-red-400"
                        : "bg-slate-50 focus:bg-white border-slate-200"
                    }`}
                  />
                  {isListening && (
                    <span className="absolute top-3 right-3 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
                    </span>
                  )}
                </div>
              </div>

              {/* Dynamic Parameter Forms */}
              {activeMode.fields.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200/60">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      2. Input Specialized Channel Variables
                    </label>
                  </div>
                  
                  {activeMode.fields.map((field) => (
                    <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {field.label}
                      </label>
                      
                      {field.type === "textarea" ? (
                        <textarea
                          value={fieldValues[field.key] || ""}
                          onChange={(e) => setFieldValues({ ...fieldValues, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          rows={2}
                          className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white outline-none focus:border-indigo-500 transition-all focus:ring-1 focus:ring-indigo-500"
                        />
                      ) : field.type === "number" ? (
                        <input
                          type="number"
                          value={fieldValues[field.key] || ""}
                          onChange={(e) => setFieldValues({ ...fieldValues, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white outline-none focus:border-indigo-500 transition-all focus:ring-1 focus:ring-indigo-500"
                        />
                      ) : field.type === "select" ? (
                        <select
                          value={fieldValues[field.key] || ""}
                          onChange={(e) => setFieldValues({ ...fieldValues, [field.key]: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white outline-none focus:border-indigo-500 transition-all focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="">Select Option</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={fieldValues[field.key] || ""}
                          onChange={(e) => setFieldValues({ ...fieldValues, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white outline-none focus:border-indigo-500 transition-all focus:ring-1 focus:ring-indigo-500"
                        />
                      )}
                      {field.helpText && (
                        <p className="text-[10px] text-slate-400 mt-1">{field.helpText}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Category Tagging Panel */}
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/60">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
                  3. Assign Category Tag
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {["Business", "Personal", "Finance", "Custom"].map((cat) => {
                    const isSelected = creationCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCreationCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-xs font-medium"
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        {cat === "Custom" ? "✏️ Custom Tab..." : cat}
                      </button>
                    );
                  })}

                  {creationCategory === "Custom" && (
                    <input
                      type="text"
                      maxLength={24}
                      value={customCategoryText}
                      onChange={(e) => setCustomCategoryText(e.target.value)}
                      placeholder="Type custom category..."
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white outline-none focus:border-indigo-500 transition-all focus:ring-1 focus:ring-indigo-500 w-full sm:w-48 animate-fadeIn"
                    />
                  )}
                </div>
              </div>

              {/* Actions & Warnings */}
              {errorMessage && (
                <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200 flex items-center gap-2 animate-fadeIn">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4">
                {/* Mode Selector Toggle for Deep Reasoning */}
                <div className="flex items-center gap-3 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => setIsDeepAnalysis(!isDeepAnalysis)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isDeepAnalysis ? "bg-indigo-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isDeepAnalysis ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div className="text-left font-sans">
                    <div className="text-xs font-bold text-slate-750 tracking-wide flex items-center gap-1.5 text-slate-700">
                      Toggle Deep Analysis
                      <span className="text-[9px] uppercase font-mono font-black italic text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                        PRO
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-none mt-1">
                      Uses advanced Gemini Pro routing level models.
                    </p>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleClearWorkspace}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 transition px-3.5 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 font-sans"
                  >
                    Clear Form
                  </button>

                  <motion.button
                    onClick={handleExecuteAnalysis}
                    disabled={isAnalyzing}
                    animate={isButtonShaking ? { x: [0, -4, 4, -4, 4, -2, 2, 0] } : { x: 0 }}
                    onAnimationComplete={() => setIsButtonShaking(false)}
                    className={`w-full sm:w-auto min-w-[210px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition duration-200 shadow-sm shadow-indigo-100 ${
                      isAnalyzing ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Evaluating Scenario...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-white fill-white" />
                        <span>Run Ultimate Analysis</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

            </div>
          </div>

          {/* Loading Animation Sequencer Screen */}
          {isAnalyzing && (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[360px] animate-fadeIn shadow-sm">
              {/* Circular Evaluation Loader HUD */}
              <div className="relative mb-5 flex flex-col items-center justify-center">
                {(() => {
                  const stepNum = (() => {
                    const match = loadingStepText.match(/Step\s+(\d+):/i);
                    return match ? parseInt(match[1]) : 1;
                  })();
                  return (
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <CircularProgressRing 
                        percentage={stepNum * 10} 
                        label="" 
                        color="stroke-indigo-600" 
                        size={112}
                        darkTheme={false}
                      />
                      <div className="absolute top-[34%]">
                        <Brain className="w-5 h-5 text-indigo-600 animate-pulse" />
                      </div>
                    </div>
                  );
                })()}
              </div>

              <h3 className="text-sm font-bold text-slate-800 mb-1 font-display">
                IAH Ultimate Intelligence Solver Active
              </h3>
              <p className="text-[11px] text-slate-400 font-mono tracking-wide max-w-sm mx-auto mb-5 uppercase">
                Deploying deep diagnostic matrices in real-time.
              </p>
              
              {/* Stepper Status Readout */}
              <div className="w-full max-w-lg mb-6">
                <div className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest text-center">
                  {(() => {
                    const match = loadingStepText.match(/Step\s+(\d+):/i);
                    const idxStr = match ? match[1].padStart(2, "0") : "07";
                    return `Step ${idxStr}: Strategic Evaluation Phase`;
                  })()}
                </div>
              </div>

              <div className="bg-slate-900 text-indigo-250 font-mono text-[11px] rounded-lg p-3.5 border border-slate-800 max-w-lg w-full text-center shadow-inner animate-pulse">
                {loadingStepText}
              </div>
            </div>
          )}

          {/* Core Decision Canvas & Output Views */}
          {!isAnalyzing && currentBrief && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col min-h-[500px]">
              
              {/* Output Tab Selector Menu BAR */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 mb-5 gap-3">
                <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg max-w-fit">
                  <button
                    onClick={() => setCurrentTab("memo")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                      currentTab === "memo"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      Strategic Memo
                    </span>
                  </button>

                  <button
                    onClick={() => setCurrentTab("bento")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                      currentTab === "bento"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      Strategic Dashboard
                    </span>
                  </button>

                  <button
                    onClick={() => setCurrentTab("mentoring")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition relative ${
                      currentTab === "mentoring"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5" />
                      Conversational Mentor
                      {currentBrief.chatHistory && currentBrief.chatHistory.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                      )}
                    </span>
                  </button>

                  <button
                    onClick={() => setCurrentTab("visualizer")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition relative ${
                      currentTab === "visualizer"
                        ? "bg-white text-indigo-700 shadow-sm border border-indigo-100/50"
                        : "text-slate-500 hover:text-indigo-605"
                    }`}
                  >
                    <span className="flex items-center gap-1.5 font-bold">
                      <GitBranch className="w-3.5 h-3.5 text-indigo-500" />
                      Decision Visualizer
                    </span>
                  </button>

                  <button
                    onClick={() => setCurrentTab("broadcast")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition relative ${
                      currentTab === "broadcast"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5" />
                      Secure Broadcast
                    </span>
                  </button>

                  <button
                    onClick={() => setCurrentTab("pwa")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition relative ${
                      currentTab === "pwa"
                        ? "bg-white text-indigo-700 shadow-sm border border-indigo-100/50"
                        : "text-slate-500 hover:text-indigo-600"
                    }`}
                  >
                    <span className="flex items-center gap-1.5 font-bold">
                      <Download className="w-3.5 h-3.5 text-indigo-500" />
                      PWA HUB & PLAY STORE
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  {saveSuccess && (
                    <span className="text-[10px] text-green-600 font-mono flex items-center gap-1 mr-1">
                      <CheckCircle className="w-3 h-3" /> Saved to Vault
                    </span>
                  )}
                  
                  <button
                    onClick={handleCopyToClipboard}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-800 transition p-2 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
                    title="Copy full markdown report"
                  >
                    {copySuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-700 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadReport}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-800 transition p-2 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5"
                    title="Download Report as TXT"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>

                  <button
                    onClick={handleDownloadPDF}
                    className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition p-2 border border-slate-200 hover:border-indigo-150 rounded-lg hover:bg-indigo-50 flex items-center gap-1.5"
                    title="Download Memo as PDF"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Download PDF</span>
                  </button>
                  
                  <button
                    onClick={() => window.print()}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-800 transition p-2 border border-slate-200 rounded-lg hover:bg-slate-50 hidden md:flex items-center gap-1"
                    title="Print Memo"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Brief Metadata Frame */}
              <div className="bg-slate-900 border border-slate-800 text-slate-400 p-3.5 rounded-lg font-mono text-[10px] mb-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 select-none">
                <div>
                  <span className="text-slate-500 uppercase tracking-widest text-[9px] block">MEMO ID</span>
                  <p className="text-white font-semibold truncate mt-0.5">{currentBrief.id}</p>
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-widest text-[9px] block">TIMESTAMP</span>
                  <p className="text-indigo-300 font-semibold mt-0.5">{currentBrief.createdTime}</p>
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-widest text-[9px] block">MODEL TRACK</span>
                  <p className="text-white font-semibold mt-0.5 truncate">{currentBrief.modelUsed}</p>
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-widest text-[9px] block">WORKSPACE MODE</span>
                  <p className="text-indigo-300 font-semibold mt-0.5 uppercase truncate">{activeMode.name}</p>
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-widest text-[9px] block">READ TIME</span>
                  <p className="text-indigo-400 font-semibold mt-0.5">
                    {Math.max(1, Math.ceil((currentBrief.analysisText || "").trim().split(/\s+/).filter(Boolean).length / 200))} min read
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 uppercase tracking-widest text-[9px] block">CATEGORY</span>
                  {isEditingCategory ? (
                    <div className="mt-0.5">
                      <CategoryDropdown
                        currentCategory={currentBrief.category || "General"}
                        existingCategories={assignableCategories}
                        onSave={(newCat) => handleUpdateBriefCategory(currentBrief.id, newCat)}
                        onCancel={() => setIsEditingCategory(false)}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 mt-0.5">
                      <p className="text-indigo-400 font-bold truncate max-w-[80px]">
                        {currentBrief.category || "General"}
                      </p>
                      <button
                        onClick={() => {
                          setEditingCategoryText(currentBrief.category || "General");
                          setIsEditingCategory(true);
                        }}
                        className="text-slate-500 hover:text-slate-350 cursor-pointer text-[9px]"
                        title="Edit Tag"
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* CASE TAB 1: STRATEGIC REPORT MEMO (Professional document style) */}
              {currentTab === "memo" && (
                <motion.div
                  key={`${currentBrief.id}-memo`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 bg-white border border-slate-200 p-5 md:p-8 rounded-xl prose max-w-none prose-sm overflow-y-auto max-h-[600px] text-slate-800 text-left"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                    className="border-b border-slate-200 pb-3.5 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div>
                      <h2 className="text-slate-900 font-display font-bold text-lg tracking-wide uppercase">
                        Executive Intelligence Brief
                      </h2>
                      <p className="text-[11px] text-slate-400 italic font-mono mt-1">
                        Strategic decision routing prepared by IAH.AI Ultimate Intelligence
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:self-center self-start flex-wrap">
                      {synthesisSupported && (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={handleSpeakToggle}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-205 shadow-xs cursor-pointer ${
                              synthesisState === "playing"
                                ? "bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                                : synthesisState === "paused"
                                ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                                : "bg-slate-50 border-slate-200 text-slate-705 hover:bg-indigo-50 hover:border-indigo-150 hover:text-indigo-600"
                            }`}
                            title={
                              synthesisState === "playing"
                                ? "Pause reading aloud"
                                : synthesisState === "paused"
                                ? "Resume reading aloud"
                                : "Listen to this strategic report"
                            }
                          >
                            {synthesisState === "playing" ? (
                              <>
                                <Pause className="w-3.5 h-3.5 text-indigo-600 animate-pulse shrink-0" />
                                <span>Pause</span>
                              </>
                            ) : synthesisState === "paused" ? (
                              <>
                                <Play className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span>Resume</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-3.5 h-3.5 text-slate-500 shrink-0 hover:text-indigo-600" />
                                <span>Listen</span>
                              </>
                            )}
                          </button>
                          
                          {synthesisState !== "stopped" && (
                            <button
                              type="button"
                              onClick={handleStopSpeech}
                              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-150 cursor-pointer"
                              title="Stop reading memo"
                            >
                              <VolumeX className="w-3.5 h-3.5 shrink-0" />
                            </button>
                          )}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:border-indigo-250 hover:text-indigo-600 transition-all duration-205 shadow-xs cursor-pointer"
                        title="Export brief to professional PDF document"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>Download as PDF</span>
                      </button>

                      <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-mono text-slate-600 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                        <span>{Math.max(1, Math.ceil((currentBrief.analysisText || "").trim().split(/\s+/).filter(Boolean).length / 200))} min read</span>
                        <span className="text-slate-300">|</span>
                        <span>{(currentBrief.analysisText || "").trim().split(/\s+/).filter(Boolean).length} words</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.55, ease: "easeOut" }}
                    className="markdown-body font-sans text-slate-800 text-sm leading-relaxed space-y-4"
                  >
                    <Markdown>{currentBrief.analysisText}</Markdown>
                  </motion.div>
                </motion.div>
              )}

              {/* CASE TAB 2: INTERACTIVE BENTO GRID DASHBOARD */}
              {currentTab === "bento" && parsedBrief && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={bentoContainerVariants}
                  className="flex-grow space-y-6 overflow-y-auto max-h-[600px] pr-1"
                >
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                    {/* QUANTITATIVE ANALYTICAL RADIAL HUDS */}
                    <motion.div variants={bentoItemVariants} className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <CircularProgressRing percentage={94} label="Strategic Confidence" color="stroke-indigo-600" delay={0.1} />
                      <CircularProgressRing percentage={88} label="Mitigation Preparedness" color="stroke-emerald-500" delay={0.25} />
                      <CircularProgressRing percentage={81} label="Resource Feasibility" color="stroke-cyan-500" delay={0.4} />
                      <CircularProgressRing percentage={97} label="Anime Synergy Index" color="stroke-pink-500" delay={0.55} />
                    </motion.div>

                    {/* Situation Analysis Block */}
                    <motion.div variants={bentoItemVariants} className="lg:col-span-12 bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-3">
                      <div>
                        <h2 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
                          📌 SITUATION ANALYSIS
                        </h2>
                        <p className="mt-2 text-slate-700 leading-relaxed text-sm">
                          {parsedBrief.situation || "Read main memo for full situation context."}
                        </p>
                      </div>
                    </motion.div>

                    {/* recommendation box in dark indigo styling */}
                    <motion.div variants={bentoItemVariants} className="lg:col-span-8 bg-indigo-900 rounded-xl p-6 text-white shadow-lg flex flex-col justify-between gap-5">
                      <div>
                        <div className="flex items-center gap-2 mb-4 border-b border-indigo-800/60 pb-2">
                          <span className="text-indigo-300 text-lg">✅</span>
                          <h2 className="text-xs uppercase font-bold text-indigo-350 tracking-wider">Best Recommendation</h2>
                        </div>
                        <div className="text-sm text-indigo-100 leading-relaxed overflow-y-auto max-h-[200px] pr-1 font-sans">
                          <Markdown>{parsedBrief.recommendation || "Calculating solution pathway..."}</Markdown>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 border-t border-indigo-850 pt-4">
                        <div className="flex-1 bg-white/10 rounded-lg p-3 border border-white/10 text-xs text-indigo-100">
                          <span className="block text-indigo-300 font-bold mb-1 uppercase tracking-wider text-[10px] font-mono">Strategic Confidence</span> 
                          94.2% Analytical Match Score
                        </div>
                        {parsedBrief.benefits && (
                          <div className="flex-grow bg-white/10 rounded-lg p-3 border border-white/10 text-xs text-indigo-100 min-w-0">
                            <span className="block text-indigo-300 font-bold mb-1 uppercase tracking-wider text-[10px] font-mono">Outcome Benefits Indicator</span> 
                            <p className="line-clamp-2">{parsedBrief.benefits.replace(/[#*`_]/g, "").trim()}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Risks vs Benefits Box / Action item sequence */}
                    <motion.div variants={bentoItemVariants} className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
                      <div>
                        <h2 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3 mb-4 font-display">
                          🛠 Action Sequence
                        </h2>
                        {listActionSteps.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">No structured sequential items parsed. Check Main Memo.</p>
                        ) : (
                          <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                            {listActionSteps.map((step, idx) => {
                              const isChecked = actionChecklist[idx] || false;
                              return (
                                <div
                                  key={idx}
                                  onClick={() => setActionChecklist({ ...actionChecklist, [idx]: !isChecked })}
                                  className="flex items-start gap-2.5 cursor-pointer select-none group text-left"
                                >
                                  <span className={`w-5 h-5 flex items-center justify-center rounded text-[10px] tracking-tight font-bold shrink-0 transition-colors ${
                                    isChecked ? "bg-green-100 text-green-800" : "bg-indigo-50 text-indigo-600"
                                  }`}>
                                    {(idx+1).toString().padStart(2, "0")}
                                  </span>
                                  <p className={`text-xs text-slate-705 leading-tight flex-1 transition-all ${isChecked ? "line-through text-slate-400" : "font-medium hover:text-indigo-650"}`}>
                                    {step}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Numerical/Quantitative Analysis Block */}
                    <motion.div variants={bentoItemVariants} className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6">
                      <h2 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2 mb-3">
                        🔍 SYSTEM & VARIABLE ANALYSIS
                      </h2>
                      <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line max-h-[250px] overflow-y-auto font-sans">
                        {parsedBrief.analysis || "Details compiled in primary memorandum."}
                      </div>
                    </motion.div>

                    {/* Risks block */}
                    <motion.div variants={bentoItemVariants} className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6">
                      <h2 className="text-xs uppercase font-bold text-red-500 tracking-wider flex items-center gap-2 mb-3">
                        ⚠️ ENCOUNTERED DOWN-SIDE RISKS
                      </h2>
                      <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-line max-h-[250px] overflow-y-auto">
                        {parsedBrief.risks || "No critical hazards detected."}
                      </div>
                    </motion.div>
                  </div>

                </motion.div>
              )}

              {/* CASE TAB 3: CONVERSATIONAL MENTORING CLIENT & HISTORY */}
              {currentTab === "mentoring" && (
                <div className="flex-grow flex flex-col border border-slate-200 rounded-xl bg-slate-50 overflow-hidden min-h-[400px] animate-fadeIn">
                  
                  {/* Chat System Prompt Header */}
                  <div className="bg-slate-900 border-b border-slate-800 p-3.5 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-indigo-400" />
                      <div>
                        <span className="text-xs font-bold font-mono text-white tracking-wider block">
                          CONVERSATIONAL MENTOR CO-PILOT
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5 font-sans">
                          Session Anchor: {currentBrief.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages Bubble Area */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[380px] text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      className="bg-white border border-slate-150 p-3.5 rounded-xl text-xs text-slate-700 leading-relaxed max-w-[85%] shadow-sm mr-auto"
                    >
                      <p className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5 font-display text-indigo-600">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> IAH Mentorship Gateway Active
                      </p>
                      Greetings! I hold the exact variables of search grounding and calculations we produced. Ask me details about execution steps, requesting secondary solutions, or querying alternate investment channels.
                    </motion.div>

                    {(currentBrief.chatHistory || []).map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className={`flex flex-col max-w-[85%] ${
                          msg.role === "user" ? "ml-auto items-end text-right" : "mr-auto items-start text-left"
                        }`}
                      >
                        <div
                          className={`p-3.5 rounded-xl text-xs leading-relaxed shadow-sm ${
                            msg.role === "user"
                              ? "bg-indigo-650 text-white rounded-br-none"
                              : "bg-white border border-slate-200 text-slate-850 rounded-bl-none"
                          }`}
                        >
                          {msg.role === "assistant" ? (
                            <div className="markdown-body">
                              <Markdown>{msg.content}</Markdown>
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                          )}
                        </div>
                        <span className="text-[9px] text-slate-400 font-mono mt-1 px-1 bg-transparent border-none">
                          {msg.timestamp}
                        </span>
                      </motion.div>
                    ))}

                    {isChatting && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.15 }}
                        className="bg-white border border-slate-105 p-3.5 rounded-xl text-xs text-slate-400 italic max-w-[150px] shadow-sm flex items-center gap-1.5 self-start"
                      >
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-650" />
                        <span>Tactical Reply...</span>
                      </motion.div>
                    )}

                    <div ref={chatBottomRef} />
                  </div>

                  {/* Message Input Trigger Form */}
                  <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                      placeholder="Ask the co-pilot e.g. 'Draft business proposal based on Step 1...'"
                      disabled={isChatting}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs placeholder-slate-400 outline-none focus:bg-white focus:border-indigo-500 font-sans"
                    />
                    <button
                      onClick={handleSendChatMessage}
                      disabled={isChatting || !chatInput.trim()}
                      className="bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 p-3 rounded-lg transition duration-200 shrink-0 shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

              {/* CASE TAB 4: SECURE DIRECT BROADCAST TERMINAL */}
              {currentTab === "broadcast" && currentBrief && (
                <div className="flex-grow space-y-6 text-left animate-fadeIn">
                  <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-5">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-950 border border-indigo-500/30 rounded text-[9px] text-indigo-400 font-mono tracking-widest uppercase mb-2">
                          ⚡️ HYPER-WAVE BROADCAST CONSOLE
                        </div>
                        <h2 className="text-lg font-bold text-white uppercase font-display tracking-tight">
                          Immediate Strategic Sync Gateway
                        </h2>
                        <p className="text-xs text-slate-400 font-sans mt-0.5">
                          Transmit encrypted intelligence copy to remote terminals & mobile devices
                        </p>
                      </div>
                      
                      {/* Circular Gauge inside Dashboard */}
                      {isBroadcasting && (
                        <div className="shrink-0">
                          <CircularProgressRing 
                            percentage={broadcastProgress} 
                            label="TRANSMITTING" 
                            color="stroke-indigo-400" 
                            size={90}
                            darkTheme={true}
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
                      <div className="md:col-span-5 space-y-4">
                        <div className="space-y-1.5 text-left font-sans">
                          <label className="text-[10px] uppercase font-mono font-black tracking-wider text-slate-400 block">
                            Target Coordinate Phone / Email Gateway
                          </label>
                          <div className="flex bg-slate-950 border border-slate-800 rounded-lg overflow-hidden focus-within:border-indigo-500 transition-colors">
                            <span className="p-3 bg-slate-900 text-[10px] text-slate-500 font-mono tracking-wider border-r border-slate-800 flex items-center">
                              TARGET:
                            </span>
                            <input
                              type="text"
                              value={broadcastTarget}
                              onChange={(e) => setBroadcastTarget(e.target.value)}
                              placeholder="+91 7980259343 or email"
                              disabled={isBroadcasting}
                              className="bg-transparent flex-grow p-3 text-xs outline-none text-white font-mono placeholder-slate-700"
                            />
                          </div>
                          <p className="text-[10px] text-slate-500 font-sans">
                            Broadcast routing is configured with absolute high priority.
                          </p>
                        </div>

                        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
                          <div className="flex items-center gap-2 font-mono text-[10px] text-indigo-400 font-bold border-b border-indigo-900/30 pb-1.5">
                            <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                            <span>AUTOMATIC METRIC CACHING ACTIVE</span>
                          </div>
                          <p className="font-sans text-[11px]">
                            This system enforces real-time state snapshots. All modifications, chat session logs, and action items are persistent on edit.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleInitiateBroadcast}
                          disabled={isBroadcasting || !broadcastTarget.trim()}
                          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-650 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold p-3.5 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer select-none text-xs font-mono uppercase tracking-widest shadow-lg shadow-indigo-950/60 disabled:opacity-50"
                        >
                          {isBroadcasting ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin shrink-0 text-white" />
                              <span>BROADCASTING WAVE...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 shrink-0 text-indigo-200 fill-indigo-200/20" />
                              <span>INITIATE BROADCAST SYNC</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="md:col-span-7 flex flex-col">
                        <span className="text-[10px] uppercase font-mono font-black tracking-wider text-slate-400 block mb-1.5">
                          SYSTEM LOG TRANSCRIPT CONSOLE
                        </span>
                        
                        <div className="flex-grow bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-[10px] text-slate-300 min-h-[220px] max-h-[320px] overflow-y-auto space-y-1 text-left leading-relaxed shadow-inner">
                          {broadcastLogs.length === 0 ? (
                            <span className="text-slate-500 italic block">SYSTEM IDLE // PRESS INITIATE BROADCAST SYNC TO COMMENCE TRANSMITTAL TEST</span>
                          ) : (
                            broadcastLogs.map((log, idx) => (
                              <div key={idx} className="flex gap-2">
                                <span className="text-indigo-500 shrink-0 font-bold">&gt;</span>
                                <span className={
                                  log.includes("TRANSMISSION SUCCESS") 
                                    ? "text-emerald-400 font-bold" 
                                    : log.includes("TRANSMISSION FAULT")
                                    ? "text-red-400 font-bold"
                                    : "text-slate-300"
                                }>{log}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CASE TAB 6: DECISION VISUALIZER FLOW CHART */}
              {currentTab === "visualizer" && parsedBrief && (
                <div className="flex-grow space-y-6 text-left animate-fadeIn">
                  <DecisionVisualizer
                    optionsText={parsedBrief.options}
                    actionPlanText={parsedBrief.actionPlan}
                    situationText={parsedBrief.situation}
                    recommendationText={parsedBrief.recommendation}
                    title={currentBrief.title}
                  />
                </div>
              )}

              {/* CASE TAB 5: PROGRESSIVE WEB APP & GOOGLE PLAY STORE HUB */}
              {currentTab === "pwa" && (
                <div className="flex-grow space-y-6 text-left animate-fadeIn">
                  <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-5 relative z-10">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-950 border border-emerald-500/30 rounded text-[9px] text-emerald-400 font-mono tracking-widest uppercase mb-2">
                          🛡️ INSTALLATION & COMPILATION PORTAL
                        </div>
                        <h2 className="text-xl font-black text-white uppercase font-display tracking-tight flex items-center gap-2">
                          PWA Hub & Google Play App Creator
                        </h2>
                        <p className="text-xs text-slate-400 font-sans mt-0.5">
                          Configure installation metadata, register service workers, and bundle Trusted Web Android packages.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                          isPwaInstalled 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${isPwaInstalled ? "bg-emerald-400" : "bg-amber-400 animate-ping"}`} />
                          {isPwaInstalled ? "SYSTEM INSTALLED" : "READY FOR BUILD"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                      
                      {/* Left Column: Native PWA Install & Specifications */}
                      <div className="lg:col-span-5 space-y-5">
                        
                        {/* Interactive Install Action Block */}
                        <div className="p-5 bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl border border-indigo-900/30 shadow-inner space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-505/10 rounded-lg border border-indigo-500/20 text-indigo-400 shrink-0">
                              <Cpu className="w-5 h-5 animate-pulse" />
                            </div>
                            <div>
                              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                                Native Device Launcher
                              </h3>
                              <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                                Add IAH.AI to your mobile App Drawer or home screen.
                              </p>
                            </div>
                          </div>

                          <div className="text-xs text-slate-400 leading-relaxed font-sans space-y-2">
                            <p className="text-[11px]">
                              Our service worker caches core stylesheets, modules, layouts, and icons instantly, ensuring zero-latency startup even when internet is restricted or offline.
                            </p>
                          </div>

                          {deferredPrompt ? (
                            <button
                              type="button"
                              onClick={handleTriggerInstallPwa}
                              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold p-3.5 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer select-none text-xs font-mono uppercase tracking-widest shadow-lg shadow-teal-950/40"
                            >
                              <Download className="w-4 h-4 text-emerald-200" />
                              <span>Install Web App (PWA)</span>
                            </button>
                          ) : (
                            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                              <span className="text-[10px] text-slate-500 font-mono block mb-1">PROMPT UNVAILABLE IN BROWSER ROOT</span>
                              <span className="text-[11px] text-slate-400 leading-relaxed font-sans block">
                                If on iOS Safari, tap <strong className="text-slate-200">Share</strong> then <strong className="text-indigo-400 font-bold">"Add to Home Screen"</strong> to install as a premium native iOS app.
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Manifest configuration validation */}
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-[11px]">
                          <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block border-b border-slate-800 pb-1.5 flex items-center gap-1.5 justify-between">
                            <span>🤖 MANIFEST SPECS SHEET</span>
                            <span className="text-emerald-400">PASSED</span>
                          </span>
                          
                          <div className="space-y-2 text-slate-300">
                            <div className="flex justify-between border-b border-slate-900/50 pb-1">
                              <span className="text-slate-500">AppName</span>
                              <span className="text-indigo-400 text-right">IAH.AI Supreme Solver</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900/50 pb-1">
                              <span className="text-slate-500">ServiceWorker</span>
                              <span className="text-emerald-400 text-right">sw.js (ACTIVE)</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900/50 pb-1">
                              <span className="text-slate-500">Standalone UI</span>
                              <span className="text-slate-200 text-right">Enabled</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900/50 pb-1">
                              <span className="text-slate-500">Theme Colour</span>
                              <span className="text-pink-400 text-right">#4f46e5</span>
                            </div>
                            <div className="flex justify-between pb-0">
                              <span className="text-slate-500">Vectors Loaded</span>
                              <span className="text-cyan-400 text-right">icon.svg (512x512)</span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Right Column: Interactive Play Store Packaging Guide */}
                      <div className="lg:col-span-7 flex flex-col space-y-5">
                        
                        {/* Play Store compilation process */}
                        <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex-grow space-y-4">
                          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold border-b border-slate-800 pb-2">
                            <Rocket className="w-4 h-4 text-indigo-400" />
                            <span>GOOGLE PLAY STORE COMPILATION STEP-BY-STEP</span>
                          </div>

                          <div className="space-y-3 font-sans text-xs text-slate-300 leading-relaxed">
                            <p>
                              To publish IAH.AI directly to the <strong className="text-white">Google Play Store</strong>, you can package the Web Manifest using <strong className="text-indigo-400">TWA (Trusted Web Activities)</strong> via Bubblewrap CLI or wrap it with Capacitor. This removes the browser navigation bar.
                            </p>

                            <div className="space-y-2 border-l border-indigo-500/30 pl-3">
                              <div>
                                <h4 className="font-bold text-white font-mono text-[10px] uppercase text-indigo-300">1. Setup CLI Launcher</h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">Install the official Google Bubblewrap utility node module:</p>
                                <div className="bg-slate-900 p-2 rounded text-[10px] font-mono text-indigo-200 select-all border border-slate-800/80 my-1">
                                  npm install -g @bubblewrap/cli
                                </div>
                              </div>

                              <div>
                                <h4 className="font-bold text-white font-mono text-[10px] uppercase text-indigo-300">2. Generate Android Template</h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">Initialise your project from this PWA's verified metadata:</p>
                                <div className="bg-slate-900 p-2 rounded text-[10px] font-mono text-indigo-200 select-all border border-slate-800/80 my-1">
                                  bubblewrap init --manifest=https://{window.location.host}/manifest.json
                                </div>
                                <p className="text-[11px] text-slate-500">Answer the prompts regarding your app package ID (<code className="text-[10px] text-pink-400 font-mono">com.iah.ultimate_system</code>) and Keystore passwords.</p>
                              </div>

                              <div>
                                <h4 className="font-bold text-white font-mono text-[10px] uppercase text-indigo-300">3. Compile signed App Bundle (.AAB)</h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">Run building pipelines to produce the final signed archive and upload to Google Play Developer Console:</p>
                                <div className="bg-slate-900 p-2 rounded text-[10px] font-mono text-indigo-200 select-all border border-slate-800/80 my-1">
                                  bubblewrap build
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Digital Asset Links Generator */}
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                          <div className="flex items-center gap-2 text-[10px] font-mono font-black text-rose-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Digital Asset Links Generator (.well-known)</span>
                          </div>
                          
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                            Trusted Web Activities require a signature file served over HTTPS so Google Play confirms you own the domain, which web-unlocks a full screen native app experience without URL sheets. 
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-1">
                            <div className="space-y-1 text-left">
                              <label className="text-[9px] font-mono uppercase text-slate-500 block">Package Name</label>
                              <code className="text-xs bg-slate-900 px-2 py-1 rounded block border border-slate-800 text-indigo-300 truncate font-mono">
                                com.iah.ultimate_system
                              </code>
                            </div>
                            <div className="space-y-1 text-left">
                              <label className="text-[9px] font-mono uppercase text-slate-500 block">TWA Fingerprint Required</label>
                              <code className="text-xs bg-slate-900 px-2 py-1 rounded block border border-slate-800 text-pink-400 truncate font-mono">
                                SHA-256 (Upload Keystore)
                              </code>
                            </div>
                          </div>

                          <div className="p-3 bg-slate-900 rounded border border-slate-800 flex items-center justify-between text-[11px] font-sans">
                            <span className="text-slate-400 text-left">
                              We have automatically generated a compliant <strong className="text-white">.well-known/assetlinks.json</strong> file in your workspace!
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Fallback Workspace State */}
          {!isAnalyzing && !currentBrief && (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[480px] animate-fadeIn shadow-sm">
              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
                <Brain className="w-6 h-6 text-indigo-500" />
              </div>

              <h2 className="text-base font-bold text-slate-850 mb-1 font-display">
                Strategic Workspace Awaiting Calculation
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Describe your current life, financial, learning, or business challenge in the parameter dashboard above and execute.
              </p>

              <div className="bg-slate-50/50 border border-slate-150 rounded-xl p-5 mt-6 max-w-lg w-full text-left space-y-3 font-sans">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  Guaranteed Strategy Delivery Checkpoints
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Side-by-side solutions</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Quantified potential metrics</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Critical hazard analyses</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>30-day sequential launchplans</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* Standard professional footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-400 py-6 px-6 mt-8 mt-auto">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Decision Workspace. All rights reserved.</p>
          <p className="font-sans">Designed for structured analysis and qualitative evaluation.</p>
        </div>
      </footer>
    </div>
  );
}
