import { ReactNode } from 'react';

type InfoNoteProps = {
  children: ReactNode;
};

export function InfoNote({ children }: InfoNoteProps) {
  return (
    <div className="p-4 bg-slate-100/50 rounded-3xl">
      <p className="text-[11px] text-slate-400 leading-relaxed">{children}</p>
    </div>
  );
}
