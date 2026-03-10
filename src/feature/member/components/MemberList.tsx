import { MemberResponse } from '../api';

import { MemberListItem } from './MemberListItem';

export type MemberListProps = {
  loading: boolean;
  rows: MemberResponse[];
  openUpdateModal: (row: MemberResponse) => void;
  openDeleteModal: (row: MemberResponse) => void;
};

export function MemberList({ loading, rows, openUpdateModal, openDeleteModal }: MemberListProps) {
  const renderComponent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-slate-400 font-bold">멤버 목록을 불러오는 중...</p>
        </div>
      );
    }

    if (rows.length === 0) {
      return (
        <div className="bg-white rounded-4xl p-12 shadow-premium ring-1 ring-slate-100 text-center">
          <p className="text-slate-400 font-bold">등록된 멤버가 없습니다.</p>
        </div>
      );
    }

    return (
      <>
        {rows.map((row) => (
          <MemberListItem key={row.user.id} row={row} onEdit={openUpdateModal} onDelete={openDeleteModal} />
        ))}
      </>
    );
  };

  return <div className="space-y-4">{renderComponent()}</div>;
}
