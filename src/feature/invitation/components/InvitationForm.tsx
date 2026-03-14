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
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-hidden relative">
      <div className="relative">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
          <UserPlus size={24} className="stroke-[1.5px]" />
        </div>

        <div className="mb-3">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">농장 초대장을 발송하세요</h2>
          <p className="text-sm text-slate-500 mt-2 font-medium leading-relaxed">
            이메일 주소를 입력하면 해당 사용자에게 <br />
            현재 농장으로의 초대 링크가 발송됩니다.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <InvitationInput
            labelText="Email Address"
            inputProps={{
              type: 'email',
              placeholder: 'user@example.com',
              autoComplete: 'off',
              autoFocus: true,
            }}
            registerProps={register('email')}
            errors={errors}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white rounded-xl font-bold text-base shadow-sm hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center space-x-2"
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
