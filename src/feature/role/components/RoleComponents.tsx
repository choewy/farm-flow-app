import { useState } from 'react';
import { CheckCircle2, Circle,Shield, Trash2 } from 'lucide-react';

import { PermissionKey,Role } from '@app/shared/models';
import { Modal } from '@app/shared/ui/modal';

interface RoleItemProps {
  role: Role;
  onDelete: (role: Role) => void;
}

export function RoleItem({ role, onDelete }: RoleItemProps) {
  return (
    <div className="group relative flex items-center justify-between rounded-[2.5rem] bg-white p-6 shadow-premium ring-1 ring-slate-100 transition-all duration-300 hover:shadow-premium-lg active:scale-[0.99]">
      <div className="flex items-center space-x-5">
        <div className={`flex h-16 w-16 items-center justify-center rounded-4xl ${role.super ? 'bg-amber-100 text-amber-600' : 'bg-primary/10 text-primary'} transition-transform group-hover:scale-105`}>
          <Shield size={32} />
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-slate-800">{role.name}</span>
            {role.super && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-600 text-[10px] font-black uppercase tracking-wider">
                SUPER
              </span>
            )}
            {role.required && (
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                REQUIRED
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1 font-medium">
            권한 {role.permissionKeys.length}개 보유
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {!role.required && (
          <button
            onClick={() => onDelete(role)}
            className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
            title="역할 삭제"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

const PERMISSION_LABELS: Record<PermissionKey, string> = {
  [PermissionKey.InvitationCreate]: '초대 생성',
  [PermissionKey.AttendanceQrCreate]: '출퇴근 QR 생성',
  [PermissionKey.Update]: '농장 정보 수정',
  [PermissionKey.Delete]: '농장 삭제',
  [PermissionKey.RoleManagement]: '역할 관리',
  [PermissionKey.MemberRead]: '멤버 조회',
  [PermissionKey.MemberRoleUpdate]: '멤버 권한 관리',
  [PermissionKey.MemberRemove]: '멤버 삭제',
};

interface RoleCreateModalProps {
  onClose: () => void;
  onConfirm: (name: string, permissionKeys: PermissionKey[]) => void;
  isSubmitting: boolean;
}

export function RoleCreateModal({ onClose, onConfirm, isSubmitting }: RoleCreateModalProps) {
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionKey[]>([]);

  const togglePermission = (key: PermissionKey) => {
    setSelectedPermissions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <Modal
      title="새 역할 생성"
      description="새로운 역할을 만들고 권한을 부여합니다."
      onClose={onClose}
    >
      <div className="space-y-6 pt-2">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
            역할 이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 매니저"
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-3xl text-slate-800 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
            권한 선택
          </label>
          <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {(Object.entries(PERMISSION_LABELS) as [PermissionKey, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => togglePermission(key)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                  selectedPermissions.includes(key)
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-slate-50 bg-white text-slate-400 hover:border-slate-200'
                }`}
              >
                <span className={`font-bold ${selectedPermissions.includes(key) ? 'text-slate-800' : 'text-slate-500'}`}>
                  {label}
                </span>
                {selectedPermissions.includes(key) ? (
                  <CheckCircle2 size={20} className="text-primary" />
                ) : (
                  <Circle size={20} className="text-slate-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onConfirm(name, selectedPermissions)}
            disabled={isSubmitting || !name.trim() || selectedPermissions.length === 0}
            className="w-full py-4 bg-primary text-white rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
          >
            {isSubmitting ? '생성 중...' : '역할 생성하기'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

interface RoleDeleteModalProps {
  role: Role;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export function RoleDeleteModal({ role, onClose, onConfirm, isSubmitting }: RoleDeleteModalProps) {
  return (
    <Modal
      title="역할 삭제"
      description={`${role.name} 역할을 삭제하시겠습니까? 해당 역할을 가진 멤버들의 권한에 영항을 줄 수 있습니다.`}
      onClose={onClose}
    >
      <div className="pt-6">
        <button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="w-full py-4 bg-red-500 text-white rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
        >
          {isSubmitting ? '삭제 중...' : '역할 삭제하기'}
        </button>
        <button
          onClick={onClose}
          className="w-full py-4 mt-2 text-slate-400 font-bold hover:text-slate-600 transition-colors"
        >
          취소
        </button>
      </div>
    </Modal>
  );
}
