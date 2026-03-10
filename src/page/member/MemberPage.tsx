import { useCallback,useEffect, useState } from 'react';
import { UserPlus,Users } from 'lucide-react';

import { memberApi, MemberDeleteModal,MemberEditModal, MemberItem, MemberResponse } from '@app/feature/member';
import { roleApi } from '@app/feature/role/api';
import { Role } from '@app/shared/models';

export function MemberPage() {
  const [members, setMembers] = useState<MemberResponse[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editingMember, setEditingMember] = useState<MemberResponse | null>(null);
  const [deletingMember, setDeletingMember] = useState<MemberResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [memberRes, roleRes] = await Promise.all([memberApi.list(), roleApi.list()]);
      setMembers(memberRes.data.rows);
      setRoles(roleRes.data.rows);
    } catch (error) {
      console.error('Failed to fetch member page data', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdateRole = async (roleId: string) => {
    if (!editingMember) return;

    setIsSubmitting(true);
    try {
      await memberApi.update(editingMember.user.id, roleId);
      await fetchData();
      setEditingMember(null);
    } catch (error) {
      console.error('Failed to update member role', error);
      alert('권한 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMember = async () => {
    if (!deletingMember) return;

    setIsSubmitting(true);
    try {
      await memberApi.remove(deletingMember.user.id);
      await fetchData();
      setDeletingMember(null);
    } catch (error) {
      console.error('Failed to delete member', error);
      alert('멤버 삭제에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Info */}
      <div className="bg-white rounded-4xl p-6 shadow-premium ring-1 ring-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">멤버 관리</h2>
            <p className="text-lg font-bold text-slate-800">총 {members.length}명의 멤버</p>
          </div>
        </div>

        <button
          onClick={() => alert('초대 기능은 준비 중입니다.')}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
        >
          <UserPlus size={24} />
        </button>
      </div>

      {/* Member List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-slate-400 font-bold">멤버 목록을 불러오는 중...</p>
          </div>
        ) : members.length > 0 ? (
          members.map((member) => (
            <MemberItem key={member.user.id} member={member} onEdit={setEditingMember} onDelete={setDeletingMember} />
          ))
        ) : (
          <div className="bg-white rounded-4xl p-12 shadow-premium ring-1 ring-slate-100 text-center">
            <p className="text-slate-400 font-bold">등록된 멤버가 없습니다.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {editingMember && (
        <MemberEditModal
          member={editingMember}
          roles={roles}
          isSubmitting={isSubmitting}
          onClose={() => setEditingMember(null)}
          onConfirm={handleUpdateRole}
        />
      )}

      {deletingMember && (
        <MemberDeleteModal
          member={deletingMember}
          isSubmitting={isSubmitting}
          onClose={() => setDeletingMember(null)}
          onConfirm={handleDeleteMember}
        />
      )}

      <div className="p-4 bg-slate-100/50 rounded-3xl">
        <p className="text-[11px] text-slate-400 leading-relaxed uppercase tracking-wider font-bold">
          * 관리자 권한을 가진 멤버만 멤버 관리 기능을 사용할 수 있습니다. <br />* 농장 소유주는 삭제할 수 없습니다.
        </p>
      </div>
    </div>
  );
}
