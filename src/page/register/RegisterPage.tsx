import { AuthAnchor, AuthRegisterForm, AuthTitle } from '@app/feature/auth';
import { ROUTES } from '@app/shared/routes';

export default function RegisterPage() {
  return (
    <div className="app-page app-page-auth items-center">
      <div className="app-panel w-full px-6 py-7">
        <AuthTitle title="Farm Flow" description="회원가입" />
        <AuthRegisterForm />
        <AuthAnchor to={ROUTES.login} comment="이미 계정이 있으신가요?" text="로그인" />
      </div>
    </div>
  );
}
