'use client';

import Link from 'next/link';
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white border-t border-zinc-900">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_60%)]" />

      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <h1 className="text-[18vw] font-bold tracking-[0.4em] text-white/3 whitespace-nowrap">
          VELLORA
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 sm:py-24 lg:py-32">
        {/* Brand */}
        <div className="flex flex-col items-center text-center space-y-8 sm:space-y-10">
          <Link
            href="/"
            className="font-playfair text-5xl md:text-7xl font-bold tracking-[0.25em]"
          >
            VELLORA
          </Link>

          <div className="w-24 h-px bg-[#D4AF37]" />

          <p className="max-w-xl text-zinc-400 text-sm md:text-base leading-relaxed">
            Timeless luxury. Contemporary craftsmanship. Designed for the
            modern generation.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-6 sm:gap-8 mt-6 sm:mt-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group h-12 w-12 rounded-full border border-zinc-800 flex items-center justify-center transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <FaInstagram className="text-lg text-zinc-400 group-hover:text-[#D4AF37] transition-colors" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group h-12 w-12 rounded-full border border-zinc-800 flex items-center justify-center transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <FaXTwitter className="text-lg text-zinc-400 group-hover:text-[#D4AF37] transition-colors" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group h-12 w-12 rounded-full border border-zinc-800 flex items-center justify-center transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <FaFacebookF className="text-lg text-zinc-400 group-hover:text-[#D4AF37] transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24 border-t border-zinc-900 pt-8 sm:pt-10 lg:pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            <p>
              © {new Date().getFullYear()} VELLORA. All Rights Reserved.
            </p>

            <div className="flex items-center gap-6 sm:gap-8">
              <Link
                href="/privacy"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="hover:text-[#D4AF37] transition-colors"
              >
                Terms
              </Link>

              <span>International / English</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}