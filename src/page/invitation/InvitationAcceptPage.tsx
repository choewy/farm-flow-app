import { InvitationAcceptForm, InvitationAcceptHeader, InvitationAcceptHelp } from '@app/feature/invitation';

export default function InvitationAcceptPage() {
  return (
    <div className="flex flex-col space-y-8 pb-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 justify-center min-h-[80vh]">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-premium ring-1 ring-slate-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 -ml-10 -mt-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <InvitationAcceptHeader />
        <InvitationAcceptForm />
      </div>

      <InvitationAcceptHelp />
    </div>
  );
}
