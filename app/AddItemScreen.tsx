import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppTextInput from "@/components/AppTextInput";

type AddItemScreenProps = {
  onPress: () => void;
};

const AddItemScreen = ({ onPress }: AddItemScreenProps) => {
  const [itemText, setItemText] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.closeBtn}>
        <Ionicons name="close-circle" size={30} color="red" />
      </TouchableOpacity>

      <Text>Add an item...</Text>

      <AppTextInput
        placeholder="Type item here"
        value={itemText}          // ✅ required
        onChangeText={setItemText} // ✅ required
      />
    </View>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  closeBtn: { alignSelf: "flex-end", marginBottom: 20 },
});
