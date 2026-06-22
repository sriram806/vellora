'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from 'react-icons/fa6';
import { useToast } from '@/components/UI/ToastProvider';

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    toast({
      type: 'success',
      title: 'Joined Atelier',
      description: 'Your email has been added to our private collection broadcast list.',
    });
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden bg-black text-white border-t border-zinc-900">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_60%)]" />

      {/* Large Background Brand Text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <h1 className="text-[14vw] pl-20 font-bold tracking-[0.4em] text-white/3 whitespace-nowrap">
          VELLORA
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
        {/* Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 sm:gap-16 pb-16 border-b border-zinc-900">
          
          {/* Newsletter Column */}
          <div className="space-y-4 max-w-md">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">Atelier Newsletter</span>
            <h3 className="font-serif text-xl sm:text-2xl uppercase tracking-wide">
              Join the Digital Atelier
            </h3>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm font-light">
              Receive early collection drops, experimental capsule previews, and elite members-only privileges.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm border-b border-zinc-800 pb-1.5 focus-within:border-[#D4AF37] transition-all pt-2">
              <input
                type="email"
                required
                placeholder="YOUR EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-xs outline-none placeholder:text-zinc-650 flex-1 py-1 font-mono uppercase tracking-wider"
              />
              <button
                type="submit"
                className="text-[10px] font-mono tracking-widest text-[#D4AF37] hover:text-white transition-colors cursor-pointer pr-1"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>

          {/* Navigation Links Column */}
          <div className="space-y-4">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-500 font-semibold">Atelier Services</span>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/shop" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-[10px] font-mono">Shop Catalogue</Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-[10px] font-mono">Collections</Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-[10px] font-mono">Client Profile</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-[10px] font-mono">Atelier Console</Link>
              </li>
            </ul>
          </div>

          {/* Information & Socials Column */}
          <div className="space-y-4">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-zinc-500 font-semibold">Information</span>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-[10px] font-mono">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-[10px] font-mono">Terms & Conditions</Link>
              </li>
            </ul>

            {/* Social Icons Inline */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group h-8 w-8 rounded-full border border-zinc-800 flex items-center justify-center transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
                aria-label="Instagram link"
              >
                <FaInstagram className="text-sm text-zinc-550 group-hover:text-[#D4AF37] transition-colors" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group h-8 w-8 rounded-full border border-zinc-800 flex items-center justify-center transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
                aria-label="Twitter link"
              >
                <FaXTwitter className="text-sm text-zinc-550 group-hover:text-[#D4AF37] transition-colors" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group h-8 w-8 rounded-full border border-zinc-800 flex items-center justify-center transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
                aria-label="Facebook link"
              >
                <FaFacebookF className="text-sm text-zinc-550 group-hover:text-[#D4AF37] transition-colors" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-zinc-550 font-mono">
            <p>
              © {new Date().getFullYear()} VELLORA. All Rights Reserved.
            </p>
            <span>International / English</span>
          </div>
        </div>

      </div>
    </footer>
  );
}