'use client';

import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, MapPin, Loader2, Check } from 'lucide-react';
import { useProductStore } from '@/hooks/useProductStore';
import { getPDPExtraData } from '@/data/pdp-data';

interface DeliveryInfoProps {
  productId: string;
}

export default function DeliveryInfo({ productId }: DeliveryInfoProps) {
  const pinCode = useProductStore((state) => state.pinCode);
  const setPinCode = useProductStore((state) => state.setPinCode);
  const checkPinCode = useProductStore((state) => state.checkPinCode);
  const pinCodeChecked = useProductStore((state) => state.pinCodeChecked);
  const estimatedDelivery = useProductStore((state) => state.estimatedDelivery);

  const [loading, setLoading] = useState(false);
  const pdpExtra = getPDPExtraData(productId);
  const del = pdpExtra.delivery;

  const handleCheck = () => {
    if (!pinCode || pinCode.trim().length < 5) return;
    setLoading(true);
    setTimeout(() => {
      checkPinCode(pinCode);
      setLoading(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className="space-y-5 p-5 border border-border bg-background-tertiary/45 backdrop-blur-xs rounded-sm select-none">
      
      {/* PIN Code search */}
      <div className="space-y-2">
        <label className="ui-text text-[9px] text-foreground-muted">Check Delivery Eligibility</label>
        <div className="flex border border-border bg-background h-10 overflow-hidden">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter Postal Code (e.g. 75008)"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
            onKeyDown={handleKeyPress}
            className="flex-1 px-3 py-2 text-xs font-mono bg-transparent outline-hidden border-none"
          />
          <button
            onClick={handleCheck}
            disabled={loading || pinCode.trim().length < 5}
            className="px-4 border-l border-border bg-background-secondary hover:bg-foreground hover:text-background disabled:bg-zinc-50 disabled:text-zinc-300 disabled:hover:bg-zinc-50 disabled:hover:text-zinc-300 transition-colors ui-text text-[9px] font-semibold tracking-wider flex items-center justify-center min-w-[70px]"
            data-cursor="hover"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'CHECK'}
          </button>
        </div>
        
        {/* Verification Success */}
        {pinCodeChecked && estimatedDelivery && (
          <div className="flex items-start gap-2 text-success font-mono text-[10px] mt-1.5 leading-relaxed bg-success/5 border border-success/15 p-2 rounded-xs">
            <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <div>
              <span>Standard delivery estimated by <strong>{estimatedDelivery}</strong>.</span>
              <br />
              <span>Complimentary Carbon-Neutral Courier.</span>
            </div>
          </div>
        )}
      </div>

      <hr className="border-border/60" />

      {/* Policies items list */}
      <div className="space-y-3.5">
        {/* Delivery detail */}
        <div className="flex gap-3">
          <Truck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h5 className="ui-text text-[9px] font-bold text-foreground">Complimentary Courier Delivery</h5>
            <p className="text-[11px] text-foreground-secondary leading-relaxed font-mono">
              Free Express shipping on orders above ${del.freeShippingThreshold} (Standard: {del.standardDeliveryDays} days, Express: {del.expressDeliveryDays} days).
            </p>
          </div>
        </div>

        {/* Returns detail */}
        <div className="flex gap-3">
          <RotateCcw className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h5 className="ui-text text-[9px] font-bold text-foreground">Artisanal Returns & Exchanges</h5>
            <p className="text-[11px] text-foreground-secondary leading-relaxed font-mono">
              Complimentary pickup exchanges or return filings within {del.returnWindowDays} days of receiving your package.
            </p>
          </div>
        </div>

        {/* Store pickup detail */}
        <div className="flex gap-3">
          <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h5 className="ui-text text-[9px] font-bold text-foreground">Boutique Pickup</h5>
            <p className="text-[11px] text-foreground-secondary leading-relaxed font-mono">
              Available for pickup within 24 hours at our faubourg showroom in Paris.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
