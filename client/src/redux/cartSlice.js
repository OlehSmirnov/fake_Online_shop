import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({

  name: 'cart',
  initialState: {
    cartItems: [],
    showCart: false,
    loading: false
  },
  reducers: {
    setItem: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload]
    },
    updateItem: (state, action) => {
      const {index, item, type} = action.payload
      switch (type) {
        case "INCREASE" :
          state.cartItems[index] = {...item, count: item.count + 1}
          break
        case "DECREASE" :
          if (state.cartItems[index].count !== 1)
            state.cartItems[index] = {...item, count: item.count - 1}
          break
        case "DELETE" :
          state.cartItems = state.cartItems.filter((item, currentIndex) => currentIndex !== index)
          break
        default :
          throw new Error("Error in update item!")
      }
    },
    setShowCart: (state, action) => {
      state.showCart = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { setItem, setShowCart, setLoading, updateItem } = cartSlice.actions

export const getShowCart = (state) => state.cart.showCart
export const getCartItems = (state) => state.cart.cartItems
export const getLoading = (state) => state.cart.loading

export default cartSlice.reducer