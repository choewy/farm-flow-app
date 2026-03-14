import { useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

import { FarmListItem } from './FarmListItem';

import { Farm } from '@app/shared/models';
import { useFarmStore } from '@app/shared/stores';
import { ListEmpty, ListLoader } from '@app/shared/ui/list';

export type FarmListProps = {
  openUpdateModal: (farm: Farm) => void;
  openDeleteModal: (farm: Farm) => void;
};

export function FarmList({ openUpdateModal, openDeleteModal }: FarmListProps) {
  const { rows, loading, fetchFarms } = useFarmStore();

  const renderComponent = () => {
    if (loading) {
      return <ListLoader message="농장 정보를 불러오는 중..." />;
    }

    if (rows.length === 0) {
      return (
        <ListEmpty
          message="상단의 버튼을 눌러 관리하실 첫 번째 농장을 만들어 보세요."
          icon={<ShieldCheck size={40} />}
        />
      );
    }
    return (
      <div className="grid grid-cols-1 gap-4">
        {rows.map((row) => (
          <FarmListItem key={row.farm.id} row={row} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal} />
        ))}
      </div>
    );
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  return <section className="space-y-4 px-1">{renderComponent()}</section>;
}
