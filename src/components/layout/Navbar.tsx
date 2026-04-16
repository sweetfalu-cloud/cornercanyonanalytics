import React, { useState } from 'react';
import { Menu, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogoAction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLogoAction();
    }
  };
  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            role="button"
            tabIndex={0}
            aria-label="Back to top"
            className="flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canyon-600 rounded-md p-1" 
            onClick={handleLogoAction}
            onKeyDown={handleKeyDown}
          >
            <BarChart3 className="h-6 w-6 text-canyon-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Corner Canyon<span className="text-canyon-600">Analytics</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-canyon-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4">
              <ThemeToggle className="static" />
              <Button asChild className="bg-canyon-600 hover:bg-canyon-700 text-white transition-all duration-300 hover:shadow-md">
                <a href="#contact">Get Started</a>
              </Button>
            </div>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle className="static" />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-canyon-600" />
                    Corner Canyon
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium hover:text-canyon-600 transition-colors py-3 border-b border-muted"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Button asChild className="bg-canyon-600 hover:bg-canyon-700 text-white w-full mt-4 h-12">
                    <a href="#contact" onClick={() => setIsOpen(false)}>
                      Get Started
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}