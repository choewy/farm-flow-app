import { RoleListItem } from './RoleListItem';

import { Role } from '@app/shared/models';
import { ListEmpty, ListLoader } from '@app/shared/ui/list';

export type RoleListProps = {
  loading: boolean;
  rows: Role[];
  openDetailModal(row: Role): void;
  openUpdateModal(row: Role): void;
  openDeleteModal(row: Role): void;
};

export function RoleList({ loading, rows, openDetailModal, openUpdateModal, openDeleteModal }: RoleListProps) {
  const renderComponent = () => {
    if (loading) {
      return <ListLoader message="역할 목록을 불러오는 중..." />;
    }

    if (rows.length === 0) {
      return <ListEmpty message="등록된 역할이 없습니다." />;
    }

    return (
      <>
        {rows.map((row) => (
          <RoleListItem
            key={row.id}
            row={row}
            openDetailModal={openDetailModal}
            openUpdateModal={openUpdateModal}
            openDeleteModal={openDeleteModal}
          />
        ))}
      </>
    );
  };

  return <div className="space-y-1">{renderComponent()}</div>;
}
