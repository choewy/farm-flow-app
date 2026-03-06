import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authApi, LoginRequestData } from '@app/feature/auth';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';

export function LoginPage() {
  const { setSession } = useAuthStore();
  const navigate = useNavigate();
  const [{ email, password }, setRequestData] = useState<LoginRequestData>({
    email: '',
    password: '',
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await authApi.login({ email, password });
      setSession(data.user, data.farm, data.role);
      navigate(ROUTES.home);
    } catch (error) {
      console.error('Login failed', error);
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <div className="w-full bg-white rounded-3xl shadow-sm ring-1 ring-slate-100 p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-linear-to-r from-[#4f8b39] to-[#8fcf72] bg-clip-text text-transparent">Farm Flow</h1>
          <p className="mt-2 text-sm text-slate-500">계정에 로그인하세요</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 ml-1 mb-1">이메일</label>
            <input
              type="email"
              required
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8fcf72] text-slate-800 text-sm transition-shadow"
              value={email}
              onChange={(e) => setRequestData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-800 ml-1 mb-1">비밀번호</label>
            <input
              type="password"
              required
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8fcf72] text-slate-800 text-sm transition-shadow"
              value={password}
              onChange={(e) => setRequestData((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#8fcf72] hover:opacity-95 transition-opacity text-white font-semibold rounded-2xl shadow-sm mt-2"
          >
            로그인
          </button>
        </form>

        <div className="text-center text-sm pt-2">
          <span className="text-slate-500">계정이 없으신가요? </span>
          <button
            onClick={() => navigate(ROUTES.register)}
            className="font-semibold text-[#4f8b39] hover:text-[#3d6e2c] transition-colors ml-1"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
