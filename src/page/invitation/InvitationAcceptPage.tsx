import { InvitationAcceptForm, InvitationAcceptHeader, InvitationAcceptHelp } from '@app/feature/invitation';

export default function InvitationAcceptPage() {
  return (
    <div className="app-page app-page-centered animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="app-panel app-panel-strong relative overflow-hidden px-5 py-6 sm:px-6">
        <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-accent/8 blur-3xl" />
        <InvitationAcceptHeader />
        <InvitationAcceptForm />
        <div className="mt-5">
          <InvitationAcceptHelp />
        </div>
      </div>
    </div>
  );
}
