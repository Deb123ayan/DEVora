import { motion } from "framer-motion";
import { ArrowRight, Play, Cpu, Zap } from "lucide-react";
import { HolographicButton } from "@/components/ui/holographic-button";
import Scene from "./scene";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 3D Background */}
      <Scene />
      
      {/* Vignette & Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10 pointer-events-none" />

      {/* Content */}
      <div className="container relative z-20 px-6 mx-auto text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-6">
             <div className="px-3 py-1 rounded-full border border-primary/50 bg-primary/10 backdrop-blur-md flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-xs font-mono font-bold tracking-widest uppercase">
                  System Online v2.0
                </span>
             </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tight leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 drop-shadow-2xl">
            BUILD THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 animate-gradient-x">IMPOSSIBLE</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-light">
            We engineer digital realities. From VR-ready web apps to AI-driven enterprise systems, we turn "future" into "now".
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <HolographicButton variant="primary" icon={<Zap className="w-4 h-4" />}>
              Initialize Project
            </HolographicButton>
            
            <HolographicButton variant="secondary" icon={<Cpu className="w-4 h-4" />}>
              Access Portfolio
            </HolographicButton>
          </div>
          
          <div className="mt-12 flex items-center gap-8 opacity-60">
             <div className="flex flex-col">
                <span className="text-xs font-mono text-primary">CLIENTS</span>
                <span className="text-2xl font-bold font-display">150+</span>
             </div>
             <div className="w-px h-8 bg-white/20" />
             <div className="flex flex-col">
                <span className="text-xs font-mono text-cyan-400">AWARDS</span>
                <span className="text-2xl font-bold font-display">12</span>
             </div>
          </div>
        </motion.div>

        {/* Right side spacer for 3D elements */}
        <div className="hidden md:block relative h-full"></div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] animate-pulse">Scroll to Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary via-cyan-500 to-transparent opacity-50" />
      </motion.div>
    </section>
  );
}
