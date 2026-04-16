import React from 'react';
import { BarChart3, Mail, Linkedin, Twitter } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <BarChart3 className="h-6 w-6 text-canyon-500" />
              <span className="text-xl font-bold tracking-tight">
                Corner Canyon<span className="text-canyon-500">Analytics</span>
              </span>
            </div>
            <p className="max-w-md text-slate-400">
              Transforming complex data landscapes into clear strategic pathways.
              We help small businesses and nonprofits leverage data
              to drive meaningful impact and sustainable growth.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.linkedin.com/company/corner-canyon-analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-all duration-200"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <button
                className="hover:text-white transition-all duration-200"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <a
                href="mailto:info@cornercanyon.com"
                className="hover:text-white transition-all duration-200"
                aria-label="Email us"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Insights</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} Corner Canyon Analytics LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}