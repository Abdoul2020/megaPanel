import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment } from "../../common/types/Appointment.entity";
import { Branch } from "../../common/types/Branch.entity";
import { Client } from "../../common/types/Client.entity";
import { Doctor } from "../../common/types/Doctor.entity";

type initialState = {
  auth_token: string;
  auth_object?: Client;
  auth_appointments: Appointment[];
};

const initialState: initialState = {
  auth_token: "",
  auth_object: undefined,
  auth_appointments: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuthToken: (state, { payload }) => {
      state.auth_token = payload;
    },
    addAuthObject: (state, { payload }) => {
      state.auth_object = payload;
    },
    addAuthAppointment: (state, { payload }) => {
      state.auth_appointments = payload;
    },
  },
});

export default authSlice.reducer;
export const { addAuthToken, addAuthObject, addAuthAppointment } =
  authSlice.actions;
