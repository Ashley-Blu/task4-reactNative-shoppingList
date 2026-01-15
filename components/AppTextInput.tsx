import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

type AppTextInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address";
  style?: StyleProp<ViewStyle>;
};

const AppTextInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  style,
  ...otherProps
}: AppTextInputProps) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        {...otherProps}
      />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#D0D5DD",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
});
