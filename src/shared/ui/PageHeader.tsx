import { ComponentType, ReactNode } from 'react';
import { LucideProps } from 'lucide-react';

type PageHeaderProps = {
  icon: ComponentType<LucideProps>;
  iconClassName?: string;
  label: string;
  title: string;
  action?: ReactNode;
};

export function PageHeader({ icon: Icon, iconClassName = 'bg-primary/10 text-primary', label, title, action }: PageHeaderProps) {
  return (
    <div className="bg-white rounded-4xl p-6 shadow-premium ring-1 ring-slate-100 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClassName}`}>
          <Icon size={24} />
        </div>
        <div>
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{label}</h2>
          <p className="text-lg font-bold text-slate-800">{title}</p>
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
