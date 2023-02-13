import { createSlice } from "@reduxjs/toolkit";
import { Country } from "../../common/types/Country.entity";
import { countries } from "./countries";

type initialState = {
  countriesList: Country[];
};

const initialState: initialState = {
  countriesList: countries,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    addCountries: (state, { payload }) => {
      state.countriesList = payload;
    },
  },
});

export default countriesSlice.reducer;
export const { addCountries } = countriesSlice.actions;
