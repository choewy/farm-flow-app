import { useNavigate } from 'react-router-dom';
import { Edit3, LogIn, Trash2, UserIcon } from 'lucide-react';

import { FarmListRow } from '../api';

import { authApi } from '@app/feature/auth';
import { getErrorCodeMessage } from '@app/shared/api';
import { Farm, PermissionKey } from '@app/shared/models';
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

  const permissionKeys = row.role.permissionKeys ?? [];
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
    <div className="group relative bg-white rounded-[2.5rem] p-6 shadow-premium ring-1 ring-slate-100 transition-all hover:ring-primary/20 hover:shadow-premium-lg">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
            <UserIcon size={32} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-black text-slate-800 tracking-tight truncate">{row.farm.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-100 text-blue-600`}>
                {row.role.name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {permissionKeys.includes(PermissionKey.Update) && (
            <button
              onClick={() => openUpdateModal(row.farm)}
              className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-primary transition-all active:scale-95"
              title="농장 이름 수정"
            >
              <Edit3 size={18} />
            </button>
          )}
          {permissionKeys.includes(PermissionKey.Delete) && (
            <button
              onClick={() => openDeleteModal(row.farm)}
              className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all active:scale-95"
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
        className="w-full py-4 bg-slate-50 hover:bg-primary hover:text-white text-slate-600 font-black rounded-3xl transition-all flex items-center justify-center space-x-2 group-active:scale-[0.98]"
      >
        <LogIn size={18} />
        <span>{isCurrentFarm ? '현재 접속된 농장' : '이 농장으로 접속하기'}</span>
      </button>
    </div>
  );
}
