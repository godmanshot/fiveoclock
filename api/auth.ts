import client from "./client"

const apiRegister = (name: string, email: string, phone: string, password: string) => {
    return client.post<string>('/register', {
        name: name,
        email: email,
        phone: phone,
        password: password
    });
}

export { apiRegister };