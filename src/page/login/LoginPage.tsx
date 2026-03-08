import { AuthAnchor, AuthLoginForm, AuthTitle } from '@app/feature/auth';
import { ROUTES } from '@app/shared/routes';

export function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <div className="w-full bg-white rounded-3xl shadow-sm ring-1 ring-slate-100 p-8 space-y-8">
        <AuthTitle title="Farm Flow" description="로그인" />
        <AuthLoginForm />
        <AuthAnchor to={ROUTES.register} comment="계정이 없으신가요?" text="회원가입" />
      </div>
    </div>
  );
}
