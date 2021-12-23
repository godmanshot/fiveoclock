import client from "./client"

export const apiRegister = (name: string, email: string, phone: string, password: string) => {
    return client.post<string>('/register', {
        name: name,
        email: email,
        phone: phone,
        password: password
    });
}

export const apiVerification = (phone: string, verification_code: string) => {
    return client.post<string>('/verification', {
        phone: phone,
        verification_code: verification_code
    });
};

export const apiLogin = (phone: string, password: string) => {
    return client.get<string>('/login?phone='+phone+'&password='+password);
}