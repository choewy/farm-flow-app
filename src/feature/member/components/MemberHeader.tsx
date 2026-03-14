import { useNavigate } from 'react-router-dom';
import { UserPlus, Users } from 'lucide-react';

import { ROUTES } from '@app/shared/routes';
import { PageHeader } from '@app/shared/ui/PageHeader';

export type MemberHeaderProps = {
  total: number;
};

export function MemberHeader({ total }: MemberHeaderProps) {
  const navigate = useNavigate();

  return (
    <PageHeader
      icon={Users}
      label="멤버 관리"
      title={`총 ${total}명의 멤버`}
      actionButton={{
        icon: UserPlus,
        label: '초대하기',
        onClick: () => navigate(ROUTES.invitation),
      }}
    />
  );
}
