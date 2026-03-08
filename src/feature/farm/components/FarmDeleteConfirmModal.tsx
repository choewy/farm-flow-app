import { useState } from 'react';
import { Activity, AlertTriangle, Trash2, X } from 'lucide-react';

import { farmApi } from '../api';

import { useFarmStore } from '@app/shared/stores';

interface FarmDeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmId: string;
  farmName: string;
}

export function FarmDeleteConfirmModal({ isOpen, onClose, farmId, farmName }: FarmDeleteConfirmModalProps) {
  const { fetchFarms } = useFarmStore();

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);
      await farmApi.remove(farmId);
      fetchFarms();
      onClose();
    } catch (error) {
      console.error('Delete farm failed', error);
      alert('농장 삭제에 실패했습니다.');
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
        <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />

        <div className="relative p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="h-14 w-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
              <AlertTriangle size={32} className="stroke-[2.5px]" />
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">농장 삭제 확인</h2>
            <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed">
              정말로 <span className="text-rose-500 font-bold">"{farmName}"</span> 농장을 <br />
              삭제하시겠습니까? 관련 데이터가 <br />
              모두 소실될 수 있습니다.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="w-full py-5 bg-rose-500 text-white rounded-3xl font-black text-lg shadow-lg hover:bg-rose-600 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Activity size={20} className="animate-spin" />
              ) : (
                <>
                  <Trash2 size={20} />
                  <span>농장 영구 삭제</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              disabled={loading}
              className="w-full py-4 bg-slate-50 text-slate-400 rounded-3xl font-black text-sm hover:bg-slate-100 transition-all"
            >
              취소하기
            </button>
          </div>
        </div>

        <div className="bg-rose-50/30 p-4 border-t border-rose-50 text-center">
          <p className="text-[9px] font-black text-rose-300 uppercase tracking-widest">Critical Infrastructure Operation</p>
        </div>
      </div>
    </div>
  );
}
