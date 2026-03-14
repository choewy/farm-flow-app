import { ClipboardEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { invitationApi } from '../api/invitation.api';

import { authApi } from '@app/feature/auth';
import { getErrorCodeMessage } from '@app/shared/api';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function InvitationAcceptForm() {
  const navigate = useNavigate();
  const { setSession, role: currentRole } = useAuthStore();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError(null);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
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

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleValidate = async () => {
    const fullCode = code.join('');

    if (fullCode.length !== 6) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: validateData } = await invitationApi.validate({ code: fullCode });
      const { data: checkInData } = await authApi.checkIn(validateData.farmId);

      setSession(checkInData.user, checkInData.farm, checkInData.role || currentRole);
      navigate(ROUTES.home, { replace: true });
    } catch (e) {
      setError(getErrorCodeMessage(e));
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      handleValidate();
    }
  }, [code]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="mt-5 flex w-full justify-center gap-2 sm:gap-2.5">
        {code.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            name={`invitation-accept-digit-${idx}`}
            inputMode="numeric"
            pattern="[0-9]*"
            className={`h-15 w-10 rounded-[1.15rem] border-2 bg-slate-50 text-center text-xl font-black transition-all outline-none focus:ring-4 focus:ring-primary/10 sm:h-16 sm:w-11 sm:text-2xl ${
              error ? 'border-red-200 text-red-500' : digit ? 'border-primary/30 text-primary' : 'border-slate-100 text-slate-800'
            }`}
            maxLength={1}
            value={digit}
            disabled={loading}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            autoComplete="off"
          />
        ))}
      </div>

      {error && (
        <div className="mt-4 rounded-full border border-red-100 bg-red-50 px-4 py-2">
          <span className="text-xs font-bold text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
}
