import { useEffect, useState } from 'react';

import { attendanceApi, AttendanceScannerModal, AttendanceTodayResponse } from '@app/feature/attendance';
import { useAuthStore } from '@app/shared/stores';

export function HomePage() {
  const { user } = useAuthStore();
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
    <div className="flex flex-col space-y-5 pb-5 w-full">
      <header className="rounded-b-4xl bg-white p-5 shadow-sm -mx-4 -mt-16 pt-16">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-linear-to-r from-[#4f8b39] to-[#8fcf72] bg-clip-text text-transparent">Farm Flow</h1>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
            <span className="font-semibold text-slate-500">{user?.name?.charAt(0) || '계정'}</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              disabled={!!attendance?.id}
              onClick={() => openScanner('in')}
              className="rounded-2xl bg-[#8fcf72] px-4 py-4 text-base font-semibold text-white shadow-sm transition hover:opacity-95"
            >
              출근하기
            </button>
            <button
              disabled={attendance?.status === 'in'}
              onClick={() => openScanner('out')}
              className="rounded-2xl bg-slate-100 px-4 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              퇴근하기
            </button>
          </div>
        </div>
      </header>

      <AttendanceScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        type={scannerType}
        onSuccess={fetchAttendance}
      />
    </div>
  );
}
