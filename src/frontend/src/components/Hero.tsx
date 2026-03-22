import { Button } from "@/components/ui/button";
import { BarChart2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="pt-28 pb-16 text-center px-4" data-ocid="hero.section">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-6 tracking-wider uppercase">
          <BarChart2 className="w-3.5 h-3.5" />
          Live Data · Real-Time Analytics
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-4">
          <span className="text-primary">BETEDGE ANALYTICS:</span>
          <br />
          <span className="text-foreground">Optimize Your Strategy</span>
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Data-driven insights, live odds comparison, AI projections, and expert
          picks — everything you need to make smarter bets.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button
            data-ocid="hero.primary_button"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 h-10 glow-blue"
          >
            Explore Analytics <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            data-ocid="hero.secondary_button"
            variant="outline"
            className="border-border text-foreground hover:bg-secondary/60 h-10 px-6"
          >
            View Live Odds
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
