import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Code2, Smartphone, GraduationCap, Palette, Bot, ArrowUpRight } from "lucide-react";
import LazyHyperspeed from "./LazyHyperspeed";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "High-performance, SEO-optimized websites built with Next.js and React.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and cross-platform mobile apps for iOS and Android.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: GraduationCap,
    title: "Student Projects",
    description: "Professional guidance and development for final year college projects.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Stunning, user-centric interfaces that drive engagement.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "Smart chatbots, process automation, and AI integration solutions.",
    color: "from-indigo-500 to-violet-500"
  }
];

function ServiceCard({ service, index }: { service: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative border border-white/10 bg-white/5 rounded-2xl p-8 hover:border-white/20 transition-colors overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} p-0.5 mb-6`}>
        <div className="w-full h-full bg-black/50 backdrop-blur-sm rounded-[7px] flex items-center justify-center">
          <service.icon className="w-6 h-6 text-white" />
        </div>
      </div>

      <h3 className="text-xl font-bold mb-3 font-display">{service.title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {service.description}
      </p>

      <div className="flex items-center text-sm font-medium text-white/50 group-hover:text-primary transition-colors cursor-pointer">
        Learn more <ArrowUpRight className="ml-1 w-4 h-4" />
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-black overflow-hidden">
      {/* Hyperspeed Background */}
      <div className="absolute inset-0 z-0">
        <LazyHyperspeed
          effectOptions={{
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'turbulentDistortion',
            length: 300,
            roadWidth: 8,
            islandWidth: 1.5,
            lanesPerRoad: 3,
            fov: 80,
            fovSpeedUp: 120,
            speedUp: 3,
            carLightsFade: 0.5,
            totalSideLightSticks: 15,
            lightPairsPerRoadWay: 30,
            shoulderLinesWidthPercentage: 0.04,
            brokenLinesWidthPercentage: 0.08,
            brokenLinesLengthPercentage: 0.4,
            lightStickWidth: [0.1, 0.4],
            lightStickHeight: [1.2, 1.5],
            movingAwaySpeed: [50, 80],
            movingCloserSpeed: [-100, -150],
            carLightsLength: [300 * 0.02, 300 * 0.15],
            carLightsRadius: [0.04, 0.12],
            carWidthPercentage: [0.25, 0.45],
            carShiftX: [-0.7, 0.7],
            carFloorSeparation: [0, 4],
            colors: {
              roadColor: 0x0a0a0a,
              islandColor: 0x0c0c0c,
              background: 0x000000,
              shoulderLines: 0xFFFFFF,
              brokenLines: 0xFFFFFF,
              leftCars: [0x8b2cf5, 0x6750a2, 0xc247ac],
              rightCars: [0x00f5ff, 0x0e5ea5, 0x324555],
              sticks: 0x00f5ff,
            }
          }}
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />
      
      <div className="container px-6 mx-auto relative z-20">
        <div className="mb-16 md:text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            Our Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            We deliver comprehensive digital solutions tailored to your unique needs, from concept to launch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
