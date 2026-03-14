export function InvitationAcceptHelp() {
  return (
    <div className="rounded-[1.35rem] border border-slate-100 bg-slate-50/85 p-4">
      <h4 className="mb-2.5 flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-slate-400">
        <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span>Need Help?</span>
      </h4>
      <p className="text-[11px] font-medium leading-relaxed text-slate-500">
        초대 코드가 오지 않았거나 유효하지 않다면, 농장 관리자에게 새로운 초대를 요청해 주세요.
      </p>
    </div>
  );
}
