export type AuthTitleProps = {
  title: string;
  description: string;
};

export function AuthTitle({ title, description }: AuthTitleProps) {
  return (
    <div className="text-center">
      <p className="app-kicker text-primary/70">Mobile Workspace</p>
      <h1 className="mt-2 text-[2rem] font-black tracking-[-0.05em] bg-linear-to-r from-primary-dark via-primary to-[#d8a24f] bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="mt-3 text-sm font-medium text-slate-500">{description}</p>
    </div>
  );
}
