import client, { authHeader } from "./client";
import { Product } from "./products";
import { BasketProduct } from "./products";

export interface Status {
    id: number;
    name: string;
    color: string;
}

export interface OrderDetail {
    id: number;
    full_price: number;
    price: number;
    product?: Product;
    quantity: number;
    variation_id: number;
}

export interface Order {
    id: number;
    status?: Status;
    phone: string;
    address: string;
    full_price: number;
    createdAtFormatted: string;
    details: OrderDetail[] | null;
}

export const getFullInfoDetail = (detail: OrderDetail) => {
    let info = detail.quantity + " x " + (detail.product?.name ?? 'Продукт');

    if(detail.variation_id != null) {
        info += " (" + detail.product?.variations?.find(variation => variation.id == detail.variation_id)?.name + ")";
    }

    info += " " + detail.full_price + "тг.";
    
    return info;

}

export const apiCreateOrder = (
    basketOrders: BasketProduct[],
    name: string,
    phone: string,
    address: string,
    house: string,
    floor: string,
    room: string,
    used_bonus: number
) => {

    return client.post<Order>('/order', {
        products: basketOrders,
        username: name,
        phone: phone,
        address: address,
        building: house,
        apartment: room,
        paid_with_bonuses: used_bonus,
    }, { headers: { ...authHeader() } });

};