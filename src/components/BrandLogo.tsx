import React from "react";
import { motion } from "motion/react";
import { Brain, Activity, Sparkles, Terminal, Hexagon } from "lucide-react";

interface BrandLogoProps {
  layout?: "compact" | "hero";
  className?: string;
}

export default function BrandLogo({ layout = "compact", className = "" }: BrandLogoProps) {
  if (layout === "hero") {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Deep Multi-Layer Animated Logo Core */}
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
          {/* Animated Glow Rings Outer */}
          <motion.div
            className="absolute inset-0 rounded-3xl border border-indigo-500/20"
            animate={{
              boxShadow: [
                "0 0 20px rgba(99, 102, 241, 0.25)",
                "0 0 40px rgba(244, 63, 94, 0.4)",
                "0 0 20px rgba(99, 102, 241, 0.25)",
              ],
              borderColor: [
                "rgba(99, 102, 241, 0.2)",
                "rgba(244, 63, 94, 0.3)",
                "rgba(99, 102, 241, 0.2)",
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Hexagonal Tech Cage rotating */}
          <motion.div
            className="absolute inset-2 text-indigo-500/30 font-light"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Hexagon className="w-full h-full stroke-[1] stroke-indigo-500/20" />
          </motion.div>

          {/* Opposite Rotating Operational Ring Layer 2 */}
          <motion.div
            className="absolute inset-6 rounded-full border border-pink-500/20 border-t-pink-500/70 border-b-indigo-500/70"
            animate={{ rotate: -360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Main Glassmorphic Device Core */}
          <div className="absolute inset-1 bg-slate-950 border border-indigo-500/40 rounded-3xl overflow-hidden flex items-center justify-center">
            {/* Real-time matrix horizontal scan line */}
            <motion.div
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent pointer-events-none"
              animate={{
                top: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Glowing Tech Mesh Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.25)_0%,transparent_75%)]" />

            <motion.div
              animate={{
                scale: [1, 1.08, 0.96, 1.08, 1],
                filter: [
                  "drop-shadow(0 0 8px rgba(129,140,248,0.5))",
                  "drop-shadow(0 0 20px rgba(244,63,94,0.7))",
                  "drop-shadow(0 0 8px rgba(129,140,248,0.5))",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="z-10 text-indigo-400 flex flex-col items-center justify-center"
            >
              <Brain className="w-14 h-14" />
            </motion.div>

            {/* Micro details */}
            <div className="absolute top-2.5 left-2.5 flex gap-1 items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[7px] font-mono tracking-wider text-emerald-400 font-bold">ONLINE</span>
            </div>
            
            <div className="absolute bottom-2.5 right-2.5 flex gap-1 items-center">
              <span className="text-[6px] font-mono tracking-widest text-slate-500">SYS_V3.14</span>
            </div>
          </div>
        </div>

        {/* Brand Core Identifiers with Colorful Shimmering Gradient */}
        <div className="space-y-3 max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-[10px] font-mono tracking-widest text-indigo-400 font-bold uppercase"
          >
            <Activity className="w-3.5 h-3.5 text-indigo-400 shrink-0 animate-pulse" />
            <span className="animate-pulse">COGNITIVE SYSTEM OVERLORD LINKED</span>
          </motion.div>

          <div className="flex flex-col items-center">
            <motion.h1
              className="text-5xl md:text-6xl font-black tracking-tighter font-sans leading-none relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Vibrant neon glow achtergrond */}
              <span className="absolute -inset-2 rounded-xl blur-xl bg-gradient-to-r from-indigo-500 to-pink-500 opacity-20 pointer-events-none" />
              
              <span className="relative bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                IAH
              </span>
              <span className="relative bg-gradient-to-r from-pink-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(244,63,94,0.5)] ml-0.5">
                .AI
              </span>
            </motion.h1>

            <motion.div
              className="flex items-center gap-2 mt-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: "8s" }} />
              <span className="text-xs font-mono font-black tracking-[0.3em] bg-gradient-to-r from-indigo-400 via-pink-400 to-violet-300 bg-clip-text text-transparent uppercase">
                SUPREME DECISION SUITE
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            </motion.div>
            
            <div className="w-32 h-[3px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent mt-3.5" />
          </div>

          <p className="text-xs text-slate-400 pt-1 leading-relaxed font-sans px-4">
            Deploy deep-focus analytical engines and multi-threaded scenario mapping platforms. Secure, honest decision auditing cascades.
          </p>
        </div>
      </div>
    );
  }

  // COMPACT COMPACT BRAND INDICATOR (Operational toolbar bar / side view layout)
  // Highly visible colorful logo name to see perfectly inside the white header of the application!
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Dynamic tactile compact icon box with a nested animated gyroscope */}
      <div className="relative w-12 h-12 flex items-center justify-center bg-slate-950 border border-indigo-500/50 rounded-xl shadow-[0_0_18px_rgba(99,102,241,0.25)] overflow-hidden shrink-0 group">
        {/* Holographic matrix line scanner */}
        <motion.div
          className="absolute inset-x-0 h-[2px] bg-indigo-400/50 pointer-events-none"
          animate={{
            top: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dynamic circular orbit ring */}
        <motion.div
          className="absolute inset-1 rounded-full border border-dashed border-indigo-400/40"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Dynamic pink accent orbit ring */}
        <motion.div
          className="absolute inset-2.5 rounded-full border border-pink-500/30 border-t-pink-500"
          animate={{ rotate: -360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Glowing Brain node */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="z-10 text-indigo-400"
        >
          <Brain className="w-6 h-6 drop-shadow-[0_0_6px_rgba(129,140,248,0.7)]" />
        </motion.div>

        {/* Live indicator LED */}
        <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
      </div>

      {/* Typography identity blocks - DESIGNED WITH RICH GRADIENT COLORS TO SEE PERFECTLY! */}
      <div className="flex flex-col items-start leading-none gap-1">
        <div className="flex items-center gap-2">
          {/* Rich colored text gradient name for 100% visibility on white and slate backgrounds! */}
          <span className="font-black tracking-tight text-xl font-sans flex items-center gap-0.5 select-none">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 bg-clip-text text-transparent">
              IAH
            </span>
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent font-extrabold drop-shadow-[0_2px_4px_rgba(99,102,241,0.1)]">
              .AI
            </span>
          </span>
          <span className="text-[8px] font-mono tracking-widest font-black text-indigo-400 bg-slate-950 border border-indigo-500/40 px-2 py-0.5 rounded-md animate-pulse shrink-0">
            SYS-X1
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Terminal className="w-2.5 h-2.5 text-indigo-500 shrink-0" />
          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            SUPREME DECISION COGNITION SUITE
          </span>
        </div>
      </div>
    </div>
  );
}
