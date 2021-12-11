import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import { useAuth } from "../utils/Helpers";

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