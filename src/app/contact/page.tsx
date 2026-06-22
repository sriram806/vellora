'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/components/UI/ToastProvider';

const showrooms = [
  {
    city: 'Paris Showroom',
    address: '12 Rue du Faubourg Saint-Honoré, 75008 Paris',
    phone: '+33 1 40 20 50 50',
  },
  {
    city: 'Milan Showroom',
    address: 'Via Montenapoleone 8, 20121 Milano',
    phone: '+39 02 7600 5050',
  },
  {
    city: 'Tokyo Showroom',
    address: '5-11-5 Minami-Aoyama, Minato-ku, Tokyo 107-0062',
    phone: '+81 3 5468 5050',
  },
  {
    city: 'New York Showroom',
    address: '848 Mercer Street, New York, NY 10012',
    phone: '+1 212 966 5050',
  },
];

export default function ContactPage() {
  const { toast } = useToast();
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
      setFormData({ name: '', email: '', inquiryType: 'Private Showroom Appointment', message: '' });
      toast({
        type: 'success',
        title: 'Inquiry registered',
        description: 'A Vellora concierge will contact you shortly.',
      });
    }, 1500);
  };

  return (
    <div className="container-vellora py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-4">
        <span className="label-text text-accent">Atelier Contact</span>
        <h1 className="heading-serif text-3xl sm:text-5xl font-bold uppercase tracking-wider">
          Client Services
        </h1>
        <p className="body-text text-sm text-foreground-secondary leading-relaxed">
          Request private virtual showings, book physical showroom appointments, or register corporate inquiries.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* LEFT COLUMN: CONTACT FORM */}
        <div className="w-full lg:w-1/2 border border-border p-8 bg-background-tertiary rounded glass space-y-6">
          <h2 className="ui-text text-xs font-semibold">Send an Inquiry</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="ui-text text-[9px] text-foreground-muted">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-background border border-border px-3 py-2 text-xs uppercase tracking-wider outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="ui-text text-[9px] text-foreground-muted">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-background border border-border px-3 py-2 text-xs uppercase tracking-wider outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="ui-text text-[9px] text-foreground-muted">Inquiry Type</label>
              <select
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                className="w-full bg-background border border-border px-3 py-2 text-xs uppercase tracking-wider outline-none focus:border-accent cursor-pointer"
              >
                <option value="Private Showroom Appointment">Private Showroom Appointment</option>
                <option value="General Sales Support">General Sales Support</option>
                <option value="Press & Media Relations">Press & Media Relations</option>
                <option value="Corporate / Custom Tailoring">Corporate / Custom Tailoring</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="ui-text text-[9px] text-foreground-muted">Message Details</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-background border border-border px-3 py-2 text-xs outline-none focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full btn-primary py-3.5 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitted ? (
                <span className="animate-pulse">Registering Inquiry...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: SHOWROOMS GRID */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-2">
            <h2 className="ui-text text-xs font-semibold">Atelier Showrooms</h2>
            <p className="body-text text-xs text-foreground-secondary">
              Vellora operates four physical spaces worldwide where clients can examine fabric rolls, experience custom simulations, and consult with resident tailors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {showrooms.map((showroom, idx) => (
              <div key={idx} className="border border-border p-5 space-y-3 bg-background-secondary">
                <h3 className="ui-text text-[10px] text-accent font-semibold">{showroom.city}</h3>
                
                <div className="space-y-1.5 text-xs text-foreground-secondary font-light">
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
            ))}
          </div>

          <div className="border border-border p-6 bg-accent-light space-y-2">
            <h3 className="ui-text text-[10px] text-accent font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Direct Inquiries</span>
            </h3>
            <p className="text-xs text-foreground-secondary leading-relaxed">
              For direct assistance, email us at <a href="mailto:concierge@vellora.com" className="text-accent underline font-semibold">concierge@vellora.com</a> or phone our central concierge desk at <strong className="font-mono">+1-800-VELLORA</strong>.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
