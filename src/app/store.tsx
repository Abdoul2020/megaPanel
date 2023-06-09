import { configureStore } from "@reduxjs/toolkit";
import optionsReducer from "../features/options/optionsSlice";
import doctorReducer from "../features/doctorSlice/doctorSlice";
import branchesReducer from "../features/branches/branchesSlice";
import authReducer from "../features/auth/authSlice";
import authExpertReducer from "../features/authExpert/authExpertSlice";
import titlesReducer from "../features/titles/titlesSlice";
import specializationsReducer from "../features/specializations/specializationsSlice";
import citiesReducer from "../features/cities/citiesSlice";
import totalsReducer from "../features/totals/totalsSlice";
import appointmentsReducer from "../features/appointments/appointmentsSlice";
import appointmentTypesReducer from "../features/appointmentTypes/appointmentTypesSlice";
import firmsReducer from "../features/firms/firmsSlice";
import countriesReducer from "../features/countries/countriesSlice";
import statesReducer from "../features/states/statesSlice";
import faqsReducer from "../features/faqs/faqsSlice";
import feedBacksReducer from "../features/feedbacks/feedbacksSlice";

const store = configureStore({
  reducer: {
    options: optionsReducer,
    doctors: doctorReducer,
    branches: branchesReducer,
    auth: authReducer,
    authexpert: authExpertReducer,
    titles: titlesReducer,
    specializations: specializationsReducer,
    cities: citiesReducer,
    countries: countriesReducer,
    states: statesReducer,
    totals: totalsReducer,
    appointments: appointmentsReducer,
    appointmentTypes: appointmentTypesReducer,
    firms: firmsReducer,
    faqs: faqsReducer,
    feedBacks: feedBacksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
