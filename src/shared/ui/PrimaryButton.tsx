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
  const baseClasses = 'app-button';

  const variantClasses = {
    primary: 'app-button-primary',
    danger: 'app-button-danger',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span>{text}</span>}
    </button>
  );
}
