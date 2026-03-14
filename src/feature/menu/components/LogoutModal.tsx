import { authApi } from '@app/feature/auth';
import { useAuthStore } from '@app/shared/stores';
import { Toast } from '@app/shared/toast';
import { Modal } from '@app/shared/ui/modal';
import { ModalActions } from '@app/shared/ui/modal/ModalActions';

export type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const { clearSession } = useAuthStore();

  const handleLogout = async () => {
    await authApi.logout().catch();
    onClose();
    Toast.info('로그아웃되었습니다.');
    clearSession();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal title="로그아웃" description="로그아웃을 하시겠습니까?" onClose={onClose}>
      <ModalActions
        confirmText="로그아웃"
        cancelText="취소"
        confirmVariant="danger"
        onConfirm={handleLogout}
        onCancel={onClose}
      />
    </Modal>
  );
}
