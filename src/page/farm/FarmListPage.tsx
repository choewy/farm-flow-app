import { useState } from 'react';

import { FarmCreateModal, FarmDeleteModal, FarmFooter, FarmHeader, FarmList, FarmUpdateModal } from '@app/feature/farm';
import { Farm } from '@app/shared/models';

export default function FarmListPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);

  const openUpdateModal = (farm: Farm) => {
    setSelectedFarm(farm);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (farm: Farm) => {
    setSelectedFarm(farm);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex flex-col space-y-6 pb-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <FarmHeader setIsCreateModalOpen={setIsCreateModalOpen} />
      <FarmList openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal} />
      <FarmFooter />
      <FarmCreateModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      {selectedFarm && (
        <>
          <FarmUpdateModal isOpen={isUpdateModalOpen} farm={selectedFarm} onClose={() => setIsUpdateModalOpen(false)} />
          <FarmDeleteModal isOpen={isDeleteModalOpen} farm={selectedFarm} onClose={() => setIsDeleteModalOpen(false)} />
        </>
      )}
    </div>
  );
}
