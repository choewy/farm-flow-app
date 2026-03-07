import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit3, LogIn, Plus, ShieldCheck, Trash2, User as UserIcon } from 'lucide-react';

import { authApi } from '@app/feature/auth';
import { FarmCreateModal, FarmDeleteConfirmModal, FarmUpdateModal } from '@app/feature/farm';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore, useFarmStore } from '@app/shared/stores';

export function FarmListPage() {
  const navigate = useNavigate();
  const { setSession, user, role: currentRole } = useAuthStore();
  const { rows, loading, fetchFarms } = useFarmStore();

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected farm for actions
  const [selectedFarm, setSelectedFarm] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleCheckInFarm = async (farmId: string) => {
    try {
      const { data } = await authApi.checkIn(farmId);
      setSession(user, data.farm, data.role || currentRole);
      navigate(ROUTES.home);
    } catch (error) {
      console.error('Checkin failed', error);
      alert('농장 접속에 실패했습니다.');
    }
  };

  const openUpdateModal = (farm: { id: string; name: string }) => {
    setSelectedFarm(farm);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (farm: { id: string; name: string }) => {
    setSelectedFarm(farm);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex flex-col space-y-6 pb-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Toolbar (Non-fixed) */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/50 rounded-3xl border border-white/40 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">나의 농장 목록</span>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-2xl text-xs font-black shadow-premium active:scale-95 transition-all"
        >
          <Plus size={14} className="stroke-[3px]" />
          <span>새 농장 생성</span>
        </button>
      </div>

      {/* Farm List Section */}
      <section className="space-y-4 px-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-sm font-bold text-slate-300">농장 정보를 불러오는 중...</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-premium text-center">
            <div className="h-20 w-20 rounded-4xl bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
              <ShieldCheck size={40} />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">등록된 농장이 없습니다.</h4>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              상단의 버튼을 눌러 관리하실 <br />첫 번째 농장을 만들어 보세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {rows.map(({ farm, role }) => {
              return (
                <div
                  key={farm.id}
                  className="group relative bg-white rounded-[2.5rem] p-6 shadow-premium ring-1 ring-slate-100 transition-all hover:ring-primary/20 hover:shadow-premium-lg"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                        <UserIcon size={32} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight truncate">{farm.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-100 text-blue-600`}
                          >
                            {role?.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Management Controls */}
                    {role.super && (
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => openUpdateModal(farm)}
                          className="p-2.5 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-primary transition-all active:scale-95"
                          title="농장 이름 수정"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(farm)}
                          className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all active:scale-95"
                          title="농장 삭제"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleCheckInFarm(farm.id)}
                    className="w-full py-4 bg-slate-50 hover:bg-primary hover:text-white text-slate-600 font-black rounded-3xl transition-all flex items-center justify-center space-x-2 group-active:scale-[0.98]"
                  >
                    <LogIn size={18} />
                    <span>이 농장으로 접속하기</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div className="text-center py-6">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Farm Flow Identity Manager</p>
      </div>

      {/* Modals */}
      <FarmCreateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSuccess={fetchFarms} />

      {selectedFarm && (
        <>
          <FarmUpdateModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            onSuccess={fetchFarms}
            farmId={selectedFarm.id}
            currentName={selectedFarm.name}
          />
          <FarmDeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onSuccess={fetchFarms}
            farmId={selectedFarm.id}
            farmName={selectedFarm.name}
          />
        </>
      )}
    </div>
  );
}
