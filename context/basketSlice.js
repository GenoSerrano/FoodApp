import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id && item.restaurant === action.payload.restaurant
      );

      let newBasket = [...state.items];

      if(index >= 0){
        newBasket.splice(index, 1);
      } else {
        
      }

      state.items = newBasket;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions

export const selectBasketItems = (state, restaurant) => state.basket.items.filter((items) => items.restaurant === restaurant);

export const selectBasketItemsByID = (state, id, restaurant) => state.basket.items.filter((items) => items.id === id && items.restaurant === restaurant);

export const selectBasketTotal = (state, restaurant) => state.basket.items.filter((items) => items.restaurant === restaurant).reduce((total, item) => (total += Number(item.price)), 0 );

export default basketSlice.reducer