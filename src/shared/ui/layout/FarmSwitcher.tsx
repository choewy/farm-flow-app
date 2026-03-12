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
        className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/40 border border-white/40 hover:bg-white/60 transition-all active:scale-95 shadow-sm"
      >
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider max-w-22.5 truncate">
          {currentFarm?.name || 'Select Farm'}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && farms.length > 0 && (
        <div className="absolute right-0 mt-3 w-64 bg-white/90 backdrop-blur-2xl rounded-4xl shadow-premium-lg ring-1 ring-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          <div className="p-3 space-y-1">
            <div className="px-4 py-3 border-b border-slate-50 mb-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">접속 농장 전환</p>
            </div>

            {farms.map(({ farm, role: farmRole }) => {
              const isActive = farm.id === currentFarm?.id;

              return (
                <button
                  key={farm.id}
                  onClick={() => handleFarmSelect(farm.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                    isActive ? 'bg-primary/10 text-primary shadow-sm' : 'text-slate-600 hover:bg-slate-50/80 active:bg-slate-100/50'
                  }`}
                >
                  <div className="flex items-center space-x-3 text-left">
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-white shadow-sm' : 'bg-slate-50'}`}>
                      <ShieldCheck size={16} className={isActive ? 'text-primary' : 'text-slate-400'} />
                    </div>
                    <div>
                      <p className={`text-sm font-bold truncate max-w-30 ${isActive ? 'text-primary' : 'text-slate-800'}`}>{farm.name}</p>
                      <p className={`text-[10px] uppercase tracking-widest font-black ${isActive ? 'text-primary/60' : 'text-slate-400'}`}>
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

          <div className="bg-slate-50/50 px-5 py-3 border-t border-slate-50">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center">Farm Flow Identity Service</p>
          </div>
        </div>
      )}
    </div>
  );
}
