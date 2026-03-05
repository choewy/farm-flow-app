import { SubmitEvent, useState } from 'react';

import { authApi, RegisterRequestData } from '@app/feature/auth';
import { useAuthStore } from '@app/shared/stores';

export function RegisterPage() {
  const { setSession } = useAuthStore();
  const [{ email, name, password, confirmPassword }, setRequestData] = useState<RegisterRequestData>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async (e: SubmitEvent) => {
    e.preventDefault();

    const { data } = await authApi.register({ email, name, password, confirmPassword });
    setSession(data.accessToken, data.user, data.farm, data.role);
  };

  return (
    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column' }}>
      <input type="email" value={email} onChange={(e) => setRequestData((prev) => ({ ...prev, email: e.target.value }))} />
      <input type="text" value={name} onChange={(e) => setRequestData((prev) => ({ ...prev, name: e.target.value }))} />
      <input type="password" value={password} onChange={(e) => setRequestData((prev) => ({ ...prev, password: e.target.value }))} />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setRequestData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
      />
      <button type="submit">회원가입</button>
    </form>
  );
}
