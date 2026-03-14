type ListLoaderProps = {
  message?: string;
};
export function ListLoader({ message }: ListLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-100 mt-4">
      <div className="w-8 h-8 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
      <span className="text-sm font-semibold text-slate-400">{message ?? '데이터를 불러오는 중입니다...'}</span>
    </div>
  );
}
