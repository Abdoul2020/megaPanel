import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Branch } from "../../common/types/Branch.entity";
import { Doctor } from "../../common/types/Doctor.entity";
import { Expertise } from "../../common/types/Expertise.entity";

type initialState = {
  specializationsList: Expertise[];
};

const initialState: initialState = {
  specializationsList: [],
};

const specializationsSlice = createSlice({
  name: "specializations",
  initialState,
  reducers: {
    addSpecializations: (state, { payload }) => {
      state.specializationsList = payload;
    },
  },
});

export default specializationsSlice.reducer;
export const { addSpecializations } = specializationsSlice.actions;
