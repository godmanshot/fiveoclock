import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Center, Heading, HStack, Icon, Spinner, Text, VStack } from "native-base"
import { MenuRouterParamList } from "../../routers/Main/MenuRouter";
import { apiUserGet, User } from "../../api/user";
import { handleErrorApi } from "../../api/client";
import { HeaderBackground } from "../../components/HeaderBackground";
import { Feather } from "@expo/vector-icons";
import { useAuth, useBasket } from "../../utils/Helpers";
import { HeaderExpandBackground } from "../../components/HeaderExpandBackground";

type MenuNavigationProps = NativeStackNavigationProp<MenuRouterParamList, 'Menu'>;

export default function MenuScreen() {
    const navigation = useNavigation<MenuNavigationProps>();
    const { logOut } = useAuth();
    const { clearAllBasket } = useBasket();

    const [ user, setUser ] = useState<User>();

    const handleLogout = () => {
        clearAllBasket();
        logOut();
    };

    useFocusEffect(useCallback(() => {
        apiUserGet().then(({ data }) => {

            setUser(data);

        }).catch(handleErrorApi());
    }, []));

    return <>
        <HeaderExpandBackground/>
        <VStack px="15px" alignItems="center">
            {user == undefined ? <Spinner color="fiveoclock.500" size="lg" accessibilityLabel="Столовые" /> : <>
                <Heading fontWeight={800} fontSize={20} mb="5px" textAlign="center">
                    {user.name} {user.surname}
                </Heading>
                <Text fontWeight={700} color="muted.500" textAlign="center" mb="10px">
                    {user.phone}
                </Text>
                {user.user_bonus ? <>
                    <VStack bgColor="fiveoclock.500" borderRadius="5px" padding="10px" mb="20px">
                        <Heading fontWeight={800} fontSize={20} mb="5px" color="white">
                            Бонусы
                        </Heading>
                        <HStack mb="5px">
                            <Text color="white" mr="5px">
                                Статус:
                            </Text>
                            <Text color="white" fontWeight={700}>
                                {user.user_bonus.bonus.name} (Кэшбек {user.user_bonus.bonus.bonus}%)
                            </Text>
                        </HStack>
                        <HStack>
                            <Text color="white" mr="5px">
                                Мои баллы:
                            </Text>
                            <Text color="white" fontWeight={700}>
                                {user.user_bonus.balance}
                            </Text>
                        </HStack>
                    </VStack>
                </> : <></>}

                <Button leftIcon={<Icon as={Feather} name="list" size="sm" />}
                    size="lg"
                    width="100%"
                    mb="10px"
                    height="50px"
                    variant="ghost"
                    colorScheme="fiveoclock"
                    justifyContent="flex-start"
                    onPress={() => navigation.navigate("OrdersHistory")}
                >
                    <Text fontWeight={800} fontSize={18} ml="10px">Мои заказы</Text>
                </Button>

                <Button leftIcon={<Icon as={Feather} name="user" size="sm" />}
                    size="lg"
                    width="100%"
                    mb="10px"
                    height="50px"
                    variant="ghost"
                    colorScheme="fiveoclock"
                    justifyContent="flex-start"
                    onPress={() => navigation.navigate("Account")}
                >
                    <Text fontWeight={800} fontSize={18} ml="10px">Мой профиль</Text>
                </Button>

                <Button leftIcon={<Icon as={Feather} name="log-out" size="sm" />}
                    size="lg"
                    width="100%"
                    mb="10px"
                    height="50px"
                    variant="ghost"
                    colorScheme="fiveoclock"
                    justifyContent="flex-start"
                    onPress={handleLogout}
                >
                    <Text fontWeight={800} fontSize={18} ml="10px">Выйти</Text>
                </Button>
            </>}
        </VStack>
    </>;
}