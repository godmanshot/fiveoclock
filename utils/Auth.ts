import { useCallback } from "react";
import { setAuthToken } from "../store/AppReducer";
import { useAppDispatch, useAppSelector } from "../store/store";

const useAuth = () => {

    const isAuth = useAppSelector(state => state.app.authToken) != '' ? true : false;

    const dispatch = useAppDispatch();
    const setAuth = (token: string) => dispatch(setAuthToken(token));
    
    return { isAuth, setAuth };
};

export { useAuth };