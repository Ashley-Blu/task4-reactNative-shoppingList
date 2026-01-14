import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const AddItemScreen = ({ onPress }) => {
  return (
    <SafeAreaView>
      <TouchableOpacity>
        <Ionicons
          name="close-circle"
          size={30}
          color="red"
          onPress={onPress}
          style={styles.closeBtn}
        />{" "}
      </TouchableOpacity>

      <Text>Add an item...</Text>
    </SafeAreaView>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  closeBtn: {
    alignSelf: "flex-end",
    margin: 10,
  },
});
