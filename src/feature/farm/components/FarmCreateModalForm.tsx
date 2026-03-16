import { useForm } from 'react-hook-form';
import z from 'zod';

import { farmApi } from '../api';

import { getErrorCodeMessage } from '@app/shared/api';
import { Formatter } from '@app/shared/helpers';
import { useFarmStore } from '@app/shared/stores';
import { Toast } from '@app/shared/toast';
import { FormInput, FormMoneyInput } from '@app/shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

const farmCreateSchema = z.object({
  name: z.string().min(1, '농장 이름을 입력하세요.'),
  payRatePerHour: z
    .string()
    .min(1, '시급을 입력하세요.')
    .transform((value) => Formatter.toInt(value))
    .pipe(z.number().int('시급은 원 단위로 입력하세요.').min(0, '시급은 0원 이상이어야 합니다.')),
  payDeductionAmount: z
    .string()
    .min(1, '급여 공제액을 입력하세요.')
    .transform((value) => Formatter.toInt(value))
    .pipe(z.number().int('급여 공제액은 원 단위로 입력하세요.').min(0, '급여 공제액은 0원 이상이어야 합니다.')),
});

type FarmCreateFormData = z.infer<typeof farmCreateSchema>;
type FarmCreateFormInput = z.input<typeof farmCreateSchema>;
type FarmCreateModalFormProps = {
  onClose: () => void;
};

export function FarmCreateModalForm({ onClose }: FarmCreateModalFormProps) {
  const { fetchFarms } = useFarmStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FarmCreateFormInput, unknown, FarmCreateFormData>({
    resolver: zodResolver(farmCreateSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      payRatePerHour: '0',
      payDeductionAmount: '0',
    },
  });

  const onSubmit = async ({ name, payRatePerHour, payDeductionAmount }: FarmCreateFormData) => {
    try {
      await farmApi.create({ name, payRatePerHour, payDeductionAmount });
      await fetchFarms();
      Toast.success(`"${name}" 농장이 생성되었습니다.`);
      onClose();
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
        labelText="시급(단위 : 원/1시간)"
        inputProps={{ placeholder: '시급을 입력하세요' }}
        registerProps={register('payRatePerHour')}
        errors={errors}
      />

      <FormMoneyInput
        labelText="급여 공제액(단위 : 원/1개월)"
        inputProps={{ placeholder: '급여 공제액을 입력하세요' }}
        registerProps={register('payDeductionAmount')}
        errors={errors}
      />

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
