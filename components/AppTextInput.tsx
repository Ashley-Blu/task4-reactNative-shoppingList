import { StyleSheet, TextInput, View, StyleProp, ViewStyle } from "react-native";
import React from "react";

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
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
});
