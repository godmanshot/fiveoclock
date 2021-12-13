import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Center, Heading, HStack, Pressable, ScrollView, Skeleton, Text, VStack, Image, useToast } from "native-base"
import { HeaderBackground } from "../../components/HeaderBackground";
import { HomeRouterParamList } from "../../routers/Main/HomeRouter";
import { apiCategories, Category } from "../../api/categories";
import { handleErrorApi } from "../../api/client";
import { Dimensions } from "react-native";
import { apiProducts, BasketProduct, Product } from "../../api/products";
import { useActiveCanteen, useBasket } from "../../utils/Helpers";

const cardIcon = require('../../assets/cart.png');

type HomeNavigationProps = NativeStackNavigationProp<HomeRouterParamList, 'Home'>;

const ProductCard = ({product}: {product: Product}) => {
    const { addToBasket, removeFromBasket, hasInBasket } = useBasket();
    const toast = useToast();

    const handleAddToBasket = (product: Product) => {
        let _product: BasketProduct = { ...product, variation_id: undefined, count: 1 };
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

    return <>
        <Box bgColor="fiveoclock_secondary.100" borderWidth={1} borderColor="muted.200" borderRadius="5px">
            <Image source={{uri: product.imageUrl}} mb="5px" width="100%" height="120px" borderRadius="5px" alt={product.name}/>
            <VStack px="10px">
                <Text fontWeight={800} fontSize={18} mb="7px" isTruncated maxW="100%">{product.name}</Text>

                <Text color="muted.500" fontWeight={600} mb="0px">Ингредиенты:</Text>
                <Box height="35px" overflow="hidden">
                    {product.partials.map(partial => <Text lineHeight={14} fontSize={12} key={partial.id} color="muted.500" isTruncated maxW="100%">{partial.ingredient} - {partial.dimension}</Text>)}
                </Box>

                <Text color="muted.500" my="10px">Цена за {product.dimension}</Text>
            </VStack>
            <HStack justifyContent="space-between">
                <Center ml="10px">
                    <Text fontWeight={800} fontSize={20}>
                        {product.price} тг.
                    </Text>
                </Center>
                <Pressable onPress={() => hasInBasket(product.id) ? handleRemoveFromBasket(product.id) : handleAddToBasket(product)}>
                    <Center bgColor="fiveoclock.500" size="40px" borderTopLeftRadius="5px" borderBottomRightRadius="5px">
                        {hasInBasket(product.id) ? <>
                            <Image source={cardIcon} size="20px" alt="basket"/>
                        </> : <>
                            <Text fontWeight={800} fontSize={20} color="white">+</Text>
                        </>}
                    </Center>
                </Pressable>
            </HStack>
        </Box>
    </>;
};

export default function HomeScreen() {
    const navigation = useNavigation<HomeNavigationProps>();

    const { canteen } = useActiveCanteen();

    const [ categories, setCategories ] = useState<Category[]>([]);
    const [ activeCategory, setActiveCategory ] = useState<number>();

    const [ products, setProducts ] = useState<Product[]>([]);
    const [ productsLoading, setProductsLoading ] = useState(false);

    useEffect(() => {
        apiCategories().then(( { data }) => {
            setCategories(data);
            if(data.length > 0) {
                setActiveCategory(data[0].id)
            }
        }).catch(handleErrorApi());
    }, []);

    useEffect(() => {
        if(activeCategory !== undefined) {
            setProductsLoading(true);
            apiProducts(canteen?.id, categories.find(item => item.id == activeCategory)?.id).then(({ data }) => {
                setProducts(data);
                setProductsLoading(false);
            }).catch(handleErrorApi());
        }
    }, [activeCategory]);

    const renderCategory = ({ item }: { item: Category }) => <>
        <Pressable onPress={() => setActiveCategory(item.id)}>
            <Center mx="5px" bgColor={activeCategory == item.id ? "fiveoclock.500" : "muted.400"} height="40px" px="10px" borderRadius="5px">
                <Text color="white" textAlign="center" fontWeight="700" textBreakStrategy="highQuality">{item.name}</Text>
            </Center>
        </Pressable>
    </>;

    return <>
        <HeaderBackground />
        <VStack>
            <Heading px={15} fontWeight={800} fontSize={36} mb="10px">
                Чего бы ты хотел{"\n"}
                заказать?
            </Heading>
            { categories.length > 0 ? <>
                <Carousel
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    activeSlideAlignment="start"
                    layout={"default"}
                    data={categories}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={150}
                    itemHeight={100}
                    sliderHeight={100}
                    renderItem={renderCategory}
                />
            </> : <>
                <HStack>
                    <Skeleton width="140px" height="40px" mx="5px" speed={2}/>
                    <Skeleton width="140px" height="40px" mx="5px" speed={2}/>
                    <Skeleton width="140px" height="40px" mx="5px" speed={2}/>
                    <Skeleton width="140px" height="40px" mx="5px" speed={2}/>
                </HStack>
            </>}
        </VStack>
        
        <ScrollView flex={1} mt="20px" px="10px">
            {!productsLoading && products.length == 0 ? <>
                <Center py="20px">
                    <Text fontWeight={700} fontSize={28}>Пусто</Text>
                </Center>
            </> : <>
                <VStack>
                    <HStack flexWrap="wrap">
                        {productsLoading ? <>
                            <Box width="50%" p="5px"><Skeleton height="200px" speed={2}/></Box>
                            <Box width="50%" p="5px"><Skeleton height="200px" speed={2}/></Box>
                            <Box width="50%" p="5px"><Skeleton height="200px" speed={2}/></Box>
                            <Box width="50%" p="5px"><Skeleton height="200px" speed={2}/></Box>
                        </> : <>
                            {products.map((product) => <Pressable width="50%" p="5px" key={product.id} onPress={() => navigation.navigate("Product", {product: product})}>
                                <ProductCard product={product}/>
                            </Pressable>)}
                        </>}
                    </HStack>
                </VStack>
            </>}
        </ScrollView>

    </>;
}