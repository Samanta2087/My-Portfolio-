import { motion } from "framer-motion";
import { Send, Github, MessageCircle } from "lucide-react";
import { SiTelegram, SiGithub } from "react-icons/si";

export default function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-secondary/10 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 md:mb-6">INITIATE<br/>HANDSHAKE</h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-6 md:mb-8 max-w-md mx-auto md:mx-0">
              Available for high-impact projects involving backend systems, automation, and infrastructure. 
            </p>
            
            <div className="flex gap-3 sm:gap-4 md:gap-6 justify-center md:justify-start flex-wrap">
              <a 
                href="https://t.me/Samanta2087" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center justify-center p-3 sm:p-4 bg-card border border-border hover:border-primary hover:text-primary transition-all"
                aria-label="Telegram"
              >
                <SiTelegram size={20} className="sm:w-6 sm:h-6" />
                <span className="mt-2 text-[10px] sm:text-xs font-mono text-muted-foreground md:hidden">Telegram</span>
              </a>
              <a 
                href="https://github.com/Samanta2087" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center justify-center p-3 sm:p-4 bg-card border border-border hover:border-primary hover:text-primary transition-all"
                aria-label="GitHub"
              >
                <SiGithub size={20} className="sm:w-6 sm:h-6" />
                <span className="mt-2 text-[10px] sm:text-xs font-mono text-muted-foreground md:hidden">GitHub</span>
              </a>
              <a 
                href="mailto:samantas6085@gmail.com" 
                className="group flex flex-col items-center justify-center p-3 sm:p-4 bg-card border border-border hover:border-primary hover:text-primary transition-all"
                aria-label="Email"
              >
                <Send size={20} className="sm:w-6 sm:h-6" />
                <span className="mt-2 text-[10px] sm:text-xs font-mono text-muted-foreground md:hidden">Email</span>
              </a>
            </div>
          </div>

          <div className="bg-card p-4 sm:p-6 md:p-8 border border-border">
             <h3 className="font-mono text-xs sm:text-sm tracking-widest mb-4 sm:mb-6 text-primary">// FUTURE_EXPERIMENTS_QUEUE</h3>
             <ul className="space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm text-muted-foreground">
                <li className="flex gap-2 sm:gap-4">
                    <span className="text-primary shrink-0">[PENDING]</span>
                    <span>AI-Driven Voice Cloning for customer support agents</span>
                </li>
                <li className="flex gap-2 sm:gap-4">
                    <span className="text-primary shrink-0">[PENDING]</span>
                    <span>Decentralized storage layer for high-volume logs</span>
                </li>
                <li className="flex gap-2 sm:gap-4">
                    <span className="text-primary shrink-0">[ACTIVE]</span>
                    <span>Scalable proxy rotation network for data scraping</span>
                </li>
             </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-24 pt-6 md:pt-8 border-t border-border flex flex-col gap-2 md:flex-row justify-between items-center text-[10px] sm:text-xs font-mono text-muted-foreground">
          <p>© {new Date().getFullYear()} SAMANTA MONDAL. ALL SYSTEMS OPERATIONAL.</p>
        </div>
      </div>
    </section>
  );
}
