import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "native-base"
import { MainRouterParamsList } from "../../routers/MainRouter";

type PopularNavigationProps = NativeStackNavigationProp<MainRouterParamsList, 'Popular'>;

export default function PopularScreen() {
    const navigation = useNavigation<PopularNavigationProps>();

    return <>
        <Text>Hello</Text>
    </>;
}