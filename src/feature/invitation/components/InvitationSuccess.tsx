import { Dispatch, SetStateAction } from 'react';
import { CheckCircle2 } from 'lucide-react';

export type InvitationSuccessProps = {
  email: string;
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

export function InvitationSuccess({ email, setSuccess }: InvitationSuccessProps) {
  return (
    <div className="app-panel animate-in fade-in zoom-in-95 duration-300 px-6 py-7">
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-primary/10 text-primary">
          <CheckCircle2 size={40} className="stroke-2" />
        </div>
        <p className="app-kicker text-primary/70">Invitation Sent</p>
        <h2 className="mt-2 text-[1.5rem] font-black tracking-[-0.04em] text-slate-800">초대장 발송 완료</h2>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
          <span className="font-bold text-primary">{email}</span>
          <br />
          주소로 초대장이 발송되었습니다.
        </p>
        <div className="app-note mt-6 w-full">
          <p className="text-xs font-medium leading-relaxed text-slate-500">
            메일이 보이지 않으면 스팸함을 확인해 주세요. 필요한 경우 같은 화면에서 다시 초대할 수 있습니다.
          </p>
        </div>
        <button onClick={() => setSuccess(false)} className="app-button app-button-primary mt-6">
          <span>다시 초대하기</span>
        </button>
      </div>
    </div>
  );
}
