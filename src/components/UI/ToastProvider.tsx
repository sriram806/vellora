'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Info, X, XCircle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastInput {
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (input: ToastInput) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const toastStyles: Record<ToastType, string> = {
  success: 'border-accent/40 bg-background text-foreground',
  error: 'border-error/40 bg-background text-foreground',
  info: 'border-border bg-background text-foreground',
};

const iconStyles: Record<ToastType, string> = {
  success: 'border-accent/20 bg-accent-light text-accent',
  error: 'border-error/20 bg-error/10 text-error',
  info: 'border-border bg-background-secondary text-foreground-muted',
};

const icons = {
  success: Check,
  error: XCircle,
  info: Info,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({
      type = 'info',
      title,
      description,
      duration = 3500,
    }: ToastInput) => {
      const id = crypto.randomUUID();

      setToasts((current) => [
        ...current.slice(-3),
        { id, type, title, description },
      ]);

      window.setTimeout(() => dismissToast(id), duration);
    },
    [dismissToast]
  );

  const value = useMemo(
    () => ({ toast, dismissToast }),
    [toast, dismissToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-[var(--page-gutter)] top-28 z-[1000] flex w-[min(380px,calc(100vw-(var(--page-gutter)*2)))] flex-col gap-3">
        <AnimatePresence initial={false}>
          {toasts.map((item) => {
            const Icon = icons[item.type];

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 28, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 28, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`pointer-events-auto border p-4 shadow-[0_20px_50px_rgba(0,0,0,0.14)] backdrop-blur-xl ${toastStyles[item.type]}`}
                role="status"
              >
                <div className="flex gap-3">
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border ${iconStyles[item.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-space text-[11px] font-semibold uppercase tracking-[0.18em]">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="mt-1 text-xs leading-5 text-foreground-secondary">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => dismissToast(item.id)}
                    className="grid h-7 w-7 shrink-0 place-items-center text-foreground-muted transition-colors hover:text-foreground"
                    aria-label="Dismiss notification"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}
