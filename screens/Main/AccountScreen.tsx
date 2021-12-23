import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Center, FormControl, Heading, Input, ScrollView, Spinner, Text, useToast, VStack } from "native-base"
import { MenuRouterParamList } from "../../routers/Main/MenuRouter";
import { HeaderBackground } from "../../components/HeaderBackground";
import { apiUserGet, apiUserSave } from "../../api/user";
import { handleErrorApi } from "../../api/client";

type AccountNavigationProps = NativeStackNavigationProp<MenuRouterParamList, 'Account'>;

export default function AccountScreen() {
    const navigation = useNavigation<AccountNavigationProps>();
    const toast = useToast();

    const [ isLoading, setIsLoading ] = useState(false);

    const [ userIsLoading, setUserIsLoading ] = useState(false);

    const [ name, setName ] = useState('');
    const [ errorName, setErrorName ] = useState('');
    const handleName = (value: string) => {setErrorName(''); setName(value)};

    const [ surname, setSurname ] = useState('');
    const [ errorSurname, setErrorSurname ] = useState('');
    const handleSurname = (value: string) => {setErrorSurname(''); setSurname(value)};

    const [ email, setEmail ] = useState('');
    const [ errorEmail, setErrorEmail ] = useState('');
    const handleEmail = (value: string) => {setErrorEmail(''); setEmail(value)};

    const [ address, setAddress ] = useState('');
    const [ errorAddress, setErrorAddress ] = useState('');
    const handleAddress = (value: string) => {setErrorAddress(''); setAddress(value)};

    const handleSave = () => {
        setIsLoading(true);

        apiUserSave(name, surname, email, address).then(({ data }) => {

            setIsLoading(false);
            toast.show({
                placement: "top",
                title: "Информация сохранена",
                duration: 3000,
                status: "success",
            });

        }).catch(handleErrorApi(
            (message) => {
                setIsLoading(false);
            },
            (field, message) => {
                if(field == 'name') {
                    setErrorName(message);
                } else if(field == 'surname') {
                    setErrorSurname(message);
                } else if(field == 'email') {
                    setErrorEmail(message);
                } else if(field == 'address') {
                    setErrorAddress(message);
                }
            }
        ));
    }

    useEffect(() => {
        apiUserGet().then(({ data }) => {

            setName(data.name);
            setSurname(data.surname);
            setEmail(data.email);
            setAddress(data.address);

            setUserIsLoading(true);

        }).catch(handleErrorApi());
    }, []);
    
    return <>
        <ScrollView keyboardShouldPersistTaps="handled">
            <HeaderBackground/>
            {userIsLoading == false ? <Spinner color="fiveoclock.500" size="lg" accessibilityLabel="Столовые" /> : <>
                <VStack px={15} flex={1}>

                    <FormControl mb="10px" isInvalid={errorName !== ''}>
                        <FormControl.Label>
                            <Text fontSize={16} color="muted.400">Ваше имя</Text>
                        </FormControl.Label>
                        <Input value={name} onChangeText={handleName} borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="Максим"/>
                        <FormControl.ErrorMessage>
                            {errorName}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb="10px" isInvalid={errorSurname !== ''}>
                        <FormControl.Label>
                            <Text fontSize={16} color="muted.400">Ваше фамилия</Text>
                        </FormControl.Label>
                        <Input value={surname} onChangeText={handleSurname} borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="Щедрин"/>
                        <FormControl.ErrorMessage>
                            {errorSurname}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb="10px" isInvalid={errorEmail !== ''}>
                        <FormControl.Label>
                            <Text fontSize={16} color="muted.400">Почта</Text>
                        </FormControl.Label>
                        <Input autoCapitalize="none" value={email} onChangeText={handleEmail} borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="example@site.com"/>
                        <FormControl.ErrorMessage>
                            {errorEmail}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl mb="10px" isInvalid={errorAddress !== ''}>
                        <FormControl.Label>
                            <Text fontSize={16} color="muted.400">Адрес доставки</Text>
                        </FormControl.Label>
                        <Input value={address} onChangeText={handleAddress} borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="Улица, дом, квартира"/>
                        <FormControl.ErrorMessage>
                            {errorAddress}
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <Center mb="20px" mt="30px">
                        <Button isLoading={isLoading} width="250px" height="60px" backgroundColor="fiveoclock.500" borderRadius="5px" onPress={() => handleSave()}>
                            <Text color="white" fontSize={20} fontWeight={700}>Сохранить</Text>
                        </Button>
                    </Center>

                </VStack>
            </>}
        </ScrollView>
    </>;
}