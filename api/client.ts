import axios, { AxiosError } from "axios"

const client = axios.create({
    baseURL: "https://five.com.kz/api"
});

export function setBearerToken(token: string) {
    if(token !== '') {
        client.defaults.headers.common = {'Authorization': `Bearer ${token}`};
    } else {
        client.defaults.headers.common = {};
    }
}

export const handleErrorApi = (
    errorMesageHandler: (message: string) => void,
    fieldErrorHandler: (field: string, error: string) => void
) => (e: Error | AxiosError) => {

    if(axios.isAxiosError(e)) {
        if(e.response?.status === 422 && e.response.data.errors !== undefined && Object.keys(e.response.data.errors).length > 0) {
            for (let key in e.response.data.errors) {
                fieldErrorHandler(key, e.response.data.errors[key]);
            }
        }
        errorMesageHandler(e.response?.data.message ?? e.message);
    }
    
};

export default client;

export interface PaginatedResourceData<T> {
    data: T[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    links: {
        first: string|null;
        last: string|null;
        next: string|null;
        prev: string|null;
    };
}