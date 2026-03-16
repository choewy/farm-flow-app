import { useNavigate } from 'react-router-dom';
import { Edit3, LogIn, Trash2, UserIcon } from 'lucide-react';

import { FarmListRow } from '../api';

import { authApi } from '@app/feature/auth';
import { getErrorCodeMessage } from '@app/shared/api';
import { Formatter } from '@app/shared/helpers';
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
    <div className="group relative rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-slate-400 transition-colors group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary">
            <UserIcon size={24} />
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
        {row.role.super && (
          <div className="flex items-center">
            <button
              onClick={() => openUpdateModal(row.farm)}
              className="p-2 rounded-xl text-slate-400 hover:text-primary hover:bg-slate-50 transition-colors"
              title="농장 정보 수정"
            >
              <Edit3 size={18} />
            </button>

            <button
              onClick={() => openDeleteModal(row.farm)}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              title="농장 삭제"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {row.role.super && (
        <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/85 px-4 py-2.5 text-sm">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">시급</span>
            <span className="text-right font-extrabold text-slate-800">{Formatter.toMoney(row.farm.payRatePerHour)}원</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/85 px-4 py-2.5 text-sm">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">월 공제액</span>
            <span className="text-right font-extrabold text-slate-800">{Formatter.toMoney(row.farm.payDeductionAmount)}원</span>
          </div>
        </div>
      )}

      <button
        className="w-full py-3.5 bg-slate-50 border border-slate-100 hover:bg-primary hover:border-primary hover:text-white text-slate-600 font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:hover:bg-slate-50 disabled:hover:text-slate-600 disabled:hover:border-slate-100"
        onClick={() => handleCheckInFarm(row.farm.id)}
        disabled={isCurrentFarm}
      >
        <LogIn size={18} />
        <span className="text-sm">{isCurrentFarm ? '현재 접속된 농장' : '접속하기'}</span>
      </button>
    </div>
  );
}
