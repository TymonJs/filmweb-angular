export interface User {
    id: number,
    name: string,
    lastname: string,
    phone_number: number,
    birth_year: number,
    address : {
        street: string,
        house_number: number,
        apartment_number: number,
        postal_code: number,
        city: string
    }
}