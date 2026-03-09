import { Key } from 'lucide-react';

export function InvitationAcceptHeader() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="h-20 w-20 rounded-4xl bg-primary/10 flex items-center justify-center text-primary mb-8 shadow-inner">
        <Key size={36} className="stroke-[1.5px]" />
      </div>

      <div className="text-center mb-10">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">초대 코드를 입력하세요</h2>
        <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed">
          이메일로 받으신 <span className="text-slate-800 font-bold">6자리 숫자</span>를 <br />
          아래에 입력해 주세요.
        </p>
      </div>
    </div>
  );
}
