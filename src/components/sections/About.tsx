import React from 'react';
import { CheckCircle2 } from 'lucide-react';
export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-canyon-600 font-semibold tracking-wide uppercase text-sm">Our Ethos</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-foreground mt-2 leading-tight">
                Data Integrity Meets <br /> Strategic Vision
              </h3>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded at the intersection of technology and market research, Corner Canyon 
              Analytics was born from a simple observation: most companies are drowning 
              in data but starving for insights.
            </p>
            <div className="space-y-4">
              {[
                'Expert-led consultation, not algorithm-only output',
                'Proprietary predictive frameworks for B2B landscapes',
                'Seamless integration with existing enterprise stacks',
                'Transparent, privacy-first data handling policies',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-canyon-600 shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-canyon-500 to-canyon-700 p-8 flex flex-col justify-end text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-4">
                <div className="text-6xl font-bold">98%</div>
                <div className="text-xl font-medium opacity-90">Client retention rate based on actionable ROI delivery.</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 md:w-64 bg-background border p-6 rounded-xl shadow-xl hidden md:block">
              <p className="italic text-sm text-muted-foreground">
                "Corner Canyon didn't just give us a report; they gave us a roadmap that increased our quarterly revenue by 22%."
              </p>
              <p className="mt-4 font-bold text-sm">— Director of Ops, Fortune 500 Tech</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}