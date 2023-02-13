import { createSlice } from "@reduxjs/toolkit";
import { State } from "../../common/types/State.entity";
import { states } from "./states";

type initialState = {
  statesList: State[];
};

const initialState: initialState = {
  statesList: states,
};

const statesSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    addStates: (state, { payload }) => {
      state.statesList = payload;
    },
  },
});

export default statesSlice.reducer;
export const { addStates } = statesSlice.actions;
