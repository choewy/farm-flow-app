import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authApi } from '@app/feature/auth';
import { farmApi, FarmListRow } from '@app/feature/farm';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function FarmListPage() {
  const navigate = useNavigate();
  const { setSession, user, role } = useAuthStore();
  const [rows, setRows] = useState<FarmListRow[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showCreate, setShowCreate] = useState(false);
  const [editFarmId, setEditFarmId] = useState<string | null>(null);
  const [farmName, setFarmName] = useState('');

  const fetchFarms = async () => {
    try {
      setLoading(true);
      const { data } = await farmApi.list();
      setRows(data.rows);
    } catch (error) {
      console.error('Failed to load farms', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName.trim()) return;

    try {
      await farmApi.create({ name: farmName });
      setFarmName('');
      setShowCreate(false);
      fetchFarms();
    } catch (error) {
      console.error('Create farm failed', error);
      alert('농장 생성에 실패했습니다.');
    }
  };

  const handleCheckInFarm = async (farmId: string) => {
    try {
      const { data } = await authApi.checkIn(farmId);
      setSession(user, data.farm, role);
      navigate(ROUTES.home);
    } catch (error) {
      console.error('Checkin failed', error);
      alert('농장 접속에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col space-y-5 pb-5 w-full">
      <header className="rounded-b-4xl bg-white p-5 shadow-sm -mx-4 -mt-16 pt-16">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-linear-to-r from-[#4f8b39] to-[#8fcf72] bg-clip-text text-transparent">Farm Flow</h1>
          <button
            onClick={() => {
              setShowCreate(!showCreate);
              setEditFarmId(null);
              setFarmName('');
            }}
            className="text-xs px-3 py-1.5 bg-[#edf7e8] text-[#4f8b39] rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            {showCreate ? '취소' : '+ 새 농장'}
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold">농장 관리</h2>
          <p className="mt-2 text-sm text-slate-500">접속할 농장을 선택하거나 관리하세요.</p>
        </div>
      </header>

      {/* Create / Edit Form */}
      {(showCreate || editFarmId) && (
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <form onSubmit={handleCreateFarm}>
            <h3 className="text-sm font-semibold mb-3 text-slate-800">{editFarmId ? '농장 이름 수정' : '새로운 농장 만들기'}</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="농장 이름"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8fcf72] text-sm text-slate-800"
                required
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#4f8b39] text-white text-sm font-semibold rounded-2xl hover:bg-[#3d6e2c] transition shadow-sm"
              >
                {editFarmId ? '저장' : '생성'}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Farm List */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold ml-1 text-slate-800">나의 농장</h3>
        {loading ? (
          <div className="text-center py-8 text-slate-500 text-sm">불러오는 중...</div>
        ) : rows.length === 0 ? (
          <div className="text-center py-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 text-slate-500 text-sm">
            등록된 농장이 없습니다.
            <br />새 농장을 만들어 보세요.
          </div>
        ) : (
          rows.map(({ farm, role }) => (
            <div key={farm.id} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{farm.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">ID: {farm.id}</p>
                  <p className="text-xs text-slate-400 mt-1">ID: {role.name}</p>
                </div>
              </div>
              <button
                onClick={() => handleCheckInFarm(farm.id)}
                className="w-full py-4 bg-[#8fcf72] text-white font-semibold rounded-2xl shadow-sm transition hover:opacity-95"
              >
                이 농장으로 접속하기
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
