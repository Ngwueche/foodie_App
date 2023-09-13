import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  image: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    ReduxLogin: (state, action) => {
      // state = action.payload.data;
      state._id = action.payload.data._id;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.email = action.payload.data.email;
      state.image = action.payload.data.image;
    },
    ReduxLogOut: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
    },
  },
});
export const { ReduxLogin, ReduxLogOut } = userSlice.actions;
export default userSlice.reducer;
