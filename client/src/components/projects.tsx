import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import LazyPlasma from "./LazyPlasma";

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    description: "Real-time financial analytics platform with AI-driven insights.",
    tags: ["React", "D3.js", "Node.js"]
  },
  {
    title: "HealthConnect",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    description: "Telemedicine application connecting patients with specialists worldwide.",
    tags: ["React Native", "Firebase", "WebRTC"]
  },
  {
    title: "EcoSmart Home",
    category: "IoT Interface",
    image: "https://images.unsplash.com/photo-1558002038-109177381792?q=80&w=2070&auto=format&fit=crop",
    description: "Smart home automation interface for energy efficiency monitoring.",
    tags: ["Next.js", "MQTT", "Tailwind"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-black overflow-hidden">
      {/* Plasma Background */}
      <div className="absolute inset-0 z-0">
        <LazyPlasma color="#ff6b6b" speed={0.7} opacity={0.4} direction="pingpong" />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      <div className="container px-6 mx-auto relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              Selected Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our portfolio of award-winning digital experiences.
            </p>
          </div>
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white rounded-full">
            View All Projects
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button size="icon" className="rounded-full bg-white text-black hover:bg-white/90">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full border-white text-white hover:bg-white/20">
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-primary">{project.category}</span>
                </div>
                <h3 className="text-xl font-bold font-display mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/5 text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
