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
      colorToken="accent"
      label="역할 관리"
      title={`총 ${total}개의 역할`}
      actionButton={{
        icon: Plus,
        label: '추가하기',
        onClick: openCreateModal,
      }}
    />
  );
}
