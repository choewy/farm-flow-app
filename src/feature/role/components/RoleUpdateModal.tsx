import { useState } from 'react';

import { roleApi } from '../api';
import { useRolePermissionState } from '../hooks';

import { RolePermissionList } from './RolePermissionList';

import { getErrorCodeMessage } from '@app/shared/api';
import { Role } from '@app/shared/models';
import { Modal } from '@app/shared/ui/modal';

export type RoleUpdateModalProps = {
  isOpen: boolean;
  selectedRow: Role;
  onClose: () => void;
  fetchRoles: () => Promise<void>;
};

export function RoleUpdateModal({ isOpen, selectedRow, onClose, fetchRoles }: RoleUpdateModalProps) {
  const [name, setName] = useState(selectedRow.name);
  const [loading, setLoading] = useState<boolean>(false);

  const { permissionKeys, onClickHandler } = useRolePermissionState(selectedRow.permissionKeys);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await roleApi.update(selectedRow.id, { name, permissionKeys });
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
    <Modal title="역할 정보 수정" description="역할 정보를 수정합니다." onClose={onClose}>
      <div className="space-y-6 pt-2">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">역할 이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 매니저"
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-3xl text-slate-800 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">권한 선택</label>
          <RolePermissionList permissionKeys={permissionKeys} onClickHandler={onClickHandler} />
        </div>

        <div className="pt-2">
          <button
            className="w-full py-4 bg-primary text-white rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
            onClick={handleUpdate}
            disabled={loading || !name.trim() || permissionKeys.length === 0}
          >
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
}
