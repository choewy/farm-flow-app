import { useState } from 'react';

import { memberApi, MemberResponse } from '../api';

import { getErrorCodeMessage } from '@app/shared/api';
import { Toast } from '@app/shared/toast';
import { Modal } from '@app/shared/ui/modal';

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
      <div className="pt-6">
        <button
          className="w-full py-4 bg-red-500 text-white rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
          onClick={handleDeleteMember}
          disabled={loading}
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
