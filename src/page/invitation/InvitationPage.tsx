import { useState } from 'react';

import { InvitationForm, InvitationSuccess } from '@app/feature/invitation';

export default function InvitationPage() {
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState(false);

  return (
    <div className="app-page app-page-centered animate-in fade-in slide-in-from-bottom-4 duration-300">
      {success ? (
        <InvitationSuccess email={email} setSuccess={setSuccess} />
      ) : (
        <InvitationForm setEmail={setEmail} setSuccess={setSuccess} />
      )}
    </div>
  );
}
