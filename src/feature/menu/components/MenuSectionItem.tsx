import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import { MenuSectionProps } from '../types';

export function MenuSectionItem(props: MenuSectionProps) {
  const navigate = useNavigate();

  return (
    <div key={props.title} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-6 mb-3">{props.title}</h3>
      <div className="bg-white rounded-[2.5rem] shadow-premium ring-1 ring-slate-100 overflow-hidden">
        {props.items.map((item, idx, arr) => (
          <button
            key={item.name}
            onClick={() => item.path !== '#' && navigate(item.path)}
            className={`group w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-all active:bg-slate-100 ${
              idx !== arr.length - 1 ? 'border-b border-slate-50' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-2xl ${item.background} ${item.color} transition-transform group-hover:scale-110`}>
                <item.icon size={22} className="stroke-2" />
              </div>
              <span className="font-bold text-slate-700 tracking-tight">{item.name}</span>
            </div>
            <ChevronRight size={18} className="text-slate-300 transition-transform group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </div>
  );
}
