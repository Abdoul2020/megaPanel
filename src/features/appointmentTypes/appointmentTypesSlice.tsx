import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment } from "../../common/types/Appointment.entity";
import { AppointmentType } from "../../common/types/AppointmentType.entity";
import { Branch } from "../../common/types/Branch.entity";
import { Doctor } from "../../common/types/Doctor.entity";

type initialState = {
  appointmentTypesList: AppointmentType[];
};

const initialState: initialState = {
  appointmentTypesList: [],
};

const appointmentTypesSlice = createSlice({
  name: "appointmentTypes",
  initialState,
  reducers: {
    addAppointmentTypes: (state, { payload }) => {
      state.appointmentTypesList = payload;
    },
  },
});

export default appointmentTypesSlice.reducer;
export const { addAppointmentTypes } = appointmentTypesSlice.actions;
