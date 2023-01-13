import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Doctor } from "../../common/types/Doctor.entity";
import { Totals } from "../../common/types/Totals";

type initialState = {
  totalsList: Totals | undefined;
};

const initialState: initialState = {
  totalsList: undefined,
};

const totalsSlice = createSlice({
  name: "totals",
  initialState,
  reducers: {
    addTotals: (state, { payload }) => {
      state.totalsList = payload;
    },
  },
});

export default totalsSlice.reducer;
export const { addTotals } = totalsSlice.actions;
