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
  scrollToTop: boolean;
  headerMobileExpert: boolean;
  headerMobilePatient: boolean;
  headerMobileExpertDashboard: boolean;
  headerMobilePatientDashboard: boolean;
};

const initialState: initialState = {
  forDoctors: false,
  scrollToTop: false,
  sticky: false,
  pathname: "",
  alert: { active: false, text: "", type: "", statusCode: 0 },
  headerMobileExpert: false,
  headerMobilePatient: false,
  headerMobileExpertDashboard: false,
  headerMobilePatientDashboard: false,
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
    updateHeaderMobileExpert: (state, { payload }) => {
      state.headerMobileExpert = payload;
    },
    updateHeaderMobilePatient: (state, { payload }) => {
      state.headerMobilePatient = payload;
    },
    updateHeaderMobileExpertDashboard: (state, { payload }) => {
      state.headerMobileExpertDashboard = payload;
    },
    updateHeaderMobilePatientDashboard: (state, { payload }) => {
      state.headerMobilePatientDashboard = payload;
    },

    updateScrollToTop: (state, { payload }) => {
      state.scrollToTop = payload;
    },

    // changeDoctorState: (state, payload: PayloadAction) => {
    //   state.forDoctors = !state.forDoctors;
    // },
  },
});

export default optionsSlice.reducer;
export const {
  updateAlert,
  updateHeaderMobileExpert,
  updateHeaderMobilePatient,
  updateHeaderMobileExpertDashboard,
  updateHeaderMobilePatientDashboard,
  updateDoctorState,
  updateScrollToTop,
  updateSticky,
  updatePathname,
} = optionsSlice.actions;
