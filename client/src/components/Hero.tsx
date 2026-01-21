import heroBg from "@assets/generated_images/abstract_technical_dark_network_background.png";
import avatarImg from "@assets/IMG_20260111_001525_101_1768965064256.webp";

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 pb-12 md:pt-0 md:pb-0">

      <div className="container relative z-10 px-4 sm:px-6 mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 text-center md:text-left">
          <div className="max-w-4xl flex-1 relative z-20">
            <div>
              <p className="font-mono text-primary mb-3 md:mb-4 tracking-widest text-xs sm:text-sm">
                // INDIA_BASED // SYSTEM_ARCHITECT
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none tracking-tighter mb-4 md:mb-6 relative">
                SAMANTA<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                  MONDAL
                </span>
              </h1>
            </div>

            <div className="max-w-2xl mx-auto md:mx-0">
              <p className="text-base sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-6 md:mb-8">
                Early-stage systems builder focused on Telegram bots, Linux automation, and AI tools.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                <a 
                  href="#projects" 
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 font-mono text-xs sm:text-sm tracking-wider border border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300"
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
            </div>
          </div>

          <div className="flex-shrink-0 relative hover:scale-105 transition-transform duration-500">
             <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full p-1 bg-gradient-to-tr from-primary to-transparent">
               <img 
                 src={avatarImg} 
                 alt="Samanta Mondal" 
                 className="w-full h-full object-cover rounded-full border-2 sm:border-4 border-background relative z-10"
                 fetchPriority="high"
                 loading="eager"
               />
             </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden md:flex">
        <span className="font-mono text-[10px] text-muted-foreground tracking-[0.2em]">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
