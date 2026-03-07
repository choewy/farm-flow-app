import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { authApi } from '@app/feature/auth';
import { getErrorCodeMessage } from '@app/shared/api';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z
  .object({
    email: z.email('올바른 이메일 형식을 입력하세요.'),
    name: z.string().min(1, '이름을 입력하세요.'),
    password: z.string().min(1, '비밀번호를 입력하세요.').min(8, '비밀번호는 8자 이상이어야 합니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력하세요.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const { setSession } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? ROUTES.home;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async ({ email, name, password, confirmPassword }: RegisterFormData) => {
    try {
      const { data } = await authApi.register({ email, name, password, confirmPassword });

      setSession(data.user, data.farm, data.role);
      navigate(from, { replace: true });
    } catch (e) {
      alert(getErrorCodeMessage(e));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <div className="w-full bg-white rounded-3xl shadow-sm ring-1 ring-slate-100 p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent">계정 생성</h1>
          <p className="mt-2 text-sm text-slate-500">새로운 Farm Flow 계정을 만드세요</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-800 ml-1 mb-1">이메일</label>
            <input
              type="email"
              autoComplete="email"
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-800 text-sm transition-shadow"
              placeholder="이메일을 입력하세요"
              {...register('email')}
            />
            {errors.email && <p className="mt-1 ml-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 ml-1 mb-1">이름</label>
            <input
              type="text"
              autoComplete="name"
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-800 text-sm transition-shadow"
              placeholder="이름을 입력하세요"
              {...register('name')}
            />
            {errors.name && <p className="mt-1 ml-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 ml-1 mb-1">비밀번호</label>
            <input
              type="password"
              autoComplete="new-password"
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-800 text-sm transition-shadow"
              placeholder="비밀번호를 입력하세요"
              {...register('password')}
            />
            {errors.password && <p className="mt-1 ml-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 ml-1 mb-1">비밀번호 확인</label>
            <input
              type="password"
              autoComplete="confirm-password"
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-slate-800 text-sm transition-shadow"
              placeholder="비밀번호를 다시 입력하세요"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p className="mt-1 ml-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-primary hover:opacity-95 transition-opacity text-white font-semibold rounded-2xl shadow-sm mt-4 disabled:opacity-60"
          >
            {isSubmitting ? '회원가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="text-center text-sm pt-2">
          <span className="text-slate-500">이미 계정이 있으신가요? </span>
          <button
            type="button"
            onClick={() => navigate(ROUTES.login, { state: location.state })}
            className="font-semibold text-primary-dark hover:text-[#3d6e2c] transition-colors ml-1"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
