import { useCallback,useEffect, useState } from 'react';
import { Plus,Shield } from 'lucide-react';

import { roleApi, RoleCreateModal, RoleDeleteModal,RoleItem } from '@app/feature/role';
import { PermissionKey,Role } from '@app/shared/models';

export function RolePage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRoles = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await roleApi.list();
      setRoles(data.rows);
    } catch (error) {
      console.error('Failed to fetch roles', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleCreateRole = async (name: string, permissionKeys: PermissionKey[]) => {
    setIsSubmitting(true);
    try {
      await roleApi.create({ name, permissionKeys });
      await fetchRoles();
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to create role', error);
      alert('역할 생성에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRole = async () => {
    if (!deletingRole) return;

    setIsSubmitting(true);
    try {
      await roleApi.remove(deletingRole.id);
      await fetchRoles();
      setDeletingRole(null);
    } catch (error) {
      console.error('Failed to delete role', error);
      alert('역할 삭제에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Info */}
      <div className="bg-white rounded-4xl p-6 shadow-premium ring-1 ring-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">역할 관리</h2>
            <p className="text-lg font-bold text-slate-800">총 {roles.length}개의 역할</p>
          </div>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Role List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-8 w-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-slate-400 font-bold">역할 목록을 불러오는 중...</p>
          </div>
        ) : roles.length > 0 ? (
          roles.map((role) => (
            <RoleItem
              key={role.id}
              role={role}
              onDelete={setDeletingRole}
            />
          ))
        ) : (
          <div className="bg-white rounded-4xl p-12 shadow-premium ring-1 ring-slate-100 text-center">
            <p className="text-slate-400 font-bold">등록된 역할이 없습니다.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {isCreating && (
        <RoleCreateModal
          isSubmitting={isSubmitting}
          onClose={() => setIsCreating(false)}
          onConfirm={handleCreateRole}
        />
      )}

      {deletingRole && (
        <RoleDeleteModal
          role={deletingRole}
          isSubmitting={isSubmitting}
          onClose={() => setDeletingRole(null)}
          onConfirm={handleDeleteRole}
        />
      )}

      <div className="p-4 bg-slate-100/50 rounded-3xl">
        <p className="text-[11px] text-slate-400 leading-relaxed uppercase tracking-wider font-bold">
          * 시스템 필수 역할(REQUIRED)은 삭제할 수 없습니다. <br />
          * 역할 삭제 시 해당 역할을 가진 멤버들의 권한에 주의하십시오.
        </p>
      </div>
    </div>
  );
}
