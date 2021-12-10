import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "native-base"
import { MainRouterParamsList } from "../../routers/MainRouter";

type AccountNavigationProps = NativeStackNavigationProp<MainRouterParamsList, 'Account'>;

export default function AccountScreen() {
    const navigation = useNavigation<AccountNavigationProps>();

    return <>
        <Text>Hello</Text>
    </>;
}