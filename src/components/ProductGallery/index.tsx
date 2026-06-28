'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Rotate3d, Image as ImageIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Product3DViewer from '../Product3DViewer';
import { useProductStore } from '@/hooks/useProductStore';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductGalleryProps {
  images: string[];
  category: 't-shirts' | 'pants' | 'sneakers' | 'outerwear' | 'accessories';
  productName: string;
}

export default function ProductGallery({ images, category, productName }: ProductGalleryProps) {
  const activeIndex = useProductStore((state) => state.activeImageIndex);
  const setActiveIndex = useProductStore((state) => state.setActiveImageIndex);
  const is360Mode = useProductStore((state) => state.is360Mode);
  const setIs360Mode = useProductStore((state) => state.setIs360Mode);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Zoom Lens Effect on Hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${images[activeIndex]})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%', // Magnification
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (is360Mode) return;
      if (e.key === 'ArrowLeft') {
        setActiveIndex(Math.max(0, activeIndex - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex(Math.min(images.length - 1, activeIndex + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, images, is360Mode, setActiveIndex]);

  return (
    <div className="w-full space-y-4">
      {/* Editorial vs 360 toggle bar */}
      <div className="flex justify-between items-center border-b border-border pb-3">
        <div className="flex gap-4">
          <button
            onClick={() => setIs360Mode(false)}
            className={`ui-text text-[9px] pb-1 border-b tracking-widest uppercase transition-all flex items-center gap-1.5 ${
              !is360Mode ? 'border-accent text-accent font-bold' : 'border-transparent text-foreground-muted'
            }`}
            data-cursor="hover"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Editorial Portfolio</span>
          </button>
          <button
            onClick={() => setIs360Mode(true)}
            className={`ui-text text-[9px] pb-1 border-b tracking-widest uppercase transition-all flex items-center gap-1.5 ${
              is360Mode ? 'border-accent text-accent font-bold' : 'border-transparent text-foreground-muted'
            }`}
            data-cursor="hover"
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>Digital 360 Model</span>
          </button>
        </div>
        <span className="font-mono text-[9px] text-foreground-muted tracking-widest uppercase">
          {!is360Mode ? `${activeIndex + 1} / ${images.length}` : 'Interactive'}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Left Vertical Thumbnails (Desktop Only) */}
        {!is360Mode && (
          <div className="hidden md:flex flex-col gap-2.5 w-16 shrink-0 max-h-[500px] overflow-y-auto pr-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-product w-full overflow-hidden border transition-all ${
                  activeIndex === idx ? 'border-accent shadow-xs scale-102' : 'border-border opacity-70 hover:opacity-100 hover:border-accent/40'
                }`}
                data-cursor="hover"
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main Canvas / Image Gallery display */}
        <div className="flex-1 w-full aspect-product relative overflow-hidden bg-background-secondary border border-border">
          {is360Mode ? (
            <div className="absolute inset-0 w-full h-full">
              <Product3DViewer category={category} />
            </div>
          ) : (
            <>
              {/* Desktop Zoomable Main Image */}
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="hidden md:block w-full h-full absolute inset-0 cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
                data-cursor="view"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    ref={imageRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={images[activeIndex]}
                    alt={productName}
                    className="w-full h-full object-cover select-none"
                  />
                </AnimatePresence>

                {/* CSS Zoom overlay lens */}
                <div
                  className="absolute inset-0 pointer-events-none border border-accent/20 bg-no-repeat shadow-inner hidden"
                  style={{
                    ...zoomStyle,
                  }}
                />
              </div>

              {/* Mobile Swipe-enabled Swiper Gallery */}
              <div className="md:hidden w-full h-full">
                <Swiper
                  modules={[Navigation, Pagination]}
                  pagination={{ clickable: true, type: 'bullets' }}
                  navigation
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  className="w-full h-full"
                >
                  {images.map((img, idx) => (
                    <SwiperSlide key={idx} className="w-full h-full">
                      <img
                        src={img}
                        alt={`${productName} slide ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onClick={() => setLightboxOpen(true)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Quick Maximize button */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-4 right-4 z-10 p-2.5 bg-black/45 hover:bg-black/75 backdrop-blur-md rounded-full text-white transition-all shadow-md"
                data-cursor="hover"
                aria-label="Fullscreen zoom"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Lightbox Slider overlay */}
      <AnimatePresence>
        {lightboxOpen && !is360Mode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9950] bg-black/95 backdrop-blur-md flex flex-col justify-between"
          >
            {/* Lightbox Header */}
            <div className="p-6 flex justify-between items-center text-white border-b border-white/10">
              <span className="ui-text text-[9px] tracking-[0.2em]">{productName} - Fullscreen Archive</span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 hover:text-accent transition-colors"
                data-cursor="hover"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox swiper view */}
            <div className="flex-1 w-full max-w-5xl mx-auto flex items-center justify-center p-4">
              <Swiper
                modules={[Navigation]}
                navigation
                initialSlide={activeIndex}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="w-full max-h-[75vh]"
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx} className="flex items-center justify-center">
                    <img
                      src={img}
                      alt={`${productName} full ${idx + 1}`}
                      className="max-h-[70vh] object-contain mx-auto select-none rounded-xs border border-white/5"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Lightbox footer index */}
            <div className="p-6 text-center text-zinc-500 font-mono text-[9px] tracking-widest border-t border-white/10 uppercase">
              Image {activeIndex + 1} of {images.length} &bull; ESC or X to exit
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
