import { Id, toast, ToastOptions, TypeOptions } from 'react-toastify';

export class Toast {
  private static currentId: Id | null = null;
  private static closeTimer: ReturnType<typeof window.setTimeout> | null = null;
  private static options: ToastOptions = {
    autoClose: false,
    closeButton: false,
    icon: false,
    onClose: () => {
      if (this.closeTimer) {
        window.clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
      this.currentId = null;
    },
  };

  private static scheduleClose() {
    if (this.closeTimer) {
      window.clearTimeout(this.closeTimer);
    }

    this.closeTimer = window.setTimeout(() => {
      if (this.currentId) {
        toast.dismiss(this.currentId);
      }
    }, 3000);
  }

  private static show(type: TypeOptions, message: string) {
    if (this.currentId && toast.isActive(this.currentId)) {
      toast.update(this.currentId, {
        type,
        render: message,
        autoClose: false,
        closeButton: false,
        icon: false,
      });
      this.scheduleClose();

      return;
    }

    this.currentId = toast(message, { type, ...this.options });
    this.scheduleClose();
  }

  static info(message: string) {
    this.show('info', message);
  }

  static success(message: string) {
    this.show('success', message);
  }

  static error(message: string) {
    this.show('error', message);
  }

  static warn(message: string) {
    this.show('warning', message);
  }
}
