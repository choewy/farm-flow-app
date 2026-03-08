import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import z from 'zod';

import { authApi } from '../api';

import { AuthButton, AuthInput } from './ui';

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

export function AuthRegisterForm() {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <AuthInput
        labelText="이메일"
        inputProps={{ type: 'email', autoComplete: 'email', placeholder: '이메일을 입력하세요' }}
        registerProps={register('email')}
        errors={errors}
      />

      <AuthInput
        labelText="이름"
        inputProps={{ type: 'text', autoComplete: 'name', placeholder: '이름을 입력하세요' }}
        registerProps={register('name')}
        errors={errors}
      />

      <AuthInput
        labelText="비밀번호"
        inputProps={{ type: 'password', autoComplete: 'new-password', placeholder: '비밀번호를 입력하세요' }}
        registerProps={register('password')}
        errors={errors}
      />

      <AuthInput
        labelText="비밀번호 확인"
        inputProps={{ type: 'password', autoComplete: 'confirm-password', placeholder: '비밀번호 확인을 입력하세요' }}
        registerProps={register('confirmPassword')}
        errors={errors}
      />

      <AuthButton text="회원가입" disabled={isSubmitting} />
    </form>
  );
}
