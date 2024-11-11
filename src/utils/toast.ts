// utils/toast.ts
import { toast, ToastOptions } from 'react-toastify';

// Update the type parameter to include 'warning'
export const notify = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    toast(message, { type } as ToastOptions);
};
