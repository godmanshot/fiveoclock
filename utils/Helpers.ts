import { useCallback } from "react";
import { Canteen } from "../api/canteen";
import { BasketProduct, Product } from "../api/products";
import { addCountProductToBasket, addProductToBasket, addProductToFavorite, changeAddress, changeFloor, changeHouse, changeRoom, clearActiveCanteen, clearBasket, clearFavorite, deleteProductFromBasket, deleteProductFromFavorite, setActiveCanteen, setAuthToken, subCountProductToBasket } from "../store/AppReducer";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useAuth = () => {

    const isAuth = useAppSelector(state => state.app.authToken) != '' ? true : false;

    const dispatch = useAppDispatch();
    const setAuth = useCallback((token: string) => dispatch(setAuthToken(token)), [dispatch]);
    const logOut = useCallback(() => dispatch(setAuthToken('')), [dispatch]);
    
    return { isAuth, setAuth, logOut };
    
};

export const useActiveCanteen = () => {
    const canteen = useAppSelector(state => state.app.activeCanteen);

    const dispatch = useAppDispatch();
    const setCanteen = useCallback((canteen: Canteen) => {
        dispatch(clearBasket());
        dispatch(setActiveCanteen(canteen));
    }, [dispatch]);
    const clearCanteen = useCallback(() => {
        dispatch(clearBasket());
        dispatch(clearActiveCanteen());
    }, [dispatch]);

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
    const addProductCount = useCallback((product_id: number) => dispatch(addCountProductToBasket(product_id)), [dispatch]);
    const subProductCount = useCallback((product_id: number) => dispatch(subCountProductToBasket(product_id)), [dispatch]);

    return {
        basketProducts,
        addToBasket,
        removeFromBasket,
        clearAllBasket,
        hasInBasket,
        productCountInBasket,
        addProductCount,
        subProductCount,
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

export const useContacts = () => {
    const { address, house, floor, room } = useAppSelector(state => state.app.contacts);
    const dispatch = useAppDispatch();

    const setAddress = useCallback((value: string) => dispatch(changeAddress(value)), [dispatch]);
    const setHouse = useCallback((value: string) => dispatch(changeHouse(value)), [dispatch]);
    const setFloor = useCallback((value: string) => dispatch(changeFloor(value)), [dispatch]);
    const setRoom = useCallback((value: string) => dispatch(changeRoom(value)), [dispatch]);

    return {
        address,
        house,
        floor,
        room,
        setAddress,
        setHouse,
        setFloor,
        setRoom,
    };
}