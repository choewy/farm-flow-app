import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { authApi } from '../api';

import { AuthButton, AuthInput } from './ui';

import { getErrorCodeMessage } from '@app/shared/api';
import { ROUTES } from '@app/shared/routes';
import { useAuthStore } from '@app/shared/stores';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.email('올바른 이메일 형식을 입력하세요.'),
  password: z.string().min(1, '비밀번호를 입력하세요.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function AuthLoginForm() {
  const { setSession } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? ROUTES.home;

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
      navigate(from, { replace: true });
    } catch (e) {
      alert(getErrorCodeMessage(e));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <AuthInput
        labelText="이메일"
        inputProps={{ type: 'email', autoComplete: 'email', placeholder: '이메일을 입력하세요' }}
        registerProps={register('email')}
        errors={errors}
      />
      <AuthInput
        labelText="비밀번호"
        inputProps={{ type: 'password', autoComplete: 'current-password', placeholder: '비밀번호를 입력하세요' }}
        registerProps={register('password')}
        errors={errors}
      />

      <AuthButton text="로그인" disabled={isSubmitting} />
    </form>
  );
}
