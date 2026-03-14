import { AuthAnchor, AuthLoginForm, AuthTitle } from '@app/feature/auth';
import { ROUTES } from '@app/shared/routes';

export default function LoginPage() {
  return (
    <div className="app-page app-page-auth items-center">
      <div className="app-panel w-full px-6 py-7">
        <AuthTitle title="Farm Flow" description="로그인" />
        <AuthLoginForm />
        <AuthAnchor to={ROUTES.register} comment="계정이 없으신가요?" text="회원가입" />
      </div>
    </div>
  );
}
