import { useEffect, useState } from 'react';
import { List as ListIcon, LogIn, LogOut as LogOutIcon, QrCode } from 'lucide-react';

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
    <div className="app-page animate-in fade-in slide-in-from-bottom-4 duration-300 relative">
      <section className="app-panel px-5 py-5">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="app-kicker text-primary/70">Attendance Flow</p>
            <h2 className="mt-2 text-[1.45rem] font-black tracking-[-0.04em] text-slate-800">오늘의 출퇴근 상태를 빠르게 처리하세요</h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
              QR 스캔으로 출근과 퇴근을 기록하고, 이력 카드에서 전체 기록을 확인할 수 있습니다.
            </p>
          </div>
          <div className="rounded-[1.45rem] bg-primary/10 p-3 text-primary">
            <QrCode size={24} />
          </div>
        </div>

        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          <span className={`app-chip ${attendance?.checkedInAt ? 'app-chip-primary' : ''}`}>
            출근 {attendance?.checkedInAt ? '완료' : '대기'}
          </span>
          <span className={`app-chip ${attendance?.checkedOutAt ? 'app-chip-warning' : ''}`}>
            퇴근 {attendance?.checkedOutAt ? '완료' : '대기'}
          </span>
        </div>
      </section>

      <button
        className="app-card group relative flex items-center space-x-4 p-5 text-left transition-all duration-200 hover:-translate-y-0.5"
        onClick={() => setIsHistoryOpen(true)}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] bg-slate-100 text-slate-600 transition-colors group-hover:bg-slate-200">
          <ListIcon size={24} />
        </div>
        <div className="text-left flex-1">
          <span className="block text-base font-black tracking-[-0.02em] text-slate-800">이력 조회</span>
          <span className="mt-0.5 block text-xs font-medium text-slate-500">출퇴근 전체 이력을 확인합니다</span>
        </div>
        <span className="app-kicker text-slate-400">History</span>
      </button>

      <button
        className="app-card group relative flex items-center space-x-4 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50"
        onClick={() => openScanner('in')}
        disabled={!!attendance?.id}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] bg-primary/10 text-primary transition-colors">
          <LogIn size={24} />
        </div>
        <div className="text-left flex-1">
          <span className="block text-base font-black tracking-[-0.02em] text-slate-800">출근하기</span>
          {attendance?.checkedInAt && (
            <span className="mt-0.5 block text-xs font-bold text-primary">
              출근 완료: {new Date(attendance.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          {!attendance?.checkedInAt && <span className="mt-0.5 block text-xs font-medium text-slate-500">QR 스캐너를 열어 출근을 등록합니다</span>}
        </div>
        {attendance?.id && attendance.status === 'in' && (
          <div className="absolute right-6 top-5 h-2.5 w-2.5 rounded-full bg-primary shadow-sm animate-pulse" />
        )}
      </button>

      <button
        disabled={attendance?.status === 'out'}
        onClick={() => openScanner('out')}
        className="app-card group relative flex items-center space-x-4 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] bg-warning/10 text-warning transition-colors">
          <LogOutIcon size={24} />
        </div>
        <div className="text-left flex-1">
          <span className="block text-base font-black tracking-[-0.02em] text-slate-800">퇴근하기</span>
          {attendance?.checkedOutAt && (
            <span className="mt-0.5 block text-xs font-bold text-warning">
              퇴근 완료: {new Date(attendance.checkedOutAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          {!attendance?.checkedOutAt && <span className="mt-0.5 block text-xs font-medium text-slate-500">퇴근 전에도 동일하게 QR 인증이 필요합니다</span>}
        </div>
      </button>

      <div className="app-note mt-auto">
        <p className="text-xs font-medium leading-relaxed text-slate-500">
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
