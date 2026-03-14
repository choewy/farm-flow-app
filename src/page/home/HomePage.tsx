import { CalendarClock, Sprout, SunMedium } from 'lucide-react';

import { useAuthStore } from '@app/shared/stores';

export default function HomePage() {
  const { user, role, farm } = useAuthStore();

  return (
    <div className="app-page animate-in fade-in slide-in-from-bottom-4 duration-300">
      <section className="app-hero px-6 py-6">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="app-kicker text-white/70">Today&apos;s Field</p>
            <h1 className="mt-2 text-[1.8rem] font-black leading-tight tracking-[-0.04em]">
              {user?.name || '사용자'}님,
              <br />
              오늘도 좋은 흐름으로 시작해요.
            </h1>
            <p className="mt-3 max-w-64 text-sm font-medium leading-relaxed text-white/78">
              {farm?.name || '현재 농장'}에서 출퇴근과 멤버 운영을 한 번에 관리할 수 있어요.
            </p>
          </div>
          <div className="flex h-[4.75rem] w-[4.75rem] shrink-0 items-center justify-center rounded-[1.65rem] bg-white/18 backdrop-blur-sm">
            <span className="text-3xl font-black">{user?.name?.charAt(0) || 'U'}</span>
          </div>
        </div>
        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          <span className="app-chip border-white/20 bg-white/16 text-white">
            <Sprout size={14} />
            {role?.name || '일반 사용자'}
          </span>
          <span className="app-chip border-white/20 bg-white/16 text-white">
            <CalendarClock size={14} />
            모바일 PWA 준비 완료
          </span>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <article className="app-card p-4">
          <div className="flex items-center justify-between">
            <span className="app-kicker text-primary/60">Farm</span>
            <div className="rounded-2xl bg-primary/10 p-2 text-primary">
              <Sprout size={18} />
            </div>
          </div>
          <p className="mt-4 text-lg font-black tracking-[-0.03em] text-slate-800">{farm?.name || '농장 선택 필요'}</p>
          <p className="mt-1 text-sm font-medium text-slate-500">현재 접속 중인 작업 공간</p>
        </article>

        <article className="app-card p-4">
          <div className="flex items-center justify-between">
            <span className="app-kicker text-warning/70">Mood</span>
            <div className="rounded-2xl bg-warning/10 p-2 text-warning">
              <SunMedium size={18} />
            </div>
          </div>
          <p className="mt-4 text-lg font-black tracking-[-0.03em] text-slate-800">활기찬 하루</p>
          <p className="mt-1 text-sm font-medium text-slate-500">오늘도 안전하고 가볍게 기록하세요</p>
        </article>
      </section>

      <section className="app-panel px-5 py-5">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="app-kicker text-accent/70">Quick Summary</p>
            <h2 className="mt-2 text-xl font-black tracking-[-0.03em] text-slate-800">모바일 앱처럼 빠르게 확인</h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
              하단 탭으로 출퇴근, 메뉴, 관리 기능을 오가며 필요한 작업에 바로 진입할 수 있습니다.
            </p>
          </div>
          <div className="rounded-[1.4rem] bg-accent/10 p-3 text-accent">
            <CalendarClock size={22} />
          </div>
        </div>
      </section>
    </div>
  );
}
