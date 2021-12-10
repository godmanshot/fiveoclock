import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "native-base"
import { MainRouterParamsList } from "../../routers/MainRouter";

type CheckoutNavigationProps = NativeStackNavigationProp<MainRouterParamsList, 'Checkout'>;

export default function CheckoutScreen() {
    const navigation = useNavigation<CheckoutNavigationProps>();

    return <>
        <Text>Hello</Text>
    </>;
}