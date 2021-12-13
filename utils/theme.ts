import { Theme } from "native-base";

export default {
    colors: {
        fiveoclock: {
            50: '#004E47',
            100: '#004E47',
            200: '#004E47',
            300: '#004E47',
            400: '#004E47',
            500: '#004E47',
            600: '#004E47',
            700: '#004E47',
            800: '#004E47',
            900: '#004E47',
        },
        fiveoclock_secondary: {
            100: '#f4f2dd',
        }
    },
    config: {
        useSystemColorMode: false,
        initialColorMode: "light",
    },
    fontConfig: {
        'Nunito': {
            100: {
                normal: 'Nunito-ExtraLight',
                italic: 'Nunito-ExtraLightItalic',
            },
            200: {
                normal: 'Nunito-ExtraLight',
                italic: 'Nunito-ExtraLightItalic',
            },
            300: {
                normal: 'Nunito-Light',
                italic: 'Nunito-LightItalic',
            },
            400: {
                normal: 'Nunito-Regular',
                italic: 'Nunito-Italic',
            },
            500: {
                normal: 'Nunito-Medium',
                italic: 'Nunito-MediumItalic',
            },
            600: {
                normal: 'Nunito-SemiBold',
                italic: 'Nunito-SemiBoldItalic',
            },
            700: {
                normal: 'Nunito-Bold',
                italic: 'Nunito-BoldItalic',
            },
            800: {
                normal: 'Nunito-ExtraBold',
                italic: 'Nunito-ExtraBoldItalic',
            },
            900: {
                normal: 'Nunito-Black',
                italic: 'Nunito-BlackItalic',
            },
        },
    },
    fonts: {
        heading: 'Nunito',
        body: 'Nunito',
        mono: 'Nunito',
    },
} as Theme | (Record<string, any> & {});