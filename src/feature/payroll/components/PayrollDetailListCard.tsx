import dayjs from 'dayjs';
import { PencilLine, Trash2 } from 'lucide-react';

import { PayrollTargetDetailResponse } from '@app/feature/payroll/api';
import { DateTime } from '@app/shared/helpers';

type PayrollDetailListCardProps = {
  row: PayrollTargetDetailResponse;
  canUpdateAttendance: boolean | undefined;
  deletingRowId?: string | null;
  onEditTime: (row: PayrollTargetDetailResponse) => void;
  onRemove: (row: PayrollTargetDetailResponse) => void;
};

const STATUS_STYLE = {
  payrolled: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  payable: 'bg-sky-50 text-sky-700 border border-sky-200',
  needsCheck: 'bg-amber-50 text-amber-700 border border-amber-200',
} as const;

function getStatusMeta(row: PayrollTargetDetailResponse) {
  if (row.payrolled) {
    return { label: '정산완료', className: STATUS_STYLE.payrolled };
  }

  if (row.status === 'out') {
    return { label: '정산필요', className: STATUS_STYLE.payable };
  }

  return { label: '확인필요', className: STATUS_STYLE.needsCheck };
}

export function PayrollDetailListCard({ row, canUpdateAttendance, deletingRowId, onEditTime, onRemove }: PayrollDetailListCardProps) {
  return (
    <article className="rounded-[1.45rem] border border-slate-200 bg-white px-3.5 py-3 shadow-sm">
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <p className="text-[0.88rem] font-black tracking-[-0.02em] text-slate-800">
              {dayjs(row.workDate).format('M월 D일')} ({DateTime.formatDay(row.workDate)})
            </p>
            <button
              type="button"
              onClick={() => onEditTime(row)}
              disabled={row.payrolled || !canUpdateAttendance}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-100 disabled:text-slate-300"
              aria-label="시간 수정"
              title="시간 수정"
            >
              <PencilLine size={13} className="shrink-0" />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide ${getStatusMeta(row).className}`}>{getStatusMeta(row).label}</div>
            <div className="rounded-full bg-primary/8 px-2.5 py-1 text-[10px] font-bold tracking-wide text-primary">
              총 {DateTime.formatTime(row.seconds)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] items-stretch gap-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/85 px-3 py-2.5">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">출근</p>
            <p className="mt-0.5 text-[0.88rem] font-black tracking-[-0.02em] text-slate-800">
              {row.checkedInAt ? dayjs(row.checkedInAt).format('HH:mm') : '-'}
            </p>
          </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50/85 px-3 py-2.5">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">퇴근</p>
              <p className="mt-0.5 text-[0.88rem] font-black tracking-[-0.02em] text-slate-800">
                {row.checkedOutAt ? dayjs(row.checkedOutAt).format('HH:mm') : '-'}
              </p>
            </div>
          <button
            type="button"
            onClick={() => onRemove(row)}
            disabled={row.payrolled || deletingRowId === row.id}
            className="inline-flex h-full min-h-[4rem] items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-2 text-rose-600 transition-all hover:bg-rose-100 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-100 disabled:text-slate-300"
            aria-label="이력 삭제"
            title="이력 삭제"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
