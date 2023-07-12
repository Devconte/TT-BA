import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
    product: [],
    alert: null,
}

export const fetchProducts = createAsyncThunk('products/fetchProducts',
async () => {
    const { data } = await axios.get(`http://localhost:3000/api/products`)
    return data;
})

export const deleteProducts = createAsyncThunk('products/deleteProducts',
async (id) => {
    const { data } = await axios.delete(`http://localhost:3000/api/products/${id}`)
    return data;
})

export const updateProducts = createAsyncThunk(`products/updateProducts`,
async (id, JSON) => {
    const { data } = await axios.put(`http:localhost:3000/api/product/${id}`, JSON)
    return data;
} )

const productReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(fetchProducts.fulfilled, (state, action) => {
        state.product = action.payload
    })
    .addCase(fetchProducts.rejected, (state)=> {
        state.alert = {type: 'error', message: 'Problème avec la BDD'}
    })
    .addCase(deleteProducts.fulfilled, (state) => {
        state.alert = {type: 'success', message: 'Produit supprimé'}
    })
    .addCase(updateProducts.fulfilled, (state) => {
        state.alert = {type: 'success', message: 'Produit mis à jour '}
    })
    
})

export default productReducer;
