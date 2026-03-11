import { useState } from 'react';

import { farmApi } from '../api';

import { getErrorCodeMessage } from '@app/shared/api';
import { Farm } from '@app/shared/models';
import { useFarmStore } from '@app/shared/stores';
import { Toast } from '@app/shared/toast';

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
      await fetchFarms();
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
      <div className="mb-8">
        <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed">
          정말로 <span className="text-rose-500 font-bold">"{farm.name}"</span> 농장을 삭제하시겠습니까?
          <br />
          관련 데이터가 모두 소실될 수 있습니다.
        </p>
      </div>

      <div className="flex flex-col space-y-3">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="w-full py-5 bg-rose-500 text-white rounded-3xl font-black text-lg shadow-lg hover:bg-rose-600 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <span>삭제</span>
        </button>
        <button
          onClick={onClose}
          disabled={loading}
          className="w-full py-4 bg-slate-50 text-slate-400 rounded-3xl font-black text-sm hover:bg-slate-100 transition-all"
        >
          취소
        </button>
      </div>
    </>
  );
}
