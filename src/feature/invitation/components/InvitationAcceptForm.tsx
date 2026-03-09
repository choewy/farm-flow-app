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
      <div className="flex justify-center space-x-2.5">
        {code.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            type="text"
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
        <div className="mt-5 px-4 py-2 bg-red-50 rounded-full border border-red-100">
          <span className="text-xs font-bold text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
}
