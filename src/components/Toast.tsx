import { Check } from 'lucide-react';
import { ToastMessage } from '../types.ts';

interface ToastProps {
  toasts: ToastMessage[];
}

export default function Toast({ toasts }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className="bg-black text-white px-4 py-3 rounded-md shadow-2xl flex items-center gap-3 border border-gray-800 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto"
          style={{ maxWidth: 'min(90vw, 380px)' }}
        >
          <Check strokeWidth={2.5} className="text-emerald-400 w-4 h-4 shrink-0" />
          <span
            className="font-jakarta font-medium text-white tracking-wide leading-snug"
            style={{ fontSize: 'var(--body)' }}
          >
            {toast.text}
          </span>
        </div>
      ))}
    </div>
  );
}
