import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  product: [],
  alert: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data } = await axios.get(`http://localhost:3000/api/products`);
    return data;
  }
);

export const deleteProducts = createAsyncThunk(
  'products/deleteProducts',
  async (id) => {
    const { data } = await axios.delete(
      `http://localhost:3000/api/products/${id}`
    );
    return id;
  }
);

export const addProducts = createAsyncThunk(
  'products/addProducts',
  async (payload) => {
    const { data } = await axios.post(
      `http://localhost:3000/api/products`,
      payload.json,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  }
);

export const updateProducts = createAsyncThunk(
  `products/updateProducts`,
  async (payload) => {
    const { data } = await axios.put(
      `http://localhost:3000/api/products/${payload.id}`,
      payload.json
    );
    return data;
  }
);

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.product = action.payload;
    })
    .addCase(fetchProducts.rejected, (state) => {
      state.alert = { type: 'error', message: 'Internal server error' };
    })
    .addCase(deleteProducts.fulfilled, (state, action) => {
      state.product = state.product.filter(
        (product) => product._id !== action.payload
      );
      state.alert = {
        type: 'success',
        message: 'Product deleted from the list',
      };
    })

    .addCase(updateProducts.fulfilled, (state, action) => {
      // Trouver l'indice du produit dans le tableau.
      const index = state.product.findIndex(
        (product) => product._isd === action.payload._id
      );
      // Si le produit existe, le remplacer par le produit mis à jour.
      if (index !== -1) {
        state.product[index] = action.payload;
      }
      state.alert = { type: 'success', message: 'Product updated' };
    })

    .addCase(addProducts.fulfilled, (state, action) => {
      state.product = [...state.product, action.payload];
      state.alert = { type: 'success', message: 'Product added to the list' };
    });
});

export default productReducer;
