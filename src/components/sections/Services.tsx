import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Heart,
  Search,
  Handshake,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
const services = [
  {
    title: 'Data Clarity & Dashboards',
    description: 'We organize your existing data into simple, easy-to-read dashboards. Stop digging through spreadsheets and start seeing your KPIs clearly in Excel, Google Sheets, or BI tools.',
    icon: LayoutDashboard,
  },
  {
    title: 'Business & Financial Insights',
    description: 'Understand your true profitability. We analyze your revenue, costs, and trends to provide practical recommendations that help you make better financial decisions.',
    icon: TrendingUp,
  },
  {
    title: 'Nonprofit Impact & Grant Reporting',
    description: 'Show funders exactly what you’ve achieved. We help define impact metrics, support grant reporting, and create board-ready visuals that tell your story confidently.',
    icon: Heart,
  },
  {
    title: 'Analysis for Growth',
    description: 'Find out what’s working and what isn’t. We look at donor/customer behavior and marketing effectiveness to pinpoint exactly where you should focus your energy to grow.',
    icon: Search,
  },
  {
    title: 'Fractional Analytics Partner',
    description: 'Get expert data support without the cost of a full-time hire. We provide ongoing dashboard maintenance, monthly insight summaries, and strategy calls for small teams.',
    icon: Handshake,
  },
  {
    title: 'Data Literacy & Training',
    description: 'Build your team’s confidence. We offer simple walkthroughs and training to help your leaders understand how to interpret data and use it daily.',
    icon: BookOpen,
  },
];
export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Our Services</h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Actionable insights designed for small businesses and nonprofits. We make your data work for you, not the other way around.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:-translate-y-1 transition-all duration-300 border-none shadow-sm hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-canyon-100 dark:bg-canyon-900 flex items-center justify-center mb-4 group-hover:bg-canyon-600 group-hover:text-white transition-colors duration-300">
                  <service.icon className="h-6 w-6 text-canyon-600 group-hover:text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground mt-2 leading-relaxed">
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