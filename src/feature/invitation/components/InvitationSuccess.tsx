import { Dispatch, SetStateAction } from 'react';
import { CheckCircle2 } from 'lucide-react';

export type InvitationSuccessProps = {
  email: string;
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

export function InvitationSuccess({ email, setSuccess }: InvitationSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 rounded-4xl bg-primary/10 flex items-center justify-center text-primary mb-8">
        <CheckCircle2 size={48} className="stroke-[1.5px]" />
      </div>
      <h2 className="text-2xl font-black text-slate-800 tracking-tight text-center mb-4">초대장 발송 완료</h2>
      <p className="text-center text-slate-400 font-medium mb-10 leading-relaxed">
        <span className="text-primary font-bold">{email}</span>로 <br />
        초대장이 발송되었습니다.
      </p>
      <button
        onClick={() => setSuccess(false)}
        className="w-full py-5 bg-primary text-white rounded-3xl font-black text-lg shadow-premium active:scale-95 transition-all flex items-center justify-center space-x-2"
      >
        <span>다시 초대하기</span>
      </button>
    </div>
  );
}
