import { Canteen } from "./canteen";
import client from "./client";

export interface Partial {
    id: number;
    ingredient: string;
    dimension: string;
};

export interface Variation {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

export interface Product {
    id: number;
    catalog_id: number;
    place_id: number;
    price: number;
    name: string;
    description: string;
    dimension: string;
    image: string;
    imageUrl: string;
    is_active: boolean;
    is_new: boolean;
    is_order: boolean;
    keywords: string;
    order: boolean;
    partials: Partial[];
    variations: Variation[];
    place: Canteen;
};

export interface BasketProduct extends Product {
    variation_id: number | undefined;
    count: number;
};

export const getFullInfoBasketProduct = (product: BasketProduct) => {
    let info = product.name ?? 'Продукт';

    if(product.variation_id != null) {
        info += " (" + product.variations?.find(variation => variation.id == product.variation_id)?.name + ")";
    }
    
    return info;
};

export const getPriceBasketProduct = (product: BasketProduct) => {
    let price = product.price;
    const variation = product.variations?.find(variation => variation.id == product.variation_id);

    if(product.variation_id != null && variation != undefined) {
        price = variation.price;
    }
    
    return price;
};

export const getBasketPrice = (products: BasketProduct[]) => {
    let price = 0;
    products.map(product => {
        price += getPriceBasketProduct(product) * product.count;
    });
    return price;
};

export const getUsingCashback = (basketPrice: number, cashback: number) => {
    const usingCashback = cashback < basketPrice ? cashback : basketPrice;
    return usingCashback;
};


const apiProducts = (place_id?: number, category_id?: number) => {
    return client.get<Product[]>('/products', {
        params: {
            place_id: place_id,
            category_id: category_id,
        }
    });
};

const apiProductsByIds = (product_id: Array<number>) => {
    return client.get<Product[]>('/products', {
        params: {
            id: JSON.stringify(product_id)
        }
    });
};

const apiProductsByNamesAndCanteen = (product_id: Array<string>, canteen_id: number) => {
    return client.get<Product[]>('/products', {
        params: {
            name: JSON.stringify(product_id),
            place_id: canteen_id,
        }
    });
};

export { apiProducts, apiProductsByIds, apiProductsByNamesAndCanteen };