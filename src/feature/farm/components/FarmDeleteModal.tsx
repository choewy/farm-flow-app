import { FarmDeleteModalContent } from './FarmDeleteModalContent';

import { Farm } from '@app/shared/models';
import { Modal } from '@app/shared/ui/modal';

interface FarmDeleteModalProps {
  isOpen: boolean;
  farm: Farm;
  onClose: () => void;
}

export function FarmDeleteModal({ isOpen, onClose, farm }: FarmDeleteModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal title="농장 삭제" footer="Farm Flow Management System" onClose={onClose}>
      <FarmDeleteModalContent farm={farm} onClose={onClose} />
    </Modal>
  );
}
