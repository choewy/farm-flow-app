import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function AttendanceRedirectPage() {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  useEffect(() => {
    const isAdmin = role?.super || role?.permissions.includes('admin');
    
    if (isAdmin) {
      navigate(ROUTES.attendanceQrCode, { replace: true });
    } else {
      navigate(ROUTES.scan, { replace: true });
    }
  }, [role, navigate]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-pulse text-slate-400 font-medium">이동 중...</div>
    </div>
  );
}
