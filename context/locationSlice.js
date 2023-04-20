import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  location: [],
  address: []
}

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
    },
});

export const { setLocation, setAddress } = locationSlice.actions;

export const selectLocation = (state) => state.location.location;

export const selectAddress = (state) => state.location.address;

export default locationSlice.reducer;