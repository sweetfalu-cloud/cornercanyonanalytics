import React from 'react';
import { 
  Database, 
  LineChart, 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
const services = [
  {
    title: 'Data Strategy',
    description: 'We design end-to-end data architectures that align with your business goals.',
    icon: Database,
  },
  {
    title: 'Predictive Modeling',
    description: 'Anticipate market shifts and customer behavior with custom AI-driven models.',
    icon: BrainCircuit,
  },
  {
    title: 'Visual Intelligence',
    description: 'Interactive dashboards that tell the story your data is hiding.',
    icon: LineChart,
  },
  {
    title: 'Performance Optimization',
    description: 'Optimize your pipeline for speed and cost-efficiency in cloud environments.',
    icon: Zap,
  },
  {
    title: 'Governance & Security',
    description: 'Ensure compliance and security are baked into your data lifecycle.',
    icon: ShieldCheck,
  },
  {
    title: 'Market Analysis',
    description: 'Leverage global data sets to identify expansion opportunities.',
    icon: Globe,
  },
];
export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Core Competencies</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Our multi-disciplinary approach ensures no data point is left behind in your journey toward digital maturity.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:-translate-y-1 transition-all duration-300 border-none shadow-soft hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-canyon-100 dark:bg-canyon-900 flex items-center justify-center mb-4 group-hover:bg-canyon-600 group-hover:text-white transition-colors duration-300">
                  <service.icon className="h-6 w-6 text-canyon-600 group-hover:text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}