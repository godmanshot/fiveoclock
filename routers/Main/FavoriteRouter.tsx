import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { BackButton } from "../../components/BackButton";
import ProductScreen from "../../screens/Main/ProductScreen";
import { Product } from "../../api/products";
import FavoriteScreen from "../../screens/Main/FavoriteScreen";

export type FavoriteRouterParamList = {
    Favorite: undefined;
    Product: {
        product: Product;
    };
};

const FavoriteStack = createNativeStackNavigator<FavoriteRouterParamList>();

export const FavoriteRouter = () => {
    
    return <>
        <FavoriteStack.Navigator screenOptions={({ navigation, route }: NativeStackScreenProps<FavoriteRouterParamList>) => ({
            headerLeft: () => route.name != 'Favorite' && navigation.canGoBack() ? <BackButton handleBack={navigation.goBack}/> : <></>,
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTransparent: true,
            headerTitleAlign: "center",
            animation: "none"
        })}>
            <FavoriteStack.Screen name="Favorite" component={FavoriteScreen} options={{title: 'Избранное'}}/>
            <FavoriteStack.Screen name="Product" component={ProductScreen} options={{title: ''}} />
        </FavoriteStack.Navigator>
    </>;
};