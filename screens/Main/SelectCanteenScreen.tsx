import React, { useEffect, useState } from "react";
import { Box, Heading, HStack, ScrollView, Spinner, Text, VStack, Image } from "native-base"
import { HeaderBackground } from "../../components/HeaderBackground";
import { apiCanteens, Canteen } from "../../api/canteen";
import { handleErrorApi } from "../../api/client";
import { Pressable } from "react-native";
import { useActiveCanteen } from "../../utils/Helpers";

export default function SelectCanteenScreen() {
    const [ canteens, setCanteens ] = useState<Canteen[]>([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const { setCanteen } = useActiveCanteen();

    const handleSelectCanteen = (canteen: Canteen) => {
        setCanteen(canteen);
    };

    useEffect(() => {
        setIsLoading(true);

        apiCanteens()
        .then(({ data }) => {
            setIsLoading(false);
            setCanteens(data);
        })
        .catch(handleErrorApi(
            (message: string) => {setIsLoading(false);alert(message)},
        ));
    }, []);

    const canteenLogo = require('../../assets/canteen.png');

    return <>
        <HeaderBackground />
        <VStack px={15} flex={1}>
            <Heading fontWeight={800} fontSize={36} mb="10px">
                Выберите{"\n"}
                заведение
            </Heading>
            <Text fontSize={16} color="muted.400" mb="20px">Выберите заведение из списка</Text>

            <ScrollView keyboardShouldPersistTaps="handled">
                {isLoading ? <Spinner color="fiveoclock.500" size="lg" accessibilityLabel="Столовые" /> : <></>}
                {canteens.map((item) => (
                    <Pressable key={item.id} onPress={() => handleSelectCanteen(item)}>
                        <Box padding="10px" borderWidth="1" borderColor="muted.200" borderRadius="10px" mb="10px">
                            <HStack justifyContent="space-between">
                                <Box>
                                    <Text fontWeight={800} fontSize={16}>{item.name}</Text>
                                    <Text fontSize={14} isTruncated maxW="200px">Время работы {item.work_time_from} - {item.work_time_to}</Text>
                                    <Text fontSize={14} isTruncated maxW="200px">Номер {item.phone}</Text>
                                    <Text fontSize={14} isTruncated maxW="200px">Адрес {item.address}</Text>
                                </Box>
                                <Box>
                                    <Image source={canteenLogo} alt="canteen" width="110px" height="110px"/>
                                </Box>
                            </HStack>
                        </Box>
                    </Pressable>
                ))}
            </ScrollView>
        </VStack>
    </>;
}