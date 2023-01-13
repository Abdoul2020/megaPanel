import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Alert = {
  active: boolean;
  text: string;
  type: string;
  statusCode: number;
};

type initialState = {
  forDoctors: boolean;
  sticky: boolean;
  pathname: string;
  alert: Alert;
};

const initialState: initialState = {
  forDoctors: false,
  sticky: false,
  pathname: "",
  alert: { active: false, text: "", type: "", statusCode: 0 },
};

const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    updateDoctorState: (state) => {
      state.forDoctors = !state.forDoctors;
    },
    updateSticky: (state, { payload }) => {
      state.sticky = payload;
    },
    updatePathname: (state, { payload }) => {
      state.pathname = payload;
    },
    updateAlert: (state, { payload }) => {
      state.alert = payload;
    },
    // changeDoctorState: (state, payload: PayloadAction) => {
    //   state.forDoctors = !state.forDoctors;
    // },
  },
});

export default optionsSlice.reducer;
export const { updateAlert, updateDoctorState, updateSticky, updatePathname } =
  optionsSlice.actions;
