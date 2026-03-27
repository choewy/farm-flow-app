import { Calendar } from 'lucide-react';

import { PayrollDetailListCard } from './PayrollDetailListCard';

import { PayrollTargetDetailResponse } from '@app/feature/payroll/api';
import { ListEmpty, ListLoader } from '@app/shared/ui/list';

export type TimeEditTarget = {
  rowId: string;
  workDate: string;
  checkedInTime: string;
  checkedOutTime: string;
};

type PayrollDetailListProps = {
  rows: PayrollTargetDetailResponse[];
  loading: boolean;
  canUpdateAttendance: boolean | undefined;
  deletingRowId?: string | null;
  onEditTime: (row: PayrollTargetDetailResponse) => void;
  onRemove: (row: PayrollTargetDetailResponse) => void;
};

export function PayrollDetailList({ rows, loading, canUpdateAttendance, deletingRowId, onEditTime, onRemove }: PayrollDetailListProps) {
  if (loading) {
    return <ListLoader message="정산 상세 내역을 불러오는 중..." />;
  }

  if (rows.length === 0) {
    return <ListEmpty icon={Calendar} message="표시할 정산 상세 내역이 없습니다." />;
  }

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <PayrollDetailListCard
          key={row.id}
          row={row}
          canUpdateAttendance={canUpdateAttendance}
          deletingRowId={deletingRowId}
          onEditTime={onEditTime}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
