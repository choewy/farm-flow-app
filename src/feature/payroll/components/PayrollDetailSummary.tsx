import { BadgeDollarSign, PencilLine } from 'lucide-react';

import { PayrollTargetDetailListResponse } from '@app/feature/payroll/api';
import { DateTime, Formatter } from '@app/shared/helpers';

type PayrollDetailSummaryProps = {
  userId?: string;
  userName?: string;
  roleName?: string | null;
  startDate?: string;
  endDate?: string;
  detail: PayrollTargetDetailListResponse | null;
  totalSeconds: number;
  finalPay: number;
  canUpdatePayroll: boolean | undefined;
  onEditPayroll: () => void;
};

export function PayrollDetailSummary({
  userId,
  userName,
  roleName,
  detail,
  totalSeconds,
  finalPay,
  canUpdatePayroll,
  onEditPayroll,
}: PayrollDetailSummaryProps) {
  return (
    <>
      <section className="rounded-4xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="min-w-0 rounded-3xl border border-slate-100 bg-slate-50/70 px-4 py-4">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">Payroll Detail</span>
            <h1 className="mt-2 truncate text-[1.35rem] font-black tracking-tight text-slate-800">{userName ?? '정산 상세 내역'}</h1>
            <p className="mt-1.5 text-[0.82rem] font-medium leading-relaxed text-slate-500">{roleName ?? '역할 정보 없음'}</p>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <BadgeDollarSign size={17} />
                </div>
                <div>
                  <h2 className="text-[0.78rem] font-black uppercase tracking-[0.2em] text-slate-400">급여 정보</h2>
                  <p className="mt-1 text-[0.78rem] font-medium text-slate-500">현재 정산 기준</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onEditPayroll}
                disabled={!canUpdatePayroll || !userId || !detail}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-100 disabled:text-slate-300"
                title="급여 정보 수정"
                aria-label="급여 정보 수정"
              >
                <PencilLine size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/85 px-3.5 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">시급</p>
                <p className="mt-1 text-[1.05rem] font-black tracking-[-0.02em] text-slate-800">
                  {Formatter.toMoney(detail?.payRatePerHour ?? 0)}원
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/85 px-3.5 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">월 공제액</p>
                <p className="mt-1 text-[1.05rem] font-black tracking-[-0.02em] text-slate-800">
                  {(detail?.payDeductionAmount ?? 0) > 0 ? `-${Formatter.toMoney(detail?.payDeductionAmount ?? 0)}` : '0'}원
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">근무 일수</p>
            <p className="mt-1 text-[1rem] font-black tracking-[-0.02em] text-slate-800">{detail?.rows.length ?? 0}일</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">총 근무 시간</p>
            <p className="mt-1 text-[1rem] font-black tracking-[-0.02em] text-slate-800">{DateTime.formatTime(totalSeconds)}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 px-4 py-4 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700/70">실 지급액</p>
          <p className="mt-1 text-[1.15rem] font-black tracking-[-0.02em] text-emerald-800">{Formatter.toMoney(finalPay)}원</p>
        </div>
      </section>
    </>
  );
}
