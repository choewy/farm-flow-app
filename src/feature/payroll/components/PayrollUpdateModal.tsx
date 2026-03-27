import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { memberApi } from '@app/feature/member/api';
import { getErrorCodeMessage } from '@app/shared/api';
import { Formatter } from '@app/shared/helpers';
import { Toast } from '@app/shared/toast';
import { FormMoneyInput } from '@app/shared/ui/form';
import { Modal } from '@app/shared/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';

const payrollUpdateSchema = z.object({
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

type PayrollUpdateFormInput = z.input<typeof payrollUpdateSchema>;
type PayrollUpdateFormData = z.infer<typeof payrollUpdateSchema>;

type PayrollUpdateModalProps = {
  isOpen: boolean;
  userId: string;
  userName: string;
  payRatePerHour: number;
  payDeductionAmount: number;
  onClose: () => void;
  onSaved: () => Promise<void>;
};

export function PayrollUpdateModal({
  isOpen,
  userId,
  userName,
  payRatePerHour,
  payDeductionAmount,
  onClose,
  onSaved,
}: PayrollUpdateModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PayrollUpdateFormInput, unknown, PayrollUpdateFormData>({
    resolver: zodResolver(payrollUpdateSchema),
    mode: 'onSubmit',
    defaultValues: {
      payRatePerHour: Formatter.toMoney(payRatePerHour),
      payDeductionAmount: Formatter.toMoney(payDeductionAmount),
    },
  });

  useEffect(() => {
    reset({
      payRatePerHour: Formatter.toMoney(payRatePerHour),
      payDeductionAmount: Formatter.toMoney(payDeductionAmount),
    });
  }, [payDeductionAmount, payRatePerHour, reset]);

  const handleUpdate = async ({ payRatePerHour, payDeductionAmount }: PayrollUpdateFormData) => {
    try {
      await memberApi.updatePayroll(userId, { payRatePerHour, payDeductionAmount });
      await onSaved();
      Toast.success('급여 정보가 수정되었습니다.');
      onClose();
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal title="급여 정보 수정" description={`${userName}님의 시급과 월 공제액을 수정합니다.`} onClose={onClose} mobilePosition="center">
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5 pt-2">
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
          className="w-full rounded-3xl bg-primary py-4 font-bold text-white shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
          disabled={isSubmitting}
        >
          저장
        </button>
      </form>
    </Modal>
  );
}
