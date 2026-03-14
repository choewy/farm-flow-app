type ListLoaderProps = {
  message?: string;
};

export function ListLoader({ message = '불러오는 중...' }: ListLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-4">
      <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-slate-300">{message}</p>
    </div>
  );
}
