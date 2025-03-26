import { ToastContainer, toastManager } from './Toast';

// Exporta a função global para mostrar toasts
export const toast = {
  show: (
    message: string,
    type?: 'info' | 'success' | 'error' | 'warning',
    duration?: number
  ) => {
    toastManager.show(message, type || 'info', duration || 3000);
  },
  info: (message: string, duration?: number) => {
    toastManager.show(message, 'info', duration);
  },
  success: (message: string, duration?: number) => {
    toastManager.show(message, 'success', duration);
  },
  error: (message: string, duration?: number) => {
    toastManager.show(message, 'error', duration);
  },
  warning: (message: string, duration?: number) => {
    toastManager.show(message, 'warning', duration);
  },
};

export { ToastContainer };
export default toast;
