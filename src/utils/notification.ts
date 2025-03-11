import { addToast } from "@heroui/react";

type TNotification = {
  message: string;
  color?:
    | "success"
    | "default"
    | "foreground"
    | "primary"
    | "secondary"
    | "warning"
    | "danger"
    | undefined;
};

export const notification = ({ message, color = "success" }: TNotification) => {
  return addToast({
    description: message,
    color,
  });
};
