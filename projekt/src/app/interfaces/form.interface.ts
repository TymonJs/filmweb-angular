import { FormControl, FormGroup } from "@angular/forms"

export interface Address {
    readonly street: FormControl<string | null>,
    readonly city:  FormControl<string | null>,
    readonly postal: FormControl<string | null>
}

export interface LoginForm {
    readonly email: FormControl<string | null>,
    readonly password: FormControl<string | null>
}

export interface RegisterForm {
    readonly username: FormControl<string | null>,
    readonly password: FormControl<string | null>,
    readonly email: FormControl<string | null>,
    readonly address: FormGroup<Address>
}
