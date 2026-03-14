import { ReactNode } from 'react';

type ListEmptyProps = {
  message: string;
  icon?: ReactNode;
};

export function ListEmpty({ message, icon }: ListEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-10 rounded-[2.5rem] bg-white ring-1 ring-slate-100 shadow-premium text-center space-y-4">
      {icon && (
        <div className="h-16 w-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300">
          {icon}
        </div>
      )}
      <p className="text-slate-400 font-bold text-sm">{message}</p>
    </div>
  );
}
