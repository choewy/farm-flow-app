import { PrimaryButton } from '../PrimaryButton';

export type ModalActionsProps = {
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isConfirmDisabled?: boolean;
  isConfirmLoading?: boolean;
  confirmVariant?: 'primary' | 'danger';
};

export function ModalActions({
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  isConfirmDisabled = false,
  isConfirmLoading = false,
  confirmVariant = 'primary',
}: ModalActionsProps) {
  return (
    <div className="flex flex-col space-y-2 pt-2">
      <PrimaryButton
        text={confirmText}
        onClick={onConfirm}
        disabled={isConfirmDisabled}
        isLoading={isConfirmLoading}
        variant={confirmVariant}
      />
      <button
        onClick={onCancel}
        disabled={isConfirmLoading}
        className="w-full py-3.5 text-slate-400 font-bold hover:text-slate-600 transition-colors rounded-xl"
      >
        {cancelText}
      </button>
    </div>
  );
}
