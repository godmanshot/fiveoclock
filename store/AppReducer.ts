import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Canteen } from "../api/canteen";
import { BasketProduct, Product } from "../api/products";

interface AppState {
    authToken: string;
    activeCanteen: Canteen | undefined;
    basketProducts: BasketProduct[];
    favoriteProducts: Product[];
    contacts: {
        address: string;
        house: string;
        floor: string;
        room: string;
    }
}

const initState: AppState = {
    authToken: '',
    activeCanteen: undefined,
    basketProducts: [],
    favoriteProducts: [],
    contacts: {
        address: '',
        house: '',
        floor: '',
        room: ''
    }
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
        addCountProductToBasket: (state: AppState, { payload }: PayloadAction<number>) => {
            const product = state.basketProducts.find(product => product.id == payload);
            if(product != undefined) {
                product.count += 1;
            }
        },
        subCountProductToBasket: (state: AppState, { payload }: PayloadAction<number>) => {
            const product = state.basketProducts.find(product => product.id == payload);
            if(product != undefined && product.count > 1) {
                product.count -= 1;
            }
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

        changeAddress: (state: AppState, { payload }: PayloadAction<string>) => {
            state.contacts.address = payload;
        },
        changeHouse: (state: AppState, { payload }: PayloadAction<string>) => {
            state.contacts.house = payload;
        },
        changeFloor: (state: AppState, { payload }: PayloadAction<string>) => {
            state.contacts.floor = payload;
        },
        changeRoom: (state: AppState, { payload }: PayloadAction<string>) => {
            state.contacts.room = payload;
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
    addCountProductToBasket,
    subCountProductToBasket,
    clearBasket,
    addProductToFavorite,
    deleteProductFromFavorite,
    clearFavorite,
    changeAddress,
    changeHouse,
    changeFloor,
    changeRoom,
} = AppReducer.actions;
export default AppReducer.reducer;