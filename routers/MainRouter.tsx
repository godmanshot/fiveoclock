import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "../screens/Main/AccountScreen";
import CheckoutScreen from "../screens/Main/CheckoutScreen";
import FavoriteScreen from "../screens/Main/FavoriteScreen";
import HomeScreen from "../screens/Main/HomeScreen";
import OrdersHistoryScreen from "../screens/Main/OrdersHistoryScreen";
import PopularScreen from "../screens/Main/PopularScreen";
import ProductScreen from "../screens/Main/ProductScreen";
import MenuScreen from "../screens/Main/MenuScreen";

export type MainRouterParamsList = {
    Account: undefined,
    Checkout: undefined,
    Favorite: undefined,
    Home: undefined,
    OrdersHistory: undefined,
    Popular: undefined,
    Product: undefined,
    Menu: undefined,
}

const MainStack = createBottomTabNavigator<MainRouterParamsList>();

export default function MainRouter() {
    return <>
        <MainStack.Navigator>
            <MainStack.Screen name="Home" component={HomeScreen} />
            {/* <MainStack.Screen name="Product" component={ProductScreen} /> */}
            {/* <MainStack.Screen name="Popular" component={PopularScreen} /> */}

            <MainStack.Screen name="Checkout" component={CheckoutScreen} />

            <MainStack.Screen name="Favorite" component={FavoriteScreen} />

            <MainStack.Screen name="Menu" component={MenuScreen} />
            {/* <MainStack.Screen name="Account" component={AccountScreen} /> */}
            {/* <MainStack.Screen name="OrdersHistory" component={OrdersHistoryScreen} /> */}
        </MainStack.Navigator>
    </>;
}