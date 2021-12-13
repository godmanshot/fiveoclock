import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Canteen } from "../api/canteen";
import { BasketProduct, Product } from "../api/products";

interface AppState {
    authToken: string;
    activeCanteen: Canteen | undefined;
    basketProducts: BasketProduct[];
    favoriteProducts: Product[];
}

const initState: AppState = {
    authToken: '',
    activeCanteen: undefined,
    basketProducts: [],
    favoriteProducts: [],
};

const AppReducer = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        setAuthToken: (state: AppState, { payload }: PayloadAction<string>) => {
            state.authToken = payload;
        },
        clearAuthToken: (state: AppState) => {
            state.authToken = '';
        },
        setActiveCanteen: (state: AppState, { payload }: PayloadAction<Canteen>) => {
            state.activeCanteen = payload;
        },
        clearActiveCanteen: (state: AppState) => {
            state.activeCanteen = undefined;
        },
        addProductToBasket: (state: AppState, { payload }: PayloadAction<BasketProduct>) => {
            state.basketProducts = state.basketProducts.filter(product => product.id !== payload.id);
            state.basketProducts.push(payload);
        },
        deleteProductFromBasket: (state: AppState, { payload }: PayloadAction<number>) => {
            state.basketProducts = state.basketProducts.filter(product => product.id !== payload);
        },
        clearBasket: (state: AppState) => {
            state.basketProducts = [];
        },
        addProductToFavorite: (state: AppState, { payload }: PayloadAction<Product>) => {
            state.favoriteProducts = state.favoriteProducts.filter(product => product.id !== payload.id);
            state.favoriteProducts.push(payload);
        },
        deleteProductFromFavorite: (state: AppState, { payload }: PayloadAction<number>) => {
            state.favoriteProducts = state.favoriteProducts.filter(product => product.id !== payload);
        },
        clearFavorite: (state: AppState) => {
            state.basketProducts = [];
        },

    }
});

export const {
    setAuthToken,
    clearAuthToken,
    setActiveCanteen,
    clearActiveCanteen,
    addProductToBasket,
    deleteProductFromBasket,
    clearBasket,
    addProductToFavorite,
    deleteProductFromFavorite,
    clearFavorite,
} = AppReducer.actions;
export default AppReducer.reducer;