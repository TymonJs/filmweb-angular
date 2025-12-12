import { FormControl } from "@angular/forms";

export interface Book {
    id: number,
    author: string,
    title: string,
}

export interface BookForm {
    author: FormControl<string | null>,
    title: FormControl<string | null>
}