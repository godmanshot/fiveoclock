import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "native-base"
import { MainRouterParamsList } from "../../routers/MainRouter";

type ProductNavigationProps = NativeStackNavigationProp<MainRouterParamsList, 'Product'>;

export default function ProductScreen() {
    const navigation = useNavigation<ProductNavigationProps>();

    return <>
        <Text>Hello</Text>
    </>;
}