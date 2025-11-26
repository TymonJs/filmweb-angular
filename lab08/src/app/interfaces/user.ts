import { FormArray, FormControl, FormGroup } from "@angular/forms"

export interface User {
    id: number,
    name: string,
    lastname: string,
    email: string,
    addresses: Address[]
}

export interface Address {
    street: string,
    city: string,
    postal: string
}

export interface AddressForm {
    street: FormControl<string | null>,
    city: FormControl<string | null>,
    postal: FormControl<string | null>
}

export interface UserForm {
    name: FormControl<string | null>,
    lastname: FormControl<string | null>,
    email: FormControl<string | null>,
    addresses: FormArray<FormGroup<AddressForm>>
}