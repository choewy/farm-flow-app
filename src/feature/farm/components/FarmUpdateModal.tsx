import { useEffect, useState } from 'react';
import { Activity, Edit3, X } from 'lucide-react';

import { farmApi } from '../api';

import { useFarmStore } from '@app/shared/stores';

interface FarmUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmId: string;
  currentName: string;
}

export function FarmUpdateModal({ isOpen, onClose, farmId, currentName }: FarmUpdateModalProps) {
  const { fetchFarms } = useFarmStore();
  const [farmName, setFarmName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFarmName(currentName);
    }
  }, [isOpen, currentName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName.trim() || farmName === currentName) return;

    try {
      setLoading(true);
      await farmApi.update(farmId, { name: farmName });
      fetchFarms();
      onClose();
    } catch (error) {
      console.error('Update farm failed', error);
      alert('농장 이름 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-premium-lg overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Edit3 size={32} className="stroke-[2.5px]" />
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">농장 정보 수정</h2>
            <p className="text-sm text-slate-400 mt-2 font-medium">
              관리하시는 농장의 이름을 <br />
              변경하실 수 있습니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Farm Name</label>
              <input
                autoFocus
                type="text"
                placeholder="농장 이름을 입력하세요"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !farmName.trim() || farmName === currentName}
              className="w-full py-5 bg-primary text-white rounded-3xl font-black text-lg shadow-premium hover:opacity-95 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center space-x-2"
            >
              {loading ? <Activity size={20} className="animate-spin" /> : <span>수정 완료</span>}
            </button>
          </form>
        </div>

        <div className="bg-slate-50/50 p-4 border-t border-slate-50 text-center">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Farm Flow Management System</p>
        </div>
      </div>
    </div>
  );
}
