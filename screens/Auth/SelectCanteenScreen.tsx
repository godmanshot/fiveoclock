import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "native-base"
import { AuthRouterParamsList } from "../../routers/AuthRouter";

type SelectCanteenNavigationProps = NativeStackNavigationProp<AuthRouterParamsList, 'SelectCanteen'>;

export default function SelectCanteenScreen() {
    const navigation = useNavigation<SelectCanteenNavigationProps>();

    return <>
        <Text>Hello</Text>
    </>;
}