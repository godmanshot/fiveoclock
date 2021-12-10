import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "native-base"
import { MainRouterParamsList } from "../../routers/MainRouter";

type OrdersHistoryNavigationProps = NativeStackNavigationProp<MainRouterParamsList, 'OrdersHistory'>;

export default function OrdersHistoryScreen() {
    const navigation = useNavigation<OrdersHistoryNavigationProps>();

    return <>
        <Text>Hello</Text>
    </>;
}