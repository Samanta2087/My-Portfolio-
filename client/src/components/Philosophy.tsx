import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border border-border p-4 sm:p-8 md:p-12 lg:p-16 relative bg-card"
        >
            <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-l border-primary" />
            <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t border-r border-primary" />
            <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-l border-primary" />
            <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b border-r border-primary" />

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6 md:mb-8 text-center">OPERATIONAL PHILOSOPHY</h2>
            
            <div className="space-y-4 sm:space-y-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground">
                <p>
                    <span className="text-foreground font-bold">01. EXECUTION OVER PERFECTION.</span><br/>
                    A working system in production is infinitely more valuable than a perfect architecture on a whiteboard. I build to ship.
                </p>
                <p>
                    <span className="text-foreground font-bold">02. OWNERSHIP OVER RENTING.</span><br/>
                    I prefer controlling the infrastructure. SaaS lock-in is a vulnerability. Understanding the Linux kernel and VPS management provides true freedom.
                </p>
                <p>
                    <span className="text-foreground font-bold">03. BRUTAL HONESTY.</span><br/>
                    Code doesn't lie. Metrics don't lie. I avoid fluff and vanity metrics in favor of tangible uptime, latency reduction, and successful request handling.
                </p>
                <p>
                    <span className="text-foreground font-bold">04. HIGH RISK TOLERANCE.</span><br/>
                    Innovation happens at the edge of stability. I experiment with new APIs, high-frequency bots, and automation limits to find what's actually possible.
                </p>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
