import { generatePath, useNavigate } from 'react-router-dom';
import { AlertTriangle, Calendar, ChevronRight, Clock3, PencilLine } from 'lucide-react';

import { PayrollTargetResponse } from '@app/feature/payroll/api';
import { DateTime, Formatter } from '@app/shared/helpers';
import { ROUTES } from '@app/shared/routes';
import { ListEmpty, ListLoader } from '@app/shared/ui/list';

type PayrollTargetListProps = {
  rows: PayrollTargetResponse[];
  loading: boolean;
  startDate: string;
  endDate: string;
  canReviewPayroll: boolean | undefined;
  canUpdatePayroll: boolean | undefined;
  checkingUserId?: string | null;
  onEditPayroll: (row: PayrollTargetResponse) => void;
  onCheckPayroll: (row: PayrollTargetResponse) => void;
};

export function PayrollTargetList({
  rows,
  loading,
  startDate,
  endDate,
  canReviewPayroll,
  canUpdatePayroll,
  checkingUserId,
  onEditPayroll,
  onCheckPayroll,
}: PayrollTargetListProps) {
  const navigate = useNavigate();

  if (loading) {
    return <ListLoader message="급여 정산 내역을 불러오는 중..." />;
  }

  if (rows.length === 0) {
    return <ListEmpty icon={Calendar} message="지정한 기간의 급여 정산 내역이 없습니다." />;
  }

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row.user.id} className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-black tracking-[-0.02em] text-slate-800">{row.user.name}</h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
                  {row.role?.name ?? '역할 없음'}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-start gap-2">
              <button
                type="button"
                onClick={() => onEditPayroll(row)}
                disabled={!canUpdatePayroll}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary active:scale-95 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-100 disabled:text-slate-300"
                title="급여 정보 수정"
                aria-label={`${row.user.name} 급여 정보 수정`}
              >
                <PencilLine size={18} />
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate(generatePath(ROUTES.payrollsDetail, { userId: row.user.id }), {
                    state: {
                      userName: row.user.name,
                      roleName: row.role?.name ?? null,
                      startDate,
                      endDate,
                    },
                  })
                }
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary active:scale-95"
                title="정산 상세 보기"
                aria-label={`${row.user.name} 정산 상세 보기`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center rounded-full bg-primary/8 px-3 py-1.5 text-[11px] font-bold tracking-wide text-primary">
              <Clock3 size={13} className="mr-1.5" />총 근무 {DateTime.formatTime(row.seconds)}
            </div>
            {row.needCheck && canReviewPayroll && (
              <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-black tracking-wide text-amber-700">
                <AlertTriangle size={13} className="mr-1.5" />
                검토 필요
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/85 px-4 py-3">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">시급</p>
              <p className="mt-1 text-lg font-black tracking-[-0.02em] text-slate-800">{Formatter.toMoney(row.payRatePerHour)}원</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700/70">실 지급액</p>
              <p className="mt-1 text-lg font-black tracking-[-0.02em] text-emerald-800">
                {Formatter.toMoney(row.payRatePerHour * Math.floor(row.seconds / 3600) - row.payDeductionAmount)}원
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">총 지급액</p>
              <p className="mt-1 text-base font-extrabold text-slate-800">
                {Formatter.toMoney(row.payRatePerHour * Math.floor(row.seconds / 3600))}원
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">월 공제액</p>
              <p className="mt-1 text-base font-extrabold text-slate-800">
                {row.payDeductionAmount > 0 ? `-${Formatter.toMoney(row.payDeductionAmount)}` : '0'}원
              </p>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => onCheckPayroll(row)}
              disabled={checkingUserId === row.user.id}
              className="inline-flex items-center rounded-xl bg-primary px-3.5 py-2 text-[11px] font-black text-white shadow-[0_10px_24px_rgba(14,165,233,0.18)] transition-all hover:opacity-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {checkingUserId === row.user.id ? '처리 중...' : '정산처리'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
