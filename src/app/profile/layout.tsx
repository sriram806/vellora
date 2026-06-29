'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  User,
  MapPin,
  FileText,
  Sparkles,
  LogOut,
  Scissors
} from 'lucide-react';

interface SavedProfile {
  firstName: string;
  lastName: string;
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [clientName, setClientName] = useState('Julian Sartre');

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('JCOPS_profile');
      if (storedProfile) {
        const p: SavedProfile = JSON.parse(storedProfile);
        if (p.firstName || p.lastName) {
          setClientName(`${p.firstName || ''} ${p.lastName || ''}`.trim());
        }
      }
    } catch (e) {
      console.error('Failed to load profile name', e);
    }
  }, [pathname]); // Refresh name if navigation happens

  const handleResetProfile = () => {
    localStorage.removeItem('JCOPS_profile');
    localStorage.removeItem('JCOPS_measurements');
    router.refresh();
    window.location.reload();
  };

  const navLinks = [
    { href: '/profile', label: 'Dashboard', icon: User, exact: true },
    { href: '/profile/address', label: 'Address & Contact', icon: MapPin, exact: false },
    { href: '/profile/orders', label: 'Acquisitions Ledger', icon: FileText, exact: false },
    { href: '/profile/measurements', label: 'Fitting Room', icon: Scissors, exact: false },
    { href: '/profile/perks', label: 'Atelier Perks', icon: Sparkles, exact: false },
  ];

  return (
    <main className="container-JCOPS py-10 sm:py-16 lg:py-20 min-h-[85vh]">
      {/* Top Banner Header */}
      <div className="border-b border-border pb-8 mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">Atelier Member Account</span>
          <h1 className="heading-serif text-4xl sm:text-5xl uppercase tracking-wide mt-2">{clientName || 'Julian Sartre'}</h1>
          <p className="text-xs text-foreground-muted uppercase tracking-[0.2em] font-mono mt-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            Atelier Elite Tier Client
          </p>
        </div>

        <button
          onClick={handleResetProfile}
          className="text-[9px] uppercase tracking-widest text-foreground-muted hover:text-error hover:border-error/30 font-semibold font-mono self-start md:self-auto border border-border bg-background px-4 py-2 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Reset Session Profile</span>
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr] items-start">
        {/* Profile Sidebar Navigation */}
        <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible border-b lg:border-b-0 lg:border-r border-border pb-4 lg:pb-0 pr-0 lg:pr-6 gap-2 lg:gap-1.5 scrollbar-none whitespace-nowrap">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href) && pathname !== '/profile/layout'; // Avoid matching layout name files

            // Adjust dashboard exact match so layout transitions highlight correctly
            const isDashboardActive = link.href === '/profile' && pathname === '/profile';
            const highlightActive = link.exact ? isDashboardActive : isActive;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase font-mono tracking-widest transition-all rounded-xs cursor-pointer ${highlightActive
                    ? 'bg-foreground text-background font-bold'
                    : 'text-foreground-secondary hover:bg-border-light hover:text-foreground'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Dynamic Subpage Children Slot */}
        <div className="min-w-0">
          {children}
        </div>
      </div>
    </main>
  );
}
