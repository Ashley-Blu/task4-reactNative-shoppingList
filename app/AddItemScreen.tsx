import AppTextInput from "@/components/AppTextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import SubmitButton from "../components/SubmitButton";
import AntDesign from '@expo/vector-icons/AntDesign';

type AddItemScreenProps = {
  onPress: () => void;
  onAddItem?: (item: {
    name: string;
    category: string;
    quantity: number;
  }) => void;
  editingItem?: {
    id: string;
    name: string;
    category: string;
    quantity: number;
  } | null;
  onUpdateItem?: (item: {
    id: string;
    name: string;
    category: string;
    quantity: number;
  }) => void;
};

const categories = ["Not Categorized", "Fruits", "Vegetables", "Dairy", "Bakery", "Beverages", "Meat"]; //available categories

const AddItemScreen = ({
  onPress,
  onAddItem,
  editingItem,
  onUpdateItem,
}: AddItemScreenProps) => {
  const toast = useToast();
  const [itemText, setItemText] = useState(editingItem?.name || "");
  const [category, setCategory] = useState(
    editingItem?.category || categories[0]
  );
  const [quantity, setQuantity] = useState(editingItem?.quantity || 1);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <View style={styles.container}>
      {/* Close button */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>
          {/*one modal - title = edit item if user wants to edit. title = add item if user wants to add new item*/}
          {editingItem ? "Edit Item" : "Add Item"} 
        </Text>
        <TouchableOpacity onPress={onPress} style={styles.closeBtn}>
          <Ionicons name="close-circle" size={30} color="red" />
        </TouchableOpacity>
      </View>

      {/* Item input */}
      <Text style={styles.label}>Item Name</Text>
      <AppTextInput
        placeholder="Type item here..."
        value={itemText}
        onChangeText={(text) => {
          setItemText(text);
          setError(null);
        }}
        style={styles.input}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Category dropdown */}
      <Text style={styles.label}>Category</Text>
      <TouchableOpacity
        onPress={() => setShowCategoryModal(true)}
        style={styles.categoryButton}
      >
        <Text style={styles.categoryButtonText}>{category}</Text>
        <Ionicons name="chevron-down" size={24} color="#3c6a6c" />
      </TouchableOpacity>

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <ScrollView>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => {
                    setCategory(cat);
                    setShowCategoryModal(false);
                  }}
                  style={styles.categoryOption}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,
                      category === cat && styles.selectedCategory,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setShowCategoryModal(false)}
              style={styles.closeModal}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Quantity selector */}
      <Text style={styles.label}>Quantity</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decrementQuantity} style={styles.qtyBtn}>
          <Text style={styles.qtyText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={incrementQuantity} style={styles.qtyBtn}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttons}>
        <SubmitButton
          title={editingItem ? "Update Item" : "+   Add Item"}
          onPress={() => {
            if (itemText.trim()) {
              setError(null);
              if (editingItem) {
                onUpdateItem?.({
                  id: editingItem.id,
                  name: itemText,
                  category,
                  quantity,
                });
                toast.show("Item updated successfully!", {
                  type: "success",
                  placement: "top",
                  duration: 2000,
                });
              } else {
                onAddItem?.({ name: itemText, category, quantity });
                toast.show("Item added successfully!", {
                  type: "success",
                  placement: "top",
                  duration: 2000,
                });
              }
              setItemText("");
              setQuantity(1);
            } else {
              setError("Please enter an item name");
            }
          }}
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
    paddingHorizontal: 22,
    paddingVertical: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    paddingBottom: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
  },
  closeBtn: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 18,
    marginBottom: 10,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#e74c3c",
    marginBottom: 16,
    fontWeight: "600",
    marginTop: -2,
  },
  categoryButton: {
    borderWidth: 1.5,
    borderColor: "#D0D5DD",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 14,
    width: "82%",
    maxHeight: "70%",
    padding: 22,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 18,
    textAlign: "center",
  },
  categoryOption: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  categoryOptionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedCategory: {
    fontWeight: "700",
    color: "#3c6a6c",
  },
  closeModal: {
    marginTop: 16,
    paddingVertical: 13,
    paddingHorizontal: 20,
    backgroundColor: "#3c6a6c",
    borderRadius: 10,
    alignItems: "center",
  },
  closeModalText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
    marginBottom: 20,
  },
  qtyBtn: {
    backgroundColor: "#3c6a6c",
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  quantity: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3c6a6c",
    minWidth: 45,
    textAlign: "center",
  },
  buttons: {
    marginTop: "auto",
    gap: 12,
  },
});
