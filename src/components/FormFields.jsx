import React, { forwardRef } from 'react';
import { RefreshCw, AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export const Input = React.memo(forwardRef(({ label, error, className, ...props }, ref) => (
  <div className={cn("space-y-1.5", className)}>
    {label && <label className="text-[11px] uppercase font-bold text-slate-500 px-1 tracking-wider">{label}</label>}
    <input
      ref={ref}
      className={cn(
        "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-300 transition-all",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
        error ? "border-red-500 bg-red-50/10" : "hover:border-slate-300"
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-500 px-1">{error}</p>}
  </div>
)));

export const TextArea = React.memo(forwardRef(({ label, error, className, ...props }, ref) => (
  <div className={cn("space-y-1.5", className)}>
    {label && <label className="text-[11px] uppercase font-bold text-slate-500 px-1 tracking-wider">{label}</label>}
    <textarea
      ref={ref}
      className={cn(
        "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-300 transition-all min-h-[120px]",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
        error ? "border-red-500 bg-red-50/10" : "hover:border-slate-300"
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-500 px-1">{error}</p>}
  </div>
)));

export const Button = React.memo(({ children, variant = 'primary', size = 'md', className, ...props }) => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 shadow-slate-200",
    outline: "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base font-bold"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-sm",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export const AlertModal = React.memo(({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-4 px-2">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
          <p className="text-slate-600 leading-relaxed mb-6">{message}</p>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              {cancelText}
            </Button>
            <Button variant="danger" className="flex-1 bg-red-600 text-white hover:bg-red-700" onClick={() => {
              onConfirm();
              onClose();
            }}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export const Spinner = React.memo(({ className, size = 24 }) => (
  <div className={cn("flex items-center justify-center p-4", className)}>
    <Loader2 size={size} className="text-blue-600 animate-spin" />
  </div>
));
