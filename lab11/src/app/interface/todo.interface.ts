import { FormControl } from "@angular/forms";

export interface TodoForm {
    name: FormControl<string | null>,
    isComplete: FormControl<boolean | null>
}