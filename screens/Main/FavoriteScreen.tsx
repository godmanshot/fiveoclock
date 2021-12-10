import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "native-base"
import { MainRouterParamsList } from "../../routers/MainRouter";

type FavoriteNavigationProps = NativeStackNavigationProp<MainRouterParamsList, 'Favorite'>;

export default function FavoriteScreen() {
    const navigation = useNavigation<FavoriteNavigationProps>();

    return <>
        <Text>Hello</Text>
    </>;
}