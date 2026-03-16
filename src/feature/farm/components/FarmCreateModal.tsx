import { FarmCreateModalForm } from './FarmCreateModalForm';

import { Modal } from '@app/shared/ui/modal';

interface FarmCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FarmCreateModal({ isOpen, onClose }: FarmCreateModalProps) {
  if (!isOpen) return null;

  return (
    <Modal
      title="새 농장 생성"
      description="새로운 농장을 생성하세요."
      footer="Farm Flow Management System"
      onClose={onClose}
      mobilePosition="center"
    >
      <FarmCreateModalForm onClose={onClose} />
    </Modal>
  );
}
