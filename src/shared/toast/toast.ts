import { Id, toast, ToastOptions, TypeOptions } from 'react-toastify';

export class Toast {
  private static currentId: Id | null = null;
  private static options: ToastOptions = {
    autoClose: 3000,
    closeButton: true,
    onClose: () => {
      this.currentId = null;
    },
  };

  private static show(type: TypeOptions, message: string) {
    if (this.currentId && toast.isActive(this.currentId)) {
      toast.update(this.currentId, {
        type,
        render: message,
        autoClose: 3000,
        closeButton: true,
      });

      return;
    }

    this.currentId = toast(message, { type, ...this.options });
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
