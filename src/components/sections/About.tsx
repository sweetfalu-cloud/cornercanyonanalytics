import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-canyon-600 font-semibold tracking-wide uppercase text-sm">Our Ethos</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-foreground mt-2 leading-tight">
                Community Impact <br /> Through Clarity
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Corner Canyon Analytics was founded on the belief that high-quality data 
              strategy shouldn't be reserved for billion-dollar corporations. We bridge 
              the gap between sophisticated technology and the specific needs of 
              growing businesses and nonprofits.
            </p>
            <div className="space-y-4">
              {[
                'Accessible analytics built for mission-driven leaders',
                'Practical frameworks focused on sustainable growth',
                'Human-centered consultation, not just automated reports',
                'Transparent pricing and ethical data stewardship',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-canyon-600 shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-canyon-500 to-canyon-700 p-8 flex flex-col justify-end text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-4">
                <div className="text-6xl font-bold">100%</div>
                <div className="text-xl font-medium opacity-90">Focus on delivering actionable ROI for small teams.</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 md:w-72 bg-background border p-6 rounded-xl shadow-xl hidden md:block">
              <p className="italic text-sm text-muted-foreground">
                "Corner Canyon didn't just give us a report; they gave us the roadmap 
                that allowed us to expand our community services by 30% this year."
              </p>
              <p className="mt-4 font-bold text-sm">— Executive Director, Regional Community Fund</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}