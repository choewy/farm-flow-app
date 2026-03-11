import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import { FarmSwitcher } from './FarmSwitcher';

import { ROUTES } from '@app/shared/routes';

interface GlobalHeaderProps {
  title?: string;
}

export function GlobalHeader({ title }: GlobalHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isRootPage = ([ROUTES.home, ROUTES.attendance, ROUTES.menu] as string[]).includes(location.pathname);

  const getPageTitle = () => {
    if (title) return title;

    switch (location.pathname) {
      case ROUTES.home:
        return '대시보드';
      case ROUTES.attendance:
        return '출퇴근';
      case ROUTES.menu:
        return '메뉴';
      case ROUTES.farms:
        return '내 농장 목록';
      case ROUTES.attendanceQrCode:
        return '출퇴근 QR 생성';
      case ROUTES.scan:
        return 'QR 스캐너';
      case ROUTES.members:
        return '멤버 관리';
      case ROUTES.roles:
        return '역할 관리';
      case ROUTES.invitation:
        return '멤버 초대';
      case ROUTES.invitationAccept:
        return '초대코드 입력';
      default:
        return 'Farm Flow';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 shadow-premium">
      <div className="mx-auto max-w-md h-16 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {!isRootPage && (
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100/50 active:scale-95 transition">
              <ChevronLeft size={24} className="text-slate-600" />
            </button>
          )}
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center">
          <FarmSwitcher />
        </div>
      </div>
    </header>
  );
}
