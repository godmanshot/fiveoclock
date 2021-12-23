import React, { useEffect, useRef, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Center, Heading, HStack, Input, Pressable, Text, VStack } from "native-base"
import { AuthRouterParamsList } from "../../routers/AuthRouter";
import { useAppDispatch } from "../../store/store";
import { HeaderBackground } from "../../components/HeaderBackground";
import { handleErrorApi } from "../../api/client";
import { apiVerification } from "../../api/auth";
import { useAuth } from "../../utils/Helpers";

type VerificationNavigationProps = NativeStackNavigationProp<AuthRouterParamsList, 'Verification'>;
type VerificationRouteProps = RouteProp<AuthRouterParamsList, 'Verification'>;

export default function VerificationScreen() {
    const navigation = useNavigation<VerificationNavigationProps>();
    const route = useRoute<VerificationRouteProps>();

    const { setAuth } = useAuth();

    const [ digit1, setDigit1 ] = useState('');
    const [ digit2, setDigit2 ] = useState('');
    const [ digit3, setDigit3 ] = useState('');
    const [ digit4, setDigit4 ] = useState('');

    const allDigits = digit1+digit2+digit3+digit4;

    const digitRef1 = useRef<any>();
    const digitRef2 = useRef<any>();
    const digitRef3 = useRef<any>();
    const digitRef4 = useRef<any>();

    useEffect(() => { if(digit1.length == 1) { digitRef2.current !== undefined ? digitRef2.current.focus() : 1; } }, [digit1]);
    useEffect(() => { if(digit2.length == 1) { digitRef3.current !== undefined ? digitRef3.current.focus() : 1; } }, [digit2]);
    useEffect(() => { if(digit3.length == 1) { digitRef4.current !== undefined ? digitRef4.current.focus() : 1; } }, [digit3]);

    const handleDigit = (digit: string, setDigit: (v: string) => void) => (value: string) => {
        if(digit == '' || (digit.length == 1 && value.length == 0)) {
            setDigit(value);
        }
    };

    const dispatch = useAppDispatch();
    const [ isLoading, setIsLoading ] = useState(false);

    const handleVerify = () => {
        setIsLoading(true);

        if(allDigits.length != 4) {
            return 
        }

        apiVerification(route.params.phone, allDigits).then(({ data }) => {

            setAuth(data);
            setIsLoading(false);

        }).catch(handleErrorApi(
            (message) => {
                alert(message);
                setIsLoading(false);
            }
        ));
    };

    return <>
        <HeaderBackground />
        <VStack px={15} flex={1}>
            <Heading fontWeight={800} fontSize={36} mb="15px">
                Верификация
            </Heading>
            <Text fontSize={16} color="muted.400" mb="20px">
                Введите код подтверждения,{"\n"}
                отправленный на номер {route.params.phone}
            </Text>

            <HStack justifyContent="space-around">
                <Input value={digit1} onChangeText={handleDigit(digit1, setDigit1)} ref={digitRef1} width="16" height="16" fontSize="20" textAlign="center" keyboardType="number-pad"/>
                <Input value={digit2} onChangeText={handleDigit(digit2, setDigit2)} ref={digitRef2} width="16" height="16" fontSize="20" textAlign="center" keyboardType="number-pad"/>
                <Input value={digit3} onChangeText={handleDigit(digit3, setDigit3)} ref={digitRef3} width="16" height="16" fontSize="20" textAlign="center" keyboardType="number-pad"/>
                <Input value={digit4} onChangeText={handleDigit(digit4, setDigit4)} ref={digitRef4} width="16" height="16" fontSize="20" textAlign="center" keyboardType="number-pad"/>
            </HStack>

            <Center mb="20px" mt="30px">
                <Button isDisabled={allDigits.length != 4} isLoading={isLoading} width="250px" height="60px" backgroundColor="fiveoclock.500" borderRadius="5px" onPress={() => handleVerify()}>
                    <Text color="white" fontSize={20} fontWeight={700}>Подтвердить</Text>
                </Button>
            </Center>
        </VStack>
        
    </>;
}