import { useState } from 'react';
import { Mail,Shield, Trash2, UserCog } from 'lucide-react';

import { MemberResponse } from '../api/member.types';

import { Role } from '@app/shared/models';
import { Modal } from '@app/shared/ui/modal';

interface MemberItemProps {
  member: MemberResponse;
  onEdit: (member: MemberResponse) => void;
  onDelete: (member: MemberResponse) => void;
}

export function MemberItem({ member, onEdit, onDelete }: MemberItemProps) {
  return (
    <div className="group relative flex items-center justify-between rounded-[2.5rem] bg-white p-6 shadow-premium ring-1 ring-slate-100 transition-all duration-300 hover:shadow-premium-lg active:scale-[0.99]">
      <div className="flex items-center space-x-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-4xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
          <span className="text-xl font-black">{member.user.name.charAt(0)}</span>
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-slate-800">{member.user.name}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
              member.role.super ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'
            }`}>
              {member.role.name}
            </span>
          </div>
          <div className="flex items-center space-x-3 mt-1">
            <div className="flex items-center text-slate-400 text-xs">
              <Mail size={12} className="mr-1" />
              {member.user.email}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(member)}
          className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary/10 hover:text-primary transition-all duration-200"
          title="권한 수정"
        >
          <UserCog size={20} />
        </button>
        {!member.role.required && (
          <button
            onClick={() => onDelete(member)}
            className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
            title="멤버 삭제"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

interface MemberEditModalProps {
  member: MemberResponse;
  roles: Role[];
  onClose: () => void;
  onConfirm: (roleId: string) => void;
  isSubmitting: boolean;
}

export function MemberEditModal({ member, roles, onClose, onConfirm, isSubmitting }: MemberEditModalProps) {
  const [selectedRoleId, setSelectedRoleId] = useState(member.role.id);

  return (
    <Modal
      title="멤버 권한 수정"
      description={`${member.user.name}님의 농장 권한을 변경합니다.`}
      onClose={onClose}
    >
      <div className="space-y-3 pt-2">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRoleId(role.id)}
            className={`w-full flex items-center justify-between p-4 rounded-3xl border-2 transition-all duration-200 ${
              selectedRoleId === role.id
                ? 'border-primary bg-primary/5'
                : 'border-slate-50 bg-white hover:border-slate-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl ${selectedRoleId === role.id ? 'bg-primary/10 text-primary' : 'bg-slate-50 text-slate-400'}`}>
                <Shield size={18} />
              </div>
              <div className="text-left">
                <span className={`block font-bold ${selectedRoleId === role.id ? 'text-slate-800' : 'text-slate-500'}`}>
                  {role.name}
                </span>
              </div>
            </div>
            {selectedRoleId === role.id && (
              <div className="h-2 w-2 rounded-full bg-primary" />
            )}
          </button>
        ))}

        <div className="pt-6">
          <button
            onClick={() => onConfirm(selectedRoleId)}
            disabled={isSubmitting || selectedRoleId === member.role.id}
            className="w-full py-4 bg-primary text-white rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
          >
            {isSubmitting ? '수정 중...' : '권한 수정하기'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

interface MemberDeleteModalProps {
  member: MemberResponse;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export function MemberDeleteModal({ member, onClose, onConfirm, isSubmitting }: MemberDeleteModalProps) {
  return (
    <Modal
      title="멤버 삭제"
      description={`${member.user.name}님을 농장에서 삭제하시겠습니까? 삭제 후에는 되돌릴 수 없습니다.`}
      onClose={onClose}
    >
      <div className="pt-6">
        <button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="w-full py-4 bg-red-500 text-white rounded-3xl font-bold shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
        >
          {isSubmitting ? '삭제 중...' : '멤버 삭제하기'}
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
