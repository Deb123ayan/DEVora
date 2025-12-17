import { motion, HTMLMotionProps } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HolographicButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  icon?: React.ReactNode;
}

export function HolographicButton({ 
  children, 
  variant = "primary", 
  className,
  icon,
  ...props 
}: HolographicButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isPrimary = variant === "primary";
  
  return (
    <motion.button
      className={cn(
        "relative group px-8 py-4 bg-transparent border-0 outline-none cursor-pointer overflow-visible",
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* HUD Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-primary/80" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/50 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-primary/80" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/50 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-primary/80" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:border-primary/80" />

      {/* Background with Glass Effect */}
      <div className={cn(
        "absolute inset-1 backdrop-blur-md transition-all duration-300",
        isPrimary 
          ? "bg-primary/20 group-hover:bg-primary/30" 
          : "bg-white/5 group-hover:bg-white/10"
      )} />

      {/* Scanline Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent z-10"
        initial={{ y: "-100%" }}
        animate={isHovered ? { y: "100%" } : { y: "-100%" }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5, 
          ease: "linear",
          repeatDelay: 0.5 
        }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-1 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 pointer-events-none mix-blend-overlay" />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center gap-3 font-display font-bold tracking-wider uppercase text-sm">
        <span className={cn(
          "text-white transition-all duration-300",
          isHovered && "text-glow drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        )}>
          {children}
        </span>
        {icon && (
          <motion.span
            animate={isHovered ? { x: 4, opacity: 1 } : { x: 0, opacity: 0.8 }}
          >
            {icon}
          </motion.span>
        )}
      </div>

      {/* Random Tech Deco Text */}
      <div className="absolute -bottom-4 right-0 text-[8px] font-mono text-white/30 tracking-[0.2em]">
        SYS.RDY
      </div>
    </motion.button>
  );
}
