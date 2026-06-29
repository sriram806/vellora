"use client";

import { useState, useCallback, useEffect } from "react";
import type { CartItem, Product, ProductColor } from "@/types";

const CART_STORAGE_KEY = "JCOPS-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setItems(loadCart());
    setIsLoaded(true);
  }, []);

  // Persist cart to localStorage on changes
  useEffect(() => {
    if (isLoaded) {
      saveCart(items);
    }
  }, [items, isLoaded]);

  const addItem = useCallback(
    (product: Product, selectedColor: ProductColor, selectedSize: string, quantity: number = 1) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedColor.hex === selectedColor.hex &&
            item.selectedSize === selectedSize
        );

        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }

        return [...prev, { product, quantity, selectedColor, selectedSize }];
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, colorHex: string, size: string) => {
      setItems((prev) =>
        prev.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.selectedColor.hex === colorHex &&
              item.selectedSize === size
            )
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, colorHex: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, colorHex, size);
        return;
      }

      setItems((prev) =>
        prev.map((item) => {
          if (
            item.product.id === productId &&
            item.selectedColor.hex === colorHex &&
            item.selectedSize === size
          ) {
            return { ...item, quantity };
          }
          return item;
        })
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (productId: string, colorHex?: string, size?: string): boolean => {
      return items.some((item) => {
        if (item.product.id !== productId) return false;
        if (colorHex && item.selectedColor.hex !== colorHex) return false;
        if (size && item.selectedSize !== size) return false;
        return true;
      });
    },
    [items]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalSavings = items.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return (
        sum +
        (item.product.originalPrice - item.product.price) * item.quantity
      );
    }
    return sum;
  }, 0);

  return {
    items,
    isLoaded,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    totalItems,
    subtotal,
    totalSavings,
  };
}
