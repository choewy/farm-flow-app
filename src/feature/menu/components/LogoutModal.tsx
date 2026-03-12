import { authApi } from '@app/feature/auth';
import { useAuthStore } from '@app/shared/stores';
import { Toast } from '@app/shared/toast';
import { Modal } from '@app/shared/ui/modal';

export type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const { clearSession } = useAuthStore();

  const handleDelete = async () => {
    await authApi.logout().catch();
    onClose();
    Toast.info('로그아웃되었습니다.');
    clearSession();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal title="로그아웃" description={`로그아웃을 하시겠습니까?`} onClose={onClose}>
      <div className="pt-6">
        <button
          className="w-full py-4 bg-red-500 text-white rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
          onClick={handleDelete}
        >
          로그아웃
        </button>
        <button onClick={onClose} className="w-full py-4 mt-2 text-slate-400 font-bold hover:text-slate-600 transition-colors">
          취소
        </button>
      </div>
    </Modal>
  );
}
