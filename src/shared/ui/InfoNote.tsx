import { ReactNode } from 'react';

export type InfoNoteProps = {
  children: ReactNode;
};

export function InfoNote({ children }: InfoNoteProps) {
  return (
    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl mt-auto">
      <p className="text-xs text-slate-500 leading-relaxed font-medium">{children}</p>
    </div>
  );
}
