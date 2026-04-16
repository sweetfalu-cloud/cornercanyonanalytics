import React from 'react';
import { BarChart3, Mail, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-white">
              <BarChart3 className="h-6 w-6 text-canyon-500" />
              <span className="text-xl font-bold tracking-tight">
                Corner Canyon<span className="text-canyon-500">Analytics</span>
              </span>
            </div>
            <p className="max-w-md text-slate-400 text-lg leading-relaxed">
              Transforming complex data landscapes into clear strategic pathways.
              We help small businesses and nonprofits leverage data
              to drive meaningful impact and sustainable growth.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.linkedin.com/company/corner-canyon-analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all duration-200"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/cornercanyon"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all duration-200"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@cornercanyon.com"
                className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all duration-200"
                aria-label="Email us"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#about" className="hover:text-canyon-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-canyon-400 transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-canyon-400 transition-colors">Consultation</a></li>
              <li><a href="#" className="hover:text-canyon-400 transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#contact" className="hover:text-canyon-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-canyon-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-canyon-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Corner Canyon Analytics LLC. All rights reserved.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-slate-400 hover:text-white hover:bg-slate-900"
          >
            Back to top <ArrowUp className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}