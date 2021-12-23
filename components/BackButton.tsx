import React from "react";
import { Pressable, Image } from "native-base";

export const BackButton = ({ handleBack }: { handleBack: () => void }) => <>
    <Pressable onPress={handleBack} size="40px" mt="7px" overflow="visible">
        <Image source={require("../assets/navigation/back.png")} alt="Back" size="40px" overflow="visible"/>
    </Pressable>
</>;
//  style={{transform: [{ translateY: -10 }]}}