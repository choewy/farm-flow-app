import { useState } from 'react';

import { useRolePermissionState } from '../hooks';

import { RolePermissionList } from './RolePermissionList';

import { Role } from '@app/shared/models';
import { Modal } from '@app/shared/ui/modal';

export type RoleDetailModalProps = {
  isOpen: boolean;
  selectedRow: Role;
  onClose: () => void;
};

export function RoleDetailModal({ isOpen, selectedRow, onClose }: RoleDetailModalProps) {
  const [name, setName] = useState(selectedRow.name);
  const { permissionKeys, onClickHandler } = useRolePermissionState(selectedRow.permissionKeys);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal title="역할 상세 정보" description="역할의 상세 정보를 확인합니다." onClose={onClose}>
      <div className="space-y-6 pt-2">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">역할 이름</label>
          <input
            readOnly
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 매니저"
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-3xl text-slate-800 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">권한</label>
          <RolePermissionList permissionKeys={permissionKeys} onClickHandler={onClickHandler} readOnly />
        </div>

        <div className="pt-2">
          <button
            className="w-full py-4 bg-primary text-white rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </Modal>
  );
}
