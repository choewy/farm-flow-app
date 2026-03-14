type ModalActionsProps = {
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'danger' | 'primary';
  loading?: boolean;
};

export function ModalActions({
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  confirmVariant = 'primary',
  loading = false,
}: ModalActionsProps) {
  const confirmBase =
    'w-full py-4 rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale';
  const confirmColor =
    confirmVariant === 'danger'
      ? 'bg-danger text-white hover:bg-danger/90'
      : 'bg-primary text-white hover:opacity-95';

  return (
    <div className="pt-6 flex flex-col space-y-2">
      <button
        className={`${confirmBase} ${confirmColor}`}
        onClick={onConfirm}
        disabled={loading}
      >
        {confirmText}
      </button>
      <button
        onClick={onCancel}
        disabled={loading}
        className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors"
      >
        {cancelText}
      </button>
    </div>
  );
}
