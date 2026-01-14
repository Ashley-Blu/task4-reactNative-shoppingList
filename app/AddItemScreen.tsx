import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppTextInput from "@/components/AppTextInput";
import { Picker } from "@react-native-picker/picker"; // Expo dropdown picker
import SubmitButton from "../components/SubmitButton";
import { router } from "expo-router";

type AddItemScreenProps = {
  onPress: () => void;
};

const categories = ["Fruits", "Vegetables", "Dairy", "Bakery", "Beverages"];

const AddItemScreen = ({ onPress }: AddItemScreenProps) => {
  const [itemText, setItemText] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <View style={styles.container}>
      {/* Close button */}
      <TouchableOpacity onPress={onPress} style={styles.closeBtn}>
        <Ionicons name="close-circle" size={30} color="red" />
      </TouchableOpacity>

      {/* Item input */}
      <Text style={styles.label}>Add an item</Text>
      <AppTextInput
        placeholder="Type item here"
        value={itemText}
        onChangeText={setItemText}
        style={styles.input}
      />

      {/* Category dropdown */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
          style={styles.picker}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      {/* Quantity selector */}
      <Text style={styles.label}>Quantity</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decrementQuantity} style={styles.qtyBtn}>
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={incrementQuantity} style={styles.qtyBtn}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <SubmitButton
          title="+   Add Item"
          onPress={() => router.push("/list")}
          containerStyle={{ marginTop: 20, marginBottom: 20 }}
        />
        <SubmitButton
          title="Cancel"
          onPress={() => router.push("/list")}
          containerStyle={{ marginBottom: 20 }}
        />
      </View>
    </View>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  closeBtn: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 15,
  },
  picker: {
    width: "100%",
    height: 40,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    backgroundColor: "#3c6a6c",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  qtyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    marginHorizontal: 20,
    fontSize: 16,
  },
  buttons: {
    alignSelf: 'baseline',
    marginVertical: 'auto'
  }
});
