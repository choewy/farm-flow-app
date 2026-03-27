import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { payrollApi, PayrollTargetListRequestParam, PayrollTargetResponse } from '@app/feature/payroll/api';
import { PayrollFilters, PayrollTargetList, PayrollUpdateModal } from '@app/feature/payroll/components';
import { getErrorCodeMessage } from '@app/shared/api';
import { PermissionKey } from '@app/shared/models';
import { useAuthStore } from '@app/shared/stores';
import { Toast } from '@app/shared/toast';

export default function PayrollPage() {
  const role = useAuthStore((state) => state.role);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().endOf('month').format('YYYY-MM-DD'));
  const [rows, setRows] = useState<PayrollTargetResponse[]>([]);
  const [payrollEditTarget, setPayrollEditTarget] = useState<PayrollTargetResponse | null>(null);
  const canReviewPayroll =
    role?.super || role?.permissionKeys.includes(PermissionKey.MemberPayUpdate) || role?.permissionKeys.includes(PermissionKey.RoleUpdate);
  const canUpdatePayroll = role?.super || role?.permissionKeys.includes(PermissionKey.MemberPayUpdate);

  const fetchData = useCallback(async () => {
    const params: PayrollTargetListRequestParam = {};

    if (startDate) {
      params.startDate = new Date(startDate);
    }

    if (endDate) {
      params.endDate = new Date(endDate);
    }

    setLoading(true);

    try {
      const { data } = await payrollApi.targets(params);
      setRows(data.rows);
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    } finally {
      setLoading(false);
    }
  }, [endDate, startDate]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <div className="flex w-full flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PayrollFilters startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} />

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">조회 결과</h2>
          <span className="rounded-full bg-slate-200/60 px-2.5 py-1 text-xs font-bold text-slate-500">{rows.length}건</span>
        </div>

        <PayrollTargetList
          rows={rows}
          loading={loading}
          startDate={startDate}
          endDate={endDate}
          canReviewPayroll={canReviewPayroll}
          canUpdatePayroll={canUpdatePayroll}
          onEditPayroll={setPayrollEditTarget}
        />
      </section>

      {payrollEditTarget && (
        <PayrollUpdateModal
          isOpen={!!payrollEditTarget}
          userId={payrollEditTarget.user.id}
          userName={payrollEditTarget.user.name}
          payRatePerHour={payrollEditTarget.payRatePerHour}
          payDeductionAmount={payrollEditTarget.payDeductionAmount}
          onClose={() => setPayrollEditTarget(null)}
          onSaved={fetchData}
        />
      )}
    </div>
  );
}
