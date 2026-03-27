import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import {
  payrollApi,
  PayrollTargetDetailListRequestParam,
  PayrollTargetDetailListResponse,
  PayrollTargetDetailResponse,
} from '@app/feature/payroll/api';
import { PayrollDetailList, PayrollDetailSummary, PayrollTimeEditModal, PayrollUpdateModal, TimeEditTarget } from '@app/feature/payroll/components';
import { getErrorCodeMessage } from '@app/shared/api';
import { PermissionKey } from '@app/shared/models';
import { useAuthStore } from '@app/shared/stores';
import { Toast } from '@app/shared/toast';
import { Modal, ModalActions } from '@app/shared/ui/modal';

type PayrollDetailLocationState = {
  userName?: string;
  roleName?: string | null;
  startDate?: string;
  endDate?: string;
};

type PayrollEditTarget = {
  userId: string;
  userName: string;
  payRatePerHour: number;
  payDeductionAmount: number;
};

export default function PayrollDetailPage() {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const { userName, roleName, startDate, endDate } = (location.state as PayrollDetailLocationState | null) ?? {};
  const role = useAuthStore((state) => state.role);

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<PayrollTargetDetailListResponse | null>(null);
  const [timeEditTarget, setTimeEditTarget] = useState<TimeEditTarget | null>(null);
  const [payrollEditTarget, setPayrollEditTarget] = useState<PayrollEditTarget | null>(null);
  const [removeTarget, setRemoveTarget] = useState<PayrollTargetDetailResponse | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingRowId, setDeletingRowId] = useState<string | null>(null);
  const canUpdateAttendance = role?.super || role?.permissionKeys.includes(PermissionKey.AttendanceHistoryUpdate);
  const canUpdatePayroll = role?.super || role?.permissionKeys.includes(PermissionKey.MemberPayUpdate);

  const fetchDetail = async () => {
    if (!userId) {
      setLoading(false);
      Toast.error('정산 대상 정보를 확인할 수 없습니다.');
      return;
    }

    setLoading(true);

    try {
      const params: PayrollTargetDetailListRequestParam = {};

      if (startDate) {
        params.startDate = new Date(startDate);
      }

      if (endDate) {
        params.endDate = new Date(endDate);
      }

      const { data } = await payrollApi.targetDetails(userId, params);
      setDetail(data);
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    void (async () => {
      if (!mounted) {
        return;
      }

      await fetchDetail();
    })();

    return () => {
      mounted = false;
    };
  }, [endDate, startDate, userId]);

  const totalSeconds = useMemo(() => detail?.rows.reduce((sum, row) => sum + row.seconds, 0) ?? 0, [detail]);
  const totalPay = useMemo(() => (detail ? detail.payRatePerHour * Math.floor(totalSeconds / 3600) : 0), [detail, totalSeconds]);
  const finalPay = useMemo(() => (detail ? totalPay - detail.payDeductionAmount : 0), [detail, totalPay]);

  const openTimeEditModal = (row: PayrollTargetDetailResponse) => {
    setTimeEditTarget({
      rowId: row.id,
      workDate: row.workDate,
      checkedInTime: row.checkedInAt ? dayjs(row.checkedInAt).format('HH:mm') : '09:00',
      checkedOutTime: row.checkedOutAt ? dayjs(row.checkedOutAt).format('HH:mm') : '18:00',
    });
  };

  const handleTimeSave = async () => {
    if (!timeEditTarget || !userId) {
      return;
    }

    try {
      setIsSaving(true);

      const buildDateTimeFromWorkDate = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);

        return dayjs(timeEditTarget.workDate)
          .hour(hours)
          .minute(minutes)
          .second(0)
          .millisecond(0)
          .format('YYYY-MM-DDTHH:mm:ss');
      };

      await payrollApi.updateAttendance(userId, timeEditTarget.rowId, {
        checkedInAt: buildDateTimeFromWorkDate(timeEditTarget.checkedInTime),
        checkedOutAt: buildDateTimeFromWorkDate(timeEditTarget.checkedOutTime),
      });

      Toast.success('출퇴근 시간이 수정되었습니다.');
      setTimeEditTarget(null);
      await fetchDetail();
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveAttendance = async () => {
    if (!userId || !removeTarget) {
      return;
    }

    try {
      setDeletingRowId(removeTarget.id);
      await payrollApi.removeAttendance(userId, removeTarget.id);
      Toast.success('출퇴근 이력이 삭제되었습니다.');
      setRemoveTarget(null);
      await fetchDetail();
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    } finally {
      setDeletingRowId(null);
    }
  };

  return (
    <div className="flex w-full flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <PayrollDetailSummary
        userId={userId}
        userName={userName}
        roleName={roleName}
        startDate={startDate}
        endDate={endDate}
        detail={detail}
        totalSeconds={totalSeconds}
        finalPay={finalPay}
        canUpdatePayroll={canUpdatePayroll}
        onEditPayroll={() =>
          setPayrollEditTarget({
            userId: userId ?? '',
            userName: userName ?? '멤버',
            payRatePerHour: detail?.payRatePerHour ?? 0,
            payDeductionAmount: detail?.payDeductionAmount ?? 0,
          })
        }
      />

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">상세 목록</h2>
          <span className="rounded-full bg-slate-200/60 px-2.5 py-1 text-xs font-bold text-slate-500">{detail?.rows.length ?? 0}건</span>
        </div>

        <PayrollDetailList
          rows={detail?.rows ?? []}
          loading={loading}
          canUpdateAttendance={canUpdateAttendance}
          deletingRowId={deletingRowId}
          onEditTime={openTimeEditModal}
          onRemove={setRemoveTarget}
        />
      </section>

      <PayrollTimeEditModal
        target={timeEditTarget}
        isSaving={isSaving}
        onClose={() => setTimeEditTarget(null)}
        onSave={() => void handleTimeSave()}
        onChange={setTimeEditTarget}
      />

      {payrollEditTarget && (
        <PayrollUpdateModal
          isOpen={!!payrollEditTarget}
          userId={payrollEditTarget.userId}
          userName={payrollEditTarget.userName}
          payRatePerHour={payrollEditTarget.payRatePerHour}
          payDeductionAmount={payrollEditTarget.payDeductionAmount}
          onClose={() => setPayrollEditTarget(null)}
          onSaved={fetchDetail}
        />
      )}

      {removeTarget && (
        <Modal
          title="출퇴근 이력 삭제"
          description={`${dayjs(removeTarget.workDate).format('YYYY.MM.DD')} 이력을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.`}
          onClose={() => setRemoveTarget(null)}
          mobilePosition="center"
        >
          <ModalActions
            confirmText="삭제"
            cancelText="취소"
            confirmVariant="danger"
            onConfirm={() => void handleRemoveAttendance()}
            onCancel={() => setRemoveTarget(null)}
            isConfirmLoading={deletingRowId === removeTarget.id}
          />
        </Modal>
      )}
    </div>
  );
}
