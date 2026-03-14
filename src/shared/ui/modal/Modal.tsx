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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
            <button onClick={onClose} className="p-1.5 -mr-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            {description && <p className="text-sm text-slate-500 font-medium leading-relaxed">{description}</p>}
          </div>
          {children}
        </div>

        {footer && (
          <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider">{footer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
