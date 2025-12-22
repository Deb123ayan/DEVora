import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { HolographicButton } from "@/components/ui/holographic-button";
import LazyLightPillar from "./LazyLightPillar";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Light Pillar Background - Optimized for mobile */}
      <div className="absolute inset-0 z-0">
        <LazyLightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1.2}
          rotationSpeed={0.4}
          glowAmount={0.008}
          pillarWidth={2.5}
          pillarHeight={0.6}
          noiseIntensity={0.3}
          pillarRotation={0}
          interactive={true}
          mixBlendMode="screen"
          className="opacity-70 md:opacity-100"
        />
      </div>

      {/* Enhanced gradient overlays for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/60 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10 pointer-events-none" />

      {/* Mobile-specific stronger overlay */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none md:hidden" />

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
                Engineering Future v3.1
              </span>
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold font-display tracking-tight leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 drop-shadow-2xl [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
            ARCHITECTING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 animate-gradient-x [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
              DIGITAL CORE
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 md:text-gray-400 mb-10 max-w-lg leading-relaxed font-light [text-shadow:_0_1px_5px_rgb(0_0_0_/_60%)] bg-black/20 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none backdrop-blur-sm md:backdrop-blur-none">
            We build the complex systems that power tomorrow. Full-stack
            engineering, AI integration, and scalable architecture for
            visionaries.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <HolographicButton
              variant="primary"
              icon={<Terminal className="w-4 h-4" />}
              onClick={scrollToContact}
            >
              Initialize Project
            </HolographicButton>
          </div>

          <div className="mt-12 flex items-center gap-8 opacity-60">
            <div className="flex flex-col">
              <span className="text-xs font-mono text-primary">
                DEPLOYMENTS
              </span>
              <span className="text-2xl font-bold font-display">500+</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-xs font-mono text-cyan-400">UPTIME</span>
              <span className="text-2xl font-bold font-display">99.9%</span>
            </div>
          </div>
        </motion.div>

        {/* Right side spacer */}
        <div className="hidden md:block relative h-full"></div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] animate-pulse">
          System Diagnostic: Green
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary via-cyan-500 to-transparent opacity-50" />
      </motion.div>
    </section>
  );
}
