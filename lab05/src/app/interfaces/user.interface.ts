export interface User {
    id: string,
    name: string,
    lastname: string,
    phone_number: string,
    birth_year: string,
    address : {
        street: string,
        house_number: string,
        apartment_number: string,
        postal_code: string,
        city: string
    }
}