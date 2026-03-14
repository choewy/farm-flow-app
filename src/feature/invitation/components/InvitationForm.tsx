import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { Send, UserPlus } from 'lucide-react';
import z from 'zod';

import { invitationApi } from '../api/invitation.api';

import { InvitationFooter } from './InvitationFooter';
import { InvitationInput } from './InvitationInput';

import { getErrorCodeMessage } from '@app/shared/api';
import { Toast } from '@app/shared/toast';
import { zodResolver } from '@hookform/resolvers/zod';

const invitationSchema = z.object({
  email: z.email('이메일 형식이 올바르지 않습니다.'),
});

type InvitationFormData = z.infer<typeof invitationSchema>;

type InvitationFormProps = {
  setEmail: Dispatch<SetStateAction<string>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

export function InvitationForm({ setEmail, setSuccess }: InvitationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InvitationFormData>({
    resolver: zodResolver(invitationSchema),
    mode: 'onSubmit',
    defaultValues: { email: '' },
  });

  const onSubmit = async ({ email }: InvitationFormData) => {
    try {
      const invitationUrl = `${window.location.origin}/invitation/accept`;
      await invitationApi.create({
        email: email.trim(),
        url: invitationUrl,
      });
      setEmail(email);
      setSuccess(true);
      Toast.success('초대장이 전송되었습니다.');
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    }
  };

  return (
    <div className="app-panel px-6 py-6">
      <div className="relative z-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-primary/10 text-primary">
          <UserPlus size={24} className="stroke-[1.7px]" />
        </div>

        <div className="mb-3">
          <p className="app-kicker text-primary/70">Invitation</p>
          <h2 className="mt-2 text-[1.55rem] font-black tracking-[-0.04em] text-slate-800">농장 초대장을 발송하세요</h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
            이메일 주소를 입력하면 해당 사용자에게 현재 농장으로 바로 연결되는 초대 링크가 발송됩니다.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="app-chip app-chip-primary">
            <Send size={14} />
            즉시 메일 발송
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <InvitationInput
            labelText="초대할 이메일"
            inputProps={{
              type: 'email',
              placeholder: 'user@example.com',
              autoComplete: 'off',
              autoFocus: true,
              autoCapitalize: 'none',
            }}
            registerProps={register('email')}
            errors={errors}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="app-button app-button-primary"
          >
            <Send size={18} className="stroke-[2px]" />
            <span>보내기</span>
          </button>
        </form>

        <div className="mt-5">
          <InvitationFooter />
        </div>
      </div>
    </div>
  );
}
