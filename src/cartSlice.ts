import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  cost: number;
};

type CartState = {
  listCart: CartItem[];
  total: {
    totalCost: number;
    totalquantity: number;
  };
};

const initial: CartState = {
  listCart: [],
  total: {
    totalquantity: 0,
    totalCost: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.listCart.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.listCart = state.listCart.filter((e) => e.name !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ name: string; quantity: number }>
    ) => {
      state.listCart.map((e) => {
        if (e.name === action.payload.name) {
          e.quantity = action.payload.quantity;
        }
        return e;
      });
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
