import { motion } from "framer-motion";
import heroBg from "@assets/generated_images/abstract_technical_dark_network_background.png";
import avatarImg from "@assets/IMG_20260111_001525_101_1768965064256.webp";

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-12 md:pt-0 md:pb-0 perspective-1000">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Gradient Overlay for Fade */}
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

      <div className="container relative z-10 px-4 sm:px-6 mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 text-center md:text-left">
          <div className="max-w-4xl flex-1 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="font-mono text-primary mb-3 md:mb-4 tracking-widest text-xs sm:text-sm">
                // INDIA_BASED // SYSTEM_ARCHITECT
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none tracking-tighter mb-4 md:mb-6 relative">
                SAMANTA<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                  MONDAL
                </span>
                <span className="absolute -z-10 top-0 left-0 text-primary/10 blur-xl transform translate-x-4 translate-y-4 hidden md:block">
                  SAMANTA<br />MONDAL
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="max-w-2xl mx-auto md:mx-0"
            >
              <p className="text-base sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-6 md:mb-8">
                Early-stage systems builder focused on Telegram bots, Linux automation, and AI tools.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <a 
                  href="#projects" 
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 font-mono text-xs sm:text-sm tracking-wider border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]"
                >
                  VIEW_SYSTEMS
                </a>
                <a 
                  href="https://t.me/Samanta2087"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 font-mono text-xs sm:text-sm tracking-wider border border-white/20 text-white hover:border-white transition-all duration-300"
                >
                  INITIATE_CONTACT
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
            className="flex-shrink-0 relative transform-style-3d hover:scale-105 transition-transform duration-500"
          >
             <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full p-1 bg-gradient-to-tr from-primary to-transparent shadow-[0_0_30px_rgba(45,212,191,0.3)] md:shadow-[0_0_50px_rgba(45,212,191,0.3)]">
               <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
               <img 
                 src={avatarImg} 
                 alt="Samanta Mondal" 
                 className="w-full h-full object-cover rounded-full border-2 sm:border-4 border-background relative z-10"
               />
             </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden md:flex"
      >
        <span className="font-mono text-[10px] text-muted-foreground tracking-[0.2em]">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
