import { configureStore } from '@reduxjs/toolkit';
import basketReducer from "./context/basketSlice";
import locationReducer from './context/locationSlice';
import restaurantReducer from "./context/restaurantSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
    location: locationReducer
  },
})