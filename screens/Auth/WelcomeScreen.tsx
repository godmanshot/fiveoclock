import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, Image, VStack, Heading, Center, HStack } from "native-base"
import { AuthRouterParamsList } from "../../routers/AuthRouter";
import { HeaderBackground } from "../../components/HeaderBackground";
import { Pressable } from "react-native";

type WelcomeNavigationProps = NativeStackNavigationProp<AuthRouterParamsList, 'Welcome'>;

export default function WelcomeScreen() {
    const navigation = useNavigation<WelcomeNavigationProps>();

    return <>
        <HeaderBackground />
        <VStack px={15} flex={1} justifyContent="center">
            <Heading fontWeight={800} fontSize={36} mt="-190px" mb="20px">
                Добро{"\n"}
                пожаловать в{"\n"}
                Five O’Clock
            </Heading>
            <Text fontSize={20} mb="60px">
                Ваши любимые блюда уже у{"\n"}
                нас в заведении!
            </Text>

            <Button variant="outline" colorScheme="fiveoclock" size="lg" mb="20px" onPress={() => navigation.navigate("Register")}>
                <Text fontSize={20} color="fiveoclock.700" fontWeight={700}>Зарегистрируйтесь</Text>
            </Button>

            <HStack justifyContent="center" space={2}>
                <Text fontSize={16} color="muted.400">Уже есть аккаунт?</Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text fontSize={16} fontWeight={600} color="fiveoclock.700" underline>Авторизуйтесь</Text>
                </Pressable>
            </HStack>
        </VStack>
    </>;
}