import client from "./client";

export interface Canteen {
    id: number;
    name: string;
    phone: string;
    address: string;
    work_time_from: string;
    work_time_to: string;
}

const apiCanteens = () => {
    return client.get<Canteen[]>('/places');
};

export { apiCanteens };