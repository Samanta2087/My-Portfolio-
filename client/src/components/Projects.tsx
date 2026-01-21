import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ocrBotImg from "@assets/generated_images/ocr_bot_interface_redacting_sensitive_info.png";
import superBotImg from "@assets/generated_images/super_bot_telegram_interface.png";
import { TiltCard } from "@/components/ui/TiltCard";

export default function Projects() {
  const projects = [
    {
      title: "Super Bot",
      category: "Full-Stack Automation",
      problem: "Users needed a unified tool for media downloading, file conversion, and cloud storage management within Telegram.",
      solution: "Engineered a multi-feature bot with async processing for video downloads (YouTube/Instagram), Photo-to-PDF conversion, and Google Drive integration.",
      outcome: "Created a robust, all-in-one utility with a premium payment system and seamless file management for thousands of users.",
      tech: ["Python", "Telegram API", "FFmpeg", "Google Drive API", "Payment Integration"],
      image: superBotImg,
      caption: "Super Bot Telegram Interface"
    },
    {
      title: "OCR Privacy Utility Bot",
      category: "Sole Developer",
      problem: "Sharing screenshots containing sensitive UPI IDs posed a significant privacy risk.",
      solution: "Built an automated bot using OCR and image processing to detect and redact UPI IDs instantly.",
      outcome: "Enhanced user privacy by automatically sanitizing images before sharing.",
      tech: ["Python", "OCR", "Image Processing"],
      image: ocrBotImg,
      caption: "OCR UPI ID Remover Bot UI"
    },
    {
      title: "Cloud-Based Android Infrastructure",
      category: "Systems Architect & DevOps",
      problem: "Physical device farms are expensive and difficult to scale for automated testing.",
      solution: "Architected a containerized environment using Docker, Redroid, and scrcpy-web on Ubuntu VPS.",
      outcome: "Created a scalable, headless Android infrastructure accessible remotely via web interface.",
      tech: ["Docker", "Redroid", "scrcpy-web", "VPS Ubuntu"]
    }
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 bg-secondary/20 perspective-1000">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4">DEPLOYED SYSTEMS</h2>
            <div className="h-1 w-16 sm:w-24 bg-primary" />
          </div>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-md md:text-right">
            // SELECTED_WORKS<br/>
            // FOCUS: STABILITY_AND_SPEED
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {projects.map((project, index) => (
            <div key={index} className="w-full md:hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group border-l-2 border-border pl-4 sm:pl-6 hover:border-primary transition-colors duration-300 bg-background/30 backdrop-blur-sm p-4 rounded-r-lg"
              >
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div>
                    <span className="font-mono text-[10px] sm:text-xs text-primary tracking-widest mb-2 block">{project.category}</span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-background border border-border text-[10px] sm:text-xs font-mono text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {project.image && (
                    <div className="relative overflow-hidden border border-border/50 bg-background/50 rounded-sm">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-background/90 border-t border-border/50 py-1.5 px-3">
                        <p className="font-mono text-[8px] sm:text-[10px] uppercase tracking-widest text-muted-foreground">
                          // {project.caption}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 pt-4 border-t border-border/30">
                    <div>
                      <h4 className="font-mono text-[10px] sm:text-xs text-muted-foreground mb-1.5 uppercase">Problem</h4>
                      <p className="text-xs sm:text-sm leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[10px] sm:text-xs text-muted-foreground mb-1.5 uppercase">Solution</h4>
                      <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">{project.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[10px] sm:text-xs text-muted-foreground mb-1.5 uppercase text-primary">Outcome</h4>
                      <p className="text-xs sm:text-sm leading-relaxed">{project.outcome}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}

          {projects.map((project, index) => (
            <TiltCard key={`desktop-${index}`} intensity={5} className="w-full hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group border-l-2 border-border pl-6 md:pl-12 hover:border-primary transition-colors duration-300 bg-background/30 backdrop-blur-sm p-4 md:p-8 rounded-r-lg"
            >
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="transform transition-transform duration-300 group-hover:translate-z-10">
                      <span className="font-mono text-xs text-primary tracking-widest mb-2 block">{project.category}</span>
                      <h3 className="text-3xl font-display font-bold mb-4 flex items-center gap-2">
                        {project.title}
                        <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-4 mb-6">
                        {project.tech.map((t, i) => (
                          <span key={i} className="px-2 py-1 bg-background border border-border text-xs font-mono text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {project.image && (
                      <div className="relative group/image overflow-hidden border border-border/50 bg-background/50 rounded-sm transform transition-transform duration-500 hover:scale-[1.02] shadow-2xl">
                        <div className="aspect-video w-full overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.caption}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-background/90 border-t border-border/50 py-2 px-4 backdrop-blur-sm">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            // {project.caption}
                          </p>
                        </div>
                      </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border/30">
                  <div>
                    <h4 className="font-mono text-xs text-muted-foreground mb-2 uppercase">Problem</h4>
                    <p className="text-sm leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-muted-foreground mb-2 uppercase">Solution</h4>
                    <p className="text-sm leading-relaxed text-foreground/90">{project.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs text-muted-foreground mb-2 uppercase text-primary">Outcome</h4>
                    <p className="text-sm leading-relaxed">{project.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
