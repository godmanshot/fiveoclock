import React from "react";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { BackButton } from "../../components/BackButton";
import { HeaderCanteenSelect } from "../../components/HeaderCanteenSelect";
import { useActiveCanteen } from "../../utils/Helpers";
import HomeScreen from "../../screens/Main/HomeScreen";
import PopularScreen from "../../screens/Main/PopularScreen";
import ProductScreen from "../../screens/Main/ProductScreen";
import { Product } from "../../api/products";

export type HomeRouterParamList = {
    Home: undefined;
    Product: {
        product: Product;
    };
    Popular: undefined
};

const HomeStack = createNativeStackNavigator<HomeRouterParamList>();

export const HomeRouter = () => {
    const { canteen, clearCanteen } = useActiveCanteen();
    const handleClearCanteen = () => clearCanteen();
    
    return <>
        <HomeStack.Navigator screenOptions={({ navigation, route }: NativeStackScreenProps<HomeRouterParamList>) => ({
            headerTitle: props => route.name == 'Home' ? <HeaderCanteenSelect canteenName={canteen!.name} handleClearCanteen={handleClearCanteen}/> : <></>,
            headerLeft: () => navigation.canGoBack() ? <BackButton handleBack={navigation.goBack}/> : <></>,
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTransparent: true,
            headerTitleAlign: "center",
            animation: "none"
        })}>
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="Product" component={ProductScreen} />
            <HomeStack.Screen name="Popular" component={PopularScreen} />
        </HomeStack.Navigator>
    </>;
};