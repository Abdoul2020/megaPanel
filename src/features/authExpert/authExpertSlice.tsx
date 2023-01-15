import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appointment } from "../../common/types/Appointment.entity";
import { Branch } from "../../common/types/Branch.entity";
import { Certificate } from "../../common/types/Certificate.entity";
import { Client } from "../../common/types/Client.entity";
import { Doctor } from "../../common/types/Doctor.entity";

type initialState = {
  auth_expert_token: string;
  auth_expert_object?: Doctor;
  auth_expert_appointments: Appointment[];
  auth_expert_myappointments: Appointment[];
  auth_expert_certificates: Certificate[];
};

const initialState: initialState = {
  auth_expert_token: "",
  auth_expert_object: undefined,
  auth_expert_appointments: [],
  auth_expert_myappointments: [],
  auth_expert_certificates: [],
};

const authExpertSlice = createSlice({
  name: "authexpert",
  initialState,
  reducers: {
    addAuthExpertCertificates: (state, { payload }) => {
      state.auth_expert_certificates = payload;
    },
    removeAuthExpertCertificate: (state, { payload }) => {
      let newState = state.auth_expert_certificates.filter(
        (certificate) => certificate._id !== payload._id
      );
      state.auth_expert_certificates = newState;
    },
    addAuthExpertToken: (state, { payload }) => {
      state.auth_expert_token = payload;
    },
    addAuthExpertObject: (state, { payload }) => {
      state.auth_expert_object = payload;
    },
    addAutExperthAppointment: (state, { payload }) => {
      state.auth_expert_appointments = payload;
    },
    addAutExperthMyAppointment: (state, { payload }) => {
      state.auth_expert_myappointments = payload;
    },
    updateAuthExpertAppointment: (state, { payload }) => {
      let addedItem = state.auth_expert_appointments.find(
        (appointment) => appointment._id === payload._id
      );
      if (addedItem) {
        let newState = state.auth_expert_appointments.map((appointment) => {
          if (appointment._id === payload._id) {
            return Object.assign({}, addedItem, payload);
          }
          return appointment;
        });
        state.auth_expert_appointments = newState;
      }
    },
    updateAuthExpertMyAppointment: (state, { payload }) => {
      let addedItem = state.auth_expert_myappointments.find(
        (myappointment) => myappointment._id === payload._id
      );
      if (addedItem) {
        let newState = state.auth_expert_myappointments.map((myappointment) => {
          if (myappointment._id === payload._id) {
            return Object.assign({}, addedItem, payload);
          }
          return myappointment;
        });
        state.auth_expert_myappointments = newState;
      }
    },
  },
});

export default authExpertSlice.reducer;
export const {
  addAuthExpertToken,
  addAuthExpertObject,
  addAutExperthAppointment,
  addAutExperthMyAppointment,
  updateAuthExpertAppointment,
  updateAuthExpertMyAppointment,
  addAuthExpertCertificates,
  removeAuthExpertCertificate,
} = authExpertSlice.actions;
