import { Key } from 'lucide-react';

export function InvitationAcceptHeader() {
  return (
    <div className="relative flex flex-col items-center text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-primary/10 text-primary shadow-inner">
        <Key size={30} className="stroke-[1.7px]" />
      </div>

      <p className="app-kicker text-primary/70">Invitation Access</p>
      <h2 className="mt-2 text-[1.6rem] font-black tracking-[-0.04em] text-slate-800">초대 코드를 입력하세요</h2>
      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
        이메일로 받으신 <span className="font-bold text-slate-800">6자리 숫자</span>를
        <br />
        아래에 입력해 주세요.
      </p>
    </div>
  );
}
