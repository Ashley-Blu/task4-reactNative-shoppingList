import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ShoppingItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  purchased?: boolean;
};

type ShoppingState = {
  items: ShoppingItem[];
};

const initialState: ShoppingState = {
  items: [],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setItems: (state, action: PayloadAction<ShoppingItem[]>) => {
      state.items = action.payload;
    },
    togglePurchased: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.purchased = !item.purchased;
      }
    },
  },
});

export const { addItem, deleteItem, updateItem, setItems, togglePurchased } =
  shoppingSlice.actions;
export default shoppingSlice.reducer;
