import { useEffect, useState } from 'react';
import { List as ListIcon, LogIn, LogOut as LogOutIcon } from 'lucide-react';

import { attendanceApi, AttendanceHistoryModal, AttendanceScannerModal, AttendanceTodayResponse } from '@app/feature/attendance';
import { getErrorCodeMessage } from '@app/shared/api';
import { Toast } from '@app/shared/toast';

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceTodayResponse | null>(null);

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerType, setScannerType] = useState<'in' | 'out'>('in');

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    attendanceApi
      .today()
      .then(({ data }) => setAttendance(data))
      .catch((e) => Toast.error(getErrorCodeMessage(e)));
  }, []);

  const onScannerSuccess = () => {
    attendanceApi
      .today()
      .then(({ data }) => setAttendance(data))
      .catch((e) => Toast.error(getErrorCodeMessage(e)));
  };

  const openScanner = (type: 'in' | 'out') => {
    setScannerType(type);
    setIsScannerOpen(true);
  };

  return (
    <div className="flex flex-col space-y-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
      <button
        className="group relative flex items-center space-x-4 rounded-2xl bg-white p-5 border border-slate-200 shadow-sm transition-all duration-200 active:bg-slate-50"
        onClick={() => setIsHistoryOpen(true)}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-slate-200 transition-colors">
          <ListIcon size={24} />
        </div>
        <div className="text-left flex-1">
          <span className="text-base font-bold text-slate-800 block">이력 조회</span>
          <span className="text-xs text-slate-500 font-medium mt-0.5 block">출퇴근 전체 이력을 확인합니다</span>
        </div>
      </button>

      <button
        className="group relative flex items-center space-x-4 rounded-2xl bg-white p-5 border border-slate-200 shadow-sm transition-all duration-200 active:bg-slate-50 disabled:opacity-50 disabled:bg-slate-50"
        onClick={() => openScanner('in')}
        disabled={!!attendance?.id}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors">
          <LogIn size={24} />
        </div>
        <div className="text-left flex-1">
          <span className="text-base font-bold text-slate-800 block">출근하기</span>
          {attendance?.checkedInAt && (
            <span className="text-xs text-primary font-bold mt-0.5 block">
              출근 완료: {new Date(attendance.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
        {attendance?.id && attendance.status === 'in' && (
          <div className="absolute top-5 right-6 h-2 w-2 rounded-full bg-primary shadow-sm animate-pulse" />
        )}
      </button>

      <button
        disabled={attendance?.status === 'out'}
        onClick={() => openScanner('out')}
        className="group relative flex items-center space-x-4 rounded-2xl bg-white p-5 border border-slate-200 shadow-sm transition-all duration-200 active:bg-slate-50 disabled:opacity-50 disabled:bg-slate-50"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning transition-colors">
          <LogOutIcon size={24} />
        </div>
        <div className="text-left flex-1">
          <span className="text-base font-bold text-slate-800 block">퇴근하기</span>
          {attendance?.checkedOutAt && (
            <span className="text-xs text-warning font-bold mt-0.5 block">
              퇴근 완료: {new Date(attendance.checkedOutAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </button>

      <div className="p-4 bg-slate-50/80 border border-slate-100 rounded-xl mt-auto">
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
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
