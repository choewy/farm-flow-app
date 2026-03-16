import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import dayjs from 'dayjs';
import { Calendar, LogIn, LogOut as LogOutIcon, X } from 'lucide-react';

import { attendanceApi, AttendanceListRequestParam } from '../api';

import { getErrorCodeMessage } from '@app/shared/api';
import { DateTime } from '@app/shared/helpers';
import { Attendance } from '@app/shared/models';
import { Toast } from '@app/shared/toast';

type AttendanceHistoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AttendanceHistoryModal({ isOpen, onClose }: AttendanceHistoryModalProps) {
  const [startDate, setStartDate] = useState<string>(dayjs().subtract(6, 'day').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [rows, setRows] = useState<Attendance[]>([]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const params: AttendanceListRequestParam = {};

    if (startDate) {
      params.startDate = new Date(startDate);
    }

    if (endDate) {
      params.endDate = new Date(endDate);
    }

    attendanceApi
      .list(params)
      .then(({ data }) => setRows(data.rows))
      .catch((e) => Toast.error(getErrorCodeMessage(e)));
  }, [isOpen, startDate, endDate]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const scrollY = window.scrollY;
    const originalBodyStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.position = originalBodyStyle.position;
      document.body.style.top = originalBodyStyle.top;
      document.body.style.width = originalBodyStyle.width;
      document.body.style.overflow = originalBodyStyle.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[220] flex flex-col bg-slate-50 h-dvh w-full overflow-hidden">
      <div className="bg-white shadow-sm flex-none">
        <div className="px-5 pt-5 pb-5">
          <header className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">출퇴근 이력 조회</h2>
            <button
              className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </button>
          </header>

          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">조회 시작일</label>
                <div className="bg-slate-50/80 rounded-2xl flex items-center px-4 py-3 ring-1 ring-slate-200 focus-within:ring-primary focus-within:ring-2 transition-all">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-transparent text-[0.92rem] font-bold text-slate-700 outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest pl-1">조회 종료일</label>
                <div className="bg-slate-50/80 rounded-2xl flex items-center px-4 py-3 ring-1 ring-slate-200 focus-within:ring-primary focus-within:ring-2 transition-all">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-transparent text-[0.92rem] font-bold text-slate-700 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 pt-5 pb-2 flex-none">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">조회 결과</h3>
        <span className="text-xs font-bold text-slate-500 bg-slate-200/50 px-2.5 py-1 rounded-full">{rows.length}건</span>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-8 space-y-3">
        {rows.length > 0 ? (
          rows.map((row) => (
            <div
              key={row.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-bold text-slate-800 mb-1.5">
                  {row.workDate}({DateTime.formatDay(row.workDate)})
                </div>
                <div className="flex items-center space-x-2.5 text-xs text-slate-500 font-medium">
                  <span className="flex items-center text-primary">
                    <LogIn size={13} className="mr-1" />
                    {row.checkedInAt ? new Date(row.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                  </span>
                  <span className="text-slate-200">|</span>
                  <span className="flex items-center text-warning">
                    <LogOutIcon size={13} className="mr-1" />
                    {row.checkedOutAt ? new Date(row.checkedOutAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                  </span>
                </div>
              </div>
              <div>
                {row.status === 'in' ? (
                  <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[11px] font-bold tracking-wide">근무 중</span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-bold tracking-wide">
                    {DateTime.formatTime(row.seconds)}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-4">
              <Calendar size={24} className="text-slate-300 stroke-1" />
            </div>
            <span className="text-sm font-semibold text-slate-400">지정된 기간의 출근 기록이 없습니다</span>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
