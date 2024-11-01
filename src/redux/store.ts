import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import weatherDataReducer from './slices/weather/weatherDataSlice';
import geoReducer from './slices/geo/geoSlice';
import weatherGeoReducer from './slices/weather/weatherGeoSlice';

export const rootReducer = combineReducers({
  weatherDataReducer,
  weatherGeoReducer,
  geoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
