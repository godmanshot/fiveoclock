import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Center, Divider, FormControl, HStack, Icon, Image, Input, Modal, Pressable, Spinner, Switch, Text, VStack } from "native-base"
import { HeaderBackground } from "../../components/HeaderBackground";
import { useBasket, useContacts } from "../../utils/Helpers";
import { BasketRouterParamList } from "../../routers/Main/BasketRouter";
import { ScrollView } from "react-native-gesture-handler";
import { getBasketPrice, getFullInfoBasketProduct, getPriceBasketProduct, getUsingCashback } from "../../api/products";
import { Feather } from "@expo/vector-icons";
import { apiUserGet, User } from "../../api/user";
import { handleErrorApi } from "../../api/client";
import { MaskService } from "react-native-masked-text";
import { apiCreateOrder } from "../../api/order";

type BasketNavigationProps = NativeStackNavigationProp<BasketRouterParamList, 'Basket'>;

export default function BasketScreen() {
    const navigation = useNavigation<BasketNavigationProps>();
    
    const { basketProducts, addProductCount, subProductCount, removeFromBasket, clearAllBasket } = useBasket();

    const { address, house, floor, room, setAddress, setHouse, setFloor, setRoom } = useContacts();
    const [ errorAddress, setErrorAddress ] = useState('');
    const [ errorHouse, setErrorHouse ] = useState('');
    const [ errorFloor, setErrorFloor ] = useState('');
    const [ errorRoom, setErrorRoom ] = useState('');
    const handleAddress = (value: string) => {setErrorAddress(''); setAddress(value);};
    const handleHouse = (value: string) => {setErrorHouse(''); setHouse(value);};
    const handleFloor = (value: string) => {setErrorFloor(''); setFloor(value);};
    const handleRoom = (value: string) => {setErrorRoom(''); setRoom(value);};

    const [ isLoading, setIsLoading ] = useState(false);

    const [ showModal, setShowModal ] = useState(false);

    const [ user, setUser ] = useState<User>();
    const [ useCashback, setUseCashback ] = useState(false);
    const handleToggleCashback = () => setUseCashback(c => !c);

    const [ name, setName ] = useState('');
    const [ errorName, setErrorName ] = useState('');
    const handleName = (value: string) => {setErrorName(''); setName(value)};

    const [ phone, setPhone ] = useState('');
    const [ errorPhone, setErrorPhone ] = useState('');
    const handlePhone = (value: string) => {setErrorPhone(''); setPhone(MaskService.toMask('custom', value, {mask: '+7(999)999-99-99'}))};

    const availableCashback = user?.user_bonus?.balance ?? 0;
    const basketPrice = getBasketPrice(basketProducts);
    const usingCashback = getUsingCashback(basketPrice, availableCashback);
    const sumWithoutDelivery = useCashback ? basketPrice - usingCashback : basketPrice;
    const totalSum = sumWithoutDelivery;
    const newCashback = Math.floor(user?.user_bonus?.bonus?.bonus ? sumWithoutDelivery*(user.user_bonus.bonus.bonus/100) : 0);

    useFocusEffect(useCallback(() => {
        apiUserGet().then(({ data }) => {
            setUser(data);
        }).catch(handleErrorApi());
    }, []));

    const isFirstLoad = useRef(true);
    useEffect(() => {
        if(user != undefined && isFirstLoad.current == true) {
            setName(user.name);
            setPhone(user.phone);
            address == '' ? setAddress(user.address) : {};
            isFirstLoad.current = false;
        }
    }, [user]);

    const handleOrder = () => {
        setIsLoading(true);
        apiCreateOrder(basketProducts, name, phone, address, house, floor, room, useCashback ? usingCashback : 0).then(({ data }) => {
            clearAllBasket();
            setShowModal(true);
            setIsLoading(false);
        }).catch(handleErrorApi(
            (message, status) => {
                setIsLoading(false);
            },
            (field, error) => {
                if(field == 'username') {
                    setErrorName(error);
                } else if(field == 'address') {
                    setErrorAddress(error);
                } else if(field == 'building') {
                    setErrorHouse(error);
                } else if(field == 'floor') {
                    setErrorFloor(error);
                } else if(field == 'apartment') {
                    setErrorRoom(error);
                } else if(field == 'phone') {
                    setErrorPhone(error);
                }
                setIsLoading(false);
            }
        ));

    }

    return <>
        <HeaderBackground/>
        <ScrollView>
            <VStack px="15px">
                {basketProducts.length == 0 ? 
                    <Center py="20px">
                        <Icon as={Feather} name="shopping-bag" color="fiveoclock.500" size="60px"/>
                        <Text fontWeight={700} fontSize={20} textAlign="center" mb="20px">В корзине{"\n"}нет товара</Text>
                        <Pressable onPress={() => navigation.navigate("OrdersHistory")}>
                            <Text fontWeight={700} fontSize={20} textAlign="center" color="fiveoclock.500" underline>История заказов</Text>
                        </Pressable>
                    </Center>
                : <></>}
                {basketProducts.map(product => <HStack key={product.id} mb="10px">
                    <Image source={{uri: product.imageUrl}} alt={product.name} size="80px" resizeMode="cover" borderRadius="10px" mr="10px"/>
                    <VStack flex={1}>
                        <HStack justifyContent="space-between" alignItems="center" mb="20px">
                            <Text fontWeight={800} fontSize={16} maxWidth="200px" isTruncated>{getFullInfoBasketProduct(product)}</Text>
                            <Pressable onPress={() => removeFromBasket(product.id)}>
                                <Icon as={Feather} name="x" size="20px"/>
                            </Pressable>
                        </HStack>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text fontWeight={800} fontSize={20} maxWidth="200px" isTruncated color="fiveoclock.500">{getPriceBasketProduct(product)} тг.</Text>
                            
                            <HStack>
                                <Center flexDirection="row">
                                    <Pressable onPress={() => subProductCount(product.id)}>
                                        <Image source={require('../../assets/minus.png')} size="35px" alt="minus"/>
                                    </Pressable>
                                    <Text mx="10px" fontSize={18}>{product.count}</Text>
                                    <Pressable onPress={() => addProductCount(product.id)}>
                                        <Image source={require('../../assets/plus.png')} size="35px" alt="plus"/>
                                    </Pressable>
                                </Center>
                            </HStack>
                        </HStack>
                    </VStack>
                </HStack>)}
                {basketProducts.length > 0 ? <>
                    {user == undefined ? <Spinner color="fiveoclock.500" size="lg" accessibilityLabel="Заказ" /> : <>
                        
                        <VStack mt="20px" mb="10px">
                            <HStack justifyContent="space-between" alignItems="center" p="5px" borderWidth={1} borderRadius="999px" borderColor="muted.300" mb="10px">
                                <Text color="fiveoclock.500" fontSize={18} ml="10px">Потратить Cash-back</Text>
                                <Switch size="md" onTrackColor="fiveoclock.500" onThumbColor="white" isDisabled={availableCashback < 1} isChecked={useCashback} onToggle={handleToggleCashback}/>
                            </HStack>
                            <HStack justifyContent="space-between" alignItems="center" p="5px">
                                <Text color="fiveoclock.500" fontSize={18} ml="10px">Доступно</Text>
                                <Text color="fiveoclock.500" fontSize={18} ml="10px" fontWeight={800}>{availableCashback}</Text>
                            </HStack>
                        </VStack>

                        <VStack>

                            <HStack justifyContent="space-between" alignItems="center" py="10px">
                                <Text fontSize={16} fontWeight={800}>Сумма</Text>
                                <Text fontSize={16} fontWeight={800}>{basketPrice} тг.</Text>
                            </HStack>
                            
                            <Divider/>

                            {useCashback ? <>
                                <HStack justifyContent="space-between" alignItems="center" py="10px">
                                    <Text fontSize={16}>К списанию Cash-back</Text>
                                    <Text fontSize={16}>{usingCashback} тг.</Text>
                                </HStack>
                                
                                <Divider/>
                            </> : <></>}
                            
                            <HStack justifyContent="space-between" alignItems="center" py="10px">
                                <Text fontSize={16}>К начислению Cash-back</Text>
                                <Text fontSize={16}>{newCashback} тг.</Text>
                            </HStack>
                            
                            <Divider/>
                        
                            <HStack justifyContent="space-between" alignItems="center" py="10px">
                                <Text fontSize={16} fontWeight={800}>Итого</Text>
                                <Text fontSize={16} fontWeight={800}>{totalSum} тг.</Text>
                            </HStack>
                            
                            <Divider/>

                            <Text fontWeight={800} fontSize={20} my="10px">Контактная информация</Text>

                            <HStack mb="10px" space={2}>

                                <FormControl flex={1} isInvalid={errorName !== ''}>
                                    <FormControl.Label>
                                        <Text fontSize={16} color="muted.400">Ваше имя *</Text>
                                    </FormControl.Label>
                                    <Input value={name} onChangeText={handleName} borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="Максим"/>
                                    <FormControl.ErrorMessage>
                                        {errorName}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl flex={1} isInvalid={errorAddress !== ''}>
                                    <FormControl.Label>
                                        <Text fontSize={16} color="muted.400">Адрес доставки *</Text>
                                    </FormControl.Label>
                                    <Input value={address} onChangeText={handleAddress} borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="Улица, дом, квартира"/>
                                    <FormControl.ErrorMessage>
                                        {errorAddress}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                            </HStack>
                            <HStack mb="10px" space={2}>

                                <FormControl flex={1} isInvalid={errorHouse !== ''}>
                                    <FormControl.Label>
                                        <Text fontSize={16} color="muted.400">Дом *</Text>
                                    </FormControl.Label>
                                    <Input value={house} onChangeText={handleHouse} borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder=""/>
                                    <FormControl.ErrorMessage>
                                        {errorHouse}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl flex={1} isInvalid={errorFloor !== ''}>
                                    <FormControl.Label>
                                        <Text fontSize={16} color="muted.400">Этаж</Text>
                                    </FormControl.Label>
                                    <Input value={floor} onChangeText={handleFloor} borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder=""/>
                                    <FormControl.ErrorMessage>
                                        {errorFloor}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                                <FormControl flex={1} isInvalid={errorRoom !== ''}>
                                    <FormControl.Label>
                                        <Text fontSize={16} color="muted.400">Квартира</Text>
                                    </FormControl.Label>
                                    <Input value={room} onChangeText={handleRoom} borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder=""/>
                                    <FormControl.ErrorMessage>
                                        {errorRoom}
                                    </FormControl.ErrorMessage>
                                </FormControl>

                            </HStack>

                            <FormControl mb="15px" isInvalid={errorPhone !== ''}>
                                <FormControl.Label>
                                    <Text fontSize={16} color="muted.400">Номер телефона</Text>
                                </FormControl.Label>
                                <Input
                                    keyboardType="number-pad"
                                    value={phone}
                                    onChangeText={handlePhone}
                                    InputLeftElement={
                                        <Image
                                            ml="15px"
                                            height="20px"
                                            width="30px"
                                            source={require("../../assets/flag_icon.png")}
                                            alt="phone"
                                        />
                                    } borderColor="muted.300" _focus={{borderColor: "fiveoclock.500"}} fontSize={18} borderRadius="10px" padding="15px" placeholder="+7(777)123-45-67"/>
                                <FormControl.ErrorMessage>
                                    {errorPhone}
                                </FormControl.ErrorMessage>
                            </FormControl>

                            <Center mb="20px" mt="10px">
                                <Button isLoading={isLoading} width="250px" height="60px" backgroundColor="fiveoclock.500" borderRadius="5px" onPress={() => handleOrder()}>
                                    <Text color="white" fontSize={20} fontWeight={700}>Заказать</Text>
                                </Button>
                            </Center>

                        </VStack>
                        
                    </>}
                </> : <></>}
            </VStack>
        </ScrollView>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="xl">
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>{"Корзина"}</Modal.Header>
                <Modal.Body>
                    <VStack alignItems="center">
                        <Icon as={Feather} name="check" color='fiveoclock.500' size="60px"/>
                        <Text fontWeight={800} fontSize={20} textAlign="center">Заказ создан!</Text>
                    </VStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    </>;
}