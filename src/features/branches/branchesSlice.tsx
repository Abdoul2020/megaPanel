import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Branch } from "../../common/types/Branch.entity";
import { Doctor } from "../../common/types/Doctor.entity";

type initialState = {
  branchesList: Branch[];
};

const initialState: initialState = {
  branchesList: [],
};

const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    addBranches: (state, { payload }) => {
      state.branchesList = payload;
    },
  },
});

export default branchesSlice.reducer;
export const { addBranches } = branchesSlice.actions;
