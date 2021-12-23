import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormControl, Heading, Input, Text, VStack, Image, Center, Button, HStack, Pressable } from "native-base"
import { AuthRouterParamsList } from "../../routers/AuthRouter";
import { useAppDispatch } from "../../store/store";
import { HeaderBackground } from "../../components/HeaderBackground";
import { MaskService } from "react-native-masked-text";
import { apiLogin } from "../../api/auth";
import { handleErrorApi } from "../../api/client";
import { setAuthToken } from "../../store/AppReducer";

type LoginNavigationProps = NativeStackNavigationProp<AuthRouterParamsList, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<LoginNavigationProps>();
    const dispatch = useAppDispatch();
    const [ isLoading, setIsLoading ] = useState(false);

    const [ phone, setPhone ] = useState('');
    const [ errorPhone, setErrorPhone ] = useState('');
    const handlePhone = (value: string) => {setErrorPhone(''); setPhone(MaskService.toMask('custom', value, {mask: '+7(999)999-99-99'}))};

    const [ password, setPassword ] = useState('');
    const [ errorPassword, setErrorPassword ] = useState('');
    const handlePassword = (value: string) => {setErrorPassword(''); setPassword(value)};

    const handleLogin = () => {
        setIsLoading(true);

        apiLogin(phone, password)
        .then(({ data }) => {
            setIsLoading(false);
            dispatch(setAuthToken(data));
        })
        .catch(handleErrorApi(
            (message: string, status: number|undefined) => {
                setIsLoading(false);
                if(status == 401) {
                    alert(message);
                } else if(status != 422) {
                    alert("Что-то пошло не так, возможно проблемы с интернетом");
                }
            },
            (field: string, message: string) => {
                if(field == 'phone') {
                    setErrorPhone(message);
                } else if(field == 'password') {
                    setErrorPassword(message);
                }
            }
        ));
    };
    
    return <>
        <HeaderBackground />
        <VStack px={15} flex={1}>
            <Heading fontWeight={800} fontSize={36} mb="15px">
                Авторизация
            </Heading>
            <FormControl mb="15px" isInvalid={errorPhone !== ''}>
                <FormControl.Label>
                    <Text fontSize={16} color="muted.400">Номер телефона</Text>
                </FormControl.Label>
                <Input
                    keyboardType="number-pad"
                    value={phone}
                    onChangeText={handlePhone}
                    InputLeftElement={
                        <Image
                            ml="15px"
                            height="20px"
                            width="30px"
                            source={require("../../assets/flag_icon.png")}
                            alt="phone"
                        />
                    } borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="+7(777)123-45-67"/>
                <FormControl.ErrorMessage>
                    {errorPhone}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mb="15px" isInvalid={errorPassword !== ''}>
                <FormControl.Label>
                    <Text fontSize={16} color="muted.400">Пароль</Text>
                </FormControl.Label>
                <Input autoCapitalize="none" value={password} onChangeText={handlePassword} type="password" borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="********" />
                <FormControl.ErrorMessage>
                    {errorPassword}
                </FormControl.ErrorMessage>
            </FormControl>

            <Center mb="20px" mt="30px">
                <Button isLoading={isLoading} width="250px" height="60px" backgroundColor="fiveoclock.500" borderRadius="5px" onPress={() => handleLogin()}>
                    <Text color="white" fontSize={20} fontWeight={700}>Войти</Text>
                </Button>
            </Center>

            <HStack justifyContent="center" space={2} mb="20px">
                <Text fontSize={16} color="muted.400">Нет учетной записи?</Text>
                <Pressable onPress={() => navigation.navigate("Register")}>
                    <Text fontSize={16} fontWeight={600} color="fiveoclock.700" underline>Зарегистрируйтесь</Text>
                </Pressable>
            </HStack>
        </VStack>
        
    </>;
}