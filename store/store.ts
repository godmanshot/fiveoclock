import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppReducer from "./AppReducer";
import createSecureStore from "redux-persist-expo-securestore";

const appPersistConfig = {
    key: 'root',
    storage: createSecureStore(),
    whitelist: ['']
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