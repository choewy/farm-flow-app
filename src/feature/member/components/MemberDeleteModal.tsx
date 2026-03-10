import { memberApi, MemberResponse } from '../api';

import { getErrorCodeMessage } from '@app/shared/api';
import { Modal } from '@app/shared/ui/modal';

export type MemberDeleteModalProps = {
  isOpen: boolean;
  row: MemberResponse;
  fetchData: () => Promise<void>;
  onClose: () => void;
};

export function MemberDeleteModal({ isOpen, row, fetchData, onClose }: MemberDeleteModalProps) {
  const handleDeleteMember = async () => {
    try {
      await memberApi.remove(row.user.id);
      await fetchData();
      onClose();
    } catch (e) {
      alert(getErrorCodeMessage(e));
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      title="멤버 삭제"
      description={`${row.user.name}님을 농장에서 삭제하시겠습니까? 삭제 후에는 되돌릴 수 없습니다.`}
      onClose={onClose}
    >
      <div className="pt-6">
        <button
          className="w-full py-4 bg-red-500 text-white rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
          onClick={handleDeleteMember}
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
