import { TimeEditTarget } from './PayrollDetailList';

import { Modal, ModalActions } from '@app/shared/ui/modal';

type PayrollTimeEditModalProps = {
  target: TimeEditTarget | null;
  isSaving: boolean;
  onClose: () => void;
  onSave: () => void;
  onChange: (target: TimeEditTarget) => void;
};

export function PayrollTimeEditModal({ target, isSaving, onClose, onSave, onChange }: PayrollTimeEditModalProps) {
  if (!target) {
    return null;
  }

  return (
    <Modal
      title="출퇴근 시간 수정"
      description="날짜는 유지되고 출근 시간과 퇴근 시간만 함께 변경됩니다."
      onClose={onClose}
      mobilePosition="center"
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">근무 날짜</p>
          <p className="mt-1 text-sm font-bold text-slate-800">{target.workDate}</p>
        </div>

        <label className="block">
          <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">출근 시간</span>
          <input
            type="time"
            value={target.checkedInTime}
            onChange={(event) => onChange({ ...target, checkedInTime: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">퇴근 시간</span>
          <input
            type="time"
            value={target.checkedOutTime}
            onChange={(event) => onChange({ ...target, checkedOutTime: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <ModalActions
          confirmText="저장"
          cancelText="취소"
          onConfirm={onSave}
          onCancel={onClose}
          isConfirmDisabled={!target.checkedInTime || !target.checkedOutTime}
          isConfirmLoading={isSaving}
        />
      </div>
    </Modal>
  );
}
