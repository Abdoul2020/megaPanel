import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Doctor } from "../../common/types/Doctor.entity";

type initialState = {
  expertList: Doctor[];
};

const initialState: initialState = {
  expertList: [],
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    addExperts: (state, { payload }) => {
      state.expertList = payload;
    },
  },
});

export default doctorSlice.reducer;
export const { addExperts } = doctorSlice.actions;
