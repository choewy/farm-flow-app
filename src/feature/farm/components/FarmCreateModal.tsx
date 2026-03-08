import { useState } from 'react';
import { Activity, Plus, X } from 'lucide-react';

import { farmApi } from '../api';

import { useFarmStore } from '@app/shared/stores';

interface FarmCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FarmCreateModal({ isOpen, onClose }: FarmCreateModalProps) {
  const { fetchFarms } = useFarmStore();

  const [farmName, setFarmName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName.trim()) return;

    try {
      setLoading(true);
      await farmApi.create({ name: farmName });
      setFarmName('');
      fetchFarms();
      onClose();
    } catch (error) {
      console.error('Create farm failed', error);
      alert('농장 생성에 실패했습니다.');
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
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Plus size={32} className="stroke-[2.5px]" />
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">새 농장 만들기</h2>
            <p className="text-sm text-slate-400 mt-2 font-medium">
              관리하실 새로운 농장의 이름을 <br />
              입력해 주세요.
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
              disabled={loading || !farmName.trim()}
              className="w-full py-5 bg-primary text-white rounded-3xl font-black text-lg shadow-premium hover:opacity-95 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Activity size={20} className="animate-spin" />
              ) : (
                <>
                  <span>농장 생성하기</span>
                </>
              )}
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
