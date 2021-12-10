import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Pressable } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import SelectCanteenScreen from "../screens/Auth/SelectCanteenScreen";
import VerificationScreen from "../screens/Auth/VerificationScreen";

export type AuthRouterParamsList = {
    Welcome: undefined,
    Login: undefined,
    Register: undefined,
    SelectCanteen: undefined,
    Verification: undefined,
}

const AuthStack = createNativeStackNavigator<AuthRouterParamsList>();

export default function AuthRouter() {
    
    return <>
        <AuthStack.Navigator screenOptions={({ navigation, route }: NativeStackScreenProps<AuthRouterParamsList>) => ({
            headerLeft: () => navigation.canGoBack() ? <>
                <Pressable onPress={() => navigation.goBack()} height={10}>
                    <Image source={require("../assets/navigation/back.png")} style={{transform: [{ translateX: -15 }, { translateY: -10 }]}} alt="Back" size="md"/>
                </Pressable>
            </> : <></>,
            title: '',
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTransparent: true,
            animation: "none"
        })}>
            <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
            <AuthStack.Screen name="SelectCanteen" component={SelectCanteenScreen} />
            <AuthStack.Screen name="Verification" component={VerificationScreen} />
        </AuthStack.Navigator>
    </>;
}