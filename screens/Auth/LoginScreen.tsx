import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "native-base"
import { AuthRouterParamsList } from "../../routers/AuthRouter";

type LoginNavigationProps = NativeStackNavigationProp<AuthRouterParamsList, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<LoginNavigationProps>();
    
    return <>
        <Text>Hello</Text>
    </>;
}