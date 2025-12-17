import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Clock, Users } from "lucide-react";

const stats = [
  { label: "Projects Delivered", value: "150+", icon: Rocket },
  { label: "Happy Clients", value: "80+", icon: Users },
  { label: "Code Quality", value: "100%", icon: ShieldCheck },
  { label: "Support", value: "24/7", icon: Clock },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-background z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              Why Global Brands & Startups Trust Us
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We don't just write code; we solve problems. Our team combines technical excellence with creative innovation to deliver products that stand out in a crowded market.
            </p>
            
            <div className="space-y-6">
              {[
                "Agile Development Methodology",
                "Scalable & Secure Architecture",
                "User-Centric Design Philosophy",
                "Post-Launch Support & Maintenance"
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#8b2cf5]" />
                  </div>
                  <span className="text-lg font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-4 opacity-80" />
                <h3 className="text-4xl font-bold font-display mb-2 text-white">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
