import { useState } from 'react';

import { roleApi } from '../api';
import { useRolePermissionState } from '../hooks';

import { RolePermissionList } from './RolePermissionList';

import { getErrorCodeMessage } from '@app/shared/api';
import { Modal } from '@app/shared/ui/modal';

export type RoleCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchRoles: () => Promise<void>;
};

export function RoleCreateModal({ isOpen, onClose, fetchRoles }: RoleCreateModalProps) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const { permissionKeys, onClickHandler } = useRolePermissionState([]);

  const handleCreateRole = async () => {
    try {
      setLoading(true);
      await roleApi.create({ name, permissionKeys });
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
    <Modal title="새 역할 생성" description="새로운 역할을 만들고 권한을 부여합니다." onClose={onClose}>
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
            onClick={handleCreateRole}
            disabled={loading || !name.trim() || permissionKeys.length === 0}
          >
            역할 생성
          </button>
        </div>
      </div>
    </Modal>
  );
}
