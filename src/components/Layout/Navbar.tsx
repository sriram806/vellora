'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { useWishlist } from '@/hooks/WishlistContext';
import SearchModal from './SearchModal';
import MegaMenu from './MegaMenu';

export default function Navbar() {
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();

  // Dialog/drawer states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Announcement state
  const [announcement, setAnnouncement] = useState('Use Code: VEL15 for 15% off in the digital atelier');
  useEffect(() => {
    const saved = localStorage.getItem('vellora_announcement');
    if (saved) {
      setAnnouncement(saved);
    }
  }, []);

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Announcement Bar */}
        <div className="w-full bg-accent text-[9px] sm:text-[10px] text-white font-mono uppercase tracking-[0.15em] py-2 px-4 sm:px-6 text-center flex items-center justify-center gap-2 border-b border-white/10">
          <span>{announcement}</span>
          <span className="hidden md:inline-block w-1 h-1 rounded-full bg-white/60" />
          <span className="hidden md:inline-block">Free worldwide express shipping</span>
        </div>
        
        {/* Main Header Menu */}
        <div className="h-20 bg-background/80 backdrop-blur-md border-b border-border flex items-center">
          <div className="container-vellora w-full flex items-center justify-between">
          
          {/* Left Nav Menu Button */}
          <div className="flex items-center gap-6 sm:gap-8">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 group text-foreground cursor-pointer focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 group-hover:text-accent transition-colors" />
              ) : (
                <Menu className="w-5 h-5 group-hover:text-accent transition-colors" />
              )}
              <span className="ui-text text-[10px] hidden sm:inline group-hover:text-accent transition-colors">
                Menu
              </span>
            </button>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/shop" className="ui-text text-[10px] hover:text-accent transition-colors">
                Shop
              </Link>
              <Link href="/collections" className="ui-text text-[10px] hover:text-accent transition-colors">
                Collections
              </Link>
              <Link href="/about" className="ui-text text-[10px] hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/contact" className="ui-text text-[10px] hover:text-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Center Brand Name */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="font-playfair text-2xl font-bold tracking-[0.25em] text-foreground hover:opacity-80 transition-opacity">
              JCOPS
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full border border-transparent hover:border-border hover:bg-border-light text-foreground hover:text-accent transition-colors cursor-pointer"
              aria-label="Open search dialog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Profile Page Link */}
            <Link
              href="/profile"
              className="p-2 rounded-full border border-transparent hover:border-border hover:bg-border-light text-foreground hover:text-accent transition-colors cursor-pointer"
              aria-label="Open profile page"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Trigger Page Link */}
            <Link
              href="/wishlist"
              className="p-2 rounded-full border border-transparent hover:border-border hover:bg-border-light text-foreground hover:text-accent transition-colors cursor-pointer relative flex items-center justify-center"
              aria-label="Open wishlist page"
              data-cursor="hover"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-accent text-white text-[8px] font-mono font-bold flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Page Link */}
            <Link
              href="/cart"
              className="p-2 rounded-full border border-border bg-background-secondary/80 hover:bg-border-light text-foreground hover:text-accent transition-colors cursor-pointer relative flex items-center justify-center"
              aria-label="Open shopping bag page"
              data-cursor="hover"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-foreground text-background text-[8px] font-mono font-bold flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      </header>

      {/* Navigation Drawers/Modals */}
      <MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
