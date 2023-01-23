import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Branch } from "../../common/types/Branch.entity";
import { Doctor } from "../../common/types/Doctor.entity";
import { Firm } from "../../common/types/Firm.entity";
import { Title } from "../../common/types/Title.entity";

type initialState = {
  firmsList: Firm[];
};

const initialState: initialState = {
  firmsList: [],
};

const firmsSlice = createSlice({
  name: "firms",
  initialState,
  reducers: {
    addFirms: (state, { payload }) => {
      state.firmsList = payload;
    },
  },
});

export default firmsSlice.reducer;
export const { addFirms } = firmsSlice.actions;
