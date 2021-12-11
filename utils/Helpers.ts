import { useCallback } from "react";
import { Canteen } from "../api/canteen";
import { clearActiveCanteen, setActiveCanteen, setAuthToken } from "../store/AppReducer";
import { useAppDispatch, useAppSelector } from "../store/store";

const useAuth = () => {

    const isAuth = useAppSelector(state => state.app.authToken) != '' ? true : false;

    const dispatch = useAppDispatch();
    const setAuth = useCallback((token: string) => dispatch(setAuthToken(token)), [dispatch]);
    
    return { isAuth, setAuth };
    
};

const useActiveCanteen = () => {
    const canteen = useAppSelector(state => state.app.activeCanteen);

    const dispatch = useAppDispatch();
    const setCanteen = useCallback((canteen: Canteen) => dispatch(setActiveCanteen(canteen)), [dispatch]);
    const clearCanteen = useCallback(() => dispatch(clearActiveCanteen()), [dispatch]);

    return { canteen, setCanteen, clearCanteen };
};

export { useAuth, useActiveCanteen };