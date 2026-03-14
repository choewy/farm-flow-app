export type PrimaryButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'danger';
};

export function PrimaryButton({
  text,
  onClick,
  disabled = false,
  isLoading = false,
  type = 'submit',
  variant = 'primary',
}: PrimaryButtonProps) {
  const baseClasses =
    'w-full py-3.5 font-bold rounded-xl transition-all flex justify-center items-center active:scale-[0.98] shadow-sm tracking-wide';

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    danger: 'bg-danger hover:bg-red-600 text-white',
  };

  const disabledClasses = disabled || isLoading ? 'opacity-50 cursor-not-allowed active:scale-100' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses}`}
    >
      {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span>{text}</span>}
    </button>
  );
}
