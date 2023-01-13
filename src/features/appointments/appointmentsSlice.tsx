import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment } from "../../common/types/Appointment.entity";
import { Branch } from "../../common/types/Branch.entity";
import { Doctor } from "../../common/types/Doctor.entity";

type initialState = {
  appointmentList: Appointment[];
};

const initialState: initialState = {
  appointmentList: [],
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointments: (state, { payload }) => {
      state.appointmentList = payload;
    },
  },
});

export default appointmentsSlice.reducer;
export const { addAppointments } = appointmentsSlice.actions;
