import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};


const PrimaryButton = ({  title,
  onPress,
  containerStyle,
  textStyle,
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, containerStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3c6a6c",
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
