import { LucideIcon } from 'lucide-react';

export type PageHeaderProps = {
  icon: LucideIcon;
  label: string;
  title: string;
  count?: number;
  actionButton?: {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
  };
  colorToken?: 'primary' | 'accent' | 'warning' | 'danger';
};

export function PageHeader({ icon: Icon, label, title, count, actionButton, colorToken = 'primary' }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl p-5 border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="flex items-center space-x-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${colorToken}/10 text-${colorToken}`}>
          <Icon size={24} />
        </div>
        <div>
          <span className={`text-[10px] font-bold tracking-wider text-${colorToken} uppercase`}>{label}</span>
          <div className="flex items-center space-x-2 mt-0.5">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
            {count !== undefined && <span className="text-sm font-semibold text-slate-400">{count}명</span>}
          </div>
        </div>
      </div>
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all active:scale-95"
          title={actionButton.label}
        >
          <actionButton.icon size={20} />
        </button>
      )}
    </div>
  );
}
