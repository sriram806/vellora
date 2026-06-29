'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  coupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartTotal: number;
  discountAmount: number;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const COUPONS: Coupon[] = [
  { code: 'JCOPS15', discountType: 'percentage', value: 15 },
  { code: 'JCOPS10', discountType: 'percentage', value: 10 },
  { code: 'JCOPS20', discountType: 'percentage', value: 20 },
  { code: 'LUXURY50', discountType: 'fixed', value: 50 },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('JCOPS_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error('Failed to parse cart data', e);
      }
    }
    const storedCoupon = localStorage.getItem('JCOPS_coupon');
    if (storedCoupon) {
      try {
        setCoupon(JSON.parse(storedCoupon));
      } catch (e) {
        console.error('Failed to parse coupon data', e);
      }
    }
  }, []);

  // Save cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('JCOPS_cart', JSON.stringify(cart));
  }, [cart]);

  // Save coupon to LocalStorage when changed
  useEffect(() => {
    if (coupon) {
      localStorage.setItem('JCOPS_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('JCOPS_coupon');
    }
  }, [coupon]);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    setCart((prevCart) => {
      const cartItemId = `${product.id}-${size}-${color}`;
      const existingItemIndex = prevCart.findIndex((item) => item.id === cartItemId);

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [
        ...prevCart,
        {
          id: cartItemId,
          product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    // 1. Check static coupons
    let foundCoupon = COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase());

    // 2. Check localStorage coupons if not found statically
    if (!foundCoupon) {
      try {
        const storedPromoCodesStr = localStorage.getItem('JCOPS_promo_codes');
        if (storedPromoCodesStr) {
          const storedPromoCodes = JSON.parse(storedPromoCodesStr);
          const found = storedPromoCodes.find((c: any) => c.code.toUpperCase() === code.toUpperCase() && c.active);
          if (found) {
            foundCoupon = {
              code: found.code,
              discountType: found.type === 'percentage' ? 'percentage' : 'fixed',
              value: found.value
            };
          }
        }
      } catch (e) {
        console.error('Failed to parse promo codes from localStorage', e);
      }
    }

    if (foundCoupon) {
      setCoupon(foundCoupon);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  // Calculations
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const discountAmount = coupon
    ? coupon.discountType === 'percentage'
      ? (cartTotal * coupon.value) / 100
      : coupon.value
    : 0;

  const subtotal = Math.max(0, cartTotal - discountAmount);

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        coupon,
        applyCoupon,
        removeCoupon,
        cartTotal,
        discountAmount,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
