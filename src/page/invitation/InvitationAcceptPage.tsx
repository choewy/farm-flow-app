import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowLeft, CheckCircle2, Key } from 'lucide-react';

import { authApi } from '@app/feature/auth';
import { invitationApi } from '@app/feature/invitation/api/invitation.api';
import { getErrorCodeMessage } from '@app/shared/api';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function InvitationAcceptPage() {
  const navigate = useNavigate();
  const { setSession, role: currentRole } = useAuthStore();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError(null);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

    if (!pastedData) {
      return;
    }

    const newCode = [...code];
    pastedData.split('').forEach((char, idx) => {
      newCode[idx] = char;
    });
    setCode(newCode);
    setError(null);

    // Focus last character or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleValidate = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) return;

    try {
      setLoading(true);
      setError(null);

      const { data: validateData } = await invitationApi.validate({ code: fullCode });
      const { data: checkInData } = await authApi.checkIn(validateData.farmId);

      setSession(checkInData.user, checkInData.farm, checkInData.role || currentRole);

      // Success state is briefly shown then redirected
      setTimeout(() => {
        navigate(ROUTES.home);
      }, 1500);
    } catch (e) {
      setError(getErrorCodeMessage(e));
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // Auto-submit when code is full
  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      handleValidate();
    }
  }, [code]);

  return (
    <div className="flex flex-col space-y-8 pb-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Premium Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 transition-all active:scale-90"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">초대 승인</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Accept Invitation</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-premium ring-1 ring-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 -ml-10 -mt-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" />

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

          {/* 6-Digit PIN UI */}
          <div className="flex justify-center space-x-2.5 mb-10">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                disabled={loading}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className={`w-11 h-16 bg-slate-50 border-2 rounded-2xl text-center text-2xl font-black transition-all outline-none focus:ring-4 focus:ring-primary/10 ${
                  error ? 'border-red-200 text-red-500' : digit ? 'border-primary/30 text-primary' : 'border-slate-100 text-slate-800'
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="mb-8 px-4 py-2 bg-red-50 rounded-full border border-red-100">
              <span className="text-xs font-bold text-red-500">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center space-y-4">
              <Activity size={32} className="animate-spin text-primary" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Validating...</p>
            </div>
          ) : code.every((digit) => digit !== '') ? (
            <div className="flex flex-col items-center space-y-4 text-primary animate-in zoom-in-95 duration-300">
              <CheckCircle2 size={32} />
              <p className="text-xs font-bold uppercase tracking-widest">Entry Granted</p>
            </div>
          ) : (
            <div className="h-13" />
          )}
        </div>
      </div>

      <div className="p-6 bg-slate-50 rounded-4xl border border-slate-100">
        <h4 className="flex items-center space-x-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
          <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <span>Need Help?</span>
        </h4>
        <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
          초대 코드가 오지 않았거나 유효하지 않다면, 농장 관리자에게 새로운 초대를 요청해 주세요.
        </p>
      </div>
    </div>
  );
}
