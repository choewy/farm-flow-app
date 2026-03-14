import { useState } from 'react';

import { InvitationForm, InvitationSuccess } from '@app/feature/invitation';

export default function InvitationPage() {
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex flex-col space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 justify-center min-h-[70vh]">
      {success ? (
        <InvitationSuccess email={email} setSuccess={setSuccess} />
      ) : (
        <InvitationForm setEmail={setEmail} setSuccess={setSuccess} />
      )}
    </div>
  );
}
