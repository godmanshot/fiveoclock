import axios, { AxiosError } from "axios"
import store from "../store/store";

const client = axios.create({
    baseURL: "https://five.com.kz/api"
});

export const authHeader = () => ({'Authorization': `Bearer ${store.getState().app.authToken}`})

export const handleErrorApi = (
    errorMesageHandler?: ((message: string, status: number|undefined) => void) | undefined,
    fieldErrorHandler?: ((field: string, error: string) => void) | undefined
) => (e: Error | AxiosError) => {

    if(axios.isAxiosError(e)) {
        if(e.response?.status === 422 && e.response.data.errors !== undefined && Object.keys(e.response.data.errors).length > 0) {
            for (let key in e.response.data.errors) {
                fieldErrorHandler ? fieldErrorHandler(key, e.response.data.errors[key]) : true;
            }
        }
        const message = e.response?.data.message;
        errorMesageHandler ? errorMesageHandler(message != '' ? message : e.message, e.response?.status) : true;
    }
    
};

export default client;