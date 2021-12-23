import { combineReducers, createStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from 'redux-persist';
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"
import AppReducer from "./AppReducer";

const appPersistConfig = {
    key: 'root',
    storage: ExpoFileSystemStorage,
    whitelist: ['authToken', 'activeCanteen', 'favoriteProducts', 'contacts']
}

const reducer = combineReducers({
    app: persistReducer(appPersistConfig, AppReducer)
});

const store = createStore(reducer);

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<RootDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;