import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <nav className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-canyon-600" />
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
            <ThemeToggle className="static" />
            <Button className="bg-canyon-600 hover:bg-canyon-700 text-white">
              Get Started
            </Button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle className="static" />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-canyon-600" />
                    Analytics
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium hover:text-canyon-600 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                  <Button className="bg-canyon-600 hover:bg-canyon-700 text-white w-full mt-4">
                    Get Started
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