import React from "react";
import { Image, StatusBar } from "native-base";
import { Dimensions } from "react-native";

const HeaderExpandBackground = (...props: any) => {
    return <>
        <Image {...props} source={require("../assets/navigation/header-expand.png")} alt="Back" mb={6} h={Dimensions.get('window').width*0.6} resizeMode="stretch"/>
    </>;
}

export { HeaderExpandBackground };