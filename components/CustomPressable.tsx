import { ReactNode } from "react";
import { Platform, Pressable, PressableProps } from "react-native";

interface CustomPressableProps extends PressableProps {
  children: ReactNode;
}

function CustomPressable({ children, ...props }: CustomPressableProps) {
  const pressHandlerProps =
    Platform.OS === "android"
      ? { onPressIn: props.onPress || props.onPressIn }
      : { onPress: props.onPress };

  return (
    <Pressable {...props} {...pressHandlerProps}>
      {children}
    </Pressable>
  );
}

export default CustomPressable;
