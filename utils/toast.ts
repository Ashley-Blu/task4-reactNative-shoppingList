import { useToast } from "react-native-toast-notifications";

export const useAppToast = () => {
  const toast = useToast();

  const showSuccess = (message: string) => {
    toast.show(message, {
      type: "success",
      placement: "top",
      duration: 2000,
    });
  };

  const showError = (message: string) => {
    toast.show(message, {
      type: "danger",
      placement: "top",
      duration: 2000,
    });
  };

  const showInfo = (message: string) => {
    toast.show(message, {
      type: "normal",
      placement: "top",
      duration: 2000,
    });
  };

  return { showSuccess, showError, showInfo };
};
