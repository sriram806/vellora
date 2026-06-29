'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '@/hooks/CartContext';
import { useWishlist } from '@/hooks/WishlistContext';
import SearchModal from './SearchModal';
import MegaMenu from './MegaMenu';
import CartDrawer from '../Cart/CartDrawer';

export default function Navbar() {
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const pathname = usePathname();

  // Dialog/drawer states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Announcement state
  const [announcement, setAnnouncement] = useState('Use Code: JCOPS15 for 15% off in the digital atelier');
  useEffect(() => {
    const saved = localStorage.getItem('JCOPS_announcement');
    if (saved) {
      setAnnouncement(saved);
    }
  }, []);

  const isHomePage = pathname === '/';
  const isSolid = !isHomePage || isScrolled;

  // Dynamic Styles
  const navBgClass = isSolid
    ? 'bg-white/90 backdrop-blur-md border-b border-[#e5e5e5] shadow-xs'
    : 'bg-transparent border-transparent';

  const textColorClass = isSolid ? 'text-[#121212]' : 'text-white drop-shadow-md';
  const hoverColorClass = 'hover:text-[#C9A96E]';
  const iconBorderHover = isSolid ? 'hover:border-[#C9A96E]/30 hover:bg-[#C9A96E]/5' : 'hover:border-[#C9A96E]/40 hover:bg-[#C9A96E]/10';

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50">
        {/* Top Announcement Bar */}
        {isAnnouncementVisible && (
          <div className="w-full bg-[#121212] text-[10px] text-white uppercase tracking-widest py-2 px-4 text-center flex items-center justify-center gap-2 relative">
            <span>{announcement}</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-white/60" />
            <span className="hidden md:inline-block">Free worldwide express shipping</span>
            <button
              onClick={() => setIsAnnouncementVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:text-gray-300 transition-colors"
              aria-label="Close announcement"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Main Header Menu */}
        <div className={`h-20 flex items-center transition-all duration-500 ${navBgClass}`}>
          <div className="container-JCOPS w-full flex items-center justify-between">

            {/* Left Nav Menu Button */}
            <div className="flex items-center gap-6 sm:gap-8">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-3 group cursor-pointer focus:outline-none transition-colors ${textColorClass} ${hoverColorClass}`}
                aria-label="Toggle navigation menu"
              >
                {/* Morphing Hamburger / Close Icon */}
                <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                  <span className={`w-5 h-[1.5px] bg-current transition-all duration-300 ease-out origin-center ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`w-5 h-[1.5px] bg-current transition-all duration-200 ease-out ${isMenuOpen ? 'opacity-0 scale-0' : ''}`} />
                  <span className={`w-5 h-[1.5px] bg-current transition-all duration-300 ease-out origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
                </div>
                <span className="text-[11px] font-medium uppercase tracking-widest hidden sm:inline relative py-1">
                  Menu
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
                </span>
              </button>
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/shop" className={`relative py-1 text-[11px] font-medium uppercase tracking-widest transition-colors ${textColorClass} ${hoverColorClass} group`}>
                  <span className="relative z-10">Shop</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link href="/collections" className={`relative py-1 text-[11px] font-medium uppercase tracking-widest transition-colors ${textColorClass} ${hoverColorClass} group`}>
                  <span className="relative z-10">Collections</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link href="/about" className={`relative py-1 text-[11px] font-medium uppercase tracking-widest transition-colors ${textColorClass} ${hoverColorClass} group`}>
                  <span className="relative z-10">About</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
                </Link>
              </nav>
            </div>

            {/* Center Brand Name */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/" className={`font-sans text-lg sm:text-2xl md:text-3xl font-bold tracking-[0.15em] sm:tracking-[0.25em] hover:tracking-[0.3em] transition-all duration-500 hover:opacity-90 ${textColorClass}`}>
                JCOPS
              </Link>
            </div>

            {/* Right Action Icons */}
            <div className={`flex items-center gap-1 sm:gap-2 md:gap-4 ${textColorClass}`}>
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-1.5 sm:p-2 rounded-full border border-transparent transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 group ${iconBorderHover}`}
                aria-label="Open search dialog"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:text-[#C9A96E]" />
              </button>

              <Link
                href="/profile"
                className={`p-1.5 sm:p-2 rounded-full border border-transparent transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 group inline-flex ${iconBorderHover}`}
                aria-label="Open profile page"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#C9A96E]" />
              </Link>

              <Link
                href="/wishlist"
                className={`p-1.5 sm:p-2 rounded-full border border-transparent transition-all duration-300 cursor-pointer relative flex items-center justify-center hover:scale-105 active:scale-95 group inline-flex ${iconBorderHover}`}
                aria-label="Open wishlist page"
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 group-hover:scale-110 group-hover:text-[#C9A96E] ${wishlist.length > 0 ? 'fill-[#C9A96E] text-[#C9A96E]' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 sm:-top-1 sm:-right-1 min-w-3.5 h-3.5 sm:min-w-4 sm:h-4 px-1 bg-[#cc0000] text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className={`p-1.5 sm:p-2 rounded-full border border-transparent transition-all duration-300 cursor-pointer relative flex items-center justify-center hover:scale-105 active:scale-95 group ${iconBorderHover}`}
                aria-label="Open shopping bag drawer"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:text-[#C9A96E]" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 sm:-top-1 sm:-right-1 min-w-3.5 h-3.5 sm:min-w-4 sm:h-4 px-1 bg-[#121212] text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Drawers/Modals */}
      <MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
