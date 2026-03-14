export function InvitationFooter() {
  return (
    <div className="rounded-[1.4rem] border border-[rgba(98,88,68,0.08)] bg-white/70 p-5">
      <h4 className="mb-3 flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-slate-400">
        <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span>Notice</span>
      </h4>
      <p className="text-[11px] font-medium leading-relaxed text-slate-400">* 초대장은 발송 후 24시간 동안 유효합니다.</p>
    </div>
  );
}
