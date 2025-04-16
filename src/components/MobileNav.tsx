
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, FileSpreadsheet, UtensilsCrossed, Apple, Heart, CalendarDays } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: <Home className="h-5 w-5 mr-3" />,
    },
    {
      label: 'Create Plan',
      href: '/create-plan',
      icon: <FileSpreadsheet className="h-5 w-5 mr-3" />,
    },
    {
      label: 'My Plan',
      href: '/plan',
      icon: <CalendarDays className="h-5 w-5 mr-3" />,
    },
    {
      label: 'Recipes',
      href: '/recipes',
      icon: <UtensilsCrossed className="h-5 w-5 mr-3" />,
    },
    {
      label: 'Ingredients',
      href: '/ingredients',
      icon: <Apple className="h-5 w-5 mr-3" />,
    },
    {
      label: "Mother's Special",
      href: '/mothers-special',
      icon: <Heart className="h-5 w-5 mr-3" />,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2 z-10">
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Menu className="h-5 w-5" />
            <span className="ml-2 font-normal">Menu</span>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <div className="px-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Seasonal Diet Planner</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center px-3 py-3 rounded-md text-sm font-medium ${
                  location.pathname === item.href
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
