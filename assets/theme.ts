// theme/theme.ts
import { ms } from "react-native-size-matters";

const theme = {
    colors: {
        primary: "rgba(255, 132, 0, 1)",
        primaryInactive: "rgba(255, 132, 0, 0.5)",
        primaryLight: "rgba(255, 243, 230, 1)",
        primaryExtraLight: "rgb(255, 251, 246)",
        black: "rgba(0, 0, 0, 1)",
        blackInactive: "rgba(0, 0, 0, 0.5)",
        grayDark: "rgba(120, 120, 120, 1)",
        grayDarkInactive: "rgba(120, 120, 120, 0.5)",
        gray: "rgba(221, 221, 221, 1)",
        grayInactive: "rgba(221, 221, 221, 0.5)",
        grayLight: "rgba(249, 249, 249, 1)",
        white: "rgba(255, 255, 255, 1)",
        whiteInactive: "rgba(255, 255, 255, 0.5)",
        green: "rgba(0, 128, 0, 1)",
        greenLight: "rgb(0, 199, 0)",
        red: "rgba(255, 0, 0, 1)",
        brown: "rgba(139, 69, 19, 1)",
    },
    fontSize: {
        xxs: ms(10),
        xs: ms(12),
        sm: ms(14),
        md: ms(16),
        lg: ms(20),
        xl: ms(24),
        xxl: ms(28),
        xxxl: ms(40),
        xxxxl: ms(48),
    },
    padding: {
        xxs: ms(4),
        xs: ms(8),
        sm: ms(10),
        md: ms(12),
        lg: ms(16),
        xl: ms(20),
        xxl: ms(24),
        xxxl: ms(28),
        xxxxl: ms(35),
    },
    radius: {
        sm: ms(5),
        md: ms(10),
        lg: ms(15),
        full: ms(20),
    }
};

export default theme;