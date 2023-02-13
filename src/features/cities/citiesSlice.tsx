import { createSlice } from "@reduxjs/toolkit";
import { City } from "../../common/types/City.entity";
import { cities } from "./cities";

type initialState = {
  citiesList: City[];
};

const initialState: initialState = {
  citiesList: cities,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCities: (state, { payload }) => {
      state.citiesList = payload;
    },
  },
});

export default citiesSlice.reducer;
export const { addCities } = citiesSlice.actions;
