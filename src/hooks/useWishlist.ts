"use client";

import { useState, useCallback, useEffect } from "react";
import type { WishlistItem, Product } from "@/types";

const WISHLIST_STORAGE_KEY = "JCOPS-wishlist";

function loadWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveWishlist(items: WishlistItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable
  }
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    setItems(loadWishlist());
    setIsLoaded(true);
  }, []);

  // Persist wishlist to localStorage on changes
  useEffect(() => {
    if (isLoaded) {
      saveWishlist(items);
    }
  }, [items, isLoaded]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) return prev;
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const toggleItem = useCallback(
    (product: Product) => {
      const exists = items.some((item) => item.product.id === product.id);
      if (exists) {
        removeItem(product.id);
      } else {
        addItem(product);
      }
    },
    [items, addItem, removeItem]
  );

  const isInWishlist = useCallback(
    (productId: string): boolean => {
      return items.some((item) => item.product.id === productId);
    },
    [items]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.length;

  return {
    items,
    isLoaded,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    clearWishlist,
    totalItems,
  };
}
