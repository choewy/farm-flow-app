import { Plus, Shield } from 'lucide-react';

import { PageHeader } from '@app/shared/ui/PageHeader';

export type RoleHeaderProps = {
  total: number;
  openCreateModal: () => void;
};

export function RoleHeader({ total, openCreateModal }: RoleHeaderProps) {
  return (
    <PageHeader
      icon={Shield}
      iconClassName="bg-accent-light text-accent"
      label="역할 관리"
      title={`총 ${total}개의 역할`}
      action={
        <button
          onClick={openCreateModal}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
        >
          <Plus size={24} />
        </button>
      }
    />
  );
}
