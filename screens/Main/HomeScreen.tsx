import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "native-base"
import { MainRouterParamsList } from "../../routers/MainRouter";

type HomeNavigationProps = NativeStackNavigationProp<MainRouterParamsList, 'Home'>;

export default function HomeScreen() {
    const navigation = useNavigation<HomeNavigationProps>();

    return <>
        <Text>Hello</Text>
    </>;
}