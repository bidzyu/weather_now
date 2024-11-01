import { SerializedError } from '@reduxjs/toolkit';
import {
  CitiesData,
  CitiesFullData,
  Coordinates,
} from './slices/weather/types';
import { rootReducer } from './store';
import { GeoResponse } from './slices/geo/types';

export type RootState = ReturnType<typeof rootReducer>;

type ErrorTypes = null | string | undefined | Error;

export interface GeoState {
  ip: null | string;
  geo: null | GeoResponse;
  loading: boolean;
  error: ErrorTypes;
}

export interface WeatherDataState {
  citiesData: CitiesData[];
  citiesFullData: CitiesFullData[];
  coordinates: Coordinates;
  selectedIndex: number;
  timezone: null | number;
  loading: boolean;
  error: ErrorTypes;
}
