import { FormControl } from "@angular/forms";

export interface PostForm {
  title: FormControl<string | null>,
  body: FormControl<string | null>,
}