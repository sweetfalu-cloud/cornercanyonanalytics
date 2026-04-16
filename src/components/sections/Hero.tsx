import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32 lg:py-48 min-h-[90vh] flex items-center">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-canyon-200/20 dark:bg-canyon-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-200/20 dark:bg-slate-800/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-canyon-50 dark:bg-canyon-950/40 border border-canyon-200/50 dark:border-canyon-800/50 text-canyon-700 dark:text-canyon-400 text-xs md:text-sm font-bold mb-8 uppercase tracking-widest shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>Empowering Purpose-Driven Teams</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-foreground tracking-tight leading-[1.05] md:leading-[1.1]"
          >
            Predict the Future with <br className="hidden md:block" />
            <span className="text-gradient-canyon inline-block mt-2">Canyon-Deep Insights</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-10 max-w-3xl mx-auto space-y-6"
          >
            <p className="text-xl md:text-3xl font-bold text-foreground text-pretty leading-snug">
              Clear insights. Practical decisions. <br className="hidden sm:block" />
              Analytics for small businesses and nonprofits.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We combine enterprise-grade data engineering with approachable guidance
              to turn your organization's information into its greatest strategic asset.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Button asChild size="lg" className="bg-canyon-600 hover:bg-canyon-700 text-white px-10 h-16 text-lg font-bold group w-full sm:w-auto shadow-xl shadow-canyon-500/20 transition-all hover:-translate-y-1">
              <a href="#contact">
                Start Your Strategy
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-16 px-10 text-lg font-bold w-full sm:w-auto border-2 hover:bg-accent transition-all hover:-translate-y-1">
              <a href="#services">Explore Services</a>
            </Button>
          </motion.div>
        </div>
      </div>
      {/* Decorative floating element */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 md:left-20 w-16 h-16 bg-canyon-500/10 rounded-2xl border border-canyon-500/20 blur-sm hidden lg:block"
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-40 right-10 md:right-20 w-24 h-24 bg-slate-500/10 rounded-full border border-slate-500/20 blur-md hidden lg:block"
      />
    </section>
  );
}