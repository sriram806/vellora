'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Users,
  Sliders,
  DollarSign,
  Briefcase,
  TrendingUp,
  UserCheck,
  Plus,
  Trash2,
  Eye,
  Check,
  X,
  Sparkles,
  RefreshCw,
  Search,
  Tag,
  ArrowRight,
  Inbox,
  Terminal,
  Activity,
  ShieldCheck,
  Send,
  MessageSquare,
  Bell,
  Printer,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import productsData from '@/data/products.json';
import { useToast } from '@/components/UI/ToastProvider';

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
  items: Array<{
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
    image: string;
  }>;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  date: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  collection: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock?: boolean;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  date: string;
  status: 'Unresolved' | 'Resolved';
  reply?: string;
}

interface AuditLog {
  time: string;
  type: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
  message: string;
}

interface AlertNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function AdminPanel() {
  const { toast } = useToast();

  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'customers' | 'inbox' | 'settings'>('dashboard');

  // Data States
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [announcementText, setAnnouncementText] = useState('Use Code: JCOPS15 for 15% off in the digital atelier');
  const [promoCodes, setPromoCodes] = useState<any[]>([]);

  // Advanced Features States
  const [priceThreshold, setPriceThreshold] = useState(250); // Warning price limit
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]); // Batch Selection
  const [notifications, setNotifications] = useState<AlertNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Audit Logs State
  const [logs, setLogs] = useState<AuditLog[]>([]);

  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<'All' | 'Pending' | 'Processing' | 'Shipped' | 'Delivered'>('All');

  // Modal / Form States
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Form fields for adding coupon
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoVal, setNewPromoVal] = useState('');
  const [newPromoType, setNewPromoType] = useState<'percentage' | 'fixed'>('percentage');

  // Add Product Form fields
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('t-shirts');
  const [newProdCollection, setNewProdCollection] = useState('Aether');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdSizes, setNewProdSizes] = useState('S, M, L, XL');
  const [newProdColors, setNewProdColors] = useState('Midnight Black, Chalk White');
  const [newProdDesc, setNewProdDesc] = useState('');

  // Inquiry Reply Form field
  const [inquiryReplyText, setInquiryReplyText] = useState('');

  // Diagnostics states
  const [latency, setLatency] = useState(12);
  const [alertsCount, setAlertsCount] = useState(2);

  // 1. Initial Data Loading
  useEffect(() => {
    // Load Orders
    const storedOrders = localStorage.getItem('JCOPS_orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      const mockOrders: Order[] = [
        {
          orderId: 'VEL-2026-894103',
          email: 'helena.v@vogue.fr',
          shippingAddress: {
            firstName: 'Helena',
            lastName: 'Vidal',
            address: '14 Avenue Montaigne',
            city: 'Paris',
            state: 'IDF',
            zip: '75008',
            phone: '+33 6 12 34 56 78'
          },
          items: [
            {
              id: 'JCOPS-signature-tee-S-Midnight Black',
              productId: 'JCOPS-signature-tee',
              name: 'Signature Silk-Cotton Tee',
              price: 180,
              quantity: 2,
              selectedSize: 'S',
              selectedColor: 'Midnight Black',
              image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop'
            }
          ],
          total: 360,
          status: 'Delivered',
          date: '2026-06-18T14:24:00.000Z'
        },
        {
          orderId: 'VEL-2026-724190',
          email: 't.kurosawa@architects.co.jp',
          shippingAddress: {
            firstName: 'Tadao',
            lastName: 'Kurosawa',
            address: '2-1 Minami-Aoyama',
            city: 'Tokyo',
            state: 'Tokyo',
            zip: '107-0062',
            phone: '+81 3 5412 1111'
          },
          items: [
            {
              id: 'sartorial-pleated-trousers-48-Charcoal Gray',
              productId: 'sartorial-pleated-trousers',
              name: 'Sartorial Pleated Trousers',
              price: 580,
              quantity: 1,
              selectedSize: '48',
              selectedColor: 'Charcoal Gray',
              image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop'
            },
            {
              id: 'JCOPS-court-sneaker-42-Chalk White',
              productId: 'JCOPS-court-sneaker',
              name: 'Aether Calfskin Court Sneaker',
              price: 490,
              quantity: 1,
              selectedSize: '42',
              selectedColor: 'Chalk White',
              image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop'
            }
          ],
          total: 1070,
          status: 'Shipped',
          date: '2026-06-20T09:12:00.000Z'
        },
        {
          orderId: 'VEL-2026-302195',
          email: 'j.sanders@minimalist.com',
          shippingAddress: {
            firstName: 'Jil',
            lastName: 'Sanders',
            address: '10 Mercer St',
            city: 'New York',
            state: 'NY',
            zip: '10012',
            phone: '+1 212 925 0001'
          },
          items: [
            {
              id: 'aether-cashmere-overcoat-50-Camel',
              productId: 'aether-cashmere-overcoat',
              name: 'Aether Double-Breasted Cashmere Coat',
              price: 2400,
              quantity: 1,
              selectedSize: '50',
              selectedColor: 'Camel',
              image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop'
            }
          ],
          total: 2040,
          status: 'Processing',
          date: '2026-06-21T21:45:00.000Z'
        }
      ];
      setOrders(mockOrders);
      localStorage.setItem('JCOPS_orders', JSON.stringify(mockOrders));
    }

    // Load Products
    const storedProducts = localStorage.getItem('JCOPS_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      const typedProducts = productsData.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        collection: p.collection,
        images: p.images,
        sizes: p.sizes,
        colors: p.colors,
        inStock: p.inStock,
        description: p.description
      }));
      setProducts(typedProducts);
      localStorage.setItem('JCOPS_products', JSON.stringify(typedProducts));
    }

    // Load Announcement Text
    const savedAnnounce = localStorage.getItem('JCOPS_announcement');
    if (savedAnnounce) {
      setAnnouncementText(savedAnnounce);
    }

    // Load Inquiries
    const storedInquiries = localStorage.getItem('JCOPS_inquiries');
    if (storedInquiries) {
      setInquiries(JSON.parse(storedInquiries));
    } else {
      const mockInquiries: Inquiry[] = [
        {
          id: 'INQ-481903',
          name: 'Vivienne Westwood',
          email: 'vivienne@westwood.co.uk',
          inquiryType: 'Private Showroom Appointment',
          message: 'Would love to request a private viewing of the Zenith Collection at the Milan Showroom next Tuesday morning. Let me know if that is possible.',
          date: '2026-06-21T10:04:12.000Z',
          status: 'Unresolved'
        },
        {
          id: 'INQ-189304',
          name: 'Marcus Aurelius',
          email: 'marcus@philosophy.org',
          inquiryType: 'Corporate / Custom Tailoring',
          message: 'Interested in bespoke sizing details for our corporate team uniforms. Looking for 12 pieces of the Signature Silk-Cotton Tee in Slate Gray.',
          date: '2026-06-22T08:15:30.000Z',
          status: 'Unresolved'
        }
      ];
      setInquiries(mockInquiries);
      localStorage.setItem('JCOPS_inquiries', JSON.stringify(mockInquiries));
    }

    // Load Promo Codes
    const storedPromoCodes = localStorage.getItem('JCOPS_promo_codes');
    if (storedPromoCodes) {
      setPromoCodes(JSON.parse(storedPromoCodes));
    } else {
      const defaultPromoCodes = [
        { code: 'JCOPS15', value: 15, type: 'percentage', active: true },
        { code: 'JCOPS10', value: 10, type: 'percentage', active: true },
        { code: 'JCOPS20', value: 20, type: 'percentage', active: true },
        { code: 'LUXURY50', value: 50, type: 'fixed', active: true }
      ];
      setPromoCodes(defaultPromoCodes);
      localStorage.setItem('JCOPS_promo_codes', JSON.stringify(defaultPromoCodes));
    }

    // Load price threshold warning limit
    const storedThreshold = localStorage.getItem('JCOPS_price_threshold');
    if (storedThreshold) {
      setPriceThreshold(Number(storedThreshold));
    }

    // Initialize mock notifications
    const defaultAlerts: AlertNotification[] = [
      { id: '1', title: 'High-Value Order', message: 'New transaction from Paris registered ($360.00)', time: '14 mins ago', read: false },
      { id: '2', title: 'Stock Warning', message: 'Signature Silk-Cotton Tee is low on stock', time: '1 hour ago', read: false },
      { id: '3', title: 'Client Message', message: 'Private Showroom inquiry from Marcus Aurelius', time: '2 hours ago', read: true }
    ];
    setNotifications(defaultAlerts);

    // Diagnostics latency timer
    const latencyTimer = setInterval(() => {
      setLatency(Math.floor(8 + Math.random() * 8));
    }, 4000);

    // Initial logs
    const initialLogs: AuditLog[] = [
      { time: new Date(Date.now() - 300000).toLocaleTimeString(), type: 'INFO', message: 'API Service successfully initialized on port 3000' },
      { time: new Date(Date.now() - 240000).toLocaleTimeString(), type: 'INFO', message: 'Database connection established: localCache v1.0.4' },
      { time: new Date(Date.now() - 180000).toLocaleTimeString(), type: 'SUCCESS', message: 'Fetched 14 active products from products.json database' },
      { time: new Date(Date.now() - 120000).toLocaleTimeString(), type: 'INFO', message: 'Synchronized orders registry from localStorage' },
      { time: new Date(Date.now() - 60000).toLocaleTimeString(), type: 'SUCCESS', message: 'Active Client Session verified - julian.s@JCOPS.com' },
    ];
    setLogs(initialLogs);

    return () => {
      clearInterval(latencyTimer);
    };
  }, []);

  // Periodically add logs
  useEffect(() => {
    const logsTimer = setInterval(() => {
      const actions = [
        { type: 'INFO' as const, message: 'GET /api/v1/products - 200 OK (Cache hit)' },
        { type: 'INFO' as const, message: 'GET /api/v1/orders - 200 OK (Sync complete)' },
        { type: 'SUCCESS' as const, message: 'Client Ledger updated successfully' },
        { type: 'INFO' as const, message: 'RESOLVING SOLVER - Coordinate calculations active' },
        { type: 'WARN' as const, message: 'Latency spike detected in regional CDN solver' },
      ];
      const selected = actions[Math.floor(Math.random() * actions.length)];
      setLogs((prev) => [
        { time: new Date().toLocaleTimeString(), type: selected.type, message: selected.message },
        ...prev.slice(0, 15)
      ]);
    }, 10000);

    return () => clearInterval(logsTimer);
  }, []);

  // Update warnings dynamically
  useEffect(() => {
    const unresolvedCount = inquiries.filter(i => i.status === 'Unresolved').length;
    setAlertsCount(unresolvedCount);
  }, [inquiries]);

  // Calculations for Dashboard Stats
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 18450;
    const totalCount = orders.length + 42;
    const totalCustomers = Array.from(new Set(orders.map(o => o.email))).length + 28;
    const avgOrderValue = Math.round(totalRevenue / totalCount);

    return {
      revenue: totalRevenue,
      orders: totalCount,
      customers: totalCustomers,
      aov: avgOrderValue
    };
  }, [orders]);

  const revenuePointsThisMonth = "0,150 80,140 160,110 240,95 320,60 400,35 480,10";
  const revenuePointsLastMonth = "0,170 80,165 160,145 240,130 320,105 400,90 480,80";
  const trafficPoints = "0,180 50,150 100,160 150,110 200,90 250,120 300,75 350,60 400,105 450,45 500,20";

  const categorySplits = useMemo(() => {
    const counts: Record<string, number> = {
      't-shirts': 12,
      'pants': 9,
      'sneakers': 6,
      'outerwear': 8,
      'accessories': 4
    };
    orders.forEach(o => {
      o.items.forEach(item => {
        const cat = item.productId.includes('sneaker') ? 'sneakers' :
          item.productId.includes('trousers') || item.productId.includes('denim') ? 'pants' :
            item.productId.includes('coat') || item.productId.includes('blazer') ? 'outerwear' : 't-shirts';
        counts[cat] = (counts[cat] || 0) + item.quantity;
      });
    });

    const total = Object.values(counts).reduce((s, v) => s + v, 0);
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
      percent: Math.round((counts[key] / total) * 100)
    }));
  }, [orders]);

  // Order Filter computation
  const filteredOrders = useMemo(() => {
    if (orderFilter === 'All') return orders;
    return orders.filter(o => o.status === orderFilter);
  }, [orders, orderFilter]);

  // Product Search computation
  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.collection.toLowerCase().includes(productSearch.toLowerCase())
    );
  }, [products, productSearch]);

  // Customer Directory computation
  const customerDirectory = useMemo(() => {
    const clientsMap: Record<string, { name: string; email: string; phone: string; location: string; ordersCount: number; spent: number }> = {};

    clientsMap['helena.v@vogue.fr'] = {
      name: 'Helena Vidal',
      email: 'helena.v@vogue.fr',
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      ordersCount: 1,
      spent: 360
    };
    clientsMap['t.kurosawa@architects.co.jp'] = {
      name: 'Tadao Kurosawa',
      email: 't.kurosawa@architects.co.jp',
      phone: '+81 3 5412 1111',
      location: 'Tokyo, Japan',
      ordersCount: 1,
      spent: 1070
    };
    clientsMap['j.sanders@minimalist.com'] = {
      name: 'Jil Sanders',
      email: 'j.sanders@minimalist.com',
      phone: '+1 212 925 0001',
      location: 'New York, US',
      ordersCount: 1,
      spent: 2040
    };

    orders.forEach(o => {
      if (clientsMap[o.email]) {
        clientsMap[o.email].ordersCount += 1;
        clientsMap[o.email].spent += o.total;
      } else {
        clientsMap[o.email] = {
          name: `${o.shippingAddress.firstName} ${o.shippingAddress.lastName}`,
          email: o.email,
          phone: o.shippingAddress.phone,
          location: `${o.shippingAddress.city}, ${o.shippingAddress.state}`,
          ordersCount: 1,
          spent: o.total
        };
      }
    });

    return Object.values(clientsMap);
  }, [orders]);

  // Operations on Products
  const toggleStockStatus = (productId: string) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        return { ...p, inStock: p.inStock === false };
      }
      return p;
    });
    setProducts(updated);
    localStorage.setItem('JCOPS_products', JSON.stringify(updated));
    toast({
      type: 'success',
      title: 'Product Stock Toggled',
      description: 'Stock status updated successfully.'
    });
  };

  const handleUpdateProductPrice = (productId: string, newPriceStr: string) => {
    const newPrice = parseFloat(newPriceStr);
    if (isNaN(newPrice) || newPrice <= 0) return;

    const updated = products.map(p => {
      if (p.id === productId) {
        return { ...p, price: newPrice };
      }
      return p;
    });
    setProducts(updated);
    localStorage.setItem('JCOPS_products', JSON.stringify(updated));

    setLogs(prev => [
      { time: new Date().toLocaleTimeString(), type: 'INFO', message: `Catalogue pricing modified: Product ID ${productId} set to $${newPrice}` },
      ...prev
    ]);

    toast({
      type: 'success',
      title: 'Price Updated',
      description: 'The product pricing records have been modified.'
    });
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    setProducts(updated);
    localStorage.setItem('JCOPS_products', JSON.stringify(updated));

    setLogs(prev => [
      { time: new Date().toLocaleTimeString(), type: 'WARN', message: `Catalogue item deleted: Product ID ${productId}` },
      ...prev
    ]);

    toast({
      type: 'success',
      title: 'Product Removed',
      description: 'The product has been archived and removed from the active catalogue.'
    });
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(newProdPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        type: 'error',
        title: 'Invalid Price',
        description: 'Please enter a valid retail price.'
      });
      return;
    }

    // Generate a unique ID from product name
    const productSlug = newProdName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const uniqueId = `${productSlug || 'product'}-${Date.now()}`;

    // Split inputs
    const sizes = newProdSizes.split(',').map(s => s.trim()).filter(Boolean);
    const colors = newProdColors.split(',').map(c => c.trim()).filter(Boolean);

    const newProduct: Product = {
      id: uniqueId,
      name: newProdName,
      price: price,
      category: newProdCategory,
      collection: newProdCollection,
      images: newProdImage ? [newProdImage] : ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop'],
      sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L'],
      colors: colors.length > 0 ? colors : ['Midnight Black', 'Chalk White'],
      inStock: true,
      description: newProdDesc || undefined
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem('JCOPS_products', JSON.stringify(updated));

    // Reset Form
    setNewProdName('');
    setNewProdPrice('');
    setNewProdCategory('t-shirts');
    setNewProdCollection('Aether');
    setNewProdImage('');
    setNewProdSizes('S, M, L, XL');
    setNewProdColors('Midnight Black, Chalk White');
    setNewProdDesc('');
    setIsAddProductOpen(false);

    // Logging & toast
    setLogs(prev => [
      { time: new Date().toLocaleTimeString(), type: 'SUCCESS', message: `Added new catalogue creation: ${newProduct.name} ($${newProduct.price})` },
      ...prev
    ]);

    toast({
      type: 'success',
      title: 'Creation Published',
      description: `"${newProduct.name}" has been registered in the digital atelier.`
    });
  };

  // Batch Operations
  const handleToggleSelectProduct = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleSelectAllProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProductIds(filteredProducts.map(p => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleBatchToggleStock = () => {
    if (selectedProductIds.length === 0) return;
    const updated = products.map(p => {
      if (selectedProductIds.includes(p.id)) {
        return { ...p, inStock: p.inStock === false };
      }
      return p;
    });
    setProducts(updated);
    localStorage.setItem('JCOPS_products', JSON.stringify(updated));
    setSelectedProductIds([]);

    toast({
      type: 'success',
      title: 'Batch Action Complete',
      description: `Toggled stock status for ${selectedProductIds.length} creations.`
    });
  };

  const handleBatchArchive = () => {
    if (selectedProductIds.length === 0) return;
    const updated = products.filter(p => !selectedProductIds.includes(p.id));
    setProducts(updated);
    localStorage.setItem('JCOPS_products', JSON.stringify(updated));
    setSelectedProductIds([]);

    toast({
      type: 'success',
      title: 'Batch Action Complete',
      description: `Archived ${selectedProductIds.length} creations from catalog.`
    });
  };

  // Operations on Orders
  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    const updated = orders.map(o => {
      if (o.orderId === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem('JCOPS_orders', JSON.stringify(updated));

    setLogs(prev => [
      { time: new Date().toLocaleTimeString(), type: 'SUCCESS', message: `Order ${orderId} logistics status updated to: ${newStatus}` },
      ...prev
    ]);

    toast({
      type: 'success',
      title: 'Order Status Changed',
      description: `Order ${orderId} updated to ${newStatus}.`
    });
  };

  // Operations on Inquiries / Inbox
  const handleResolveInquiry = (inqId: string) => {
    const updated = inquiries.map(i => {
      if (i.id === inqId) {
        return { ...i, status: 'Resolved' as const };
      }
      return i;
    });
    setInquiries(updated);
    localStorage.setItem('JCOPS_inquiries', JSON.stringify(updated));

    if (selectedInquiry?.id === inqId) {
      setSelectedInquiry(prev => prev ? { ...prev, status: 'Resolved' } : null);
    }

    toast({
      type: 'success',
      title: 'Inquiry Resolved',
      description: 'Client conversation has been marked resolved.'
    });
  };

  const handleDeleteInquiry = (inqId: string) => {
    const updated = inquiries.filter(i => i.id !== inqId);
    setInquiries(updated);
    localStorage.setItem('JCOPS_inquiries', JSON.stringify(updated));
    setSelectedInquiry(null);

    toast({
      type: 'success',
      title: 'Inquiry Archived',
      description: 'The inquiry has been removed from the inbox registry.'
    });
  };

  const handleSendInquiryReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !inquiryReplyText.trim()) return;

    const updated = inquiries.map(i => {
      if (i.id === selectedInquiry.id) {
        return {
          ...i,
          status: 'Resolved' as const,
          reply: inquiryReplyText
        };
      }
      return i;
    });
    setInquiries(updated);
    localStorage.setItem('JCOPS_inquiries', JSON.stringify(updated));

    setSelectedInquiry(prev => prev ? { ...prev, status: 'Resolved', reply: inquiryReplyText } : null);
    setInquiryReplyText('');

    setLogs(prev => [
      { time: new Date().toLocaleTimeString(), type: 'SUCCESS', message: `Dispatched client concierge response to: ${selectedInquiry.email}` },
      ...prev
    ]);

    toast({
      type: 'success',
      title: 'Reply Dispatched',
      description: `Simulated confirmation response successfully dispatched to ${selectedInquiry.email}.`
    });
  };

  // Operations on CMS / settings / promo codes
  const handleSaveCMSAnnounce = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('JCOPS_announcement', announcementText);

    setLogs(prev => [
      { time: new Date().toLocaleTimeString(), type: 'SUCCESS', message: `Broadcast announcement banner string updated` },
      ...prev
    ]);

    toast({
      type: 'success',
      title: 'Announcement Updated',
      description: 'Atelier message broadcast configured successfully.'
    });
  };

  const handleSaveThreshold = (valStr: string) => {
    const val = Number(valStr);
    if (isNaN(val) || val <= 0) return;
    setPriceThreshold(val);
    localStorage.setItem('JCOPS_price_threshold', valStr);

    toast({
      type: 'success',
      title: 'Threshold Configured',
      description: `Warnings set for creations priced below $${val}.`
    });
  };

  const handleAddPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode || !newPromoVal) return;

    const valNum = parseFloat(newPromoVal);
    if (isNaN(valNum) || valNum <= 0) return;

    const newCode = {
      code: newPromoCode.toUpperCase().replace(/\s+/g, ''),
      value: valNum,
      type: newPromoType,
      active: true
    };

    const updated = [...promoCodes, newCode];
    setPromoCodes(updated);
    localStorage.setItem('JCOPS_promo_codes', JSON.stringify(updated));

    setNewPromoCode('');
    setNewPromoVal('');

    setLogs(prev => [
      { time: new Date().toLocaleTimeString(), type: 'SUCCESS', message: `Registered privilege promo code: ${newCode.code} (${newCode.value} ${newCode.type})` },
      ...prev
    ]);

    toast({
      type: 'success',
      title: 'Promo Code Created',
      description: `Discount coupon "${newCode.code}" is now live across the checkout ledger.`
    });
  };

  const togglePromoCodeStatus = (code: string) => {
    const updated = promoCodes.map(c => {
      if (c.code === code) {
        return { ...c, active: !c.active };
      }
      return c;
    });
    setPromoCodes(updated);
    localStorage.setItem('JCOPS_promo_codes', JSON.stringify(updated));

    toast({
      type: 'success',
      title: 'Promo Status Updated',
      description: `Promo code status changed.`
    });
  };

  const handleDeletePromoCode = (code: string) => {
    const updated = promoCodes.filter(c => c.code !== code);
    setPromoCodes(updated);
    localStorage.setItem('JCOPS_promo_codes', JSON.stringify(updated));

    toast({
      type: 'success',
      title: 'Promo Code Removed',
      description: 'The coupon has been permanently deleted.'
    });
  };

  const handleResetAtelierData = () => {
    localStorage.removeItem('JCOPS_orders');
    localStorage.removeItem('JCOPS_products');
    localStorage.removeItem('JCOPS_announcement');
    localStorage.removeItem('JCOPS_promo_codes');
    localStorage.removeItem('JCOPS_inquiries');
    localStorage.removeItem('JCOPS_price_threshold');
    window.location.reload();
  };

  // Notifications logic
  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const unreadAlertsCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  // Printable Ledger trigger
  const handlePrintLedger = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row relative">

      {/* -------------------- SIDEBAR PANEL (Premium Ivory/Light-Gray Theme) -------------------- */}
      <aside className="w-full lg:w-72 bg-background-secondary border-b lg:border-b-0 lg:border-r border-border p-6 flex flex-col justify-between shrink-0 glass z-40 relative print:hidden">
        <div>
          {/* Logo & Console name */}
          <div className="py-4 border-b border-border mb-6 flex justify-between items-center">
            <div>
              <Link href="/" className="font-playfair text-lg font-bold tracking-[0.25em] text-foreground block hover:opacity-85 transition-opacity">
                JCOPS
              </Link>
              <span className="text-[8px] font-mono text-accent uppercase tracking-[0.3em] font-semibold mt-1 block">Atelier Console</span>
            </div>

            <span className="text-[7px] font-mono border border-accent/30 text-accent px-1.5 py-0.5 rounded-full font-bold">
              v1.0.8
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-2 lg:gap-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase font-mono tracking-widest transition-all rounded-xs w-full whitespace-nowrap cursor-pointer ${activeTab === 'dashboard'
                  ? 'bg-background text-accent font-bold border-l-2 border-accent shadow-xs'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-border-light'
                }`}
            >
              <LayoutDashboard className="w-4 h-4 text-accent" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase font-mono tracking-widest transition-all rounded-xs w-full whitespace-nowrap cursor-pointer ${activeTab === 'products'
                  ? 'bg-background text-accent font-bold border-l-2 border-accent shadow-xs'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-border-light'
                }`}
            >
              <ShoppingBag className="w-4 h-4 text-accent" />
              <span>Catalogue</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase font-mono tracking-widest transition-all rounded-xs w-full whitespace-nowrap cursor-pointer ${activeTab === 'orders'
                  ? 'bg-background text-accent font-bold border-l-2 border-accent shadow-xs'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-border-light'
                }`}
            >
              <FileText className="w-4 h-4 text-accent" />
              <span>Orders</span>
              {orders.filter(o => o.status === 'Pending').length > 0 && (
                <span className="ml-auto bg-accent text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                  {orders.filter(o => o.status === 'Pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase font-mono tracking-widest transition-all rounded-xs w-full whitespace-nowrap cursor-pointer ${activeTab === 'customers'
                  ? 'bg-background text-accent font-bold border-l-2 border-accent shadow-xs'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-border-light'
                }`}
            >
              <Users className="w-4 h-4 text-accent" />
              <span>Clients</span>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase font-mono tracking-widest transition-all rounded-xs w-full whitespace-nowrap cursor-pointer ${activeTab === 'inbox'
                  ? 'bg-background text-accent font-bold border-l-2 border-accent shadow-xs'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-border-light'
                }`}
            >
              <Inbox className="w-4 h-4 text-accent" />
              <span>Inbox</span>
              {inquiries.filter(i => i.status === 'Unresolved').length > 0 && (
                <span className="ml-auto bg-amber-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                  {inquiries.filter(i => i.status === 'Unresolved').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-4 py-3 text-[10px] uppercase font-mono tracking-widest transition-all rounded-xs w-full whitespace-nowrap cursor-pointer ${activeTab === 'settings'
                  ? 'bg-background text-accent font-bold border-l-2 border-accent shadow-xs'
                  : 'text-foreground-secondary hover:text-foreground hover:bg-border-light'
                }`}
            >
              <Sliders className="w-4 h-4 text-accent" />
              <span>Privileges</span>
            </button>
          </nav>
        </div>

        {/* User Card inside Sidebar */}
        <div className="hidden lg:block pt-4 border-t border-border mt-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center border border-accent/40 shadow-xs font-mono">
              JS
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold block text-foreground tracking-wide uppercase truncate">Julian Sartre</span>
              <span className="text-[8px] text-foreground-muted font-mono block truncate">Julian.s@JCOPS.com</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[8px] font-mono text-foreground-muted uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Console Live Session</span>
          </div>
        </div>
      </aside>

      {/* -------------------- MAIN CONTENT AREA -------------------- */}
      <section className="flex-1 p-6 sm:p-10 lg:p-12 overflow-x-hidden space-y-8 bg-background print:p-0">

        {/* Top Unique Navbar Header Bar */}
        <header className="border border-border bg-background-secondary p-4 px-6 rounded-sm flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-foreground-secondary shadow-xs relative print:hidden">
          <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent animate-pulse" />
              <span>System Node:</span>
              <span className="text-emerald-600 font-bold">100% ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-foreground-muted" />
              <span>Solver Delay:</span>
              <span className="text-accent font-bold">{latency}ms</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Security:</span>
              <span className="text-foreground font-bold">WAF ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest relative">
            {/* Print Ledger Action */}
            <button
              onClick={handlePrintLedger}
              title="Print Sales Ledger"
              className="p-2 border border-border bg-background hover:border-accent hover:text-accent rounded-full transition-colors cursor-pointer flex items-center justify-center gap-1 text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 font-mono"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Ledger</span>
            </button>

            {/* Notifications Bell Dropdown button */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 border border-border bg-background hover:border-accent hover:text-accent rounded-full transition-colors cursor-pointer relative"
              aria-label="Toggle notifications"
            >
              <Bell className="w-4 h-4 text-foreground-secondary" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-bold text-[7px] h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {/* Notifications Drawer popover */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-12 w-80 bg-background border border-border rounded-sm shadow-xl z-50 p-4 space-y-3.5"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-border text-[9px] font-bold text-foreground">
                    <span>ATELIER ALERTS</span>
                    <button
                      onClick={handleClearNotifications}
                      className="text-accent hover:underline text-[8px]"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => handleMarkNotificationRead(n.id)}
                        className={`p-2.5 rounded-xs border text-left space-y-1 transition-all cursor-pointer ${n.read ? 'border-border bg-background-secondary/25 opacity-70' : 'border-accent-hover/30 bg-accent-light/10'
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold text-foreground uppercase">{n.title}</span>
                          <span className="text-[8px] text-foreground-muted">{n.time}</span>
                        </div>
                        <p className="text-[10px] text-foreground-secondary leading-normal font-sans">{n.message}</p>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <span className="text-foreground-muted block py-4 text-center">No alerts in logs.</span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* TABS CONTAINER */}
        <AnimatePresence mode="wait">

          {/* TAB 1: DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Titles */}
              <div className="print:hidden">
                <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">Atelier Status Report</span>
                <h1 className="heading-serif text-3xl sm:text-4xl uppercase tracking-wider mt-1">Console Dashboard</h1>
              </div>

              {/* KPI cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="border border-border p-5 bg-background-secondary/20 rounded-xs flex items-center justify-between shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-mono text-foreground-muted tracking-wider">Gross Income</span>
                    <h3 className="font-mono text-xl sm:text-2xl font-bold text-foreground">${stats.revenue.toLocaleString()}</h3>
                  </div>
                  <div className="h-9 w-9 bg-accent-light/15 border border-accent/20 rounded-full flex items-center justify-center text-accent">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>

                <div className="border border-border p-5 bg-background-secondary/20 rounded-xs flex items-center justify-between shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-mono text-foreground-muted tracking-wider">Total Sales</span>
                    <h3 className="font-mono text-xl sm:text-2xl font-bold text-foreground">{stats.orders}</h3>
                  </div>
                  <div className="h-9 w-9 bg-accent-light/15 border border-accent/20 rounded-full flex items-center justify-center text-accent">
                    <Briefcase className="w-4 h-4" />
                  </div>
                </div>

                <div className="border border-border p-5 bg-background-secondary/20 rounded-xs flex items-center justify-between shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-mono text-foreground-muted tracking-wider">Active Clients</span>
                    <h3 className="font-mono text-xl sm:text-2xl font-bold text-foreground">{stats.customers}</h3>
                  </div>
                  <div className="h-9 w-9 bg-accent-light/15 border border-accent/20 rounded-full flex items-center justify-center text-accent">
                    <UserCheck className="w-4 h-4" />
                  </div>
                </div>

                <div className="border border-border p-5 bg-background-secondary/20 rounded-xs flex items-center justify-between shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-mono text-foreground-muted tracking-wider">Avg Ticket</span>
                    <h3 className="font-mono text-xl sm:text-2xl font-bold text-foreground">${stats.aov}</h3>
                  </div>
                  <div className="h-9 w-9 bg-accent-light/15 border border-accent/20 rounded-full flex items-center justify-center text-accent">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Data Representation Row (Multiple Graphs) - Hidden when printing */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 print:hidden">

                {/* 1. Revenue Analysis Dual-Series Line Chart */}
                <div className="xl:col-span-8 border border-border p-6 bg-background rounded-xs space-y-4 shadow-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <div>
                      <h3 className="ui-text text-xs font-bold uppercase tracking-wider text-foreground font-sans">Revenue Analysis</h3>
                      <p className="text-[9px] font-mono text-foreground-muted uppercase mt-0.5">Contrasting current vs previous cycles</p>
                    </div>
                    <div className="flex gap-4 font-mono text-[8px] uppercase tracking-widest">
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-0.5 bg-accent" />
                        <span className="text-foreground">Current Period</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-px bg-zinc-400 border-t border-dashed border-zinc-400" />
                        <span className="text-foreground-muted">Prior Period</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-60 w-full pt-4">
                    <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="chart-glow-accent-light" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="0" y1="50" x2="500" y2="50" stroke="#e5e5e5" strokeWidth="0.5" strokeDasharray="4" />
                      <line x1="0" y1="100" x2="500" y2="100" stroke="#e5e5e5" strokeWidth="0.5" strokeDasharray="4" />
                      <line x1="0" y1="150" x2="500" y2="150" stroke="#e5e5e5" strokeWidth="0.5" strokeDasharray="4" />

                      {/* Gradient Area */}
                      <path
                        d={`M 0,200 L ${revenuePointsThisMonth} L 480,200 Z`}
                        fill="url(#chart-glow-accent-light)"
                        stroke="none"
                      />

                      {/* Prior Period (Dashed) */}
                      <polyline
                        fill="none"
                        stroke="#a1a1a9"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        points={revenuePointsLastMonth}
                      />

                      {/* Current Period (Solid) */}
                      <polyline
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="2.5"
                        points={revenuePointsThisMonth}
                      />

                      {/* dots */}
                      <circle cx="0" cy="150" r="4.5" fill="#ffffff" stroke="var(--color-accent)" strokeWidth="2.5" />
                      <circle cx="80" cy="140" r="4.5" fill="#ffffff" stroke="var(--color-accent)" strokeWidth="2.5" />
                      <circle cx="160" cy="110" r="4.5" fill="#ffffff" stroke="var(--color-accent)" strokeWidth="2.5" />
                      <circle cx="240" cy="95" r="4.5" fill="#ffffff" stroke="var(--color-accent)" strokeWidth="2.5" />
                      <circle cx="320" cy="60" r="4.5" fill="#ffffff" stroke="var(--color-accent)" strokeWidth="2.5" />
                      <circle cx="400" cy="35" r="4.5" fill="#ffffff" stroke="var(--color-accent)" strokeWidth="2.5" />
                      <circle cx="480" cy="10" r="4.5" fill="#ffffff" stroke="var(--color-accent)" strokeWidth="2.5" />
                    </svg>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-foreground-muted uppercase tracking-widest pt-2 border-t border-border-light">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun (Est)</span>
                  </div>
                </div>

                {/* 2. Category sales split Doughnut Chart */}
                <div className="xl:col-span-4 border border-border p-6 bg-background rounded-xs flex flex-col justify-between shadow-sm">
                  <div className="space-y-1 pb-3 border-b border-border">
                    <h3 className="ui-text text-xs font-bold uppercase tracking-wider text-foreground">Share of Sales</h3>
                    <p className="text-[9px] font-mono text-foreground-muted uppercase mt-0.5">By Product Category</p>
                  </div>

                  <div className="flex justify-center items-center py-6 relative">
                    <svg width="140" height="140" viewBox="0 0 42 42" className="transform -rotate-90">
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e5e5e5" strokeWidth="3" />

                      {/* T-shirts: 35% */}
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--color-accent)" strokeWidth="4.5"
                        strokeDasharray="35 65" strokeDashoffset="0" />
                      {/* Pants: 28% */}
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#a1a1a9" strokeWidth="3.5"
                        strokeDasharray="28 72" strokeDashoffset="-35" />
                      {/* Sneakers: 18% */}
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#71717a" strokeWidth="3"
                        strokeDasharray="18 82" strokeDashoffset="-63" />
                      {/* Outerwear: 14% */}
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#18181b" strokeWidth="2.5"
                        strokeDasharray="14 86" strokeDashoffset="-81" />
                      {/* Accessories: 5% */}
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#d4b97e" strokeWidth="2"
                        strokeDasharray="5 95" strokeDashoffset="-95" />
                    </svg>

                    <div className="absolute text-center flex flex-col justify-center items-center">
                      <span className="font-mono text-base font-bold text-foreground">{stats.orders}</span>
                      <span className="text-[7px] uppercase text-foreground-muted tracking-wider font-mono">Orders</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 font-mono text-[9px] uppercase tracking-wider text-foreground-secondary">
                    {categorySplits.map((item, idx) => {
                      const colorsHex = ['var(--color-accent)', '#a1a1a9', '#71717a', '#18181b', '#d4b97e'];
                      return (
                        <div key={item.name} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colorsHex[idx] }} />
                            <span>{item.name}</span>
                          </div>
                          <span className="text-foreground font-bold">{item.percent}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Traffic Area Chart */}
                <div className="xl:col-span-7 border border-border p-6 bg-background rounded-xs space-y-4 shadow-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <div>
                      <h3 className="ui-text text-xs font-bold uppercase tracking-wider text-foreground">Client Render Sessions</h3>
                      <p className="text-[9px] font-mono text-foreground-muted uppercase mt-0.5">Live simulation load requests (Hourly)</p>
                    </div>
                    <span className="text-[8px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-2 py-0.5 rounded-sm font-bold uppercase">
                      Syncing
                    </span>
                  </div>

                  <div className="relative h-44 w-full pt-4">
                    <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="gradient-traffic-light" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#18181b" stopOpacity="0.10" />
                          <stop offset="100%" stopColor="#18181b" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={`M 0,200 L ${trafficPoints} L 500,200 Z`}
                        fill="url(#gradient-traffic-light)"
                        stroke="none"
                      />
                      <polyline
                        fill="none"
                        stroke="#18181b"
                        strokeWidth="1.5"
                        points={trafficPoints}
                      />
                    </svg>
                  </div>

                  <div className="flex justify-between items-center text-[8px] font-mono text-foreground-muted uppercase tracking-widest pt-1">
                    <span>08:00</span>
                    <span>11:00</span>
                    <span>14:00</span>
                    <span>17:00</span>
                    <span>20:00</span>
                    <span>23:00</span>
                  </div>
                </div>

                {/* 4. Recent Transactions Overview */}
                <div className="xl:col-span-5 border border-border p-6 bg-background rounded-xs flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <h3 className="ui-text text-xs font-bold uppercase tracking-wider text-foreground">Recent Transactions</h3>
                      <span className="text-[9px] text-foreground-muted font-mono">{orders.length} ACTIVE</span>
                    </div>

                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 scrollbar-none">
                      {orders.slice(0, 4).map((order) => (
                        <div
                          key={order.orderId}
                          onClick={() => setSelectedOrderDetails(order)}
                          className="flex justify-between items-center p-2 px-3 border border-border hover:border-accent bg-background-secondary/25 hover:bg-background rounded-xs transition-all cursor-pointer group"
                        >
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-foreground truncate group-hover:text-accent transition-colors">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</h4>
                            <p className="text-[8px] font-mono text-foreground-muted mt-0.5">{order.orderId}</p>
                          </div>
                          <div className="text-right pl-4 shrink-0 font-mono">
                            <span className="text-xs font-bold text-accent">${order.total}</span>
                            <span className={`text-[8px] uppercase tracking-widest font-semibold block mt-0.5 ${order.status === 'Pending' ? 'text-amber-500' :
                                order.status === 'Processing' ? 'text-blue-500' :
                                  order.status === 'Shipped' ? 'text-indigo-500' : 'text-emerald-500'
                              }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('orders')}
                    className="w-full border border-border hover:border-accent py-2.5 text-[9px] font-mono uppercase tracking-widest text-foreground-secondary hover:text-accent flex items-center justify-center gap-1.5 cursor-pointer mt-4 transition-all duration-300 bg-background"
                  >
                    <span>Logistics Ledger</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Printable Table visible ONLY during printing */}
              <div className="hidden print:block space-y-4 pt-10 text-xs">
                <h2 className="heading-serif text-lg font-bold border-b border-black pb-2 text-center">Atelier Sales Transactions Ledger</h2>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black font-mono text-[9px] uppercase tracking-wider font-bold">
                      <th className="py-2">Order ID</th>
                      <th className="py-2">Recipient</th>
                      <th className="py-2">Date</th>
                      <th className="py-2 text-right">Total Paid</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {orders.map(o => (
                      <tr key={o.orderId}>
                        <td className="py-2 font-mono">{o.orderId}</td>
                        <td className="py-2">{o.shippingAddress.firstName} {o.shippingAddress.lastName} ({o.email})</td>
                        <td className="py-2">{new Date(o.date).toLocaleDateString()}</td>
                        <td className="py-2 text-right font-mono">${o.total}</td>
                        <td className="py-2 uppercase font-mono text-[9px]">{o.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 2: PRODUCTS CATALOGUE MANAGEMENT (Batch check operations & Price warning thresholds) */}
          {activeTab === 'products' && (
            <motion.div
              key="products-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Product Header */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-border pb-6">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">Active Inventory Records</span>
                  <h1 className="heading-serif text-3xl sm:text-4xl uppercase tracking-wider text-foreground mt-1">Creations Catalogue</h1>
                </div>
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="btn-primary py-3 px-6 text-[10px] uppercase font-mono tracking-widest flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Creation</span>
                </button>
              </div>

              {/* Filters & Batch Actions row */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative border border-border bg-background px-4 py-2.5 flex items-center max-w-md w-full focus-within:border-accent transition-colors">
                  <Search className="w-4 h-4 text-foreground-muted mr-3" />
                  <input
                    type="text"
                    placeholder="Search catalogue by name, category..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full bg-transparent text-xs uppercase outline-none focus:placeholder-accent text-foreground"
                  />
                </div>

                {/* Batch Action controls bar */}
                <AnimatePresence>
                  {selectedProductIds.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center gap-2 border border-accent/20 bg-accent-light/10 p-2 px-4 rounded-sm font-mono text-[9px] uppercase tracking-wider font-semibold"
                    >
                      <span className="text-accent">{selectedProductIds.length} Selected</span>
                      <div className="w-px h-4 bg-border mx-2" />
                      <button
                        onClick={handleBatchToggleStock}
                        className="hover:text-accent border border-border bg-background px-2 py-1 cursor-pointer transition-colors"
                      >
                        Toggle Stock
                      </button>
                      <button
                        onClick={handleBatchArchive}
                        className="hover:text-rose-500 border border-border bg-background px-2 py-1 text-rose-500 cursor-pointer transition-colors"
                      >
                        Archive
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bespoke Table */}
              <div className="border border-border bg-background rounded-sm overflow-x-auto shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-background-secondary text-foreground-muted border-b border-border uppercase font-mono tracking-widest text-[8px] font-bold">
                      <th className="p-4 pl-6 w-12 text-center">
                        <input
                          type="checkbox"
                          checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                          onChange={handleSelectAllProducts}
                          className="cursor-pointer"
                        />
                      </th>
                      <th className="p-4">Creation</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Collection</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock Status</th>
                      <th className="p-4 pr-6 text-right">Archiving</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light text-foreground-secondary">
                    {filteredProducts.map((product) => {
                      const isChecked = selectedProductIds.includes(product.id);
                      const isUnderLimit = product.price < priceThreshold;
                      return (
                        <tr key={product.id} className={`hover:bg-background-secondary/25 transition-colors ${isChecked ? 'bg-accent-light/5' : ''}`}>
                          <td className="p-4 pl-6 text-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleSelectProduct(product.id)}
                              className="cursor-pointer"
                            />
                          </td>
                          <td className="p-4 flex items-center gap-4">
                            <div className="w-10 h-12 border border-border rounded-xs overflow-hidden shrink-0 bg-background-secondary">
                              {product.images?.[0] && (
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>
                            <div className="min-w-0">
                              <span className="font-semibold text-foreground block truncate max-w-[200px]">{product.name}</span>
                              <span className="text-[8px] font-mono text-foreground-muted block mt-0.5">{product.id}</span>
                            </div>
                          </td>
                          <td className="p-4 uppercase tracking-wider text-[9px] font-mono">{product.category}</td>
                          <td className="p-4 uppercase tracking-wider text-[9px] font-mono">{product.collection}</td>
                          <td className="p-4 font-mono">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                <span className="text-accent font-bold">$</span>
                                <input
                                  type="number"
                                  defaultValue={product.price}
                                  onBlur={(e) => handleUpdateProductPrice(product.id, e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleUpdateProductPrice(product.id, (e.target as HTMLInputElement).value);
                                      (e.target as HTMLInputElement).blur();
                                    }
                                  }}
                                  className="bg-transparent border-b border-transparent hover:border-accent text-accent font-bold focus:border-accent outline-none text-xs w-20 px-1 font-mono transition-colors"
                                />
                              </div>
                              {/* Price alert tag helper */}
                              {isUnderLimit && (
                                <span className="inline-flex items-center gap-0.5 text-[7px] text-amber-600 bg-amber-50 border border-amber-200 px-1 py-0.5 w-max font-bold font-mono uppercase tracking-wider">
                                  <AlertTriangle className="w-2.5 h-2.5" />
                                  <span>LOW margin</span>
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => toggleStockStatus(product.id)}
                              className={`px-3 py-1.5 text-[8px] font-mono uppercase tracking-widest font-semibold rounded-full border cursor-pointer transition-colors ${product.inStock !== false
                                  ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600'
                                  : 'bg-rose-500/5 border-rose-500/20 text-rose-500'
                                }`}
                            >
                              {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </td>
                          <td className="p-4 pr-6 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 border border-border text-foreground-muted hover:text-rose-500 hover:border-rose-500/20 rounded-full transition-colors cursor-pointer"
                              aria-label="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredProducts.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-10 text-center text-foreground-muted font-mono uppercase text-[9px] tracking-wider">
                          No matching creations registered.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ORDER LIST & STATUS CHANGE */}
          {activeTab === 'orders' && (
            <motion.div
              key="orders-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Orders Header */}
              <div className="border-b border-border pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">DHL Logistics Status Control</span>
                  <h1 className="heading-serif text-3xl sm:text-4xl uppercase tracking-wider mt-1">Creations Sales Orders</h1>
                </div>

                {/* Orders filtering tabs */}
                <div className="flex flex-wrap border border-border p-1 bg-background-secondary/60 rounded-xs font-mono text-[9px] uppercase tracking-wider self-start sm:self-auto">
                  {(['All', 'Pending', 'Processing', 'Shipped', 'Delivered'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderFilter(status)}
                      className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${orderFilter === status ? 'bg-background text-accent font-bold shadow-xs' : 'text-foreground-secondary hover:text-foreground'
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="border border-border bg-background rounded-sm overflow-x-auto shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-background-secondary text-foreground-muted border-b border-border uppercase font-mono tracking-widest text-[8px] font-bold">
                      <th className="p-4 pl-6">Order ID</th>
                      <th className="p-4">Recipient</th>
                      <th className="p-4">Items Count</th>
                      <th className="p-4">Paid Total</th>
                      <th className="p-4">Purchase Date</th>
                      <th className="p-4">Logistics Status</th>
                      <th className="p-4 pr-6 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light text-foreground-secondary">
                    {filteredOrders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-background-secondary/25 transition-colors">
                        <td className="p-4 pl-6 font-mono font-bold text-foreground">{order.orderId}</td>
                        <td className="p-4">
                          <span className="font-semibold text-foreground block">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</span>
                          <span className="text-[9px] font-mono text-foreground-muted block mt-0.5">{order.email}</span>
                        </td>
                        <td className="p-4 font-mono">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} pieces
                        </td>
                        <td className="p-4 font-mono font-bold text-accent">${order.total}</td>
                        <td className="p-4">{new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value as any)}
                            className="bg-background border border-border text-[9px] px-2.5 py-1.5 outline-none font-mono focus:border-accent cursor-pointer uppercase font-semibold text-foreground"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="p-2 border border-border text-foreground-muted hover:text-accent hover:border-accent/40 rounded-full transition-colors cursor-pointer"
                            aria-label="View order details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-10 text-center text-foreground-muted font-mono uppercase text-[9px] tracking-wider">
                          No orders recorded matching this status.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 4: CLIENT DIRECTORY */}
          {activeTab === 'customers' && (
            <motion.div
              key="customers-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Clients Header */}
              <div className="border-b border-border pb-6">
                <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">Atelier Client Profile Registry</span>
                <h1 className="heading-serif text-3xl sm:text-4xl uppercase tracking-wider mt-1">Clientele Database</h1>
              </div>

              {/* Client Listing */}
              <div className="border border-border bg-background rounded-sm overflow-x-auto shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-background-secondary text-foreground-muted border-b border-border uppercase font-mono tracking-widest text-[8px] font-bold">
                      <th className="p-4 pl-6">Client Name</th>
                      <th className="p-4">Email Address</th>
                      <th className="p-4">Contact Phone</th>
                      <th className="p-4">Main Region</th>
                      <th className="p-4 font-mono text-right">Transactions</th>
                      <th className="p-4 pr-6 font-mono text-right">Cumulative Spent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light text-foreground-secondary">
                    {customerDirectory.map((cust) => (
                      <tr key={cust.email} className="hover:bg-background-secondary/25 transition-colors">
                        <td className="p-4 pl-6 font-bold text-foreground">{cust.name}</td>
                        <td className="p-4 font-mono">{cust.email}</td>
                        <td className="p-4 font-mono">{cust.phone}</td>
                        <td className="p-4">{cust.location}</td>
                        <td className="p-4 font-mono text-right">{cust.ordersCount} orders</td>
                        <td className="p-4 pr-6 font-mono text-right text-accent font-bold">${cust.spent}</td>
                      </tr>
                    ))}
                    {customerDirectory.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-10 text-center text-foreground-muted font-mono uppercase text-[9px] tracking-wider">
                          No client accounts registered.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB 5: CONCIERGE INBOX READER */}
          {activeTab === 'inbox' && (
            <motion.div
              key="inbox-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="border-b border-border pb-6">
                <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">Atelier Inbox Registry</span>
                <h1 className="heading-serif text-3xl sm:text-4xl uppercase tracking-wider mt-1">Client Inquiries</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Messages List */}
                <div className="lg:col-span-5 border border-border bg-background rounded-sm shadow-xs divide-y divide-border-light">
                  <div className="p-4 bg-background-secondary uppercase font-mono tracking-widest text-[8px] font-bold text-foreground-muted">
                    Active Mailbox List
                  </div>

                  <div className="max-h-[500px] overflow-y-auto divide-y divide-border-light">
                    {inquiries.map((inq) => {
                      const isActive = selectedInquiry?.id === inq.id;
                      return (
                        <div
                          key={inq.id}
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setInquiryReplyText('');
                          }}
                          className={`p-4 transition-colors cursor-pointer text-left space-y-2 ${isActive ? 'bg-background-secondary/40 border-l-2 border-accent' : 'hover:bg-background-secondary/20'
                            }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-foreground uppercase truncate max-w-[150px]">{inq.name}</span>
                            <span className="text-[8px] font-mono text-foreground-muted">{new Date(inq.date).toLocaleDateString()}</span>
                          </div>
                          <span className="text-[9px] uppercase font-mono text-accent block font-semibold truncate max-w-[200px]">{inq.inquiryType}</span>
                          <p className="text-[11px] text-foreground-secondary line-clamp-1">{inq.message}</p>
                          <div className="flex items-center justify-between pt-1">
                            <span className={`text-[7px] font-mono uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border ${inq.status === 'Resolved'
                                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600'
                                : 'bg-amber-500/5 border-amber-500/20 text-amber-500 animate-pulse'
                              }`}>
                              {inq.status}
                            </span>
                            {inq.reply && <span className="text-[7px] font-mono text-foreground-muted">REPLIED ✓</span>}
                          </div>
                        </div>
                      );
                    })}

                    {inquiries.length === 0 && (
                      <div className="p-12 text-center text-foreground-muted font-mono uppercase text-[9px] tracking-wider space-y-2">
                        <MessageSquare className="w-5 h-5 mx-auto text-zinc-400" />
                        <span>No inquiries recorded in database.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Active Inquire Detail & Reply Pane */}
                <div className="lg:col-span-7 space-y-6">
                  {selectedInquiry ? (
                    <div className="border border-border bg-background p-6 rounded-sm space-y-6 shadow-xs">
                      {/* Header details */}
                      <div className="flex justify-between items-start border-b border-border pb-4">
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">{selectedInquiry.name}</h3>
                          <span className="text-[9px] font-mono text-foreground-muted block">{selectedInquiry.email}</span>
                          <span className="text-[8px] font-mono text-accent block uppercase font-bold mt-1">{selectedInquiry.inquiryType}</span>
                        </div>
                        <div className="flex gap-2">
                          {selectedInquiry.status === 'Unresolved' && (
                            <button
                              onClick={() => handleResolveInquiry(selectedInquiry.id)}
                              className="px-3 py-1.5 border border-emerald-500/35 bg-emerald-500/10 text-emerald-600 text-[8px] font-mono uppercase tracking-widest font-bold rounded-xs cursor-pointer hover:bg-emerald-600 hover:text-white transition-colors"
                            >
                              Resolve
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                            className="p-2 border border-border text-foreground-muted hover:text-rose-500 hover:border-rose-500/20 rounded-full transition-colors cursor-pointer"
                            aria-label="Archive inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content message */}
                      <div className="space-y-2 bg-background-secondary/20 border border-border p-4 rounded-xs text-xs text-foreground-secondary leading-relaxed font-sans">
                        <span className="text-[8px] font-mono text-foreground-muted uppercase block tracking-widest">Inquiry Message:</span>
                        <p>{selectedInquiry.message}</p>
                      </div>

                      {/* Replies record */}
                      {selectedInquiry.reply && (
                        <div className="space-y-2 bg-accent-light/5 border border-accent/25 p-4 rounded-xs text-xs text-foreground-secondary leading-relaxed font-sans">
                          <span className="text-[8px] font-mono text-accent uppercase block tracking-widest font-bold">Concierge Dispatch Reply:</span>
                          <p>{selectedInquiry.reply}</p>
                        </div>
                      )}

                      {/* Reply Form */}
                      <form onSubmit={handleSendInquiryReply} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[9px] font-mono text-foreground-muted uppercase block tracking-widest font-bold">Write response dispatch</label>
                          <textarea
                            rows={4}
                            required
                            value={inquiryReplyText}
                            onChange={(e) => setInquiryReplyText(e.target.value)}
                            placeholder="Type a simulated concierge response to verify mailing systems..."
                            className="w-full bg-transparent border border-border focus:border-accent p-3 outline-none text-xs text-foreground resize-none font-sans"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn-primary py-3 px-6 text-[10px] uppercase font-mono tracking-widest flex items-center justify-center gap-1.5 cursor-pointer self-end"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch Confirmation</span>
                        </button>
                      </form>

                    </div>
                  ) : (
                    <div className="border border-dashed border-border py-24 text-center text-foreground-muted font-mono uppercase text-[10px] tracking-wider space-y-2 rounded-xs bg-background">
                      <Inbox className="w-6 h-6 mx-auto text-zinc-400 stroke-[1]" />
                      <span>Select a client inquiry from the mailbox registry to reply</span>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 6: PRIVILEGES & SETTINGS (Alert Threshold Price inputs & Promo lists & terminal logs) */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* Settings Header */}
              <div className="border-b border-border pb-6">
                <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-mono font-bold">Atelier Privilege Console</span>
                <h1 className="heading-serif text-3xl sm:text-4xl uppercase tracking-wider text-foreground mt-1">CMS & Privilege codes</h1>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

                {/* Left Area (Col Span 7) */}
                <div className="xl:col-span-7 space-y-8">
                  {/* Announcement Banner editor */}
                  <form onSubmit={handleSaveCMSAnnounce} className="border border-border p-6 bg-background rounded-sm space-y-4 shadow-xs">
                    <div className="flex items-center gap-2 pb-3 border-b border-border">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <h3 className="ui-text text-xs font-bold uppercase tracking-wider text-foreground">Broadcaster Alert CMS</h3>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Notice Bar Message</label>
                      <textarea
                        rows={2}
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        placeholder="Use Code: JCOPS15 for 15% off in the digital atelier"
                        className="border border-border focus:border-accent bg-transparent p-3 text-xs outline-none w-full resize-none font-sans text-foreground"
                      />
                    </div>
                    <button type="submit" className="btn-primary px-6 py-3 text-[10px] uppercase font-mono tracking-widest cursor-pointer">
                      Publish Notice Banner
                    </button>
                  </form>

                  {/* Warning Price Threshold controls */}
                  <div className="border border-border p-6 bg-background rounded-sm space-y-4 shadow-xs">
                    <div className="flex items-center gap-2 pb-3 border-b border-border">
                      <AlertTriangle className="w-4 h-4 text-accent animate-pulse" />
                      <h3 className="ui-text text-xs font-bold uppercase tracking-wider text-foreground">Inventory Warnings Threshold</h3>
                    </div>
                    <div className="space-y-3.5 text-xs text-foreground-secondary">
                      <p className="leading-relaxed">Configure the minimum alert threshold price limit. Creations priced below this value will display a warning flag inside catalogue matrices.</p>
                      <div className="flex items-center gap-4 max-w-xs">
                        <span className="font-mono text-zinc-500 font-bold">$</span>
                        <input
                          type="number"
                          value={priceThreshold}
                          onChange={(e) => handleSaveThreshold(e.target.value)}
                          className="border border-border focus:border-accent bg-transparent px-3 py-2 outline-none text-foreground font-mono text-xs w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Audit Log Terminal Console */}
                  <div className="border border-border p-6 bg-background rounded-sm space-y-4 shadow-xs font-mono text-[10px]">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-accent" />
                        <h3 className="ui-text text-xs font-bold uppercase tracking-wider text-foreground">Atelier Audit Log</h3>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    <div className="bg-background-secondary border border-border p-4 rounded-xs h-56 overflow-y-auto space-y-2 select-text scrollbar-none">
                      {logs.map((log, idx) => (
                        <div key={idx} className="flex gap-3 leading-relaxed">
                          <span className="text-foreground-muted">[{log.time}]</span>
                          <span className={`font-bold shrink-0 ${log.type === 'SUCCESS' ? 'text-emerald-600' :
                              log.type === 'WARN' ? 'text-amber-600' :
                                log.type === 'ERROR' ? 'text-rose-500' : 'text-blue-500'
                            }`}>
                            [{log.type}]
                          </span>
                          <span className="text-foreground-secondary break-all">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Area (Col Span 5) */}
                <div className="xl:col-span-5 space-y-8">
                  {/* Dynamic Promo Code Registry */}
                  <div className="border border-border p-6 bg-background rounded-sm space-y-5 shadow-xs">
                    <div className="flex items-center gap-2 pb-3 border-b border-border">
                      <Tag className="w-4 h-4 text-accent" />
                      <h3 className="ui-text text-xs font-bold uppercase tracking-wider text-foreground">Promo Codes Manager</h3>
                    </div>

                    {/* Coupons List */}
                    <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                      {promoCodes.map((c) => (
                        <div key={c.code} className="flex justify-between items-center p-2.5 border border-border bg-background-secondary/20 rounded-xs">
                          <div>
                            <span className="font-mono font-bold text-foreground uppercase text-xs">{c.code}</span>
                            <span className="text-[8px] text-foreground-muted font-mono block mt-0.5 uppercase">
                              {c.type === 'percentage' ? `${c.value}% discount` : `$${c.value} flat deduction`}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => togglePromoCodeStatus(c.code)}
                              className={`px-2 py-0.5 text-[8px] font-mono uppercase tracking-widest font-semibold rounded-full border cursor-pointer transition-colors ${c.active
                                  ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600'
                                  : 'bg-zinc-200 border-zinc-300 text-foreground-muted'
                                }`}
                            >
                              {c.active ? 'Active' : 'Inactive'}
                            </button>

                            <button
                              onClick={() => handleDeletePromoCode(c.code)}
                              className="text-foreground-muted hover:text-rose-500 transition-colors p-1"
                              aria-label="Delete coupon"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {promoCodes.length === 0 && (
                        <span className="text-foreground-muted uppercase font-mono text-[9px] tracking-wider block py-6 text-center">No coupons generated.</span>
                      )}
                    </div>

                    <hr className="border-border" />

                    {/* Add Promo Code Form */}
                    <form onSubmit={handleAddPromoCode} className="space-y-3.5 text-xs text-foreground-secondary">
                      <span className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest block font-bold">Generate New Coupon</span>

                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest">Coupon Code</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. VELVET25"
                          value={newPromoCode}
                          onChange={(e) => setNewPromoCode(e.target.value)}
                          className="border border-border focus:border-accent bg-transparent px-3 py-2 outline-none text-foreground w-full uppercase font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest">Type</label>
                          <select
                            value={newPromoType}
                            onChange={(e) => setNewPromoType(e.target.value as any)}
                            className="border border-border focus:border-accent bg-background px-3 py-2 outline-none text-foreground w-full uppercase cursor-pointer"
                          >
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed Flat</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest">Value</label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 25"
                            value={newPromoVal}
                            onChange={(e) => setNewPromoVal(e.target.value)}
                            className="border border-border focus:border-accent bg-transparent px-3 py-2 outline-none text-foreground w-full font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full btn-primary py-2.5 text-[9px] uppercase font-mono tracking-widest cursor-pointer mt-1"
                      >
                        Publish Promo Code
                      </button>
                    </form>
                  </div>

                  {/* Panel Reset Operations */}
                  <div className="border border-border p-6 bg-background rounded-sm space-y-4 shadow-xs">
                    <div className="flex items-center gap-2 pb-3 border-b border-border">
                      <X className="w-4 h-4 text-rose-500" />
                      <h3 className="ui-text text-xs font-bold uppercase tracking-wider text-rose-500">Panel Reset Operations</h3>
                    </div>
                    <p className="text-[11px] text-foreground-secondary leading-relaxed">
                      Erase checkout entries, custom promo codes, client inquiries, and broadcaster alerts. Reverts database to factory standards.
                    </p>
                    <button
                      onClick={handleResetAtelierData}
                      className="w-full border border-rose-500/40 text-rose-500 hover:bg-rose-500 hover:text-white py-2.5 text-[9px] font-mono uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Reset Atelier Session Data
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </section>

      {/* -------------------- ADD PRODUCT MODAL -------------------- */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-fade-in" onClick={() => setIsAddProductOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-background border border-border p-6 sm:p-10 max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl z-10 rounded-sm"
          >
            <button
              onClick={() => setIsAddProductOpen(false)}
              className="absolute top-4 right-4 p-1 hover:text-accent text-foreground-muted transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[9px] text-accent font-mono uppercase tracking-[0.2em] font-bold">Catalogue Registration</span>
              <h2 className="heading-serif text-2xl uppercase tracking-wider text-foreground animate-fade-in-up">Add New Creation</h2>
            </div>

            <hr className="border-border" />

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs text-foreground-secondary">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest">Creation Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Luminal Silk Blazer"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="border border-border focus:border-accent bg-transparent px-3 py-2 outline-none text-foreground w-full uppercase"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest">Retail Price ($) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 780"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="border border-border focus:border-accent bg-transparent px-3 py-2 outline-none text-foreground w-full font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest">Category *</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="border border-border focus:border-accent bg-background px-3 py-2 outline-none text-foreground w-full uppercase cursor-pointer"
                  >
                    <option value="t-shirts">T-Shirts</option>
                    <option value="pants">Pants</option>
                    <option value="sneakers">Sneakers</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest">Collection *</label>
                  <select
                    value={newProdCollection}
                    onChange={(e) => setNewProdCollection(e.target.value)}
                    className="border border-border focus:border-accent bg-background px-3 py-2 outline-none text-foreground w-full uppercase cursor-pointer"
                  >
                    <option value="Aether">Aether</option>
                    <option value="Luminal">Luminal</option>
                    <option value="Zenith">Zenith</option>
                    <option value="Sartorial Nomad">Sartorial Nomad</option>
                  </select>
                </div>
              </div>

              {/* image preview */}
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    className="border border-border focus:border-accent bg-transparent px-3 py-2 outline-none text-foreground w-full font-mono"
                  />
                </div>
                {newProdImage && (
                  <div className="w-16 h-20 border border-border overflow-hidden rounded-xs bg-background-secondary">
                    <img src={newProdImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest">Sizes (Comma split)</label>
                  <input
                    type="text"
                    value={newProdSizes}
                    onChange={(e) => setNewProdSizes(e.target.value)}
                    className="border border-border focus:border-accent bg-transparent px-3 py-2 outline-none text-foreground w-full font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest">Colors (Comma split)</label>
                  <input
                    type="text"
                    value={newProdColors}
                    onChange={(e) => setNewProdColors(e.target.value)}
                    className="border border-border focus:border-accent bg-transparent px-3 py-2 outline-none text-foreground w-full uppercase"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest">Description</label>
                <textarea
                  rows={3}
                  placeholder="Artistic cut description..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="border border-border focus:border-accent bg-transparent p-3 outline-none text-foreground w-full resize-none font-sans"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 font-mono text-[9px] uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="border border-border hover:border-foreground px-6 py-2.5 text-foreground-secondary hover:text-foreground cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2.5 cursor-pointer"
                >
                  Publish Creation
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* -------------------- ORDER DETAILS MODAL -------------------- */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs animate-fade-in" onClick={() => setSelectedOrderDetails(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-background border border-border p-6 sm:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl z-10 rounded-sm"
          >
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-4 right-4 p-1 hover:text-accent text-foreground-muted transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[9px] text-accent font-mono uppercase tracking-[0.2em] font-bold">Acquisition Ledger Details</span>
              <h2 className="heading-serif text-2xl uppercase tracking-wider text-foreground">{selectedOrderDetails.orderId}</h2>
            </div>

            <hr className="border-border" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-foreground-secondary">

              {/* Shipping address */}
              <div className="space-y-3">
                <h4 className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest border-b border-border pb-1.5 font-bold">Delivery Address</h4>
                <div className="space-y-1.5">
                  <p className="font-semibold text-foreground">{selectedOrderDetails.shippingAddress.firstName} {selectedOrderDetails.shippingAddress.lastName}</p>
                  <p>{selectedOrderDetails.shippingAddress.address}</p>
                  <p>{selectedOrderDetails.shippingAddress.city}, {selectedOrderDetails.shippingAddress.state} {selectedOrderDetails.shippingAddress.zip}</p>
                  <p className="font-mono mt-2 text-foreground-muted">Tel: {selectedOrderDetails.shippingAddress.phone}</p>
                  <p className="font-mono text-foreground-muted font-bold">Email: {selectedOrderDetails.email}</p>
                </div>
              </div>

              {/* Transaction details */}
              <div className="space-y-3">
                <h4 className="text-[9px] font-mono text-foreground-muted uppercase tracking-widest border-b border-border pb-1.5 font-bold">Transaction Overview</h4>
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Purchase Date:</span>
                    <span className="text-foreground">{new Date(selectedOrderDetails.date).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Shipper Profile:</span>
                    <span className="text-emerald-600 uppercase font-semibold">DHL Express</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Logistics Status:</span>
                    <span className="font-bold uppercase text-accent">{selectedOrderDetails.status}</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-foreground">Grand Total Paid:</span>
                    <span className="text-accent text-sm font-bold">${selectedOrderDetails.total}</span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="md:col-span-2 space-y-3">
                <h4 className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest border-b border-border pb-1.5 font-bold">Acquired Pieces</h4>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-none">
                  {selectedOrderDetails.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2.5 px-3 border border-border bg-background-secondary/25 rounded-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-10 border border-border bg-background overflow-hidden shrink-0 rounded-xs">
                          {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <span className="font-semibold text-foreground block truncate max-w-[280px]">{item.name}</span>
                          <span className="text-[8px] font-mono text-foreground-muted uppercase block mt-0.5">Size {item.selectedSize} / Color {item.selectedColor}</span>
                        </div>
                      </div>
                      <div className="text-right font-mono shrink-0">
                        <span className="text-foreground-muted block text-[9px]">Qty: {item.quantity}</span>
                        <span className="font-bold text-accent">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-4 flex justify-end font-mono text-[9px] uppercase tracking-wider">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="btn-primary px-6 py-2.5 cursor-pointer"
              >
                Close Ledger
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </main>
  );
}
