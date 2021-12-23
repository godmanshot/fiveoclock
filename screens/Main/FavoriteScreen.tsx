import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, ScrollView, Text, VStack, Image, HStack, Center, Pressable, useToast, Spinner, Icon } from "native-base";
import { HeaderBackground } from "../../components/HeaderBackground";
import { FavoriteRouterParamList } from "../../routers/Main/FavoriteRouter";
import { HomeRouterParamList } from "../../routers/Main/HomeRouter";
import { useActiveCanteen, useBasket, useFavorites } from "../../utils/Helpers";
import { apiProductsByIds, apiProductsByNamesAndCanteen, BasketProduct, Product } from "../../api/products";
import { handleErrorApi } from "../../api/client";
import { Feather } from "@expo/vector-icons";

type FavoriteNavigationProps = NativeStackNavigationProp<FavoriteRouterParamList, "Favorite">;

const cardIcon = require('../../assets/cart.png');

export default function FavoriteScreen() {
    const navigation = useNavigation<FavoriteNavigationProps>();
    const toast = useToast();
    const { addToBasket, removeFromBasket, hasInBasket } = useBasket();
    const { favoriteProducts } = useFavorites();
    const { canteen } = useActiveCanteen();

    const [ isLoading, setIsLoading ] = useState(false);

    const [ products, setProducts ] = useState<Product[]>([]);

    const productIds = useMemo(() => favoriteProducts.map((item) => item.id), [favoriteProducts]);
    const productNames = useMemo(() => favoriteProducts.map((item) => item.name), [favoriteProducts]);

    useFocusEffect(useCallback(() => {
        if(canteen != undefined) {
            setIsLoading(true);
            apiProductsByNamesAndCanteen(productNames, canteen.id)
            .then(({ data }) => {
    
                setProducts(data);
                setIsLoading(false);
    
            }).catch(handleErrorApi());
        }
    }, [productNames, canteen]));

    const handleAddToBasket = (product: Product) => {
        let _product: BasketProduct = { ...product, variation_id: undefined, count: 1 };
        addToBasket(_product);
        toast.show({
            placement: "top",
            title: "Продукт добавлен в корзину",
            duration: 1000,
            status: "success",
        });
    };

    const handleRemoveFromBasket = (product_id: number) => {
        removeFromBasket(product_id);
        toast.show({
            placement: "top",
            title: "Продукт убран из корзины",
            duration: 1000,
            status: "error",
        });
    };

    return <>
        <HeaderBackground/>
        <ScrollView>
            <VStack px="15px">
                {isLoading ? <Spinner color="fiveoclock.500" size="lg" accessibilityLabel="Избранное" /> : <></>}
                {!isLoading && products.length == 0 ? 
                    <Center py="20px">
                        <Icon as={Feather} name="heart" color="fiveoclock.500" size="60px"/>
                        <Text fontWeight={700} fontSize={20} textAlign="center">Добавьте свои любимые{"\n"}продукты в Избранное</Text>
                    </Center>
                : <></>}
                {products.map(product => <Pressable key={product.id} onPress={() => navigation.navigate("Product", { product: product })}>
                    <VStack bgColor="fiveoclock_secondary.100" borderRadius="5px" mb="10px" borderWidth={1} borderColor="muted.200">
                        <Image source={{uri: product.imageUrl}} mb="10px" width="100%" height="150px" borderRadius="5px" alt={product.name}/>
                        <HStack px="10px" justifyContent="space-between" mb="5px">
                            <Text fontWeight={800} fontSize={18} isTruncated maxW="100%">{product.name}</Text>
                            <Text fontSize={18} color={"fiveoclock.500"}>
                                {product.is_active ? "✓ В наличии" : "✖ Отсутствует"}
                            </Text>
                        </HStack>
                        <HStack justifyContent="space-between">
                            <Center ml="10px">
                                <Text fontWeight={600} fontSize={20}>
                                    {product.price} тг.
                                </Text>
                            </Center>
                            
                            <Button isDisabled={!product.is_active} borderTopRightRadius={0} borderBottomLeftRadius={0} borderTopLeftRadius="5px" borderBottomRightRadius="5px" bgColor="fiveoclock.500" size="40px" onPress={() => hasInBasket(product.id) ? handleRemoveFromBasket(product.id) : handleAddToBasket(product)}>
                                {hasInBasket(product.id) ? <>
                                    <Image source={cardIcon} size="20px" alt="basket"/>
                                </> : <>
                                    <Text fontWeight={800} fontSize={20} color="white">+</Text>
                                </>}
                            </Button>
                        </HStack>
                    </VStack>
                </Pressable>)}
            </VStack>
        </ScrollView>
    </>;
}