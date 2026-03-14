import { useEffect, useState } from 'react';
import { Calendar,LogIn, LogOut as LogOutIcon } from 'lucide-react';

import { attendanceApi, AttendanceScannerModal, AttendanceTodayResponse } from '@app/feature/attendance';
import { Attendance } from '@app/shared/models';

function formatSeconds(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceTodayResponse | null>(null);
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerType, setScannerType] = useState<'in' | 'out'>('in');

  const fetchData = async () => {
    try {
      const [todayRes, listRes] = await Promise.all([attendanceApi.today(), attendanceApi.list({})]);
      setAttendance(todayRes.data);
      setAttendanceList(listRes.data.rows);
    } catch (error) {
      console.error('Failed to fetch attendance data', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const openScanner = (type: 'in' | 'out') => {
    setScannerType(type);
    setIsScannerOpen(true);
  };

  return (
    <div className="flex flex-col w-full animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-10">
      {/* Quick Actions (Fixed at Top) */}
      <div className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-md pb-6 pt-2">
        <div className="grid grid-cols-2 gap-4">
          <button
            disabled={!!attendance?.id}
            onClick={() => openScanner('in')}
            className="group relative flex flex-col items-center justify-center space-y-3 rounded-3xl bg-white p-5 shadow-premium ring-1 ring-slate-100 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <LogIn size={24} />
            </div>
            <div className="text-center">
              <span className="text-sm font-bold text-slate-800 block">출근</span>
              {attendance?.checkedInAt && (
                <span className="text-xs text-primary font-bold mt-1 block">
                  {new Date(attendance.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </button>

          <button
            disabled={attendance?.status === 'out'}
            onClick={() => openScanner('out')}
            className="group relative flex flex-col items-center justify-center space-y-3 rounded-3xl bg-white p-5 shadow-premium ring-1 ring-slate-100 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-transform group-hover:scale-110">
              <LogOutIcon size={24} />
            </div>
            <div className="text-center">
              <span className="text-sm font-bold text-slate-800 block">퇴근</span>
              {attendance?.checkedOutAt && (
                <span className="text-xs text-slate-500 font-bold mt-1 block">
                  {new Date(attendance.checkedOutAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Attendance List */}
      <div className="flex flex-col space-y-4 px-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">출근 기록</h3>
          <span className="text-xs font-bold text-slate-400 bg-slate-200/50 px-2 py-1 rounded-full">{attendanceList.length}건</span>
        </div>
        {attendanceList.length > 0 ? (
          <div className="space-y-3">
            {attendanceList.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-3xl p-5 shadow-sm ring-1 ring-slate-100 flex items-center justify-between transition-all hover:shadow-md"
              >
                <div>
                  <div className="text-sm font-bold text-slate-800 mb-2">{record.workDate}</div>
                  <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center text-primary">
                      <LogIn size={13} className="mr-1.5" />{' '}
                      {record.checkedInAt
                        ? new Date(record.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : '-'}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center">
                      <LogOutIcon size={13} className="mr-1.5" />{' '}
                      {record.checkedOutAt
                        ? new Date(record.checkedOutAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : '-'}
                    </span>
                  </div>
                </div>
                <div>
                  {record.status === 'in' ? (
                    <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold">근무 중</span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold">
                      {formatSeconds(record.seconds)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 bg-white rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-3">
              <Calendar size={20} className="text-slate-300" />
            </div>
            <span className="text-sm font-bold text-slate-500">출근 기록이 없습니다</span>
            <span className="text-xs text-slate-400 mt-1">오늘 첫 출근을 기록해보세요.</span>
          </div>
        )}
      </div>

      <AttendanceScannerModal type={scannerType} isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} onSuccess={fetchData} />
    </div>
  );
}
