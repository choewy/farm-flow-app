import { useState } from 'react';

import { memberApi, MemberResponse } from '../api';

import { getErrorCodeMessage } from '@app/shared/api';
import { Toast } from '@app/shared/toast';
import { Modal, ModalActions } from '@app/shared/ui/modal';

export type MemberDeleteModalProps = {
  isOpen: boolean;
  row: MemberResponse;
  fetchData: () => Promise<void>;
  onClose: () => void;
};

export function MemberDeleteModal({ isOpen, row, fetchData, onClose }: MemberDeleteModalProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteMember = async () => {
    try {
      setLoading(true);
      await memberApi.remove(row.user.id);
      await fetchData();
      onClose();
      Toast.success(`"${row.user.name}이 삭제되었습니다."`);
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      title="멤버 삭제"
      description={`"${row.user.name}"님을 농장에서 삭제하시겠습니까? 삭제 후에는 되돌릴 수 없습니다.`}
      onClose={onClose}
    >
      <ModalActions
        confirmText="삭제"
        cancelText="취소"
        confirmVariant="danger"
        isConfirmLoading={loading}
        onConfirm={handleDeleteMember}
        onCancel={onClose}
      />
    </Modal>
  );
}
