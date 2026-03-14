import { useEffect, useState } from 'react';
import { List as ListIcon, LogIn, LogOut as LogOutIcon } from 'lucide-react';

import { attendanceApi, AttendanceHistoryModal, AttendanceScannerModal, AttendanceTodayResponse } from '@app/feature/attendance';

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceTodayResponse | null>(null);

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerType, setScannerType] = useState<'in' | 'out'>('in');

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const fetchToday = async () => {
    try {
      const { data } = await attendanceApi.today();
      setAttendance(data);
    } catch (error) {
      console.error('Failed to fetch attendance today', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchToday();
  }, []);

  const onScannerSuccess = () => {
    fetchToday();
  };

  const openScanner = (type: 'in' | 'out') => {
    setScannerType(type);
    setIsScannerOpen(true);
  };

  return (
    <div className="flex flex-col space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <button
        onClick={() => setIsHistoryOpen(true)}
        className="group relative flex items-center space-x-5 rounded-[2.5rem] bg-slate-800 p-6 shadow-premium ring-1 ring-slate-700 transition-all duration-300 active:scale-[0.98]"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-4xl bg-white/10 text-white transition-transform group-hover:scale-110">
          <ListIcon size={32} />
        </div>
        <div className="text-left flex-1">
          <span className="text-lg font-bold text-white block">이력 조회</span>
          <span className="text-xs text-slate-400 font-bold mt-1 block">출퇴근 전체 이력을 확인합니다</span>
        </div>
      </button>

      <button
        disabled={!!attendance?.id}
        onClick={() => openScanner('in')}
        className="group relative flex items-center space-x-5 rounded-[2.5rem] bg-white p-6 shadow-premium ring-1 ring-slate-100 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-4xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
          <LogIn size={32} />
        </div>
        <div className="text-left flex-1">
          <span className="text-lg font-bold text-slate-800 block">출근</span>
          {attendance?.checkedInAt && (
            <span className="text-xs text-primary font-bold mt-1 block">
              출근 시간: {new Date(attendance.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
        {attendance?.id && attendance.status === 'in' && (
          <div className="absolute top-6 right-8 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(143,207,114,0.6)] animate-pulse" />
        )}
      </button>

      <button
        disabled={attendance?.status === 'out'}
        onClick={() => openScanner('out')}
        className="group relative flex items-center space-x-5 rounded-[2.5rem] bg-white p-6 shadow-premium ring-1 ring-slate-100 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-4xl bg-orange-50 text-orange-400 transition-transform group-hover:scale-110">
          <LogOutIcon size={32} />
        </div>
        <div className="text-left flex-1">
          <span className="text-lg font-bold text-slate-800 block">퇴근</span>
          {attendance?.checkedOutAt && (
            <span className="text-xs text-orange-500 font-bold mt-1 block">
              퇴근 시간: {new Date(attendance.checkedOutAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </button>

      <div className="p-4 bg-slate-100/50 rounded-3xl mt-auto">
        <p className="text-[11px] text-slate-400 leading-relaxed">
          * 출퇴근 시 QR 코드를 스캔해야 합니다. <br />* 문제 발생 시 관리자에게 문의해 주세요.
        </p>
      </div>

      <AttendanceScannerModal
        type={scannerType}
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onSuccess={onScannerSuccess}
      />

      <AttendanceHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </div>
  );
}
