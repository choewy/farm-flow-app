type PayrollFiltersProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

export function PayrollFilters({ startDate, endDate, onStartDateChange, onEndDateChange }: PayrollFiltersProps) {
  return (
    <section className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col space-y-2">
          <span className="pl-1 text-[11px] font-black uppercase tracking-widest text-slate-400">조회 시작일</span>
          <div className="flex items-center rounded-2xl bg-slate-50/80 px-4 py-3 ring-1 ring-slate-200 transition-all focus-within:ring-2 focus-within:ring-primary">
            <input
              type="date"
              value={startDate}
              onChange={(event) => onStartDateChange(event.target.value)}
              className="w-full bg-transparent text-[0.84rem] font-semibold text-slate-700 outline-none"
            />
          </div>
        </label>

        <label className="flex flex-col space-y-2">
          <span className="pl-1 text-[11px] font-black uppercase tracking-widest text-slate-400">조회 종료일</span>
          <div className="flex items-center rounded-2xl bg-slate-50/80 px-4 py-3 ring-1 ring-slate-200 transition-all focus-within:ring-2 focus-within:ring-primary">
            <input
              type="date"
              value={endDate}
              onChange={(event) => onEndDateChange(event.target.value)}
              className="w-full bg-transparent text-[0.84rem] font-semibold text-slate-700 outline-none"
            />
          </div>
        </label>
      </div>
    </section>
  );
}
