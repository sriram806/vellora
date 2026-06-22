'use client';

import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, Clock, Calendar } from 'lucide-react';
import { useToast } from '@/components/UI/ToastProvider';

const showrooms = [
  {
    city: 'Paris Showroom',
    address: '12 Rue du Faubourg Saint-Honoré, 75008 Paris',
    phone: '+33 1 40 20 50 50',
    hours: '10:00 - 19:00 CET',
  },
  {
    city: 'Milan Showroom',
    address: 'Via Montenapoleone 8, 20121 Milano',
    phone: '+39 02 7600 5050',
    hours: '10:00 - 19:30 CET',
  },
  {
    city: 'Tokyo Showroom',
    address: '5-11-5 Minami-Aoyama, Minato-ku, Tokyo 107-0062',
    phone: '+81 3 5468 5050',
    hours: '11:00 - 20:00 JST',
  },
  {
    city: 'New York Showroom',
    address: '848 Mercer Street, New York, NY 10012',
    phone: '+1 212 966 5050',
    hours: '10:00 - 19:00 EST',
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Private Showroom Appointment',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      
      // Save inquiry to localStorage for Admin Inbox
      try {
        const stored = localStorage.getItem('vellora_inquiries');
        const inquiriesList = stored ? JSON.parse(stored) : [];
        const newInquiry = {
          id: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
          name: formData.name,
          email: formData.email,
          inquiryType: formData.inquiryType,
          message: formData.message,
          date: new Date().toISOString(),
          status: 'Unresolved'
        };
        inquiriesList.unshift(newInquiry);
        localStorage.setItem('vellora_inquiries', JSON.stringify(inquiriesList));
      } catch (err) {
        console.error('Failed to save inquiry to localStorage', err);
      }

      setFormData({ name: '', email: '', inquiryType: 'Private Showroom Appointment', message: '' });
      toast({
        type: 'success',
        title: 'Inquiry registered',
        description: 'A Vellora concierge will contact you shortly.',
      });
    }, 1500);
  };

  // Pre-fills form with showroom booking intent and scrolls to form
  const handleBookShowroom = (cityName: string) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: 'Private Showroom Appointment',
      message: `Requesting private appointment at the ${cityName}. Please suggest available slots for this week.`,
    }));

    toast({
      type: 'info',
      title: 'Showroom Selected',
      description: `Pre-filled form for the ${cityName}.`,
    });

    if (formRef.current) {
      const topOffset = formRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }

    // Delay focus slightly for smooth scrolling completion
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 800);
  };

  return (
    <div className="container-vellora py-12 space-y-16">
      
      {/* Page Header with radial gradient and concierge pulse */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">Atelier Contact</span>
        <h1 className="heading-serif text-3xl sm:text-5xl font-bold uppercase tracking-widest text-foreground">
          Client Services
        </h1>
        <p className="body-text text-xs sm:text-sm text-foreground-secondary leading-relaxed">
          Request private virtual showings, book physical showroom appointments, or register corporate tailoring consultations.
        </p>

        {/* Pulsing Concierge Online Bar */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-accent/25 bg-accent-light/10 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[9px] text-accent uppercase tracking-wider font-semibold">
            Concierge Desk Active • Wait time: ~4 mins
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* LEFT COLUMN: CONTACT FORM */}
        <div 
          ref={formRef} 
          className="w-full lg:w-1/2 border border-border p-8 bg-background-tertiary rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.02)] space-y-6 transition-all duration-300 focus-within:border-accent/40"
        >
          <div className="space-y-1 border-b border-border pb-4">
            <h2 className="ui-text text-sm font-semibold uppercase tracking-wider text-foreground">Send an Inquiry</h2>
            <p className="text-[10px] text-foreground-muted">Please complete the ledger details below. Our response time is typically under 1 hour.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1 relative">
              <label className="text-[9px] uppercase font-bold tracking-widest text-foreground-muted block">Your Name</label>
              <input
                ref={nameInputRef}
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-border py-2 text-xs uppercase tracking-wider outline-none focus:border-accent transition-colors"
                placeholder="e.g. Alexander Mercer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-foreground-muted block">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-border py-2 text-xs uppercase tracking-wider outline-none focus:border-accent transition-colors"
                placeholder="e.g. alexander@mercer.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-foreground-muted block">Inquiry Type</label>
              <select
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                className="w-full bg-background border border-border px-3 py-2.5 text-xs uppercase tracking-wider outline-none focus:border-accent cursor-pointer"
              >
                <option value="Private Showroom Appointment">Private Showroom Appointment</option>
                <option value="General Sales Support">General Sales Support</option>
                <option value="Press & Media Relations">Press & Media Relations</option>
                <option value="Corporate / Custom Tailoring">Corporate / Custom Tailoring</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase font-bold tracking-widest text-foreground-muted block">Message Details</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border border-border p-3 text-xs outline-none focus:border-accent transition-all duration-300 placeholder:text-foreground-muted/65"
                placeholder="Detail your request, sizes, or fitting details..."
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full btn-primary py-3.5 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
            >
              {submitted ? (
                <span className="animate-pulse tracking-wider">Registering Inquiry...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-widest">Submit Ledger Inquiry</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: SHOWROOMS GRID */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-2 border-b border-border pb-4">
            <h2 className="ui-text text-sm font-semibold uppercase tracking-wider text-foreground">Atelier Showrooms</h2>
            <p className="body-text text-xs text-foreground-secondary leading-relaxed">
              Vellora operates four physical spaces worldwide where clients can examine fabric rolls, experience custom simulations, and consult with resident tailors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {showrooms.map((showroom, idx) => (
              <div 
                key={idx} 
                className="group border border-border p-5 space-y-4 bg-background-secondary rounded-sm hover:border-accent/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="ui-text text-[10px] text-accent font-bold uppercase tracking-wider">{showroom.city}</h3>
                    <span title={showroom.hours} className="cursor-help">
                      <Clock className="w-3.5 h-3.5 text-foreground-muted" />
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-xs text-foreground-secondary font-light">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{showroom.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-accent" />
                      <span>{showroom.phone}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBookShowroom(showroom.city)}
                  className="mt-2 w-full border border-border group-hover:border-accent group-hover:bg-accent-light/10 text-[9px] uppercase tracking-widest py-2 font-semibold text-foreground group-hover:text-accent font-mono transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Book Appointment</span>
                </button>
              </div>
            ))}
          </div>

          <div className="border border-border p-6 bg-accent-light/15 rounded-sm space-y-3 shadow-xs">
            <h3 className="ui-text text-[10px] text-accent font-bold uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Direct Inquiries</span>
            </h3>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              For direct assistance, email us at <a href="mailto:concierge@vellora.com" className="text-accent hover:text-accent-hover underline font-semibold">concierge@vellora.com</a> or phone our central concierge desk at <strong className="font-mono text-accent">+1-800-VELLORA</strong>.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
