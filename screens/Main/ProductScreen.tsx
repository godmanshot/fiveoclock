import React, { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heading, Text, VStack, Image, HStack, Center, ScrollView, Box, Button, Actionsheet, useToast } from "native-base"
import { HomeRouterParamList } from "../../routers/Main/HomeRouter";
import { Pressable } from "react-native";
import { BasketProduct, Product, Variation } from "../../api/products";
import { useBasket, useFavorites } from "../../utils/Helpers";

type ProductNavigationProps = NativeStackNavigationProp<HomeRouterParamList, 'Product'>;
type ProductRouteProps = RouteProp<HomeRouterParamList, 'Product'>;

export default function ProductScreen() {
    const navigation = useNavigation<ProductNavigationProps>();
    const route = useRoute<ProductRouteProps>();
    const toast = useToast();
    const { addToBasket, removeFromBasket, hasInBasket } = useBasket();
    const { addToFavorite, removeFromFavorite, hasInFavorite } = useFavorites();

    const product = route.params.product;

    const [ productCount, setProductCount ] = useState(1);
    const handlePlus = () => setProductCount(c => c + 1);
    const handleMinus = () => setProductCount(c => c > 1 ? c - 1 : 1);

    const [ variation, setVariation ] = useState<Variation>();
    const [ isVariationOpen, setIsVariationOpen ] = useState(false);
    const variationOpen = () => setIsVariationOpen(true);
    const variationClose = () => setIsVariationOpen(false);

    const handleAddToBasket = (product: Product) => {
        let _product: BasketProduct = { ...product, variation_id: variation?.id, count: productCount };
        addToBasket(_product);
        toast.show({
            title: "Продукт добавлен в корзину",
            duration: 1000,
            status: "success",
        });
    };

    const handleRemoveFromBasket = (product_id: number) => {
        removeFromBasket(product_id);
        toast.show({
            title: "Продукт убран из корзины",
            duration: 1000,
            status: "error",
        });
    };

    const handleAddToFavorite = (product: Product) => {
        addToFavorite(product);
        toast.show({
            title: "Продукт добавлен в избранное",
            duration: 1000,
            status: "success",
        });
    };

    const handleRemoveFromFavorite = (product_id: number) => {
        removeFromFavorite(product_id);
        toast.show({
            title: "Продукт убран из избранного",
            duration: 1000,
            status: "error",
        });
    };

    return <>
        <Box flex={1}>
            <Image source={{uri: product.imageUrl}} alt={product.name} h="30%" resizeMode="cover" borderBottomRadius="10px"/>
            
            <ScrollView>
                <VStack px={15} flex={1} mt={6}>
                    <HStack justifyContent="space-between">
                        <Heading fontWeight={800} fontSize={30} mb="10px">
                            {product.name}
                        </Heading>
                        <Pressable onPress={() => hasInFavorite(product.id) ? handleRemoveFromFavorite(product.id) : handleAddToFavorite(product)}>
                            {hasInFavorite(product.id) ? <>
                                <Image source={require('../../assets/unlike.png')} size="40px" alt="like" key="like"/>
                            </> : <>
                                <Image source={require('../../assets/like.png')} size="40px" alt="like" key="unlike"/>
                            </>}
                        </Pressable>
                    </HStack>
                    <Text fontWeight={900} fontSize={20} color={"fiveoclock.500"} mb="10px">
                        {product.is_active ? "✓ В наличии" : "✖ Отсутствует"}
                    </Text>
                    <HStack justifyContent="space-between">
                        <Text fontWeight={800} fontSize={30}>
                            {product.price} тг/{product.dimension}
                        </Text>
                        <HStack>
                            <Center flexDirection="row">
                                <Pressable onPress={handleMinus}>
                                    <Image source={require('../../assets/minus.png')} size="35px" alt="minus"/>
                                </Pressable>
                                <Text mx="10px" fontSize={18}>{productCount}</Text>
                                <Pressable onPress={handlePlus}>
                                    <Image source={require('../../assets/plus.png')} size="35px" alt="plus"/>
                                </Pressable>
                            </Center>
                        </HStack>
                    </HStack>
                    <Text fontWeight={600} fontSize={16}>
                        Описание
                    </Text>
                    <Text fontSize={16} color="muted.500" mb="10px">
                        {product.description}
                    </Text>
                    <Text fontWeight={600} fontSize={16}>
                        Ингредиенты
                    </Text>
                    <Text fontSize={16} color="muted.500" mb="20px">
                        {product.partials.map(partial => partial.ingredient+' - '+partial.dimension+"; ")}
                    </Text>

                </VStack>
            </ScrollView>

            <VStack p={15}>
                {product.variations.length>0 ? <>
                    <Button width="100%" height="60px" backgroundColor="fiveoclock_secondary.100" mb="10px" borderRadius="5px" onPress={variationOpen}>
                        <HStack>
                            <Text fontSize={20} fontWeight={700}>{variation == undefined ? "Выбор продукции" : variation.name+' - '+variation.price+' тг'}</Text>
                            <Image source={require("../../assets/arrow-down-black.png")} size="10px" resizeMode="contain" mt="10px" ml="5px" alt="select product"/>
                        </HStack>
                    </Button>
                </> : <></>}

                <Button isDisabled={!product.is_active} width="100%" height="60px" backgroundColor="fiveoclock.500" borderRadius="5px" onPress={() => hasInBasket(product.id) ? handleRemoveFromBasket(product.id) : handleAddToBasket(product)}>
                    <Center flexDirection="row">
                        <Image source={require('../../assets/cart.png')} size="20px" mr="5px" alt="basket"/>
                        <Text color="white" fontSize={20} fontWeight={700}>{hasInBasket(product.id) ? 'В корзине' : 'В корзину'}</Text>
                    </Center>
                </Button>
            </VStack>

            <Actionsheet isOpen={isVariationOpen} onClose={variationClose} disableOverlay>
                <Actionsheet.Content>
                    <Actionsheet.Item onPress={() => {
                        setVariation(undefined);
                        variationClose();
                    }}>
                        <Text color="fiveoclock.500" fontWeight={600} fontSize={16}>Нет</Text>
                    </Actionsheet.Item>
                    {product.variations.map(variation => <React.Fragment key={variation.id}>
                        <Actionsheet.Item onPress={() => {
                            setVariation(variation);
                            variationClose();
                        }}>
                            <Text color="fiveoclock.500" fontWeight={600} fontSize={16}>{variation.name} - {variation.price} тг</Text>
                        </Actionsheet.Item>
                    </React.Fragment>)}
                </Actionsheet.Content>
            </Actionsheet>

        </Box>
    </>;
}