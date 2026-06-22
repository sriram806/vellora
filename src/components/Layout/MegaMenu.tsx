'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const categories = [
    { name: 'T-Shirts & Tops', href: '/shop?category=t-shirts' },
    { name: 'Trousers & Pants', href: '/shop?category=pants' },
    { name: 'Sneakers & Footwear', href: '/shop?category=sneakers' },
    { name: 'Coats & Outerwear', href: '/shop?category=outerwear' },
    { name: 'Bags & Accessories', href: '/shop?category=accessories' },
  ];

  const collections = [
    { name: 'Aether Collection', desc: 'Sartorial minimalism & cashmere pieces.', href: '/collections#aether' },
    { name: 'Luminal Collection', desc: 'Technical satin & reflective materials.', href: '/collections#luminal' },
    { name: 'Sartorial Nomad', desc: 'Italian tailored pleated wool garments.', href: '/collections#sartorial' },
    { name: 'Zenith Collection', desc: 'Okayama denim & dry French cotton loopback.', href: '/collections#zenith' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-background/98 z-[90] overflow-y-auto backdrop-blur-xl flex flex-col justify-start"
        >
          {/* Centering Wrapper Container to prevent elements hitting screen edges */}
          <div className="container-vellora py-10 sm:py-16 flex flex-col justify-between min-h-screen flex-grow">
            
            {/* Menu Top Bar */}
            <div className="flex justify-between items-center pb-6 border-b border-border">
              <span className="font-playfair text-2xl font-bold tracking-[0.25em] text-foreground">
                VELLORA
              </span>
              <button
                onClick={onClose}
                className="p-3 hover:bg-border-light rounded-full transition-all text-foreground cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Body Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 sm:gap-16 py-12 sm:py-16 items-start">
              
              {/* Column 1: Categories list with huge typography */}
              <div className="space-y-6">
                <span className="text-[9px] uppercase tracking-[0.25em] text-foreground-muted font-mono font-bold block">
                  Departments
                </span>
                <ul className="space-y-4">
                  {categories.map((cat, idx) => (
                    <motion.li
                      key={cat.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={cat.href}
                        onClick={onClose}
                        className="font-playfair text-2xl sm:text-4xl font-bold hover:text-accent transition-all block leading-tight uppercase tracking-wide hover:translate-x-2 duration-300"
                      >
                        {cat.name.split(' & ')[0]}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Active campaigns / collections */}
              <div className="space-y-6 lg:col-span-2">
                <span className="text-[9px] uppercase tracking-[0.25em] text-foreground-muted font-mono font-bold block">
                  Current Campaigns
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {collections.map((col, idx) => (
                    <motion.div
                      key={col.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                    >
                      <Link
                        href={col.href}
                        onClick={onClose}
                        className="group border border-border p-5 hover:border-accent transition-all block bg-background-tertiary shadow-sm hover:shadow-md"
                      >
                        <span className="text-sm font-semibold group-hover:text-accent transition-colors block uppercase tracking-wide">
                          {col.name}
                        </span>
                        <span className="text-xs text-foreground-secondary mt-1.5 block leading-relaxed">
                          {col.desc}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Column 3: Philosophy / Highlights */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="border border-border p-6 flex flex-col justify-between bg-background-secondary relative overflow-hidden group shadow-sm h-full"
              >
                <div className="space-y-4">
                  <span className="label-text text-accent font-semibold">Brand Vision</span>
                  <h3 className="heading-serif text-lg leading-snug font-bold uppercase tracking-wider">
                    Where Generation Tailoring Meets Tech
                  </h3>
                  <p className="text-xs text-foreground-secondary leading-relaxed">
                    Vellora unites generational Italian craftsmanship with interactive 3D WebGL preview models, redefining the luxury retail archive.
                  </p>
                </div>
                <Link
                  href="/about"
                  onClick={onClose}
                  className="mt-8 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 text-foreground group-hover:text-accent transition-all duration-300"
                >
                  <span>Read Philosophy</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

            </div>

            {/* Menu Bottom Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-border mt-auto">
              <div className="text-[10px] text-foreground-muted uppercase tracking-[0.2em] font-mono">
                Milan / Tokyo / Paris / London / New York
              </div>

              {/* Social Grids */}
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-10 w-10 rounded-full border border-border flex items-center justify-center transition-all hover:border-accent hover:bg-accent-light"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-zinc-500 group-hover:text-accent transition-colors" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-10 w-10 rounded-full border border-border flex items-center justify-center transition-all hover:border-accent hover:bg-accent-light"
                  aria-label="Twitter"
                >
                  <FaXTwitter className="text-zinc-500 group-hover:text-accent transition-colors" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-10 w-10 rounded-full border border-border flex items-center justify-center transition-all hover:border-accent hover:bg-accent-light"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-zinc-500 group-hover:text-accent transition-colors" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
