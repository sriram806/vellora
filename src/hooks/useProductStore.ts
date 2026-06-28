import { create } from 'zustand';

interface ProductState {
  selectedColor: string;
  selectedSize: string;
  selectedFit: string;
  activeImageIndex: number;
  is360Mode: boolean;
  isSizeGuideOpen: boolean;
  isShareModalOpen: boolean;
  pinCode: string;
  pinCodeChecked: boolean;
  estimatedDelivery: string | null;
  reviewsSearch: string;
  reviewsRatingFilter: number | null;
  reviewsSortBy: 'recent' | 'highest' | 'lowest' | 'helpful';
  recentlyViewed: string[];

  // Actions
  setSelectedColor: (color: string) => void;
  setSelectedSize: (size: string) => void;
  setSelectedFit: (fit: string) => void;
  setActiveImageIndex: (index: number) => void;
  setIs360Mode: (is360: boolean) => void;
  setIsSizeGuideOpen: (isOpen: boolean) => void;
  setIsShareModalOpen: (isOpen: boolean) => void;
  setPinCode: (pin: string) => void;
  checkPinCode: (pin: string) => void;
  setReviewsSearch: (query: string) => void;
  setReviewsRatingFilter: (rating: number | null) => void;
  setReviewsSortBy: (sort: 'recent' | 'highest' | 'lowest' | 'helpful') => void;
  addToRecentlyViewed: (productId: string) => void;
  resetPDPState: (defaultColor: string, defaultSize: string, defaultFit: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  selectedColor: '',
  selectedSize: '',
  selectedFit: 'Regular',
  activeImageIndex: 0,
  is360Mode: false,
  isSizeGuideOpen: false,
  isShareModalOpen: false,
  pinCode: '',
  pinCodeChecked: false,
  estimatedDelivery: null,
  reviewsSearch: '',
  reviewsRatingFilter: null,
  reviewsSortBy: 'recent',
  recentlyViewed: [],

  setSelectedColor: (color) => set({ selectedColor: color, activeImageIndex: 0 }),
  setSelectedSize: (size) => set({ selectedSize: size }),
  setSelectedFit: (fit) => set({ selectedFit: fit }),
  setActiveImageIndex: (index) => set({ activeImageIndex: index }),
  setIs360Mode: (is360) => set({ is360Mode: is360 }),
  setIsSizeGuideOpen: (isOpen) => set({ isSizeGuideOpen: isOpen }),
  setIsShareModalOpen: (isOpen) => set({ isShareModalOpen: isOpen }),
  setPinCode: (pin) => set({ pinCode: pin, pinCodeChecked: false, estimatedDelivery: null }),
  checkPinCode: (pin) => {
    if (!pin || pin.trim().length < 5) return;
    
    // Simulate estimated delivery math (e.g. within 2-4 days)
    const options = { weekday: 'long', month: 'short', day: 'numeric' } as const;
    const today = new Date();
    
    // Delivery estimation based on code length/value just to vary the result
    const daysToAdd = 2 + (pin.length % 3);
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + daysToAdd);
    
    set({
      pinCodeChecked: true,
      estimatedDelivery: deliveryDate.toLocaleDateString('en-US', options)
    });
  },
  setReviewsSearch: (query) => set({ reviewsSearch: query }),
  setReviewsRatingFilter: (rating) => set({ reviewsRatingFilter: rating }),
  setReviewsSortBy: (sort) => set({ reviewsSortBy: sort }),
  addToRecentlyViewed: (productId) => {
    const list = get().recentlyViewed;
    const filtered = list.filter(id => id !== productId);
    const updated = [productId, ...filtered].slice(0, 6);
    set({ recentlyViewed: updated });
  },
  resetPDPState: (defaultColor, defaultSize, defaultFit) => set({
    selectedColor: defaultColor,
    selectedSize: defaultSize,
    selectedFit: defaultFit,
    activeImageIndex: 0,
    is360Mode: false,
    isSizeGuideOpen: false,
    isShareModalOpen: false,
    pinCode: '',
    pinCodeChecked: false,
    estimatedDelivery: null,
    reviewsSearch: '',
    reviewsRatingFilter: null,
    reviewsSortBy: 'recent'
  })
}));
