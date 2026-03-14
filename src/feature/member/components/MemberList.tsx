import { MemberResponse } from '../api';

import { MemberListItem } from './MemberListItem';

import { ListEmpty, ListLoader } from '@app/shared/ui/list';

export type MemberListProps = {
  loading: boolean;
  rows: MemberResponse[];
  openUpdateModal: (row: MemberResponse) => void;
  openDeleteModal: (row: MemberResponse) => void;
};

export function MemberList({ loading, rows, openUpdateModal, openDeleteModal }: MemberListProps) {
  const renderComponent = () => {
    if (loading) {
      return <ListLoader message="멤버 목록을 불러오는 중..." />;
    }

    if (rows.length === 0) {
      return <ListEmpty message="등록된 멤버가 없습니다." />;
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
