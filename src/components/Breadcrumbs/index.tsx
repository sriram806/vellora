'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  category: string;
  collection: string;
  productName: string;
}

export default function Breadcrumbs({ category, collection, productName }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="py-4 border-b border-border bg-background/50 backdrop-blur-xs select-none"
    >
      <div className="container-JCOPS flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground-muted">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-accent transition-colors"
          data-cursor="hover"
        >
          <Home className="w-3 h-3" />
          <span>Home</span>
        </Link>

        <ChevronRight className="w-2.5 h-2.5" />

        <Link
          href={`/shop?category=${category}`}
          className="hover:text-accent transition-colors"
          data-cursor="hover"
        >
          {category}
        </Link>

        <ChevronRight className="w-2.5 h-2.5" />

        <span className="text-foreground-secondary">{collection}</span>

        <ChevronRight className="w-2.5 h-2.5 hidden sm:inline" />

        <span className="text-foreground font-semibold line-clamp-1 hidden sm:inline">{productName}</span>
      </div>
    </nav>
  );
}
