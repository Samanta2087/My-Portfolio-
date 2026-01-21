import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-background border-b border-border/50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4">WHO I AM</h2>
            <div className="h-1 w-16 sm:w-24 bg-primary" />
          </div>

          <div className="font-mono text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground space-y-4 sm:space-y-6 md:space-y-8 text-left sm:text-justify">
            <p>
              I'm Samanta Mondal, an early-stage systems builder focused on <span className="text-foreground">Telegram bots, Linux automation, and AI-powered tools</span>.
            </p>
            <p>
               Whether it's deploying containerized Android infrastructures or architecting high-traffic prediction algorithms, I focus on the intersection of stability and speed. I don't just write code; I engineer resilient workflows that operate autonomously.
            </p>
            <p>
              My goal is simple: <span className="text-primary">build useful systems, sharpen my technical depth, and move fast without cutting corners.</span>
            </p>
          </div>
        </motion.div>
      </div>

       {/* Decorative Elements */}
       <div className="absolute top-10 right-0 opacity-5 pointer-events-none overflow-hidden hidden md:block">
          <span className="text-[12rem] font-display font-bold text-foreground leading-none">01</span>
       </div>
    </section>
  );
}
