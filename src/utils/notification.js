import { toast } from "react-toastify";

export const notify = {
  default: (message) => toast(message),

  sucess: (message) =>
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
    }),

  error: (message) =>
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
    }),

  warn: (message) =>
    toast.warn(message, {
      position: toast.POSITION.TOP_LEFT,
    }),

  info: (message) =>
    toast.info(message, {
      position: toast.POSITION.TOP_LEFT,
    }),
};
