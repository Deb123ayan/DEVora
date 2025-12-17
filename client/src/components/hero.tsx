import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Scene from "./scene";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Scene />
      
      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background z-10 pointer-events-none" />

      {/* Content */}
      <div className="container relative z-20 px-6 mx-auto text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase">
              Next-Gen Digital Agency
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-tight mb-6">
            We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">Powerful</span> Digital Products.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            From visionary startups to global enterprises, we craft high-performance websites, apps, and software that define the future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-lg shadow-[0_0_20px_rgba(139,44,245,0.3)]"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/20 hover:bg-white/10 text-white rounded-full px-8 h-14 text-lg backdrop-blur-sm"
            >
              <Play className="mr-2 w-4 h-4 fill-current" />
              View Our Work
            </Button>
          </div>
        </motion.div>

        {/* Right side is visual (handled by 3D scene), but we can add floating UI elements here for depth */}
        <div className="hidden md:block relative h-full">
           {/* Abstract UI Elements could go here if not fully relying on 3D */}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
