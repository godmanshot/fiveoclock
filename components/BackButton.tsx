import React from "react";
import { Pressable, Image } from "native-base";

export const BackButton = ({ handleBack }: { handleBack: () => void }) => <>
    <Pressable onPress={handleBack} height="40px" width="50px" mt="7px">
        <Image source={require("../assets/navigation/back.png")} style={{transform: [{ translateY: -10 }]}} alt="Back" size="md"/>
    </Pressable>
</>;