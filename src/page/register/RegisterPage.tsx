import { AuthAnchor, AuthRegisterForm, AuthTitle } from '@app/feature/auth';
import { ROUTES } from '@app/shared/routes';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <AuthTitle title="Farm Flow" description="회원가입" />
        <AuthRegisterForm />
        <AuthAnchor to={ROUTES.login} comment="이미 계정이 있으신가요?" text="로그인" />
      </div>
    </div>
  );
}
