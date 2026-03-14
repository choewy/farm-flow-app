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
      action={
        <button
          onClick={() => navigate(ROUTES.invitation)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
        >
          <UserPlus size={24} />
        </button>
      }
    />
  );
}
