"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useCart } from "@/hooks/useCart";
import type { Product, ProductColor, CartItem } from "@/types";

interface CartContextValue {
  items: CartItem[];
  isLoaded: boolean;
  addItem: (
    product: Product,
    selectedColor: ProductColor,
    selectedSize: string,
    quantity?: number
  ) => void;
  removeItem: (productId: string, colorHex: string, size: string) => void;
  updateQuantity: (
    productId: string,
    colorHex: string,
    size: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  isInCart: (productId: string, colorHex?: string, size?: string) => boolean;
  totalItems: number;
  subtotal: number;
  totalSavings: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextValue {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
