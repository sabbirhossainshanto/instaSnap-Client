import { TDecreaseWidthKeys } from "@/src/types";
import { createSlice } from "@reduxjs/toolkit";

export interface TDecreaseSidebarWidth {
  decreaseSidebarWidth: TDecreaseWidthKeys | null;
}

const initialState: TDecreaseSidebarWidth = {
  decreaseSidebarWidth: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setDecreaseSidebarWidth: (state, { payload }) => {
      state.decreaseSidebarWidth = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDecreaseSidebarWidth } = globalSlice.actions;

export default globalSlice.reducer;
