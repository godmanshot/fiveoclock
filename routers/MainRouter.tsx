import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SelectCanteenScreen from "../screens/Main/SelectCanteenScreen";
import { useActiveCanteen, useBasket } from "../utils/Helpers";
import { HomeRouter } from "./Main/HomeRouter";
import { Icon } from "native-base";
import { Feather } from "@expo/vector-icons";
import { FavoriteRouter } from "./Main/FavoriteRouter";
import { MenuRouter } from "./Main/MenuRouter";
import { BasketRouter } from "./Main/BasketRouter";

export type MainRouterParamsList = {
    HomeRouter: undefined;
    BasketRouter: undefined;
    FavoriteRouter: undefined;
    MenuRouter: undefined;
}

const MainStack = createBottomTabNavigator<MainRouterParamsList>();

export default function MainRouter() {
    const { canteen } = useActiveCanteen();
    const { productCountInBasket } = useBasket();

    
    return <>
        {canteen !== undefined ? <>
            <MainStack.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "fiveoclock.500", tabBarShowLabel: false }}>
                <MainStack.Screen name="HomeRouter" component={HomeRouter} options={{
                    tabBarIcon: ({ color }) => <>
                        <Icon as={Feather} name="compass" color={color} size="30px"/>
                    </>,
                }}/>
                <MainStack.Screen name="BasketRouter" component={BasketRouter} options={{
                    tabBarBadge: productCountInBasket() > 0 ? productCountInBasket() : undefined,
                    tabBarBadgeStyle: {fontSize: 16, lineHeight: 20},
                    tabBarIcon: ({ color }) => <>
                        <Icon as={Feather} name="shopping-cart" color={color} size="30px"/>
                    </>,
                }}/>
                <MainStack.Screen name="FavoriteRouter" component={FavoriteRouter} options={{
                    tabBarIcon: ({ color }) => <>
                        <Icon as={Feather} name="heart" color={color} size="30px"/>
                    </>,
                }}/>
                <MainStack.Screen name="MenuRouter" component={MenuRouter} options={{
                    tabBarIcon: ({ color }) => <>
                        <Icon as={Feather} name="user" color={color} size="30px"/>
                    </>,
                }}/>
            </MainStack.Navigator>
        </> : <>
            <SelectCanteenScreen />
        </>}
    </>;
}