import { useForm } from 'react-hook-form';
import z from 'zod';

import { farmApi } from '../api';

import { getErrorCodeMessage } from '@app/shared/api';
import { Formatter } from '@app/shared/helpers';
import { Farm } from '@app/shared/models';
import { useFarmStore } from '@app/shared/stores';
import { Toast } from '@app/shared/toast';
import { FormInput, FormMoneyInput } from '@app/shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

const farmUpdateSchema = z.object({
  name: z.string().min(1, '농장 이름을 입력하세요.'),
  payRatePerHour: z
    .string()
    .min(1, '시급을 입력하세요.')
    .transform((value) => Formatter.toInt(value))
    .pipe(z.number().int('시급은 원 단위로 입력하세요.').min(0, '시급은 0원 이상이어야 합니다.')),
  payDeductionAmount: z
    .string()
    .min(1, '월 공제액을 입력하세요.')
    .transform((value) => Formatter.toInt(value))
    .pipe(z.number().int('월 공제액은 원 단위로 입력하세요.').min(0, '월 공제액은 0원 이상이어야 합니다.')),
});

type FarmUpdateFormData = z.infer<typeof farmUpdateSchema>;
type FarmUpdateFormInput = z.input<typeof farmUpdateSchema>;
type FarmUpdateModalFormProps = {
  farm: Farm;
  onClose: () => void;
};

export function FarmUpdateModalForm({ farm, onClose }: FarmUpdateModalFormProps) {
  const { fetchFarms } = useFarmStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FarmUpdateFormInput, unknown, FarmUpdateFormData>({
    resolver: zodResolver(farmUpdateSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: farm.name,
      payRatePerHour: Formatter.toMoney(farm.payRatePerHour),
      payDeductionAmount: Formatter.toMoney(farm.payDeductionAmount),
    },
  });

  const onSubmit = async ({ name, payRatePerHour, payDeductionAmount }: FarmUpdateFormData) => {
    try {
      await farmApi.update(farm.id, { name, payRatePerHour, payDeductionAmount });
      await fetchFarms();
      onClose();
      Toast.success('저장되었습니다.');
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        labelText="농장 이름"
        inputProps={{ type: 'text', placeholder: '농장 이름을 입력하세요', autoComplete: 'off' }}
        registerProps={register('name')}
        errors={errors}
      />

      <FormMoneyInput
        labelText="시급"
        inputProps={{ placeholder: '시급을 입력하세요' }}
        registerProps={register('payRatePerHour')}
        errors={errors}
      />

      <FormMoneyInput
        labelText="월 공제액"
        inputProps={{ placeholder: '월 공제액을 입력하세요' }}
        registerProps={register('payDeductionAmount')}
        errors={errors}
      />

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
