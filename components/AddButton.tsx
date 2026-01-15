import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type AddButtonProps = {
  onPress: () => void;
};

const AddButton = ({ onPress }: AddButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtnContainer} onPress={onPress}>
        <AntDesign name="plus" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 90,
    right: 50,
    zIndex: 10,
  },
  addBtnContainer: {
    height: 56,
    width: 56,
    backgroundColor: "#3c6a6c",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
