import { useState } from 'react';

import { InvitationFooter, InvitationForm, InvitationSuccess } from '@app/feature/invitation';

export default function InvitationPage() {
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex flex-col space-y-8 pb-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 justify-center min-h-[80vh]">
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
