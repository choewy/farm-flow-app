import { useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import z from 'zod';

import { memberApi } from '../api';

import { MemberUpdateModalRoleList } from './MemberUpdateModalRoleList';

import { getErrorCodeMessage } from '@app/shared/api';
import { Formatter } from '@app/shared/helpers';
import { Member, PermissionKey } from '@app/shared/models';
import { useAuthStore } from '@app/shared/stores';
import { Toast } from '@app/shared/toast';
import { FormMoneyInput } from '@app/shared/ui/form';
import { Modal } from '@app/shared/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';

interface MemberEditModalProps {
  isOpen: boolean;
  row: Member;
  fetchData: () => Promise<void>;
  onClose: () => void;
}

const memberUpdateSchema = z.object({
  roleId: z.string().min(1, '역할을 선택하세요.'),
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

type MemberUpdateFormInput = z.input<typeof memberUpdateSchema>;
type MemberUpdateFormData = z.infer<typeof memberUpdateSchema>;

export function MemberEditModal({ isOpen, row, fetchData, onClose }: MemberEditModalProps) {
  const authRole = useAuthStore((state) => state.role);
  const canUpdateRole = authRole?.permissionKeys.includes(PermissionKey.MemberRoleUpdate) ?? false;
  const canUpdatePay = authRole?.permissionKeys.includes(PermissionKey.MemberPayUpdate) ?? false;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MemberUpdateFormInput, unknown, MemberUpdateFormData>({
    resolver: zodResolver(memberUpdateSchema),
    mode: 'onSubmit',
    defaultValues: {
      roleId: row.role.id,
      payRatePerHour: Formatter.toMoney(row.payRatePerHour),
      payDeductionAmount: Formatter.toMoney(row.payDeductionAmount),
    },
  });

  useEffect(() => {
    reset({
      roleId: row.role.id,
      payRatePerHour: Formatter.toMoney(row.payRatePerHour),
      payDeductionAmount: Formatter.toMoney(row.payDeductionAmount),
    });
  }, [reset, row]);

  const selectedRoleId = useWatch({ control, name: 'roleId' }) ?? row.role.id;
  const payRatePerHour = useWatch({ control, name: 'payRatePerHour' }) ?? '';
  const payDeductionAmount = useWatch({ control, name: 'payDeductionAmount' }) ?? '';
  const hasRoleChange = canUpdateRole && selectedRoleId !== row.role.id;
  const hasPayChange =
    canUpdatePay &&
    (Formatter.toInt(payRatePerHour) !== row.payRatePerHour || Formatter.toInt(payDeductionAmount) !== row.payDeductionAmount);
  const isSaveDisabled = isSubmitting || (!hasRoleChange && !hasPayChange);

  const description = useMemo(() => {
    if (canUpdateRole && canUpdatePay) {
      return `${row.user.name}님의 역할과 급여 정보를 수정합니다.`;
    }

    if (canUpdateRole) {
      return `${row.user.name}님의 역할을 수정합니다.`;
    }

    return `${row.user.name}님의 급여 정보를 수정합니다.`;
  }, [canUpdatePay, canUpdateRole, row.user.name]);

  const handleUpdate = async ({ roleId, payRatePerHour, payDeductionAmount }: MemberUpdateFormData) => {
    const payload: {
      roleId?: string;
      payRatePerHour?: number;
      payDeductionAmount?: number;
    } = {};

    if (Object.keys(payload).length === 0) {
      return;
    }

    try {
      if (canUpdateRole) {
        await memberApi.updateRole(row.user.id, { roleId });
      }

      if (canUpdatePay) {
        await memberApi.updatePayroll(row.user.id, {
          payRatePerHour,
          payDeductionAmount,
        });
      }
      await fetchData();
      onClose();
      Toast.success('저장되었습니다.');
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal title="멤버 정보 수정" description={description} onClose={onClose}>
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5 pt-2">
        <input type="hidden" {...register('roleId')} />

        {canUpdatePay && (
          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="space-y-1 border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800">급여 정보</h3>
              <p className="text-xs font-medium leading-relaxed text-slate-500">시급과 월 공제액을 원 단위로 관리합니다.</p>
            </div>
            <div className="space-y-3 pt-4">
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
            </div>
          </section>
        )}

        {canUpdateRole && (
          <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-800">역할</h3>
              <p className="text-xs font-medium leading-relaxed text-slate-500">이 멤버에게 적용할 농장 역할을 선택하세요.</p>
            </div>
            <div className="pt-3">
              <MemberUpdateModalRoleList
                selectedRoleId={selectedRoleId}
                setSelectedRoleId={(roleId) => setValue('roleId', roleId, { shouldDirty: true, shouldValidate: true })}
              />
            </div>
          </section>
        )}

        <div className="pt-2">
          <button
            type="submit"
            className="w-full rounded-3xl bg-primary py-4 font-bold text-white shadow-premium transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
            disabled={isSaveDisabled}
          >
            저장
          </button>
        </div>
      </form>
    </Modal>
  );
}
