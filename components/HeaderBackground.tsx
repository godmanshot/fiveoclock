import React from "react";
import { Image, StatusBar } from "native-base";

const HeaderBackground = (...props: any) => {
    return <>
        <Image {...props} source={require("../assets/navigation/header.png")} alt="Back" mb={6} h="85px" resizeMode="cover"/>
    </>;
}

export { HeaderBackground };