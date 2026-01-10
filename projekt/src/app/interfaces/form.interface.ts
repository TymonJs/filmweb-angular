import { FormControl, FormGroup } from "@angular/forms";
import { Sort } from "./film.interface";

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

export interface ProfileForm {
    readonly username: FormControl<string | null>,
    readonly email: FormControl<string | null>,
    readonly address: FormGroup<Address>
}

export interface FilmFilter {
    readonly query: FormControl<string | null>,
    readonly includeUnreleased: FormControl<boolean | null>,
    readonly collectionId: FormControl<number | null>,
    readonly sort: FormControl<Sort | null>
}

export interface FilmForm {
    readonly title: FormControl<string | null>,
    readonly releaseDate: FormControl<string | null>
    readonly length: FormControl<number | null>,
    readonly cover: FormControl<string | null>
    readonly collectionId: FormControl<number | null>
}