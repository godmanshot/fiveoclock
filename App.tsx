import React from "react";
import 'react-native-gesture-handler';
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store";
import AppRouter from "./routers/AppRouter";
import _theme from "./utils/theme";

const theme = extendTheme(_theme);

export default function App() {
  
  let [fontsLoaded] = useFonts({
    'Nunito-ExtraLight': require('./assets/fonts/Nunito/Nunito-ExtraLight.ttf'),
    'Nunito-ExtraLightItalic': require('./assets/fonts/Nunito/Nunito-ExtraLightItalic.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito/Nunito-Light.ttf'),
    'Nunito-LightItalic': require('./assets/fonts/Nunito/Nunito-LightItalic.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-Italic': require('./assets/fonts/Nunito/Nunito-Italic.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito/Nunito-Medium.ttf'),
    'Nunito-MediumItalic': require('./assets/fonts/Nunito/Nunito-MediumItalic.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'Nunito-SemiBoldItalic': require('./assets/fonts/Nunito/Nunito-SemiBoldItalic.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito/Nunito-Bold.ttf'),
    'Nunito-BoldItalic': require('./assets/fonts/Nunito/Nunito-BoldItalic.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
    'Nunito-ExtraBoldItalic': require('./assets/fonts/Nunito/Nunito-ExtraBoldItalic.ttf'),
    'Nunito-Black': require('./assets/fonts/Nunito/Nunito-Black.ttf'),
    'Nunito-BlackItalic': require('./assets/fonts/Nunito/Nunito-BlackItalic.ttf'),
  });
  
  return (
    fontsLoaded ?
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={theme}>
          <AppRouter/>
        </NativeBaseProvider>
      </PersistGate>
    </Provider> : <></>
  );
}