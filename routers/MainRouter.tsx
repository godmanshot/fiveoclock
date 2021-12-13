import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SelectCanteenScreen from "../screens/Main/SelectCanteenScreen";
import { useActiveCanteen } from "../utils/Helpers";
import { HomeRouter } from "./Main/HomeRouter";

export type MainRouterParamsList = {
    HomeRouter: undefined;
}

const MainStack = createBottomTabNavigator<MainRouterParamsList>();

export default function MainRouter() {
    const { canteen } = useActiveCanteen();

    return <>
        {canteen !== undefined ? <>
            <MainStack.Navigator screenOptions={{ headerShown: false }}>
                <MainStack.Screen name="HomeRouter" component={HomeRouter} />
            </MainStack.Navigator>
        </> : <>
            <SelectCanteenScreen />
        </>}
    </>;
}

