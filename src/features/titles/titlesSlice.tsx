import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Branch } from "../../common/types/Branch.entity";
import { Doctor } from "../../common/types/Doctor.entity";
import { Title } from "../../common/types/Title.entity";

type initialState = {
  titlesList: Title[];
};

const initialState: initialState = {
  titlesList: [],
};

const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    addTitles: (state, { payload }) => {
      state.titlesList = payload;
    },
  },
});

export default titlesSlice.reducer;
export const { addTitles } = titlesSlice.actions;
