import { PropsWithChildren, ReactElement } from 'react';
import { X } from 'lucide-react';

export type ModalProps = PropsWithChildren & {
  title: string;
  description?: string | ReactElement;
  footer?: string;
  onClose: () => void;
};

export function Modal({ title, description, onClose, footer, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-51 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-premium-lg overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative p-8">
          <div className="flex justify-end items-start">
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{title}</h2>
            {description && <p className="text-sm text-slate-400 mt-2 font-medium">{description}</p>}
          </div>
          {children}
        </div>

        {footer && (
          <div className="bg-slate-50/50 p-4 border-t border-slate-50 text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{footer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
