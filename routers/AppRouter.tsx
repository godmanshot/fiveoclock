import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../utils/Helpers";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";

export default function AppRouter() {

    const { isAuth } = useAuth();

    return <>
        <NavigationContainer>
            {isAuth ? <>
                <MainRouter />
            </> : <>
                <AuthRouter />
            </>}
        </NavigationContainer>
    </>;
};