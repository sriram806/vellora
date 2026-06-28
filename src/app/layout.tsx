import type { Metadata } from 'next';
import { Playfair_Display, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/hooks/CartContext';
import { WishlistProvider } from '@/hooks/WishlistContext';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import CursorFollower from '@/components/UI/CursorFollower';
import { ToastProvider } from '@/components/UI/ToastProvider';
import { IntroProvider } from '@/hooks/IntroContext';
import IntroAwareShell from '@/components/intro/IntroAwareShell';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Jcops | Premium Luxury Digital Fashion Showroom',
  description: 'Experience Jcops, a next-generation luxury digital fashion showroom. Explore our curated collections of silk-cotton tees, pleated wool trousers, calfskin sneakers, and Italian cashmere overcoats.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-white">
        <IntroProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                {/* Grain texture overlay */}
                <div className="grain-overlay" />
                
                {/* Custom Interactive Cursor */}
                <CursorFollower />

                {/* Intro-aware shell: hides Navbar/Footer during intro */}
                <IntroAwareShell
                  navbar={<Navbar />}
                  footer={<Footer />}
                >
                  {children}
                </IntroAwareShell>
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
