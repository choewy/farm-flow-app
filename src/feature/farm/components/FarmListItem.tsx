import { useNavigate } from 'react-router-dom';
import { Edit3, LogIn, Trash2, UserIcon } from 'lucide-react';

import { FarmListRow } from '../api';

import { authApi } from '@app/feature/auth';
import { getErrorCodeMessage } from '@app/shared/api';
import { Farm } from '@app/shared/models';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';
import { Toast } from '@app/shared/toast';

export type FarmListItemProps = {
  row: FarmListRow;
  openUpdateModal: (farm: Farm) => void;
  openDeleteModal: (farm: Farm) => void;
};

export function FarmListItem({ row, openUpdateModal, openDeleteModal }: FarmListItemProps) {
  const navigate = useNavigate();
  const { farm, setSession } = useAuthStore();

  const isCurrentFarm = row.farm.id === farm?.id;

  const handleCheckInFarm = async (farmId: string) => {
    try {
      const { data } = await authApi.checkIn(farmId);
      setSession(data.user, data.farm, data.role);
      navigate(ROUTES.home);
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl p-5 border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center space-x-4">
          <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20 transition-colors">
            <UserIcon size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-800 tracking-tight truncate">{row.farm.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                {row.role.name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {row.role.super && (
            <button
              onClick={() => openUpdateModal(row.farm)}
              className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors"
              title="농장 이름 수정"
            >
              <Edit3 size={18} />
            </button>
          )}
          {row.role.super && (
            <button
              onClick={() => openDeleteModal(row.farm)}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              title="농장 삭제"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <button
        disabled={isCurrentFarm}
        onClick={() => handleCheckInFarm(row.farm.id)}
        className="w-full py-3.5 bg-slate-50 border border-slate-100 hover:bg-primary hover:border-primary hover:text-white text-slate-600 font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:hover:bg-slate-50 disabled:hover:text-slate-600 disabled:hover:border-slate-100"
      >
        <LogIn size={18} />
        <span className="text-sm">{isCurrentFarm ? '현재 접속된 농장' : '이 농장으로 접속하기'}</span>
      </button>
    </div>
  );
}
