import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "native-base"
import { MainRouterParamsList } from "../../routers/MainRouter";

type MenuNavigationProps = NativeStackNavigationProp<MainRouterParamsList, 'Menu'>;

export default function MenuScreen() {
    const navigation = useNavigation<MenuNavigationProps>();

    return <>
        <Text>Hello</Text>
    </>;
}