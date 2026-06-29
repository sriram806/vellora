'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Mail } from 'lucide-react';
import { FaTwitter, FaFacebookF } from 'react-icons/fa';
import { useProductStore } from '@/hooks/useProductStore';
import { useToast } from '@/components/UI/ToastProvider';

interface ShareModalProps {
  productName: string;
}

export default function ShareModal({ productName }: ShareModalProps) {
  const isShareModalOpen = useProductStore((state) => state.isShareModalOpen);
  const setIsShareModalOpen = useProductStore((state) => state.setIsShareModalOpen);
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        type: 'success',
        title: 'Link Copied',
        description: 'Product URL copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <AnimatePresence>
      {isShareModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsShareModalOpen(false)}
            className="fixed inset-0 z-[9900] bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9901] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 }}
              className="w-full max-w-md pointer-events-auto overflow-hidden border border-border bg-background/90 dark:bg-zinc-950/95 backdrop-blur-md p-6 sm:p-8 rounded shadow-2xl space-y-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <span className="ui-text text-[10px] text-accent tracking-[0.2em] font-semibold">Share Garment</span>
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-1 hover:text-accent transition-colors"
                  aria-label="Close share modal"
                  data-cursor="hover"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="heading-serif text-lg font-bold uppercase leading-tight">
                  {productName}
                </h3>
                <p className="body-text text-xs text-foreground-muted">
                  Share this crafted piece with your circle.
                </p>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=Explore%20the%20${encodeURIComponent(productName)}%20on%20JCOPS&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 border border-border bg-background-tertiary hover:border-accent hover:text-accent transition-colors gap-2"
                  data-cursor="hover"
                >
                  <FaTwitter className="w-4 h-4" />
                  <span className="ui-text text-[8px] tracking-wider">Twitter</span>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 border border-border bg-background-tertiary hover:border-accent hover:text-accent transition-colors gap-2"
                  data-cursor="hover"
                >
                  <FaFacebookF className="w-4 h-4" />
                  <span className="ui-text text-[8px] tracking-wider">Facebook</span>
                </a>
                <a
                  href={`mailto:?subject=Luxury%20Fashion%20Inspiration%20-%20JCOPS&body=Take%20a%20look%20at%20this%20exquisite%20piece%20I%20found:%20${encodeURIComponent(shareUrl)}`}
                  className="flex flex-col items-center justify-center p-4 border border-border bg-background-tertiary hover:border-accent hover:text-accent transition-colors gap-2"
                  data-cursor="hover"
                >
                  <Mail className="w-4 h-4" />
                  <span className="ui-text text-[8px] tracking-wider">Email</span>
                </a>
              </div>

              {/* Copy URL */}
              <div className="space-y-2">
                <label className="ui-text text-[9px] text-foreground-muted">Copy link</label>
                <div className="flex border border-border bg-background">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 px-3 py-2.5 font-mono text-[10px] bg-transparent border-none outline-hidden select-all"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 border-l border-border bg-background-tertiary hover:bg-accent hover:text-white transition-colors flex items-center justify-center"
                    data-cursor="hover"
                    aria-label="Copy to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Mock QR Code Display */}
              <div className="flex flex-col items-center pt-2 border-t border-border/60 gap-3">
                <span className="ui-text text-[8px] text-foreground-muted">Scan to open on mobile</span>
                <div className="p-2 border border-border bg-white rounded-xs">
                  {/* Inline beautiful vector QR representation */}
                  <svg className="w-24 h-24 text-zinc-900" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M5 5h30v30H5V5zm3 3v24h24V8H8z" />
                    <path d="M12 12h16v16H12V12z" />
                    <path d="M65 5h30v30H65V5zm3 3v24h24V8H68z" />
                    <path d="M72 12h16v16H72V12z" />
                    <path d="M5 65h30v30H5V65zm3 3v24h24V68H8z" />
                    <path d="M12 72h16v16H12V72z" />
                    <path d="M45 5h10v10H45V5zm10 20h10v10H55V25zm-10 15h15v10H45V40zm25 25h10v10H70V65zm15 15h10v10H85V80zm-40 5h10v10H45V85zm15-40h10v20H60V45zm25 10h10v10H85V55zm-30 0h10v10H55V55zm25-10h10v10H80V45z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
