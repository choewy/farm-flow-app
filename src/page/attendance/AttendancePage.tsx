import { useEffect, useState } from 'react';
import { LogIn, LogOut as LogOutIcon } from 'lucide-react';

import { attendanceApi, AttendanceScannerModal, AttendanceTodayResponse } from '@app/feature/attendance';

export function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceTodayResponse | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerType, setScannerType] = useState<'in' | 'out'>('in');

  const fetchAttendance = async () => {
    try {
      const { data } = await attendanceApi.today();
      setAttendance(data);
    } catch (error) {
      console.error('Failed to fetch attendance', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAttendance();
  }, []);

  const openScanner = (type: 'in' | 'out') => {
    setScannerType(type);
    setIsScannerOpen(true);
  };

  return (
    <div className="flex flex-col space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Info */}
      <div className="bg-white rounded-4xl p-6 shadow-premium ring-1 ring-slate-100">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">현재 상태</h2>
        {attendance?.id ? (
          <div className="flex items-center space-x-3 text-primary">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {attendance.status === 'in' ? (
              <span className="font-bold">
                근무 중(출근 시간: {new Date(attendance.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
              </span>
            ) : (
              <>
                <span className="font-bold">
                  퇴근
                  <br />
                  출근 시간: {new Date(attendance.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  <br />
                  퇴근 시간: {new Date(attendance.checkedOutAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-3 text-slate-400">
            <div className="h-2 w-2 rounded-full bg-slate-200" />
            <span className="font-bold">미출근 상태입니다</span>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4">
        <button
          disabled={!!attendance?.id}
          onClick={() => openScanner('in')}
          className="group relative flex items-center space-x-5 rounded-[2.5rem] bg-white p-6 shadow-premium ring-1 ring-slate-100 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-4xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
            <LogIn size={32} />
          </div>
          <div className="text-left">
            <span className="text-lg font-bold text-slate-800 block">출근하기</span>
            <p className="text-sm text-slate-400">QR 코드를 스캔하여 일과를 시작하세요</p>
          </div>
          {attendance?.id && (
            <div className="absolute top-6 right-8 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(143,207,114,0.6)]" />
          )}
        </button>

        <button
          disabled={attendance?.status === 'in' ? false : !attendance?.id}
          onClick={() => openScanner('out')}
          className="group relative flex items-center space-x-5 rounded-[2.5rem] bg-white p-6 shadow-premium ring-1 ring-slate-100 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-4xl bg-slate-50 text-slate-400 transition-transform group-hover:scale-110">
            <LogOutIcon size={32} />
          </div>
          <div className="text-left">
            <span className="text-lg font-bold text-slate-800 block">퇴근하기</span>
            <p className="text-sm text-slate-400">일과를 마무리하고 퇴근 처리합니다</p>
          </div>
        </button>
      </div>

      <div className="p-4 bg-slate-100/50 rounded-3xl">
        <p className="text-[11px] text-slate-400 leading-relaxed">
          * 출퇴근은 관리자 페이지의 QR 코드를 인식해야 처리가 가능합니다. <br />* 문제 발생 시 관리자에게 문의해 주세요.
        </p>
      </div>

      <AttendanceScannerModal
        type={scannerType}
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onSuccess={fetchAttendance}
      />
    </div>
  );
}
