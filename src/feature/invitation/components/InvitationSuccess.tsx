import { Dispatch, SetStateAction } from 'react';
import { CheckCircle2 } from 'lucide-react';

export type InvitationSuccessProps = {
  email: string;
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

export function InvitationSuccess({ email, setSuccess }: InvitationSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
        <CheckCircle2 size={40} className="stroke-2" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 tracking-tight text-center mb-3">초대장 발송 완료</h2>
      <p className="text-center text-slate-500 font-medium mb-8 leading-relaxed text-sm">
        <span className="text-primary font-bold">{email}</span>로 <br />
        초대장이 발송되었습니다.
      </p>
      <button
        onClick={() => setSuccess(false)}
        className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center space-x-2"
      >
        <span>다시 초대하기</span>
      </button>
    </div>
  );
}
