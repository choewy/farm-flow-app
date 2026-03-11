import { useState } from 'react';

import { memberApi, MemberResponse } from '../api';

import { MemberUpdateModalRoleList } from './MeberUpdateModalRoleList';

import { getErrorCodeMessage } from '@app/shared/api';
import { Modal } from '@app/shared/ui/modal';

interface MemberEditModalProps {
  isOpen: boolean;
  row: MemberResponse;
  fetchData: () => Promise<void>;
  onClose: () => void;
}

export function MemberEditModal({ isOpen, row, fetchData, onClose }: MemberEditModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRoleId, setSelectedRoleId] = useState(row.role.id);

  const handleUpdateRole = async () => {
    try {
      setLoading(true);
      await memberApi.update(row.user.id, selectedRoleId);
      await fetchData();
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
    <Modal title="멤버 권한 수정" description={`${row.user.name}님의 농장 권한을 변경합니다.`} onClose={onClose}>
      <div className="space-y-3 pt-2">
        <MemberUpdateModalRoleList selectedRoleId={selectedRoleId} setSelectedRoleId={setSelectedRoleId} />

        <div className="pt-6">
          <button
            className="w-full py-4 bg-primary text-white rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
            onClick={handleUpdateRole}
            disabled={selectedRoleId === row.role.id || loading}
          >
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
}
