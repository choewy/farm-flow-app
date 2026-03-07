import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { authApi } from '@app/feature/auth';
import { getErrorCodeMessage } from '@app/shared/api';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.email('올바른 이메일 형식을 입력하세요.'),
  password: z.string().min(1, '비밀번호를 입력하세요.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { setSession } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async ({ email, password }: LoginFormData) => {
    try {
      const { data } = await authApi.login({ email, password });
      setSession(data.user, data.farm, data.role);
      navigate(ROUTES.home);
    } catch (e) {
      alert(getErrorCodeMessage(e));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <div className="w-full bg-white rounded-3xl shadow-sm ring-1 ring-slate-100 p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-linear-to-r from-[#4f8b39] to-[#8fcf72] bg-clip-text text-transparent">Farm Flow</h1>
          <p className="mt-2 text-sm text-slate-500">계정에 로그인하세요</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 ml-1 mb-1">이메일</label>
            <input
              type="email"
              autoComplete="email"
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8fcf72] text-slate-800 text-sm transition-shadow"
              placeholder="이메일을 입력하세요"
              {...register('email')}
            />
            {errors.email && <p className="mt-1 ml-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 ml-1 mb-1">비밀번호</label>
            <input
              type="password"
              autoComplete="current-password"
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8fcf72] text-slate-800 text-sm transition-shadow"
              placeholder="비밀번호를 입력하세요"
              {...register('password')}
            />
            {errors.password && <p className="mt-1 ml-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#8fcf72] hover:opacity-95 transition-opacity text-white font-semibold rounded-2xl shadow-sm mt-2 disabled:opacity-60"
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="text-center text-sm pt-2">
          <span className="text-slate-500">계정이 없으신가요? </span>
          <button
            type="button"
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
