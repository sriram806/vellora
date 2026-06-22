'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ChevronRight, 
  ShoppingBag, 
  User, 
  Scissors, 
  Activity,
  ArrowRight
} from 'lucide-react';

interface SavedProfile {
  email: string;
  firstName: string;
  lastName: string;
}

interface Order {
  orderId: string;
  email: string;
  total: number;
  status: string;
  date: string;
  items: Array<any>;
}

export default function ProfileDashboard() {
  const [email, setEmail] = useState('atelier.client@vellora.com');
  const [profile, setProfile] = useState<SavedProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hasMeasurements, setHasMeasurements] = useState(false);

  useEffect(() => {
    // Load profile
    try {
      const storedProfile = localStorage.getItem('vellora_profile');
      if (storedProfile) {
        const p = JSON.parse(storedProfile);
        setProfile(p);
        if (p.email) setEmail(p.email);
      }
    } catch (e) {
      console.error('Failed to load profile', e);
    }

    // Load orders
    try {
      const storedOrders = localStorage.getItem('vellora_orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }

    // Load measurements check
    const storedMeas = localStorage.getItem('vellora_measurements');
    if (storedMeas) {
      setHasMeasurements(true);
    }
  }, []);

  // Filter orders matching currently saved email
  const userOrders = useMemo(() => {
    return orders.filter(o => o.email.toLowerCase() === email.toLowerCase());
  }, [orders, email]);

  const spentTotal = useMemo(() => {
    return userOrders.reduce((sum, o) => sum + o.total, 0);
  }, [userOrders]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Overview Intro */}
      <div>
        <h2 className="heading-serif text-2xl uppercase tracking-wider text-foreground">Account Dashboard</h2>
        <p className="text-xs text-foreground-secondary mt-1">Review your membership, recent purchases, and physical fitting parameters.</p>
      </div>

      {/* Grid: Member Card & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Virtual Membership Card (Col Span 5) */}
        <div className="md:col-span-5 relative border border-accent/25 bg-gradient-to-tr from-[#12100d] via-[#1a1a1a] to-[#252119] rounded-sm p-6 text-white overflow-hidden shadow-md flex flex-col justify-between aspect-video select-none group">
          <div className="absolute inset-0 bg-radial-gold opacity-15 pointer-events-none" />
          
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-playfair text-lg font-bold tracking-widest uppercase text-white">Vellora Elite</h4>
              <span className="text-[7px] font-mono text-accent uppercase tracking-widest mt-1 block">Atelier Privilege Card</span>
            </div>
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          </div>

          <div className="mt-8 flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block">Client Profile ID</span>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200">VEL-CLI-2026</span>
            </div>
            <div className="text-right space-y-1">
              <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest block">Join Date</span>
              <span className="font-mono text-xs font-semibold text-zinc-200">JUN 2026</span>
            </div>
          </div>
        </div>

        {/* Quick statistics (Col Span 7) */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-border p-5 rounded-sm bg-background-secondary/25 flex flex-col justify-between shadow-xs">
            <span className="text-[9px] uppercase font-mono text-foreground-muted tracking-wider">Total Sales Ledger</span>
            <div className="mt-4">
              <h3 className="font-mono text-2xl font-bold text-foreground">{userOrders.length}</h3>
              <span className="text-[9px] text-foreground-muted uppercase tracking-wider block mt-1">Acquisitions</span>
            </div>
          </div>

          <div className="border border-border p-5 rounded-sm bg-background-secondary/25 flex flex-col justify-between shadow-xs">
            <span className="text-[9px] uppercase font-mono text-foreground-muted tracking-wider">Spent Sums</span>
            <div className="mt-4">
              <h3 className="font-mono text-2xl font-bold text-accent">${spentTotal}</h3>
              <span className="text-[9px] text-foreground-muted uppercase tracking-wider block mt-1">Bespoke Transactions</span>
            </div>
          </div>

          <div className="border border-border p-5 rounded-sm bg-background-secondary/25 flex flex-col justify-between shadow-xs">
            <span className="text-[9px] uppercase font-mono text-foreground-muted tracking-wider">Fitting Status</span>
            <div className="mt-4">
              <h3 className={`font-mono text-sm font-bold uppercase ${hasMeasurements ? 'text-emerald-500' : 'text-amber-500 animate-pulse'}`}>
                {hasMeasurements ? 'Configured' : 'Incomplete'}
              </h3>
              <span className="text-[9px] text-foreground-muted uppercase tracking-wider block mt-1">Body Geometry</span>
            </div>
          </div>
        </div>

      </div>

      {/* Grid: Recent Orders & Quick actions */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        
        {/* Recent Orders Overview */}
        <div className="border border-border p-6 rounded-sm space-y-4 bg-background">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Recent Acquisitions</h3>
            <Link href="/profile/orders" className="text-[9px] text-accent uppercase font-mono tracking-widest font-semibold hover:underline flex items-center gap-1">
              <span>Full Ledger</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-border-light">
            {userOrders.slice(0, 2).map((order) => (
              <div key={order.orderId} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <span className="font-mono font-bold text-xs block text-foreground">{order.orderId}</span>
                  <span className="text-[10px] text-foreground-muted block mt-0.5">
                    {new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="text-right pl-4">
                  <span className="font-mono text-xs font-bold text-accent">${order.total}</span>
                  <span className={`text-[8px] font-mono uppercase tracking-widest font-semibold block mt-0.5 ${
                    order.status === 'Pending' ? 'text-amber-500' :
                    order.status === 'Processing' ? 'text-blue-500' :
                    order.status === 'Shipped' ? 'text-indigo-500' : 'text-emerald-500'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}

            {userOrders.length === 0 && (
              <div className="py-8 text-center text-foreground-muted font-mono uppercase text-[9px] tracking-wider">
                No orders recorded.
              </div>
            )}
          </div>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="border border-border p-6 rounded-sm bg-background flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground pb-3 border-b border-border">Quick Coordinates</h3>
            
            <div className="space-y-2">
              <Link 
                href="/profile/address"
                className="flex justify-between items-center p-3 border border-border hover:border-accent bg-background-secondary/25 hover:bg-background rounded-xs text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" />
                  <span>Update Address</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-foreground-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link 
                href="/profile/measurements"
                className="flex justify-between items-center p-3 border border-border hover:border-accent bg-background-secondary/25 hover:bg-background rounded-xs text-[10px] uppercase font-mono tracking-wider transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-accent" />
                  <span>Fitting Parameters</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-foreground-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          <div className="text-[10px] text-foreground-muted font-mono leading-relaxed bg-background-secondary/40 p-3 rounded-xs border border-border">
            <span className="font-bold text-accent block mb-1">✓ Concierge Support</span>
            If you need bespoke changes or size alterations, email us directly.
          </div>
        </div>

      </div>

    </motion.div>
  );
}
