import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "native-base"
import { AuthRouterParamsList } from "../../routers/AuthRouter";

type VerificationNavigationProps = NativeStackNavigationProp<AuthRouterParamsList, 'Verification'>;

export default function VerificationScreen() {
    const navigation = useNavigation<VerificationNavigationProps>();

    return <>
        <Text>Hello</Text>
    </>;
}