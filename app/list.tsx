import AddButton from "@/components/AddButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import type { ShoppingItem } from "../store/shoppingSlice";
import {
  addItem,
  deleteItem,
  setItems,
  togglePurchased,
  updateItem,
} from "../store/shoppingSlice";
import type { AppDispatch, RootState } from "../store/store";
import {
  deleteItemFromStorage,
  getAllItemsFromStorage,
  initializeDatabase,
  saveItemToStorage,
  togglePurchasedInStorage,
  updateItemInStorage,
} from "../utils/storage";
import AddItemScreen from "./AddItemScreen";

const ShoppingListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.shopping.items);
  const toast = useToast();
  const [modalVissible, setModalVissible] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Get unique categories
  const categories = Array.from(
    new Set(items.map((item) => item.category))
  ).sort();

  // Initialize database and load items from storage on app start
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeDatabase();
        const storedItems = await getAllItemsFromStorage();
        if (storedItems.length > 0) {
          dispatch(setItems(storedItems));
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    };
    initializeApp();
  }, [dispatch]);

  // Reload items when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadItems = async () => {
        try {
          const storedItems = await getAllItemsFromStorage();
          dispatch(setItems(storedItems));
        } catch (error) {
          console.error("Error loading items:", error);
        }
      };
      loadItems();
    }, [dispatch])
  );

  const handleAddItem = async (item: {
    name: string;
    category: string;
    quantity: number;
  }) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      ...item,
    };
    try {
      await saveItemToStorage(newItem);
      dispatch(addItem(newItem));
      setModalVissible(false);
    } catch (error) {
      toast.show("Failed to add item", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  };

  const handleDeleteItem = (id: string) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await deleteItemFromStorage(id);
            dispatch(deleteItem(id));
            toast.show("Item deleted successfully!", {
              type: "success",
              placement: "top",
              duration: 2000,
            });
          } catch (error) {
            toast.show("Failed to delete item", {
              type: "danger",
              placement: "top",
              duration: 2000,
            });
          }
        },
      },
    ]);
  };

  const handleEditItem = (item: ShoppingItem) => {
    setEditingItem(item);
    setModalVissible(true);
  };

  const handleUpdateItem = async (updatedItem: ShoppingItem) => {
    try {
      await updateItemInStorage(updatedItem);
      dispatch(updateItem(updatedItem));
      setEditingItem(null);
      setModalVissible(false);
    } catch (error) {
      toast.show("Failed to update item", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  };

  const handleTogglePurchased = async (id: string) => {
    try {
      const item = items.find((item) => item.id === id);
      if (item) {
        const newPurchasedStatus = !item.purchased;
        // When marking as purchased, set quantity to 0
        if (newPurchasedStatus) {
          const updatedItem = { ...item, purchased: true, quantity: 0 };
          await updateItemInStorage(updatedItem);
          dispatch(updateItem(updatedItem));
        } else {
          // When unmarking, just toggle purchased status
          await togglePurchasedInStorage(id, newPurchasedStatus);
          dispatch(togglePurchased(id));
        }
      }
    } catch (error) {
      toast.show("Failed to update item status", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  };

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    try {
      const item = items.find((item) => item.id === id);
      if (item && newQuantity > 0) {
        const updatedItem = { ...item, quantity: newQuantity };
        await updateItemInStorage(updatedItem);
        dispatch(updateItem(updatedItem));
      } else if (newQuantity <= 0) {
        toast.show("Quantity must be at least 1", {
          type: "danger",
          placement: "top",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.show("Failed to update quantity", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  };

  // Sort and filter items: unpurchased first, then by category
  const getSortedAndFilteredItems = () => {
    let filteredItems = items;

    // Filter by selected category if one is chosen
    if (selectedCategory) {
      filteredItems = items.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Sort: unpurchased first, then by category
    const sortedItems = [...filteredItems].sort((a, b) => {
      // Unpurchased items come first
      if (a.purchased !== b.purchased) {
        return a.purchased ? 1 : -1;
      }
      // Then sort by category
      return a.category.localeCompare(b.category);
    });
    return sortedItems;
  };

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <>
          <Image
            style={styles.basketImg}
            source={require("../assets/images/basket.png")}
          />
          <Image
            style={styles.trollyImg}
            source={require("../assets/images/trolly.png")}
          />
          <Text style={styles.text}>
            Oops! There is nothing on your list. Click the plus button at the
            bottom to add to your list.
          </Text>
        </>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => setShowCategoryModal(true)}
              style={[
                styles.filterButton,
                selectedCategory && styles.filterButtonActive,
              ]}
            >
              <Ionicons
                name="filter"
                size={20}
                color={selectedCategory ? "#fff" : "#3c6a6c"}
              />
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCategory && styles.filterButtonTextActive,
                ]}
              >
                {selectedCategory || "All Categories"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Category Selection Modal */}
          <Modal
            visible={showCategoryModal}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowCategoryModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.categoryModalContent}>
                <Text style={styles.modalTitle}>Filter by Category</Text>
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCategory(null);
                      setShowCategoryModal(false);
                    }}
                    style={styles.categoryOptionItem}
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        !selectedCategory && styles.selectedCategoryOption,
                      ]}
                    >
                      All Categories
                    </Text>
                  </TouchableOpacity>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => {
                        setSelectedCategory(cat);
                        setShowCategoryModal(false);
                      }}
                      style={styles.categoryOptionItem}
                    >
                      <Text
                        style={[
                          styles.categoryOptionText,
                          selectedCategory === cat &&
                            styles.selectedCategoryOption,
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  onPress={() => setShowCategoryModal(false)}
                  style={styles.closeModalButton}
                >
                  <Text style={styles.closeModalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <FlatList
            data={getSortedAndFilteredItems()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.itemContainer,
                  item.purchased && styles.itemContainerPurchased,
                ]}
              >
                <TouchableOpacity
                  onPress={() => handleTogglePurchased(item.id)}
                  style={styles.checkboxContainer}
                >
                  <View
                    style={[
                      styles.checkbox,
                      item.purchased && styles.checkboxChecked,
                    ]}
                  >
                    {item.purchased && (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
                <View style={styles.itemContent}>
                  <Text
                    style={[
                      styles.itemName,
                      item.purchased && styles.itemNamePurchased,
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                </View>
                <View style={styles.itemActions}>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      onPress={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      style={styles.quantityBtn}
                    >
                      <Ionicons name="remove" size={18} color="#3c6a6c" />
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      style={styles.quantityBtn}
                    >
                      <Ionicons name="add" size={18} color="#3c6a6c" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleEditItem(item)}
                    style={styles.actionBtn}
                  >
                    <Ionicons name="pencil" size={20} color="#3c6a6c" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteItem(item.id)}
                    style={styles.actionBtn}
                  >
                    <Ionicons name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            scrollEnabled={true}
          />
        </>
      )}

      <AddButton onPress={() => setModalVissible(true)} />
      <Modal visible={modalVissible} animationType="slide">
        <AddItemScreen
          onPress={() => {
            setEditingItem(null);
            setModalVissible(false);
          }}
          onAddItem={handleAddItem}
          editingItem={editingItem}
          onUpdateItem={handleUpdateItem}
        />
      </Modal>
    </View>
  );
};

export default ShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  basketImg: {
    width: 130,
    height: 130,
    marginHorizontal: "auto",
  },

  trollyImg: {
    width: 230,
    height: 230,
    opacity: 1,
    marginHorizontal: "auto",
  },

  text: {
    textAlign: "center",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: "#E0E0E0",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#3c6a6c",
    gap: 8,
  },
  sortButtonActive: {
    backgroundColor: "#3c6a6c",
  },
  sortButtonText: {
    fontSize: 14,
    color: "#3c6a6c",
    fontWeight: "600",
  },
  sortButtonTextActive: {
    color: "#fff",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#3c6a6c",
    gap: 8,
  },
  filterButtonActive: {
    backgroundColor: "#3c6a6c",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#3c6a6c",
    fontWeight: "600",
  },
  filterButtonTextActive: {
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryModalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "80%",
    maxHeight: "70%",
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  categoryOptionItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  categoryOptionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedCategoryOption: {
    fontWeight: "bold",
    color: "#3c6a6c",
  },
  closeModalButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#3c6a6c",
    borderRadius: 8,
    alignItems: "center",
  },
  closeModalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  itemContainerPurchased: {
    backgroundColor: "#F5F5F5",
  },
  checkboxContainer: {
    marginRight: 14,
    justifyContent: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3c6a6c",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#3c6a6c",
    borderColor: "#3c6a6c",
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemNamePurchased: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  itemCategory: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3c6a6c",
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: "center",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#D0D5DD",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "#f9f9f9",
  },
  quantityBtn: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionBtn: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
