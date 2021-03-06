import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormControl, Heading, Input, Stack, Text, VStack, WarningOutlineIcon, Image, Button, Center, HStack, Pressable } from "native-base"
import { AuthRouterParamsList } from "../../routers/AuthRouter";
import { HeaderBackground } from "../../components/HeaderBackground";
import { MaskService } from "react-native-masked-text";
import { ScrollView } from "react-native-gesture-handler";
import { apiRegister } from "../../api/auth";
import { handleErrorApi } from "../../api/client";
import { useAuth } from "../../utils/Helpers";

type RegisterNavigationProps = NativeStackNavigationProp<AuthRouterParamsList, 'Register'>;

export default function RegisterScreen() {
    const navigation = useNavigation<RegisterNavigationProps>();

    const { setAuth } = useAuth();

    const [ isLoading, setIsLoading ] = useState(false);

    const [ name, setName ] = useState('');
    const [ errorName, setErrorName ] = useState('');
    const handleName = (value: string) => {setErrorName(''); setName(value)};

    const [ phone, setPhone ] = useState('');
    const [ errorPhone, setErrorPhone ] = useState('');
    const handlePhone = (value: string) => {setErrorPhone(''); setPhone(MaskService.toMask('custom', value, {mask: '+7(999)999-99-99'}))};

    const [ email, setEmail ] = useState('');
    const [ errorEmail, setErrorEmail ] = useState('');
    const handleEmail = (value: string) => {setErrorEmail(''); setEmail(value)};

    const [ password, setPassword ] = useState('');
    const [ errorPassword, setErrorPassword ] = useState('');
    const handlePassword = (value: string) => {setErrorPassword(''); setPassword(value)};

    const handleRegister = () => {
        setIsLoading(true);

        apiRegister(name, email, phone, password)
        .then(({ data }) => {
            setIsLoading(false);
            navigation.navigate("Verification", { phone: phone });
        })
        .catch(handleErrorApi(
            (message) => {
                setIsLoading(false);
            },
            (field, message) => {
                if(field == 'name') {
                    setErrorName(message);
                } else if(field == 'email') {
                    setErrorEmail(message);
                } else if(field == 'phone') {
                    setErrorPhone(message);
                } else if(field == 'password') {
                    setErrorPassword(message);
                }
            }
        ));
    }


    return <>
        <ScrollView keyboardShouldPersistTaps="handled">
            <HeaderBackground />
            <VStack px={15} flex={1}>
                <Heading fontWeight={800} fontSize={36} mb="15px">
                    ??????????????????????
                </Heading>

                <FormControl mb="15px" isInvalid={errorName !== ''}>
                    <FormControl.Label>
                        <Text fontSize={16} color="muted.400">???????? ??????</Text>
                    </FormControl.Label>
                    <Input value={name} onChangeText={handleName} borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="????????????"/>
                    <FormControl.ErrorMessage>
                        {errorName}
                    </FormControl.ErrorMessage>
                </FormControl>

                <FormControl mb="15px" isInvalid={errorPhone !== ''}>
                    <FormControl.Label>
                        <Text fontSize={16} color="muted.400">?????????? ????????????????</Text>
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

                <FormControl mb="15px" isInvalid={errorEmail !== ''}>
                    <FormControl.Label>
                        <Text fontSize={16} color="muted.400">??????????</Text>
                    </FormControl.Label>
                    <Input autoCapitalize="none" value={email} onChangeText={handleEmail} borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="example@site.com" />
                    <FormControl.ErrorMessage>
                        {errorEmail}
                    </FormControl.ErrorMessage>
                </FormControl>

                <FormControl mb="15px" isInvalid={errorPassword !== ''}>
                    <FormControl.Label>
                        <Text fontSize={16} color="muted.400">????????????</Text>
                    </FormControl.Label>
                    <Input autoCapitalize="none" value={password} onChangeText={handlePassword} type="password" borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="********" />
                    <FormControl.ErrorMessage>
                        {errorPassword}
                    </FormControl.ErrorMessage>
                </FormControl>

                <Center mb="20px" mt="30px">
                    <Button isLoading={isLoading} width="250px" height="60px" backgroundColor="fiveoclock.500" borderRadius="5px" onPress={() => handleRegister()}>
                        <Text color="white" fontSize={20} fontWeight={700}>????????????????????</Text>
                    </Button>
                </Center>

                <HStack justifyContent="center" space={2} mb="20px">
                    <Text fontSize={16} color="muted.400">?????? ???????? ???????????????</Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text fontSize={16} fontWeight={600} color="fiveoclock.700" underline>??????????????????????????</Text>
                    </Pressable>
                </HStack>

            </VStack>
        </ScrollView>
    </>;
}