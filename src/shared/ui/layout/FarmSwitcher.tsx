import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, ShieldCheck } from 'lucide-react';

import { authApi } from '@app/feature/auth';
import { getErrorCodeMessage } from '@app/shared/api';
import { useAuthStore, useFarmStore } from '@app/shared/stores';
import { Toast } from '@app/shared/toast';

export function FarmSwitcher() {
  const { farm: currentFarm, user, role, setSession } = useAuthStore();
  const { rows: farms, fetchFarms } = useFarmStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchFarms();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFarmSelect = async (farmId: string) => {
    if (farmId === currentFarm?.id) {
      setIsOpen(false);
      return;
    }

    try {
      const { data } = await authApi.checkIn(farmId);
      setSession(user, data.farm, data.role || role);
      setIsOpen(false);
      Toast.info(`"${data.farm?.name}" 농장으로 전환되었습니다.`);
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-2xl border border-[rgba(98,88,68,0.12)] bg-white/70 px-3 py-2 shadow-[0_10px_22px_rgba(41,43,23,0.08)] transition-all active:scale-95"
      >
        <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
        <span className="max-w-22.5 truncate text-[11px] font-black uppercase tracking-[0.18em] text-slate-700">
          {currentFarm?.name || 'Select Farm'}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && farms.length > 0 && (
        <div className="absolute right-0 z-50 mt-3 w-64 origin-top-right overflow-hidden rounded-[1.75rem] border border-[rgba(98,88,68,0.1)] bg-[rgba(255,252,247,0.92)] shadow-premium-lg backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="p-3 space-y-1">
            <div className="mb-1 border-b border-[rgba(98,88,68,0.08)] px-4 py-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">접속 농장 전환</p>
            </div>

            {farms.map(({ farm, role: farmRole }) => {
              const isActive = farm.id === currentFarm?.id;

              return (
                <button
                  key={farm.id}
                  onClick={() => handleFarmSelect(farm.id)}
                  className={`w-full flex items-center justify-between rounded-2xl p-3 transition-all ${
                    isActive ? 'bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]' : 'text-slate-600 hover:bg-white/70 active:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-center space-x-3 text-left">
                    <div className={`rounded-xl p-2 ${isActive ? 'bg-white shadow-sm' : 'bg-slate-50'}`}>
                      <ShieldCheck size={16} className={isActive ? 'text-primary' : 'text-slate-400'} />
                    </div>
                    <div>
                      <p className={`max-w-30 truncate text-sm font-bold ${isActive ? 'text-primary' : 'text-slate-800'}`}>{farm.name}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-primary/60' : 'text-slate-400'}`}>
                        {farmRole?.name ?? '일반 사용자'}
                      </p>
                    </div>
                  </div>
                  {isActive && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">
                      <Check size={14} className="stroke-[3.5px]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-[rgba(98,88,68,0.08)] bg-slate-50/50 px-5 py-3">
            <p className="text-center text-[9px] font-black uppercase tracking-widest text-slate-300">Farm Flow Identity Service</p>
          </div>
        </div>
      )}
    </div>
  );
}
