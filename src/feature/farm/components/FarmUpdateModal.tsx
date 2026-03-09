import { FarmUpdateModalForm } from './FarmUpdateModalForm';

import { Farm } from '@app/shared/models';
import { Modal } from '@app/shared/ui/modal';

interface FarmUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  farm: Farm;
}

export function FarmUpdateModal({ isOpen, onClose, farm }: FarmUpdateModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal title="농장 수정" description="농장 정보를 수정하세요." footer="Farm Flow Management System" onClose={onClose}>
      <FarmUpdateModalForm farm={farm} />
    </Modal>
  );
}
