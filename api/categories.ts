import client from "./client";

export interface Category {
    id: number;
    name: string;
}

const apiCategories = (canteen_id: number) => {
    return client.get<Category[]>('/categories?canteen_id='+canteen_id);
};

export { apiCategories };