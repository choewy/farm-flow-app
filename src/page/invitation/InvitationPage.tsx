import { useState } from 'react';

import { InvitationFooter, InvitationForm, InvitationSuccess } from '@app/feature/invitation';

export function InvitationPage() {
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex flex-col space-y-8 pb-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {success ? (
        <InvitationSuccess email={email} setSuccess={setSuccess} />
      ) : (
        <>
          <InvitationForm setEmail={setEmail} setSuccess={setSuccess} />
          <InvitationFooter />
        </>
      )}
    </div>
  );
}
