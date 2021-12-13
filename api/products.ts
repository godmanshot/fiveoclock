import client from "./client";

export interface Partial {
    id: number;
    ingredient: string;
    dimension: string;
}

export interface Variation {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

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
}

export interface BasketProduct extends Product {
    variation_id: number | undefined;
    count: number;
}

const apiProducts = (place_id?: number, category_id?: number) => {
    return client.get<Product[]>('/products', {
        params: {
            place_id: place_id,
            category_id: category_id,
        }
    });
};

export { apiProducts };