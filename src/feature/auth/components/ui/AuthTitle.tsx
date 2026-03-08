export type AuthTitleProps = {
  title: string;
  description: string;
};

export function AuthTitle({ title, description }: AuthTitleProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold bg-linear-to-r from-primary-dark to-primary bg-clip-text text-transparent">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}
