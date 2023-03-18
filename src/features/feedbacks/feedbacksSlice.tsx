import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Branch } from "../../common/types/Branch.entity";
import { Doctor } from "../../common/types/Doctor.entity";
import { Firm } from "../../common/types/Firm.entity";
import { Title } from "../../common/types/Title.entity";

type initialState = {
  feedBackDialogOpen: boolean;
};

const initialState: initialState = {
  feedBackDialogOpen: false,
};

const feedBackSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {
    updateFeedBackDialogOpen: (state, { payload }) => {
      state.feedBackDialogOpen = payload;
    },
  },
});

export default feedBackSlice.reducer;
export const { updateFeedBackDialogOpen } = feedBackSlice.actions;
