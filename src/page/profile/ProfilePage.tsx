import { BriefcaseBusiness, CircleUserRound, Mail, Smartphone, Sprout } from 'lucide-react';

import { useAuthStore } from '@app/shared/stores';

const STATUS_LABEL_MAP = {
  activated: '활성',
  inactivated: '비활성',
  deleted: '삭제',
} as const;

export default function ProfilePage() {
  const { user, farm, role, deviceId } = useAuthStore();

  return (
    <div className="app-page animate-in fade-in slide-in-from-bottom-4 duration-300">
      <section className="space-y-3">
        <article className="app-panel px-2 py-2">
          <div className="relative z-10 grid">
            <div className="flex items-start gap-4 rounded-[1.35rem] bg-white/75 p-4">
              <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                <CircleUserRound size={18} />
              </div>
              <div className="min-w-0">
                <span className="app-kicker text-primary/65">이름</span>
                <p className="mt-2 text-base font-black tracking-[-0.02em] text-slate-800">{user?.name || '사용자'}</p>
                <p className="mt-1 text-sm font-medium text-slate-500">현재 로그인한 계정 이름</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-[1.35rem] bg-white/75 p-4">
              <div className="rounded-[1.2rem] bg-sky-50 p-3 text-sky-600">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <p className="app-kicker text-sky-700/70">이메일</p>
                <p className="mt-2 text-base font-black tracking-[-0.02em] text-slate-800">{user?.email || '-'}</p>
                <p className="mt-1 text-sm font-medium text-slate-500">로그인에 사용 중인 계정 이메일</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-[1.35rem] bg-white/75 p-4">
              <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                <CircleUserRound size={18} />
              </div>
              <div className="min-w-0">
                <span className="app-kicker text-accent/70">상태</span>
                <p className="mt-2 text-base font-black tracking-[-0.02em] text-slate-800">
                  {user ? STATUS_LABEL_MAP[user.status] : '알 수 없음'}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">계정 활성 상태</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="space-y-3">
        <article className="app-panel px-2 py-2">
          <div className="relative z-10 grid">
            <div className="flex items-start gap-4 rounded-[1.35rem] bg-white/75 p-4">
              <div className="rounded-2xl bg-emerald-50 p-2.5 text-emerald-600">
                <Sprout size={18} />
              </div>
              <div className="min-w-0">
                <p className="app-kicker text-emerald-700/70">접속한 농장</p>
                <p className="mt-2 text-base font-black tracking-[-0.02em] text-slate-800">{farm?.name || '선택된 농장 없음'}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-[1.35rem] bg-white/75 p-4">
              <div className="rounded-2xl bg-violet-50 p-2.5 text-violet-600">
                <BriefcaseBusiness size={18} />
              </div>
              <div className="min-w-0">
                <p className="app-kicker text-violet-700/70">현재 역할</p>
                <p className="mt-2 text-base font-black tracking-[-0.02em] text-slate-800">{role?.name || '역할 없음'}</p>
              </div>
            </div>
          </div>
        </article>

        <article className="app-panel px-5 py-5">
          <div className="relative z-10 flex items-start gap-4">
            <div className="rounded-[1.2rem] bg-slate-100 p-3 text-slate-500">
              <Smartphone size={20} />
            </div>
            <div className="min-w-0">
              <p className="app-kicker text-slate-500">Device ID</p>
              <p className="mt-2 break-all text-sm font-bold leading-6 text-slate-700">{deviceId}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">현재 디바이스 세션 식별자</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
