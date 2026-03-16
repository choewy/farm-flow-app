import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Calendar, Clock3, Wallet } from 'lucide-react';

import { payrollApi, PayrollListRequestParam, PayrollResponse } from '@app/feature/payroll/api';
import { getErrorCodeMessage } from '@app/shared/api';
import { DateTime, Formatter } from '@app/shared/helpers';
import { Toast } from '@app/shared/toast';
import { ListEmpty, ListLoader } from '@app/shared/ui/list';

export default function PayrollPage() {
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(dayjs().subtract(6, 'day').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [rows, setRows] = useState<PayrollResponse[]>([]);

  const fetchData = useCallback(async () => {
    const params: PayrollListRequestParam = {};

    if (startDate) {
      params.startDate = new Date(startDate);
    }

    if (endDate) {
      params.endDate = new Date(endDate);
    }

    setLoading(true);

    try {
      const { data } = await payrollApi.list(params);
      setRows(data.rows);
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    } finally {
      setLoading(false);
    }
  }, [endDate, startDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderContent = () => {
    if (loading) {
      return <ListLoader message="급여 정산 내역을 불러오는 중..." />;
    }

    if (rows.length === 0) {
      return <ListEmpty icon={Calendar} message="지정한 기간의 급여 정산 내역이 없습니다." />;
    }

    return (
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.user.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-slate-800">{row.user.name}</h3>
                <p className="mt-1 text-xs font-medium text-slate-500">{row.role?.name ?? '역할 없음'}</p>
              </div>
              <div className="flex items-center rounded-full bg-primary/8 px-3 py-1 text-[11px] font-bold tracking-wide text-primary">
                <Clock3 size={13} className="mr-1.5" />
                {DateTime.formatTime(row.seconds)}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/85 px-4 py-3 text-sm">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">시급</span>
                <span className="text-right font-extrabold text-slate-800">{Formatter.toMoney(row.payRatePerHour)}원</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/85 px-4 py-3 text-sm">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">총 지급액</span>
                <span className="text-right font-extrabold text-slate-800">
                  {Formatter.toMoney(row.payRatePerHour * Math.floor(row.seconds / 3600))}원
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/85 px-4 py-3 text-sm">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">월 공제액</span>
                <span className="text-right font-extrabold text-slate-800">
                  {row.payDeductionAmount > 0 ? `-${Formatter.toMoney(row.payDeductionAmount)}` : '0'}원
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/85 px-4 py-3 text-sm">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">실 지급액</span>
                <span className="text-right font-extrabold text-slate-800">
                  {Formatter.toMoney(row.payRatePerHour * Math.floor(row.seconds / 3600) - row.payDeductionAmount)}원
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <section className="rounded-4xl border border-slate-200 bg-white px-5 py-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">Payroll Overview</span>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-800">급여 정산 조회</h1>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">기간별 멤버 급여 정산 기준 정보를 조회합니다.</p>
          </div>
          <div className="hidden rounded-2xl border border-emerald-100 bg-emerald-50/80 p-3 text-emerald-700 sm:flex sm:flex-col sm:items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.18em]">조회 건수</span>
            <span className="mt-1 text-lg font-black">{rows.length}</span>
          </div>
        </div>
      </section>

      <section className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">조회 조건</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">출퇴근 이력 페이지와 같은 방식으로 날짜 범위를 지정합니다.</p>
          </div>
          <div className="hidden rounded-2xl bg-slate-50 px-3 py-2 text-slate-400 sm:block">
            <Wallet size={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col space-y-2">
            <span className="pl-1 text-[11px] font-black uppercase tracking-widest text-slate-400">조회 시작일</span>
            <div className="flex items-center rounded-2xl bg-slate-50/80 px-4 py-3 ring-1 ring-slate-200 transition-all focus-within:ring-2 focus-within:ring-primary">
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="w-full bg-transparent text-[0.92rem] font-bold text-slate-700 outline-none"
              />
            </div>
          </label>

          <label className="flex flex-col space-y-2">
            <span className="pl-1 text-[11px] font-black uppercase tracking-widest text-slate-400">조회 종료일</span>
            <div className="flex items-center rounded-2xl bg-slate-50/80 px-4 py-3 ring-1 ring-slate-200 transition-all focus-within:ring-2 focus-within:ring-primary">
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="w-full bg-transparent text-[0.92rem] font-bold text-slate-700 outline-none"
              />
            </div>
          </label>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">조회 결과</h2>
          <span className="rounded-full bg-slate-200/60 px-2.5 py-1 text-xs font-bold text-slate-500">{rows.length}건</span>
        </div>

        {renderContent()}
      </section>
    </div>
  );
}
