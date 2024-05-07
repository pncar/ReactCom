interface ProductType {
    id: number,
    id_user: number,
    id_category: number,
    price: number,
    title: string,
    discount: number,
    description: string,
    city: string,
    address: string,
    country: string,
    phone: string,
    specifications: string[],
    rate: number,
    published: {date: string, timezone_type: number, timezone: string}
}
interface UserType {
    id: number,
    name: string,
    mail: string,
    token: string,
    cart: {id: number,q: number, data:ProductType}
    age: number,
    address: string,
    phone: string,
    city: string,
    country: string,
    avatar: string,
    bio: string
}
interface LocalSettingsType {
    darkMode: boolean,
    currency: string,
    currencyData: any
}
export type {ProductType,UserType,LocalSettingsType};