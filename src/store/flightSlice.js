import { createSlice } from '@reduxjs/toolkit';

const flightSlice = createSlice({
  name: 'flights',
  initialState: [],
  reducers: {
    setFlights: (state, action) => action.payload,
  },
});

export const { setFlights } = flightSlice.actions;
export default flightSlice.reducer;