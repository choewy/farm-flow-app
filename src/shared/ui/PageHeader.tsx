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
  const colorStyles = {
    primary: {
      badge: 'bg-primary/12 text-primary',
      label: 'text-primary/75',
      count: 'text-primary/70',
      action: 'bg-primary/10 text-primary hover:bg-primary/15',
    },
    accent: {
      badge: 'bg-accent/12 text-accent',
      label: 'text-accent/75',
      count: 'text-accent/70',
      action: 'bg-accent/10 text-accent hover:bg-accent/15',
    },
    warning: {
      badge: 'bg-warning/12 text-warning',
      label: 'text-warning/80',
      count: 'text-warning/70',
      action: 'bg-warning/10 text-warning hover:bg-warning/15',
    },
    danger: {
      badge: 'bg-danger/12 text-danger',
      label: 'text-danger/75',
      count: 'text-danger/70',
      action: 'bg-danger/10 text-danger hover:bg-danger/15',
    },
  }[colorToken];

  return (
    <div className="app-panel mb-2 flex items-center justify-between gap-4 px-5 py-5">
      <div className="flex min-w-0 items-center space-x-4">
        <div className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-[1.35rem] ${colorStyles.badge}`}>
          <Icon size={24} />
        </div>
        <div className="min-w-0">
          <span className={`app-kicker ${colorStyles.label}`}>{label}</span>
          <div className="mt-1 flex items-center space-x-2">
            <h2 className="truncate text-xl font-black tracking-[-0.03em] text-slate-800">{title}</h2>
            {count !== undefined && <span className={`shrink-0 text-sm font-bold ${colorStyles.count}`}>{count}명</span>}
          </div>
        </div>
      </div>
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all active:scale-95 ${colorStyles.action}`}
          title={actionButton.label}
        >
          <actionButton.icon size={20} />
        </button>
      )}
    </div>
  );
}
