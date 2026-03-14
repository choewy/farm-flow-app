import { LucideIcon } from 'lucide-react';

export type ListEmptyProps = {
  icon?: LucideIcon;
  message: string;
};

export function ListEmpty({ icon: Icon, message }: ListEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-100 shadow-sm mt-4">
      {Icon && <Icon size={40} className="text-slate-300 mb-4 stroke-1" />}
      <p className="text-sm font-semibold text-slate-400">{message}</p>
    </div>
  );
}
