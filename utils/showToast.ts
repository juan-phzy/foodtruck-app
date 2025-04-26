import Toast from "react-native-toast-message";
import theme from "@/assets/theme";

type ToastType = "success" | "error" | "info";

export const showToast = ({
  type,
  title,
  message,
}: {
  type: ToastType;
  title: string;
  message: string;
}) => {
  Toast.show({
    visibilityTime: type === "success" ? 5000 : 10000,
    type,
    text1: title,
    text2: message,
    text1Style: {
      color: type === "error" ? theme.colors.red : undefined,
      fontSize: theme.fontSize.sm,
    },
    text2Style: {
      color: theme.colors.black,
      fontSize: theme.fontSize.xs,
    },
  });
};
