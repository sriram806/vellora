'use client';

import React, { useState, useMemo } from 'react';
import { Star, Search, SlidersHorizontal, ThumbsUp, Camera, Video, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Product, Review } from '@/types';
import { useProductStore } from '@/hooks/useProductStore';
import { useToast } from '@/components/UI/ToastProvider';
import AnimatedSection from '../AnimatedSection';

interface ReviewsProps {
  product: Product;
}

export default function Reviews({ product }: ReviewsProps) {
  const { toast } = useToast();

  const reviewsSearch = useProductStore((state) => state.reviewsSearch);
  const setReviewsSearch = useProductStore((state) => state.setReviewsSearch);

  const ratingFilter = useProductStore((state) => state.reviewsRatingFilter);
  const setRatingFilter = useProductStore((state) => state.setReviewsRatingFilter);

  const sortBy = useProductStore((state) => state.reviewsSortBy);
  const setSortBy = useProductStore((state) => state.setReviewsSortBy);

  // Write Review form states
  const [formOpen, setFormOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewPhotos, setNewReviewPhotos] = useState<string[]>([]);
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});

  // Mock list of photo reviews to attach to product.reviews
  const enrichedReviews = useMemo(() => {
    const defaultReviews = product.reviews || [];
    
    // Attach photos/videos to default reviews to make the PDP gorgeous
    return defaultReviews.map((rev, index) => ({
      id: `${product.id}-rev-${index}`,
      name: rev.name,
      rating: rev.rating,
      comment: rev.comment,
      date: rev.date,
      verified: true,
      helpfulVotes: 4 + (index * 7) % 15,
      title: index === 0 ? 'Absolute Luxury Silhouette' : 'Exquisite Materials',
      userPhotos: index === 0 ? [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&auto=format&fit=crop'
      ] : undefined
    }));
  }, [product.reviews, product.id]);

  // Compute rating metrics
  const totalCount = enrichedReviews.length;
  const ratingDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    enrichedReviews.forEach((r) => {
      const rounded = Math.round(r.rating) as keyof typeof dist;
      if (dist[rounded] !== undefined) dist[rounded]++;
    });
    return dist;
  }, [enrichedReviews]);

  // Filtered & Sorted Reviews
  const processedReviews = useMemo(() => {
    let list = [...enrichedReviews];

    // Search query filter
    if (reviewsSearch.trim().length > 0) {
      const q = reviewsSearch.toLowerCase();
      list = list.filter(r => r.comment.toLowerCase().includes(q) || r.name.toLowerCase().includes(q));
    }

    // Star rating filter
    if (ratingFilter !== null) {
      list = list.filter(r => Math.round(r.rating) === ratingFilter);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      if (sortBy === 'helpful') return b.helpfulVotes - a.helpfulVotes;
      return 0;
    });

    return list;
  }, [enrichedReviews, reviewsSearch, ratingFilter, sortBy]);

  // Add Helpful Vote
  const handleVote = (revId: string) => {
    if (votedReviews[revId]) return;
    setVotedReviews(prev => ({ ...prev, [revId]: true }));
    toast({
      type: 'success',
      title: 'Feedback Registered',
      description: 'Thank you for your helpful vote.',
    });
  };

  // Upload Photo mockup
  const handlePhotoUpload = () => {
    // Generate inline mockup image Unsplash URLs
    const mockPhotos = [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&auto=format&fit=crop'
    ];
    setNewReviewPhotos(mockPhotos);
    toast({
      type: 'success',
      title: 'Images Uploaded',
      description: '2 test photos attached successfully.',
    });
  };

  // Submit Review Form
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName || !newReviewComment) {
      toast({
        type: 'error',
        title: 'Form Incomplete',
        description: 'Please write your name and feedback description.',
      });
      return;
    }

    toast({
      type: 'success',
      title: 'Review Submitted',
      description: 'Your testimonial has been registered for creative moderation.',
    });
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewPhotos([]);
    setFormOpen(false);
  };

  return (
    <section className="section-vellora border-t border-border select-none">
      <div className="container-vellora space-y-12">
        
        {/* Title */}
        <div className="max-w-md">
          <span className="ui-text text-[9px] text-accent tracking-[0.25em] font-semibold font-mono">Testimonial Board</span>
          <h3 className="heading-serif text-xl sm:text-2xl font-bold uppercase leading-tight pt-1">
            Customer Feedback
          </h3>
        </div>

        {/* Rating metrics row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border border-border p-6 sm:p-8 bg-background-tertiary/20">
          
          {/* Average block */}
          <div className="md:col-span-4 text-center md:text-left space-y-3">
            <div className="space-y-1">
              <span className="ui-text text-[9px] text-foreground-muted tracking-widest font-mono">OVERALL RATING</span>
              <div className="flex justify-center md:justify-start items-baseline gap-2">
                <span className="heading-display text-4xl sm:text-5xl font-bold text-accent">{product.rating}</span>
                <span className="font-mono text-xs text-foreground-muted">/ 5.0</span>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-start text-accent gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i <= Math.round(product.rating) ? 'fill-accent text-accent' : 'text-zinc-300'}`}
                />
              ))}
            </div>

            <p className="text-[11px] text-foreground-muted font-mono uppercase tracking-wider">
              Based on {totalCount} verified reviews
            </p>

            <button
              onClick={() => setFormOpen(!formOpen)}
              className="btn-primary w-full py-3.5 text-[9px] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5"
              data-cursor="hover"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Write a review</span>
            </button>
          </div>

          {/* Bar Chart distribution */}
          <div className="md:col-span-8 space-y-2.5 font-mono text-[10px] text-foreground-muted select-none w-full">
            {([5, 4, 3, 2, 1] as const).map((star) => {
              const count = ratingDistribution[star] || 0;
              const percent = totalCount > 0 ? (count / totalCount) * 100 : 0;
              return (
                <button
                  key={star}
                  onClick={() => setRatingFilter(ratingFilter === star ? null : star)}
                  className={`flex items-center gap-3 w-full text-left transition-colors py-0.5 px-2.5 border border-transparent hover:border-accent/15 ${
                    ratingFilter === star ? 'bg-accent-light/5 border-accent/20 text-accent font-bold' : ''
                  }`}
                  data-cursor="hover"
                >
                  <span className="w-4 flex items-center shrink-0">{star}★</span>
                  <div className="flex-1 h-2 bg-border-light relative overflow-hidden rounded-xs">
                    <div 
                      style={{ width: `${percent}%` }}
                      className="absolute inset-y-0 left-0 bg-accent transition-all duration-500" 
                    />
                  </div>
                  <span className="w-8 text-right shrink-0">{count} ({Math.round(percent)}%)</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Review form overlay modal */}
        {formOpen && (
          <div className="p-6 border border-accent/30 bg-accent-light/5 rounded-xs space-y-4">
            <h4 className="heading-serif text-sm font-bold uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span>Submit Garment Review</span>
            </h4>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="ui-text text-[8px] text-foreground-muted">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alessandro V."
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 text-xs font-mono outline-hidden focus:border-accent"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="ui-text text-[8px] text-foreground-muted">Rating</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full bg-background border border-border px-3 py-2 text-xs font-mono outline-hidden focus:border-accent"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} Stars</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="ui-text text-[8px] text-foreground-muted">Feedback Comment</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your styling experience, drape shape and craftsmanship details..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2 text-xs font-mono outline-hidden focus:border-accent resize-none"
                />
              </div>

              {/* Upload media UI */}
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  type="button"
                  onClick={handlePhotoUpload}
                  className="px-3 py-2 border border-border hover:border-accent bg-background hover:bg-accent-light/10 text-foreground-secondary hover:text-accent font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  data-cursor="hover"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Mock upload photos</span>
                </button>
                <button
                  type="button"
                  onClick={() => toast({ type: 'success', title: 'Video Uploaded', description: 'Mock video attached.' })}
                  className="px-3 py-2 border border-border hover:border-accent bg-background hover:bg-accent-light/10 text-foreground-secondary hover:text-accent font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  data-cursor="hover"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Mock upload video</span>
                </button>
                
                {newReviewPhotos.length > 0 && (
                  <div className="flex gap-1">
                    {newReviewPhotos.map((p, i) => (
                      <img key={i} src={p} alt="upload preview" className="w-8 h-8 object-cover border border-border" />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="btn-outline py-2.5 px-6 text-[9px]"
                  data-cursor="hover"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2.5 px-8 text-[9px]"
                  data-cursor="hover"
                >
                  Submit moderation
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter / Search header tool */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center border-b border-border pb-4 select-none">
          <div className="flex items-center gap-2 border border-border bg-background px-3 py-2 max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-foreground-muted" />
            <input
              type="text"
              placeholder="Search feedback..."
              value={reviewsSearch}
              onChange={(e) => setReviewsSearch(e.target.value)}
              className="flex-1 text-[11px] font-mono bg-transparent border-none outline-hidden"
            />
          </div>

          <div className="flex gap-3 items-center font-mono text-[9.5px] uppercase tracking-wider text-foreground-muted">
            <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
            <span>SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-none outline-hidden text-foreground font-semibold py-1"
              data-cursor="hover"
            >
              <option value="recent">Recent Entry</option>
              <option value="helpful">Helpful Votes</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {processedReviews.length === 0 ? (
            <div className="text-center py-12 border border-border border-dashed space-y-2">
              <AlertCircle className="w-6 h-6 text-zinc-300 mx-auto" />
              <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold">No reviews matching filters</p>
              <button 
                onClick={() => { setReviewsSearch(''); setRatingFilter(null); }}
                className="text-accent font-mono text-[10px] uppercase tracking-widest underline pt-1"
                data-cursor="hover"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            processedReviews.map((rev) => (
              <AnimatedSection 
                key={rev.id} 
                animation="fade-up" 
                className="p-6 border border-border hover:border-accent/35 hover:shadow-xs transition-all duration-300 bg-background space-y-4"
              >
                {/* Header info */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-sans text-xs font-semibold text-foreground">{rev.name}</h4>
                      {rev.verified && (
                        <span className="flex items-center gap-1 font-mono text-[8px] border border-success/20 text-success bg-success/5 px-2 py-0.2 uppercase font-bold rounded-xs">
                          <Check className="w-2.5 h-2.5" />
                          <span>Verified Purchase</span>
                        </span>
                      )}
                    </div>
                    {rev.title && <h5 className="heading-serif text-sm font-bold uppercase tracking-wide">{rev.title}</h5>}
                    <span className="text-[9px] text-foreground-muted font-mono tracking-wider">{rev.date}</span>
                  </div>

                  <div className="flex text-accent gap-0.2 shrink-0">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i <= Math.round(rev.rating) ? 'fill-accent text-accent' : 'text-zinc-300'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment Text */}
                <p className="body-text text-[11px] sm:text-xs text-foreground-secondary leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Image Attachments */}
                {rev.userPhotos && rev.userPhotos.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-1.5">
                    {rev.userPhotos.map((img, i) => (
                      <div key={i} className="w-20 aspect-product overflow-hidden border border-border hover:border-accent/40 bg-zinc-50 shrink-0">
                        <img src={img} alt={`User review ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer votes feedback */}
                <div className="flex items-center gap-4 pt-3.5 border-t border-border-light select-none font-mono text-[9px] text-foreground-muted uppercase tracking-wider">
                  <span>Was this review helpful?</span>
                  <button
                    disabled={votedReviews[rev.id]}
                    onClick={() => handleVote(rev.id)}
                    className={`flex items-center gap-1.5 border px-2.5 py-1 transition-all ${
                      votedReviews[rev.id] 
                        ? 'border-success/20 bg-success/5 text-success font-bold' 
                        : 'border-border bg-background-tertiary hover:border-accent hover:text-accent'
                    }`}
                    data-cursor="hover"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>HELPFUL ({rev.helpfulVotes + (votedReviews[rev.id] ? 1 : 0)})</span>
                  </button>
                </div>
              </AnimatedSection>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
