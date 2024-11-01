import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherGeoState {
  isFirstRender: boolean;
  cityName: string;
  lastRequestCityName: null | string;
}

const initialState: WeatherGeoState = {
  isFirstRender: true,
  cityName: '',
  lastRequestCityName: null,
};

const weatherGeoSlice = createSlice({
  name: 'weatherGeo',
  initialState,
  reducers: {
    setFRFalse(state) {
      state.isFirstRender = false;
    },
    setCityName(state, { payload }: PayloadAction<string>) {
      state.cityName = payload;
    },
    setLastRequestCityName(state, { payload }: PayloadAction<string>) {
      state.lastRequestCityName = payload;
    },
  },
});

export default weatherGeoSlice.reducer;
export const { setFRFalse, setCityName, setLastRequestCityName } =
  weatherGeoSlice.actions;
