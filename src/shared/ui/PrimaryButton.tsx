import { ReactNode } from 'react';

type PrimaryButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'danger';
  size?: 'md' | 'lg';
  className?: string;
};

export function PrimaryButton({
  children,
  type = 'button',
  disabled,
  onClick,
  variant = 'primary',
  size = 'lg',
  className = '',
}: PrimaryButtonProps) {
  const base =
    'w-full font-black rounded-3xl shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale flex items-center justify-center space-x-2';

  const variants = {
    primary: 'bg-primary text-white hover:opacity-95',
    danger: 'bg-danger text-white hover:bg-danger/90',
  };

  const sizes = {
    md: 'py-4 text-base',
    lg: 'py-5 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
