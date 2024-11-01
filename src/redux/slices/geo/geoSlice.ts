import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { getTimeoutPromise } from '../../../utils';
import { GeoState } from '../../stateTypes';
import { IpResponse, GeoResponse } from './types';

const initialState: GeoState = {
  ip: null,
  geo: null,
  loading: false,
  error: null,
};

export const fetchIp = createAsyncThunk('geo/fetchIp', async () => {
  const cancelToken: CancelTokenSource = axios.CancelToken.source();
  const timeoutMessage = 'Время ожидания превышено';

  const options = {
    method: 'GET',
    url: 'https://api.ipify.org?format=json',
    cancelToken: cancelToken.token,
  };

  const ipPromise = axios
    .request(options)
    .then((response: AxiosResponse<IpResponse>) => {
      return response.data.ip;
    });

  const timeoutIpPromise = getTimeoutPromise(cancelToken, timeoutMessage);

  const ip = await Promise.race([timeoutIpPromise, ipPromise]).then(
    (ip) => ip as string
  );

  return ip;
});

export const fetchGeo = createAsyncThunk('geo/fetchGeo', async (ip: string) => {
  const cancelToken: CancelTokenSource = axios.CancelToken.source();
  const timeoutMessage = 'Время ожидания превышено';

  const geoPromise = axios
    .get('http://ip-api.com/json/' + ip)
    .then((resp: AxiosResponse<GeoResponse>) => {
      return resp.data;
    });

  const timeoutGeoPromise = getTimeoutPromise(cancelToken, timeoutMessage);

  const geo = await Promise.race([timeoutGeoPromise, geoPromise]).then(
    (data) => {
      return data as GeoResponse;
    }
  );

  return geo;
});

const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchIp.fulfilled,
      (state, { payload }: PayloadAction<string>) => {
        state.error = null;
        state.loading = false;
        state.ip = payload;
      }
    );
    builder.addCase(fetchIp.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });
    builder.addCase(fetchGeo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchGeo.fulfilled,
      (state, { payload }: PayloadAction<GeoResponse>) => {
        state.error = null;
        state.loading = false;
        state.geo = payload;
      }
    );
    builder.addCase(fetchGeo.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });
  },
});

export default geoSlice.reducer;
