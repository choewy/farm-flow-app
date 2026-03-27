import { useState } from 'react';

import { farmApi } from '../api';

import { getErrorCodeMessage } from '@app/shared/api';
import { Farm } from '@app/shared/models';
import { useFarmStore } from '@app/shared/stores';
import { Toast } from '@app/shared/toast';
import { ModalActions } from '@app/shared/ui/modal';

type FarmDeleteModalContentProps = {
  farm: Farm;
  onClose: () => void;
};

export function FarmDeleteModalContent({ farm, onClose }: FarmDeleteModalContentProps) {
  const { fetchFarms } = useFarmStore();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await farmApi.remove(farm.id);
      await fetchFarms({ force: true });
      onClose();
      Toast.success(`"${farm.name}" 농장이 삭제되었습니다.`);
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="py-4">
        <p className="text-sm text-slate-400 font-medium leading-relaxed">
          정말로 <span className="text-danger font-bold">"{farm.name}"</span> 농장을 삭제하시겠습니까?
          <br />
          관련 데이터가 모두 소실될 수 있습니다.
        </p>
      </div>
      <ModalActions
        confirmText="삭제"
        cancelText="취소"
        confirmVariant="danger"
        isConfirmLoading={loading}
        onConfirm={handleDelete}
        onCancel={onClose}
      />
    </>
  );
}
