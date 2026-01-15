import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShoppingItem } from "../store/shoppingSlice";

const STORAGE_KEY = "shopping_items";

export const initializeDatabase = async () => {
  try {
    // AsyncStorage doesn't need explicit initialization
    // Just verify we can access it
    const existingItems = await AsyncStorage.getItem(STORAGE_KEY);
    if (!existingItems) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error("Error initializing storage:", error);
  }
};

export const saveItemToStorage = async (item: ShoppingItem) => {
  try {
    const existingItems = await getAllItemsFromStorage();
    const updatedItems = [...existingItems, item];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error("Error saving item:", error);
  }
};

export const deleteItemFromStorage = async (id: string) => {
  try {
    const existingItems = await getAllItemsFromStorage();
    const filteredItems = existingItems.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredItems));
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

export const getAllItemsFromStorage = async (): Promise<ShoppingItem[]> => {
  try {
    const items = await AsyncStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export const updateItemInStorage = async (item: ShoppingItem) => {
  try {
    const existingItems = await getAllItemsFromStorage();
    const updatedItems = existingItems.map((existingItem) =>
      existingItem.id === item.id ? item : existingItem
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

export const togglePurchasedInStorage = async (
  id: string,
  purchased: boolean
) => {
  try {
    const existingItems = await getAllItemsFromStorage();
    const updatedItems = existingItems.map((item) =>
      item.id === id ? { ...item, purchased } : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error("Error updating purchased status:", error);
  }
};
