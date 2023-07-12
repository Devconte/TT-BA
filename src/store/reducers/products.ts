/* eslint-disable no-underscore-dangle */
import {
  createAsyncThunk,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  _id: string;
}

interface ProductState {
  product: Product[];
  alert: { type: string; message: string } | null;
}

const initialState: ProductState = {
  product: [],
  alert: null,
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async () => {
    const { data } = await axios.get<Product[]>(
      `http://localhost:3000/api/products`
    );
    return data;
  }
);

export const deleteProducts = createAsyncThunk<string, string>(
  'products/deleteProducts',
  async (id) => {
    const { data } = await axios.delete<string>(
      `http://localhost:3000/api/products/${id}`
    );
    return id;
  }
);

interface AddProductPayload {
  json: string;
}

export const addProducts = createAsyncThunk<Product, AddProductPayload>(
  'products/addProducts',
  async (payload) => {
    const { data } = await axios.post<Product>(
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

interface UpdateProductPayload {
  id: string;
  json: string;
}

export const updateProducts = createAsyncThunk<Product, UpdateProductPayload>(
  `products/updateProducts`,
  async (payload) => {
    const { data } = await axios.put<Product>(
      `http://localhost:3000/api/products/${payload.id}`,
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

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.product = action.payload;
      }
    )
    .addCase(fetchProducts.rejected, (state) => {
      state.alert = { type: 'error', message: 'Problème avec la BDD' };
    })

    .addCase(
      deleteProducts.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.product = state.product.filter(
          (product) => product._id !== action.payload
        );
        state.alert = { type: 'success', message: 'Produit supprimé' };
      }
    )

    .addCase(
      updateProducts.fulfilled,
      (state, action: PayloadAction<Product>) => {
        // Trouver l'indice du produit dans le tableau.
        const index = state.product.findIndex(
          (product) => product._id === action.payload._id
        );
        // Si le produit existe, le remplacer par le produit mis à jour.
        if (index !== -1) {
          state.product[index] = action.payload;
        }
        state.alert = { type: 'success', message: 'Produit mis à jour ' };
      }
    )

    .addCase(addProducts.fulfilled, (state, action: PayloadAction<Product>) => {
      state.product = [...state.product, action.payload];
      state.alert = { type: 'success', message: 'Product added to the list' };
    });
});

export default productReducer;
