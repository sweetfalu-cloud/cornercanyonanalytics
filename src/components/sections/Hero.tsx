import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32 lg:py-48">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-canyon-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canyon-100 dark:bg-canyon-950 border border-canyon-200 dark:border-canyon-800 text-canyon-700 dark:text-canyon-400 text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4" />
            <span>Redefining Enterprise Intelligence</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-7xl lg:text-8xl font-display font-bold text-foreground tracking-tight leading-[1.1]"
          >
            Predict the Future with <br />
            <span className="text-gradient-canyon">Canyon-Deep Insights</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            We combine high-performance data engineering with sophisticated predictive modeling
            to turn your company's information into an unfair competitive advantage.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#contact">
              <Button size="lg" className="bg-canyon-600 hover:bg-canyon-700 text-white px-8 h-14 text-lg font-semibold group w-full sm:w-auto">
                Start Your Strategy
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#services">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium w-full sm:w-auto">
                View Case Studies
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}