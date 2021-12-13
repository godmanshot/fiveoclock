import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackButton } from "../components/BackButton";
import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import VerificationScreen from "../screens/Auth/VerificationScreen";

export type AuthRouterParamsList = {
    Welcome: undefined,
    Login: undefined,
    Register: undefined,
    Verification: {
        phone: string
    },
}

const AuthStack = createNativeStackNavigator<AuthRouterParamsList>();

export default function AuthRouter() {
    
    return <>
        <AuthStack.Navigator screenOptions={({ navigation, route }: NativeStackScreenProps<AuthRouterParamsList>) => ({
            headerLeft: () => navigation.canGoBack() ? <BackButton handleBack={navigation.goBack}/> : <></>,
            title: '',
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTransparent: true,
            animation: "none"
        })}>
            <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
            <AuthStack.Screen name="Verification" component={VerificationScreen} />
        </AuthStack.Navigator>
    </>;
}