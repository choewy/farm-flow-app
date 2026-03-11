import { useState } from 'react';

import { roleApi } from '../api';

import { getErrorCodeMessage } from '@app/shared/api';
import { Role } from '@app/shared/models';
import { Modal } from '@app/shared/ui/modal';

export type RoleDeleteModalProps = {
  isOpen: boolean;
  selectedRow: Role;
  onClose: () => void;
  fetchRoles: () => Promise<void>;
};

export function RoleDeleteModal({ isOpen, selectedRow, onClose, fetchRoles }: RoleDeleteModalProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await roleApi.remove(selectedRow.id);
      await fetchRoles();
      onClose();
    } catch (e) {
      alert(getErrorCodeMessage(e));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      title="역할 삭제"
      description={`"${selectedRow.name}" 역할을 삭제하시겠습니까? 해당 역할을 가진 멤버들의 역할은 "기본"으로 변경됩니다.`}
      onClose={onClose}
    >
      <div className="pt-6">
        <button
          className="w-full py-4 bg-red-500 text-white rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
          disabled={loading}
          onClick={handleDelete}
        >
          삭제
        </button>
        <button onClick={onClose} className="w-full py-4 mt-2 text-slate-400 font-bold hover:text-slate-600 transition-colors">
          취소
        </button>
      </div>
    </Modal>
  );
}
