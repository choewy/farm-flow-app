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
    <header className="fixed left-1/2 top-[max(0.75rem,var(--safe-top))] z-50 w-full max-w-md -translate-x-1/2 px-4">
      <div className="app-panel app-panel-strong overflow-visible flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          {!isRootPage && (
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 text-slate-700 transition hover:bg-white"
            >
              <ChevronLeft size={22} className="stroke-[2.5px]" />
            </button>
          )}
          <div className="min-w-0">
            <p className="app-kicker text-primary/70">{isRootPage ? 'Farm Flow' : 'Workspace'}</p>
            <h1 className="truncate text-[1.02rem] font-black tracking-[-0.03em] text-slate-800">{getPageTitle()}</h1>
          </div>
        </div>

        <div className="flex items-center">
          <FarmSwitcher />
        </div>
      </div>
    </header>
  );
}
