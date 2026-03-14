import { PrimaryButton } from '@app/shared/ui/PrimaryButton';

export type AuthButtonProps = {
  text: string;
  disabled: boolean;
};

export function AuthButton({ disabled, text }: AuthButtonProps) {
  return <PrimaryButton type="submit" disabled={disabled} text={text} />;
}
