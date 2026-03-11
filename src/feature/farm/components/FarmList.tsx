import { useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

import { FarmListItem } from './FarmListItem';

import { Farm } from '@app/shared/models';
import { useFarmStore } from '@app/shared/stores';

export type FarmListProps = {
  openUpdateModal: (farm: Farm) => void;
  openDeleteModal: (farm: Farm) => void;
};

export function FarmList({ openUpdateModal, openDeleteModal }: FarmListProps) {
  const { rows, loading, fetchFarms } = useFarmStore();

  const renderComponent = () => {
    // TODO 스켈레톤
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-300">농장 정보를 불러오는 중...</p>
        </div>
      );
    }

    if (rows.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 px-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-premium text-center">
          <div className="h-20 w-20 rounded-4xl bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
            <ShieldCheck size={40} />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-2">등록된 농장이 없습니다.</h4>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            상단의 버튼을 눌러 관리하실 <br />첫 번째 농장을 만들어 보세요.
          </p>
        </div>
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
