import { PropsWithChildren, ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export type ModalProps = PropsWithChildren & {
  title: string;
  description?: string | ReactElement;
  footer?: string;
  onClose: () => void;
};

export function Modal({ title, description, onClose, footer, children }: ModalProps) {
  useEffect(() => {
    const scrollY = window.scrollY;
    const originalBodyStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.position = originalBodyStyle.position;
      document.body.style.top = originalBodyStyle.top;
      document.body.style.width = originalBodyStyle.width;
      document.body.style.overflow = originalBodyStyle.overflow;
      window.scrollTo(0, scrollY);
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[200] overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="flex min-h-full items-end justify-center p-3 pt-[max(0.75rem,var(--safe-top))] pb-[max(0.75rem,var(--safe-bottom))] sm:items-center sm:p-4"
      >
        <div
          className="relative flex w-full max-w-sm max-h-[calc(100dvh-max(1rem,var(--safe-top))-max(1rem,var(--safe-bottom)))] flex-col overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-xl animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 overflow-y-auto overscroll-contain p-6">
            <div className="flex items-center justify-between mb-4">
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
    </div>,
    document.body,
  );
}
