import React from "react";
import { HStack, Image, Pressable, Text } from "native-base";

const HeaderCanteenSelect = ({ handleClearCanteen, canteenName }: { handleClearCanteen: () => void, canteenName: string}) => {
    return <>
        <Pressable onPress={handleClearCanteen} mt="5px">
            <HStack justifyContent="center">
                <Text color="muted.600">Заведение</Text>
                <Image source={require("../assets/arrow-down.png")} width="9px" height="9px" mt="5px" ml="5px" alt="select canteen"/>
            </HStack>
            <Text color="green.800" textAlign="center" fontSize={16} fontWeight="700">{canteenName}</Text>
        </Pressable>
    </>;
}

export { HeaderCanteenSelect };