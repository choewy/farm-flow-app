import { useCallback, useEffect, useState } from 'react';

import {
  memberApi,
  MemberDeleteModal,
  MemberEditModal,
  MemberHeader,
  MemberInfo,
  MemberList,
  MemberListResponse,
  MemberResponse,
} from '@app/feature/member';
import { getErrorCodeMessage } from '@app/shared/api';
import { Toast } from '@app/shared/toast';

export default function MemberPage() {
  const [loading, setIsLoading] = useState(true);
  const [response, setResponse] = useState<MemberListResponse>({
    total: 0,
    rows: [],
  });

  const [selectedRow, setSelectedRow] = useState<MemberResponse | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await memberApi.list();
      setResponse(data);
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openUpdateModal = (row: MemberResponse) => {
    setSelectedRow(row);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (row: MemberResponse) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const closeUpdateModal = () => setIsUpdateModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className="flex flex-col space-y-2 w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <MemberHeader total={response.total} />
      <MemberInfo />
      <MemberList loading={loading} rows={response.rows} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal} />
      {selectedRow && (
        <>
          <MemberEditModal isOpen={isUpdateModalOpen} row={selectedRow} fetchData={fetchData} onClose={closeUpdateModal} />
          <MemberDeleteModal isOpen={isDeleteModalOpen} row={selectedRow} fetchData={fetchData} onClose={closeDeleteModal} />
        </>
      )}
    </div>
  );
}
