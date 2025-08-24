import { colors } from "@/constants/Colors";
import { PressableProps, StyleSheet, Text } from "react-native";
import CustomPressable from "./CustomPressable";

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

function CustomButton({
  label,
  size = "large",
  variant = "filled",
  ...props
}: CustomButtonProps) {
  return (
    <CustomPressable
      style={(pressed) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
      ]}
      {...props}
    >
      <Text>{label}</Text>
    </CustomPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  medium: {},
  large: {
    width: "100%",
    height: 44,
  },
  filled: {
    backgroundColor: colors.ORANGE_600,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.WHITE,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default CustomButton;
