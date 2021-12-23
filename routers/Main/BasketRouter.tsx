import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { BackButton } from "../../components/BackButton";
import BasketScreen from "../../screens/Main/BasketScreen";
import OrdersHistoryScreen from "../../screens/Main/OrdersHistoryScreen";

export type BasketRouterParamList = {
    Basket: undefined;
    OrdersHistory: undefined;
};

const BasketStack = createNativeStackNavigator<BasketRouterParamList>();

export const BasketRouter = () => {
    
    return <>
        <BasketStack.Navigator screenOptions={({ navigation, route }: NativeStackScreenProps<BasketRouterParamList>) => ({
            headerLeft: () => route.name != 'Basket' && navigation.canGoBack() ? <BackButton handleBack={navigation.goBack}/> : <></>,
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTransparent: true,
            headerTitleAlign: "center",
            animation: "none"
        })}>
            <BasketStack.Screen name="Basket" component={BasketScreen} options={{title: 'Корзина'}}/>
            <BasketStack.Screen name="OrdersHistory" component={OrdersHistoryScreen} options={{ title: 'Мои заказы' }} />
        </BasketStack.Navigator>
    </>;
};