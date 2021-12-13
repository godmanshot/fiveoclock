import client from "./client";

export interface Category {
    id: number;
    name: string;
}

const apiCategories = () => {
    return client.get<Category[]>('/categories');
};

export { apiCategories };