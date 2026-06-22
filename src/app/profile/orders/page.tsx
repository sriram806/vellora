'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight, ShoppingBag, Eye } from 'lucide-react';

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  image: string;
}

interface Order {
  orderId: string;
  email: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  date: string;
}

export default function OrdersPage() {
  const [email, setEmail] = useState('atelier.client@vellora.com');
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    // Load email
    try {
      const storedProfile = localStorage.getItem('vellora_profile');
      if (storedProfile) {
        const p = JSON.parse(storedProfile);
        if (p.email) setEmail(p.email);
      }
    } catch (e) {
      console.error('Failed to load email', e);
    }

    // Load orders
    try {
      const storedOrders = localStorage.getItem('vellora_orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  }, []);

  // Filter orders matching client email
  const userOrders = useMemo(() => {
    return orders.filter(o => o.email.toLowerCase() === email.toLowerCase());
  }, [orders, email]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="heading-serif text-2xl uppercase tracking-wider text-foreground">Acquisitions Ledger</h2>
        <p className="text-xs text-foreground-secondary mt-1">Review historical orders, shipment parameters, and active delivery logs.</p>
      </div>

      {userOrders.length === 0 ? (
        <div className="py-24 text-center border border-border bg-background-secondary/20 rounded-sm space-y-4">
          <Clock className="w-10 h-10 text-foreground-muted mx-auto stroke-[1.25]" />
          <div className="space-y-1">
            <h3 className="ui-text text-xs font-semibold text-foreground">No transactions recorded</h3>
            <p className="text-xs text-foreground-secondary">Acquire creations from the shop to start your collection ledger.</p>
          </div>
          <div className="pt-2">
            <a href="/shop" className="btn-primary py-2.5 px-6 text-[9px] uppercase font-mono tracking-widest">Shop Collection</a>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div
              key={order.orderId}
              className="border border-border bg-background rounded-sm overflow-hidden shadow-xs hover:border-accent/30 transition-all duration-300"
            >
              {/* Summary Trigger */}
              <div
                onClick={() => setExpandedOrder(expandedOrder === order.orderId ? null : order.orderId)}
                className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-background-secondary/20 transition-colors"
              >
                <div className="min-w-0">
                  <span className="font-mono font-bold text-xs block text-foreground">{order.orderId}</span>
                  <span className="text-[9px] font-mono text-foreground-muted block mt-1 uppercase tracking-wider">
                    {new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold block text-accent">${order.total}</span>
                    <span className="text-[9px] font-mono text-foreground-muted block uppercase tracking-wider">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} pieces
                    </span>
                  </div>
                  
                  <span className={`px-2.5 py-1 text-[8px] font-mono uppercase font-bold tracking-widest rounded-full border ${
                    order.status === 'Pending' ? 'bg-amber-500/5 border-amber-500/20 text-amber-500' :
                    order.status === 'Processing' ? 'bg-blue-500/5 border-blue-500/20 text-blue-500' :
                    order.status === 'Shipped' ? 'bg-indigo-500/5 border-indigo-500/20 text-indigo-500 animate-pulse' :
                    'bg-emerald-500/5 border-emerald-500/20 text-emerald-500'
                  }`}>
                    {order.status}
                  </span>
                  
                  <ChevronRight className={`w-4 h-4 text-foreground-muted transition-transform duration-300 ${
                    expandedOrder === order.orderId ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>

              {/* Items details accordion drawer */}
              <AnimatePresence initial={false}>
                {expandedOrder === order.orderId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden border-t border-border-light bg-background-secondary/30"
                  >
                    <div className="p-4 sm:p-5 space-y-6 text-xs">
                      {/* Shipping coord details summary */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-border-light leading-relaxed text-foreground-secondary">
                        <div className="space-y-1">
                          <h4 className="font-mono text-[9px] uppercase text-foreground-muted tracking-widest font-bold">Logistics Recipient</h4>
                          <p className="font-semibold text-foreground">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                          <p className="font-mono text-[10px] text-foreground-muted mt-1.5">Tel: {order.shippingAddress.phone}</p>
                        </div>
                        <div className="font-mono text-[10px] space-y-1.5 bg-background p-4 border border-border rounded-sm shadow-2xs">
                          <h4 className="text-[9px] uppercase text-foreground-muted tracking-widest font-bold mb-1">Logistics Coordinate Ledger</h4>
                          <div className="flex justify-between">
                            <span className="text-foreground-muted">Carrier Dispatch:</span>
                            <span className="text-foreground font-semibold">DHL EXPRESS WORLDWIDE</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground-muted">Insurance Status:</span>
                            <span className="text-emerald-500 font-semibold uppercase">FULLY INSURED</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground-muted">Estimated Wait:</span>
                            <span className="text-foreground font-bold">2 - 4 DAYS</span>
                          </div>
                        </div>
                      </div>

                      {/* Items loop */}
                      <div className="space-y-3">
                        <h4 className="font-mono text-[9px] uppercase text-foreground-muted tracking-widest font-bold">Acquired Pieces</h4>
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center py-2.5 px-3 border border-border bg-background rounded-xs shadow-3xs">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-12 border border-border bg-background-secondary overflow-hidden shrink-0 rounded-xs">
                                {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                              </div>
                              <div>
                                <span className="font-semibold text-foreground block truncate max-w-[180px] sm:max-w-xs">{item.name}</span>
                                <span className="text-[8px] font-mono text-foreground-muted uppercase tracking-widest block mt-0.5">
                                  Size {item.selectedSize} / Color {item.selectedColor}
                                </span>
                              </div>
                            </div>
                            <div className="text-right font-mono">
                              <span className="text-[10px] text-foreground-muted block">Qty: {item.quantity}</span>
                              <span className="font-bold text-accent">${item.price * item.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
