import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { CancelTokenSource, AxiosResponse } from 'axios';
import WEATHER_KEY from '../../../assets/Keys/WEATHER_KEY';

import {
  sortCitiesById,
  filterCollisions,
  getTimeoutPromise,
  isAxiosResponse,
} from '../../../utils';
import { WeatherDataState } from '../../stateTypes';
import {
  CitiesData,
  CitiesFullData,
  Coordinates,
  CitiesResponse,
} from './types';

const initialState: WeatherDataState = {
  citiesData: [],
  citiesFullData: [],
  coordinates: [0, 0],
  selectedIndex: 0,
  timezone: null,
  loading: false,
  error: null,
};

export const fetchCitiesData = createAsyncThunk<CitiesData[], string>(
  'cities/fetchCitiesData',
  async (city: string) => {
    const cancelToken: CancelTokenSource = axios.CancelToken.source();
    const timeoutMessage = 'Время ожидания превышено';

    const citiesTimeoutPromise = getTimeoutPromise(cancelToken, timeoutMessage);

    const citiesPromise = axios.get<CitiesResponse>(
      `https://api.openweathermap.org/data/2.5/find?q=${city.trim()}&appid=${WEATHER_KEY}`,
      {
        cancelToken: cancelToken.token,
      }
    );

    const data = await Promise.race([citiesTimeoutPromise, citiesPromise]).then(
      (resp: unknown) => {
        if (isAxiosResponse(resp)) {
          return (resp as AxiosResponse<CitiesResponse>).data;
        }

        throw new Error('Неожиданный тип ответа');
      }
    );

    if (data.list.length) {
      return data.list;
    }

    throw new Error('Ничего не найдено');
  }
);

export const fetchCitiesFullData = createAsyncThunk(
  'cities/fetchCitiesFullData',
  async (citiesData: CitiesData[]) => {
    const cancelToken: CancelTokenSource = axios.CancelToken.source();
    const timeoutMessage = 'Время ожидания превышено';

    const timeoutWeatherPromise = getTimeoutPromise(
      cancelToken,
      timeoutMessage
    );

    const fullDataPromises = Promise.all(
      citiesData.map((city: CitiesData) =>
        fetchCityData(city.coord.lat, city.coord.lon, cancelToken)
      )
    ).then((val: AxiosResponse<CitiesData>[]) =>
      val.map((d) => {
        if (isAxiosResponse(d)) {
          return d.data;
        }

        throw new Error('Неожиданный тип ответа');
      })
    );

    const res = await Promise.race([
      timeoutWeatherPromise,
      fullDataPromises,
    ]).then((d) => d as CitiesFullData[]);

    const newWeatherList: CitiesFullData[] = filterCollisions(res);
    const sortedList: CitiesFullData[] = sortCitiesById(newWeatherList);
    return sortedList;
  }
);

const fetchCityData = (
  lat: number,
  lon: number,
  cancelToken: CancelTokenSource
) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`,
    { cancelToken: cancelToken.token }
  );
};

const weatherDataSlice = createSlice({
  name: 'weatherData',
  initialState,
  reducers: {
    setCitiesData(state, { payload }: PayloadAction<CitiesData[]>) {
      state.citiesData = payload;
    },
    setCitiesFullData(state, { payload }: PayloadAction<CitiesFullData[]>) {
      state.citiesFullData = payload;
    },
    setCoordinates(state, { payload }: PayloadAction<Coordinates>) {
      state.coordinates = payload;
    },
    setSelectedIndex(state, { payload }: PayloadAction<number>) {
      state.selectedIndex = payload;
    },
    setTimezone: (state, { payload }: PayloadAction<number | null>) => {
      state.timezone = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCitiesData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCitiesData.fulfilled,
      (state, { payload }: PayloadAction<CitiesData[]>) => {
        state.loading = false;
        state.citiesData = payload;
        state.selectedIndex = 0;
      }
    );
    builder.addCase(fetchCitiesData.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });
    builder.addCase(fetchCitiesFullData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchCitiesFullData.fulfilled,
      (state, { payload }: PayloadAction<CitiesFullData[]>) => {
        state.loading = false;

        state.citiesFullData = payload;
        state.coordinates = payload[0]?.coord
          ? [payload[0].coord.lat, payload[0].coord.lon]
          : [0, 0];
        state.timezone = payload[0]?.timezone ? payload[0]?.timezone : null;
      }
    );
    builder.addCase(fetchCitiesFullData.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });
  },
});

export default weatherDataSlice.reducer;
export const {
  setCitiesData,
  setCitiesFullData,
  setCoordinates,
  setSelectedIndex,
  setTimezone,
} = weatherDataSlice.actions;
