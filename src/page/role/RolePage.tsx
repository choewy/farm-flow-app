import { useCallback, useEffect, useState } from 'react';

import {
  roleApi,
  RoleCreateModal,
  RoleDeleteModal,
  RoleDetailModal,
  RoleFooter,
  RoleHeader,
  RoleList,
  RoleListResponse,
  RoleUpdateModal,
} from '@app/feature/role';
import { getErrorCodeMessage } from '@app/shared/api';
import { Role } from '@app/shared/models';
import { Toast } from '@app/shared/toast';

export function RolePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<RoleListResponse>({
    total: 0,
    rows: [],
  });

  const [selectedRow, setSelectedRow] = useState<Role | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await roleApi.list();
      setResponse(data);
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const openDetailModal = (row: Role) => {
    setSelectedRow(row);
    setIsDetailModalOpen(true);
  };

  const openUpdateModal = (row: Role) => {
    setSelectedRow(row);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (row: Role) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex flex-col space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <RoleHeader total={response.total} openCreateModal={() => setIsCreateModalOpen(true)} />
      <RoleList
        loading={loading}
        rows={response.rows}
        openDetailModal={openDetailModal}
        openUpdateModal={openUpdateModal}
        openDeleteModal={openDeleteModal}
      />
      <RoleCreateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} fetchRoles={fetchRoles} />
      <RoleFooter />
      {selectedRow && (
        <>
          <RoleDetailModal isOpen={isDetailModalOpen} selectedRow={selectedRow} onClose={() => setIsDetailModalOpen(false)} />
          <RoleUpdateModal
            isOpen={isUpdateModalOpen}
            selectedRow={selectedRow}
            onClose={() => setIsUpdateModalOpen(false)}
            fetchRoles={fetchRoles}
          />
          <RoleDeleteModal
            isOpen={isDeleteModalOpen}
            selectedRow={selectedRow}
            onClose={() => setIsDeleteModalOpen(false)}
            fetchRoles={fetchRoles}
          />
        </>
      )}
    </div>
  );
}
