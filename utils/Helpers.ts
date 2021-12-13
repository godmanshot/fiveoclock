import { useCallback } from "react";
import { Canteen } from "../api/canteen";
import { BasketProduct, Product } from "../api/products";
import { addProductToBasket, addProductToFavorite, clearActiveCanteen, clearBasket, clearFavorite, deleteProductFromBasket, deleteProductFromFavorite, setActiveCanteen, setAuthToken } from "../store/AppReducer";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useAuth = () => {

    const isAuth = useAppSelector(state => state.app.authToken) != '' ? true : false;

    const dispatch = useAppDispatch();
    const setAuth = useCallback((token: string) => dispatch(setAuthToken(token)), [dispatch]);
    
    return { isAuth, setAuth };
    
};

export const useActiveCanteen = () => {
    const canteen = useAppSelector(state => state.app.activeCanteen);

    const dispatch = useAppDispatch();
    const setCanteen = useCallback((canteen: Canteen) => dispatch(setActiveCanteen(canteen)), [dispatch]);
    const clearCanteen = useCallback(() => dispatch(clearActiveCanteen()), [dispatch]);

    return { canteen, setCanteen, clearCanteen };
};

export const useBasket = () => {
    const basketProducts = useAppSelector(state => state.app.basketProducts);
    const dispatch = useAppDispatch();

    const addToBasket = useCallback((product: BasketProduct) => dispatch(addProductToBasket(product)), [dispatch]);
    const removeFromBasket = useCallback((product_id: number) => dispatch(deleteProductFromBasket(product_id)), [dispatch]);
    const clearAllBasket = useCallback(() => dispatch(clearBasket()), [dispatch]);
    const hasInBasket = useCallback((product_id: number) => basketProducts.find(product => product.id == product_id) !== undefined, [basketProducts]);
    const productCountInBasket = useCallback(() => basketProducts.length, [basketProducts]);

    return {
        basketProducts,
        addToBasket,
        removeFromBasket,
        clearAllBasket,
        hasInBasket,
        productCountInBasket
    };
};

export const useFavorites = () => {
    const favoriteProducts = useAppSelector(state => state.app.favoriteProducts);
    const dispatch = useAppDispatch();

    const addToFavorite = useCallback((product: Product) => dispatch(addProductToFavorite(product)), [dispatch]);
    const removeFromFavorite = useCallback((product_id: number) => dispatch(deleteProductFromFavorite(product_id)), [dispatch]);
    const clearAllFavorite = useCallback(() => dispatch(clearFavorite()), [dispatch]);
    const hasInFavorite = useCallback((product_id: number) => favoriteProducts.find(product => product.id == product_id) !== undefined, [favoriteProducts]);
    const productCountInFavorite = useCallback(() => favoriteProducts.length, [favoriteProducts]);

    return {
        favoriteProducts,
        addToFavorite,
        removeFromFavorite,
        clearAllFavorite,
        hasInFavorite,
        productCountInFavorite
    };
};