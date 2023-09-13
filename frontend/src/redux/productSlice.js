import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = { productList: [], cartItem: [] };
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ReduxPoductList: (state, action) => {
      state.productList = [...action.payload];
    },
    AddCartItem: (state, action) => {
      // prevent adding the same item in cart
      const checkItem = state.cartItem.some(
        (e) => e._id === action.payload._id
      );
      if (checkItem) {
        toast("Item already in cart");
      } else {
        //Add a new item to the cart
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
        toast("Item added successfully");
      }
    },
    RemoveCartItem: (state, action) => {
      const index = state.cartItem.findIndex((e) => e._id === action.payload);
      state.cartItem.splice(index, 1);
      toast("One item removed");
    },
    IncreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((e) => e._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;
      const price = state.cartItem[index].price;
      const total = price * qtyInc;
      state.cartItem[index].total = total;
    },
    DecreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((e) => e._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyInc = --qty;
        state.cartItem[index].qty = qtyInc;
        const price = state.cartItem[index].price;
        const total = price * qtyInc;
        state.cartItem[index].total = total;
      }
    },
  },
});
export const {
  ReduxPoductList,
  RemoveCartItem,
  AddCartItem,
  IncreaseQty,
  DecreaseQty,
} = productSlice.actions;
export default productSlice.reducer;
