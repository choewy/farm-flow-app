export type AuthButtonProps = {
  text: string;
  disabled: boolean;
};

export function AuthButton({ disabled, text }: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full py-4 bg-primary hover:opacity-95 transition-opacity text-white font-semibold rounded-2xl shadow-sm mt-4 disabled:opacity-60"
    >
      {text}
    </button>
  );
}
