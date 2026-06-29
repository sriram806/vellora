'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Save } from 'lucide-react';
import { useToast } from '@/components/UI/ToastProvider';

interface SavedProfile {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export default function AddressPage() {
  const { toast } = useToast();

  const [email, setEmail] = useState('atelier.client@JCOPS.com');
  const [firstName, setFirstName] = useState('Julian');
  const [lastName, setLastName] = useState('Sartre');
  const [address, setAddress] = useState("84 Rue de l'Université");
  const [city, setCity] = useState('Paris');
  const [state, setState] = useState('IDF');
  const [zip, setZip] = useState('75007');
  const [phone, setPhone] = useState('+33 1 44 27 00 00');

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('JCOPS_profile');
      if (storedProfile) {
        const p: SavedProfile = JSON.parse(storedProfile);
        if (p.email) setEmail(p.email);
        if (p.firstName) setFirstName(p.firstName);
        if (p.lastName) setLastName(p.lastName);
        if (p.address) setAddress(p.address);
        if (p.city) setCity(p.city);
        if (p.state) setState(p.state);
        if (p.zip) setZip(p.zip);
        if (p.phone) setPhone(p.phone);
      }
    } catch (e) {
      console.error('Failed to load profile address info', e);
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !firstName || !lastName || !address || !city || !state || !zip || !phone) {
      toast({
        type: 'error',
        title: 'Missing parameters',
        description: 'Profile information and delivery address fields cannot be blank.',
      });
      return;
    }

    const updatedProfile: SavedProfile = {
      email,
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      phone,
    };

    localStorage.setItem('JCOPS_profile', JSON.stringify(updatedProfile));

    toast({
      type: 'success',
      title: 'Profile Updated',
      description: 'Your default delivery details have been saved for checkout.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="heading-serif text-2xl uppercase tracking-wider text-foreground">Address & Personal Info</h2>
        <p className="text-xs text-foreground-secondary mt-1">Configure your shipping and billing coordinates for priority delivery dispatch.</p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6 text-xs text-foreground-secondary">
        {/* Personal Coordinates */}
        <div className="border border-border p-6 bg-background rounded-sm space-y-4">
          <h3 className="ui-text text-xs font-semibold border-b border-border pb-3 flex items-center gap-2 text-foreground">
            <User className="w-4 h-4 text-accent" /> Personal Coordinates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground uppercase tracking-wider"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground uppercase tracking-wider"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground-secondary font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Phone Contact</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground font-mono"
              />
            </div>
          </div>
        </div>

        {/* Default Shipping Address */}
        <div className="border border-border p-6 bg-background rounded-sm space-y-4">
          <h3 className="ui-text text-xs font-semibold border-b border-border pb-3 flex items-center gap-2 text-foreground">
            <MapPin className="w-4 h-4 text-accent" /> Default Delivery Coordinates
          </h3>
          <div className="grid grid-cols-1 gap-1.5">
            <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Street Address</label>
            <input
              type="text"
              required
              placeholder="Street and house number details..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground uppercase tracking-wider"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground uppercase tracking-wider"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">State / Province</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground uppercase tracking-wider"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Postal Code</label>
              <input
                type="text"
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="border border-border bg-background px-3 py-2.5 outline-none focus:border-accent w-full text-foreground font-mono"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary py-3.5 px-8 text-[9px] uppercase font-mono tracking-widest flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Details</span>
        </button>
      </form>
    </motion.div>
  );
}
