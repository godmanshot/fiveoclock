import { UserBonus } from "./bonus";
import client, { authHeader } from "./client";
import { Order } from "./order";

export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    address: string;
    avatar: string;
    phone: string;
    user_bonus?: UserBonus;
}

const apiUserGet = () => {
    return client.get<User>('/user', { headers: { ...authHeader() } });
};

const apiUserSave = (name: string, surname: string, email: string, address: string) => {
    return client.post<User>('/user/save', {
        name: name,
        surname: surname,
        email: email,
        address: address,
    }, { headers: { ...authHeader() } });
};

const apiUserOrders = () => {
    return client.get<Order[]>('/user/orders', { headers: { ...authHeader() } });
};

export { apiUserGet, apiUserSave, apiUserOrders };