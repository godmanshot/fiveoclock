import client from "./client"

const apiRegister = (name: string, email: string, phone: string, password: string) => {
    return client.post<string>('/register', {
        name: name,
        email: email,
        phone: phone,
        password: password
    });
}

const apiLogin = (phone: string, password: string) => {
    return client.get<string>('/login?phone='+phone+'&password='+password);
}

export { apiRegister, apiLogin };