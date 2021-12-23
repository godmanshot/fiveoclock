import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Center, HStack, Icon, Modal, ScrollView, Spinner, Text, VStack } from "native-base"
import { HeaderBackground } from "../../components/HeaderBackground";
import { apiUserOrders } from "../../api/user";
import { MenuRouterParamList } from "../../routers/Main/MenuRouter";
import { getFullInfoDetail, Order } from "../../api/order";
import { Feather } from "@expo/vector-icons";
import { handleErrorApi } from "../../api/client";

type OrdersHistoryNavigationProps = NativeStackNavigationProp<MenuRouterParamList, 'OrdersHistory'>;

export default function OrdersHistoryScreen() {
    const navigation = useNavigation<OrdersHistoryNavigationProps>();

    const [ showModal, setShowModal ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ orders, setOrders ] = useState<Order[]>([]);
    const [ activeOrder, setActiveOrder ] = useState<Order>();
    
    useEffect(() => {
        setIsLoading(true);
        apiUserOrders().then(({data}) => {
            setOrders(data);
            setIsLoading(false);
        }).catch(handleErrorApi());
    }, []);

    const handleShow = (order: Order) => {setActiveOrder(order);setShowModal(true);};
    const handleClose = () => setShowModal(false);

    return <>
        <HeaderBackground/>
        <VStack px="15px" flex={1}>
            {!isLoading && orders.length == 0 ? 
                <Center py="20px">
                    <Icon as={Feather} name="shopping-cart" color="fiveoclock.500" size="60px"/>
                    <Text fontWeight={700} fontSize={20} textAlign="center">Оформи первый заказ{"\n"}и получи кэшбек</Text>
                </Center>
            : <>
                <Text fontSize={18} mb="20px">Последние заказы</Text>
                <ScrollView>
                    {isLoading == true ? <Spinner color="fiveoclock.500" size="lg" accessibilityLabel="Заказы" /> : <></>}

                    {orders.map((order) => <VStack key={order.id} borderWidth={1} borderColor="muted.300" borderRadius="10px" mb="10px" padding="10px">

                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color="muted.400">{order.createdAtFormatted}, Товаров: {order.details?.length}</Text>
                            <Text color="fiveoclock.500" fontWeight={800} fontSize={20}>{order.full_price} тг.</Text>
                        </HStack>
                        <HStack justifyContent="space-between">
                            <VStack>
                                <Text fontWeight={800} fontSize={18}>{order.details != null ? order.details[0]?.product?.place?.name : ''}</Text>
                                <HStack>
                                    <Text fontSize={16}>#{order.id}</Text>
                                    <Text fontWeight={800} fontSize={16} color={order.status?.color ?? 'fiveoclock.500'} ml="10px">• {order.status?.name ?? 'Оформлен'}</Text>
                                </HStack>
                            </VStack>

                            <VStack justifyContent="flex-end">
                                <Button bgColor="fiveoclock.500" size={"sm"} onPress={() => handleShow(order)}>
                                    Посмотреть
                                </Button>
                            </VStack>
                        </HStack>

                    </VStack>)}
                </ScrollView>
            </>}
        </VStack>
        <Modal isOpen={showModal} onClose={handleClose} size="xl">
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>{"Заказ #" + activeOrder?.id + " " + activeOrder?.createdAtFormatted}</Modal.Header>
                <Modal.Body>
                    <Text fontWeight={800} color={activeOrder?.status?.color ?? 'fiveoclock.500'}>• {activeOrder?.status?.name ?? 'Оформлен'}</Text>
                    <Text>Адрес: {activeOrder?.address}</Text>
                    <Text>Телефон: {activeOrder?.phone}</Text>
                    <Text fontWeight={600} my="5px">Продукты:</Text>
                    {activeOrder?.details?.map((detail) => <HStack key={detail.id}>
                        <Text fontWeight={800}>
                            {getFullInfoDetail(detail)}
                        </Text>
                    </HStack>)}
                </Modal.Body>
            </Modal.Content>
        </Modal>
    </>;
}