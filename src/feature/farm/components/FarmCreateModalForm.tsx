import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { farmApi } from '../api';

import { FarmErrorSection } from './FarmErrorSection';
import { FarmInput } from './FarmInput';

import { getErrorCodeMessage } from '@app/shared/api';
import { useFarmStore } from '@app/shared/stores';
import { zodResolver } from '@hookform/resolvers/zod';

const farmCreateSchema = z.object({
  name: z.string().min(1, '농장 이름을 입력하세요.'),
});

type FarmCreateFormData = z.infer<typeof farmCreateSchema>;
type FarmCreateModalFormProps = {
  onClose: () => void;
};

export function FarmCreateModalForm({ onClose }: FarmCreateModalFormProps) {
  const { fetchFarms } = useFarmStore();
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FarmCreateFormData>({
    resolver: zodResolver(farmCreateSchema),
    mode: 'onSubmit',
    defaultValues: { name: '' },
  });

  const onSubmit = async ({ name }: FarmCreateFormData) => {
    setError('');
    try {
      await farmApi.create({ name });
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
        <span>농장 생성하기</span>
      </button>
    </form>
  );
}
