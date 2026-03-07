import { SubmitEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowLeft, CheckCircle2, Send, UserPlus } from 'lucide-react';

import { invitationApi } from '@app/feature/invitation/api/invitation.api';

export function InvitationPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;

    try {
      setLoading(true);
      const invitationUrl = `${window.location.origin}/invitation/accept`;
      await invitationApi.create({
        email: email.trim(),
        url: invitationUrl,
      });

      setSuccess(true);
    } catch (error) {
      console.error('Failed to create invitation', error);
      alert('초대 발송에 실패했습니다. 이미 초대되었거나 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 rounded-4xl bg-primary/10 flex items-center justify-center text-primary mb-8">
          <CheckCircle2 size={48} className="stroke-[1.5px]" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight text-center mb-4">초대 완료!</h2>
        <p className="text-center text-slate-400 font-medium mb-10 leading-relaxed">
          <span className="text-primary font-bold">{email}</span> 님께 <br />
          초대 메일이 발송되었습니다.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="w-full py-5 bg-primary text-white rounded-3xl font-black text-lg shadow-premium active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>목록으로 돌아가기</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 pb-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Premium Header/Toolbar */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all active:scale-90"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">멤버 초대</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Invite Team Member</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-premium ring-1 ring-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />

        <div className="relative">
          <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8">
            <UserPlus size={32} className="stroke-[1.5px]" />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">새 멤버를 초대하세요</h2>
            <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed">
              이메일 주소를 입력하면 해당 사용자에게 <br />
              현재 농장으로의 초대 링크가 발송됩니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
              <div className="relative">
                <input
                  required
                  autoFocus
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-slate-800 font-bold placeholder:text-slate-300 shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full py-5 bg-primary text-white rounded-3xl font-black text-lg shadow-premium hover:opacity-95 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Activity size={24} className="animate-spin" />
              ) : (
                <>
                  <Send size={20} className="stroke-[2.5px]" />
                  <span>초대 링크 발송하기</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="p-6 bg-slate-50 rounded-4xl border border-slate-100">
        <h4 className="flex items-center space-x-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span>Notice</span>
        </h4>
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
          * 초대를 받은 사용자는 이메일의 링크를 클릭하여 가입 및 농장 입장이 가능합니다.
          <br />* 초대는 발송 후 24시간 동안 유효합니다.
        </p>
      </div>
    </div>
  );
}
