import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { farmApi } from '../api';

import { FarmErrorSection } from './FarmErrorSection';
import { FarmInput } from './FarmInput';

import { getErrorCodeMessage } from '@app/shared/api';
import { Farm } from '@app/shared/models';
import { useFarmStore } from '@app/shared/stores';
import { zodResolver } from '@hookform/resolvers/zod';

const farmUpdateSchema = z.object({
  name: z.string().min(1, '농장 이름을 입력하세요.'),
});

type FarmUpdateFormData = z.infer<typeof farmUpdateSchema>;
type FarmUpdateModalFormProps = {
  farm: Farm;
  onClose: () => void;
};

export function FarmUpdateModalForm({ farm, onClose }: FarmUpdateModalFormProps) {
  const { fetchFarms } = useFarmStore();
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FarmUpdateFormData>({
    resolver: zodResolver(farmUpdateSchema),
    mode: 'onSubmit',
    defaultValues: { name: farm.name },
  });

  const onSubmit = async ({ name }: FarmUpdateFormData) => {
    setError('');
    try {
      await farmApi.update(farm.id, { name });
      await fetchFarms();
      onClose();
    } catch (e) {
      setError(getErrorCodeMessage(e));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FarmInput
        labelText="farm name"
        inputProps={{ type: 'text', placeholder: '농장 이름을 입력하세요', autoComplete: 'off' }}
        registerProps={register('name')}
        errors={errors}
      />

      <FarmErrorSection error={error} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-5 bg-primary text-white rounded-3xl font-black text-lg shadow-premium hover:opacity-95 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center space-x-2"
      >
        <span>저장</span>
      </button>
    </form>
  );
}
