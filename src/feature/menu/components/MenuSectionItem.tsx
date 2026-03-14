import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import { MenuSectionProps } from '../types';

export function MenuSectionItem(props: MenuSectionProps) {
  const navigate = useNavigate();

  return (
    <div key={props.title} className="animate-in fade-in slide-in-from-bottom-4 duration-300 fill-mode-both">
      <h3 className="app-kicker mb-3 ml-1 text-slate-400">{props.title}</h3>
      <div className="app-panel overflow-hidden p-2">
        {props.items
          .filter((item) => item.visible)
          .map((item, idx, arr) => (
            <button
              key={item.name}
              onClick={() => item.path !== '#' && navigate(item.path)}
              className={`group flex w-full items-center justify-between rounded-[1.35rem] p-4 text-left transition-all hover:bg-white/80 ${
                idx !== arr.length - 1 ? 'mb-1' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`rounded-[1.1rem] p-2.5 ${item.background} ${item.color} transition-transform group-hover:scale-110`}>
                  <item.icon size={20} className="stroke-2" />
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
