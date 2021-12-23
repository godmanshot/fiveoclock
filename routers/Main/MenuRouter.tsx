import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { BackButton } from "../../components/BackButton";
import { HeaderCanteenSelect } from "../../components/HeaderCanteenSelect";
import { useActiveCanteen } from "../../utils/Helpers";
import HomeScreen from "../../screens/Main/HomeScreen";
import PopularScreen from "../../screens/Main/PopularScreen";
import ProductScreen from "../../screens/Main/ProductScreen";
import MenuScreen from "../../screens/Main/MenuScreen";
import AccountScreen from "../../screens/Main/AccountScreen";
import OrdersHistoryScreen from "../../screens/Main/OrdersHistoryScreen";

export type MenuRouterParamList = {
    Menu: undefined;
    Account: undefined;
    OrdersHistory: undefined;
};

const HomeStack = createNativeStackNavigator<MenuRouterParamList>();

export const MenuRouter = () => {
    const { canteen, clearCanteen } = useActiveCanteen();
    const handleClearCanteen = () => clearCanteen();
    
    return <>
        <HomeStack.Navigator screenOptions={({ navigation, route }: NativeStackScreenProps<MenuRouterParamList>) => ({
            headerLeft: () => route.name !== 'Menu' && navigation.canGoBack() ? <BackButton handleBack={navigation.goBack}/> : <></>,
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTransparent: true,
            headerTitleAlign: "center",
            animation: "none"
        })}>
            <HomeStack.Screen name="Menu" component={MenuScreen} options={{ title: '' }} />
            <HomeStack.Screen name="Account" component={AccountScreen} options={{ title: 'Аккаунт' }} />
            <HomeStack.Screen name="OrdersHistory" component={OrdersHistoryScreen} options={{ title: 'Мои заказы' }} />
        </HomeStack.Navigator>
    </>;
};