import { motion } from "framer-motion";
import { SiPython, SiDocker, SiLinux, SiPostgresql, SiRedis, SiNginx, SiGit, SiGnubash } from "react-icons/si";
import { Server, Bot, Workflow, Shield, Globe, Cpu } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

export default function Skills() {
  const skills = [
    { name: "Backend Development", icon: Server, desc: "Python, FastAPI, Node.js" },
    { name: "Telegram Bots", icon: Bot, desc: "High-concurrency interactions" },
    { name: "Infrastructure", icon: SiLinux, desc: "VPS, Proxies, Bash Scripting" },
    { name: "Automation", icon: Workflow, desc: "API Integrations, CI/CD" },
    { name: "System Design", icon: Cpu, desc: "Scalable Architecture" },
    { name: "Data Handling", icon: SiPostgresql, desc: "SQL, Redis, JSON Processing" },
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-24 bg-background relative overflow-hidden perspective-1000">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4">TECHNICAL ARSENAL</h2>
          <div className="h-1 w-16 sm:w-24 bg-primary" />
        </div>

        {/* Mobile Grid - No Tilt */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group p-3 sm:p-4 border border-border bg-card/50 hover:border-primary/50 transition-colors duration-300"
            >
              <div className="mb-2 sm:mb-3 text-primary">
                <skill.icon size={24} />
              </div>
              <h3 className="text-sm sm:text-base font-display font-bold mb-1 group-hover:text-primary transition-colors">
                {skill.name}
              </h3>
              <p className="text-muted-foreground font-mono text-[10px] sm:text-xs">
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Desktop Grid - With Tilt */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <TiltCard key={index} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group h-full p-6 border border-border bg-card/50 hover:border-primary/50 transition-colors duration-300 technical-border backdrop-blur-sm"
              >
                <div className="mb-4 text-primary transform group-hover:scale-110 transition-transform duration-300">
                  <skill.icon size={32} />
                </div>
                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
                <p className="text-muted-foreground font-mono text-sm">
                  {skill.desc}
                </p>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 md:mt-12 p-4 sm:p-6 md:p-8 border border-primary/20 bg-primary/5 relative overflow-hidden"
        >
            <div className="relative z-10 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-start md:items-center">
                <div className="p-3 sm:p-4 bg-background border border-primary/50 rounded-full shrink-0">
                    <Shield size={24} className="sm:w-8 sm:h-8 text-primary" />
                </div>
                <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-display font-bold mb-2">SECURITY & SYSTEMS KNOWLEDGE</h3>
                    <p className="text-muted-foreground font-mono text-xs sm:text-sm leading-relaxed max-w-3xl">
                        I have hands-on knowledge of system security fundamentals, including Linux environments, access control, basic vulnerability awareness, and defensive practices. I use this knowledge to build more secure automation systems, identify weak points early, and avoid common security mistakes in production setups.
                    </p>
                </div>
            </div>
        </motion.div>

        <div className="mt-8 sm:mt-12 md:mt-16 pt-8 sm:pt-12 md:pt-16 border-t border-border">
            <h3 className="font-mono text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 tracking-widest">CORE TECHNOLOGIES</h3>
            <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <SiPython size={28} className="sm:w-10 sm:h-10" />
                <SiDocker size={28} className="sm:w-10 sm:h-10" />
                <SiLinux size={28} className="sm:w-10 sm:h-10" />
                <SiPostgresql size={28} className="sm:w-10 sm:h-10" />
                <SiRedis size={28} className="sm:w-10 sm:h-10" />
                <SiNginx size={28} className="sm:w-10 sm:h-10" />
                <SiGit size={28} className="sm:w-10 sm:h-10" />
                <SiGnubash size={28} className="sm:w-10 sm:h-10" />
            </div>
        </div>
      </div>
    </section>
  );
}
