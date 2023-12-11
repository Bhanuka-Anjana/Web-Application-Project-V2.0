import { createSlice } from '@reduxjs/toolkit';

const entitySlice = createSlice({
  name: 'entities',
  initialState: {
    products: [],
    categories: [],
    orders:[],
    customers:[]
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
  },
});

export const { setCategories, setCustomers,setOrders,setProducts } = entitySlice.actions;
export default entitySlice.reducer;
