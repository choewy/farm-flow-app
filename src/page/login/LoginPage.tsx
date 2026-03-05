import { SubmitEvent, useState } from 'react';

import { authApi, LoginRequestData } from '@app/feature/auth';
import { useAuthStore } from '@app/shared/stores';

export function LoginPage() {
  const { setSession } = useAuthStore();
  const [{ email, password }, setRequestData] = useState<LoginRequestData>({
    email: '',
    password: '',
  });

  const handleLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    const { data } = await authApi.login({ email, password });
    setSession(data.accessToken, data.user, data.farm, data.role);
  };

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
      <input type="email" value={email} onChange={(e) => setRequestData((prev) => ({ ...prev, email: e.target.value }))} />
      <input type="password" value={password} onChange={(e) => setRequestData((prev) => ({ ...prev, password: e.target.value }))} />
      <button type="submit">로그인</button>
    </form>
  );
}
