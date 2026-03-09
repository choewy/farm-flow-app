export type FarmErrorSectionProps = {
  error: string;
};

export function FarmErrorSection({ error }: FarmErrorSectionProps) {
  if (!error) {
    return null;
  }

  return <div className="w-full max-w-sm bg-red-50 text-red-600 p-4 rounded-2xl text-sm text-center">{error}</div>;
}
