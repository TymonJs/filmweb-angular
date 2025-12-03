import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface User {
  name: string,
  lastname: string,
  email: string
}

interface UserForm {
  name: FormControl<string | null>,
  lastname: FormControl<string | null>,
  email: FormControl<string | null>

}
@Component({
  selector: 'app-user-form-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss',
})

export class UserFormComponent {
  protected form: FormGroup<UserForm> = new FormGroup({
    name: new FormControl(""),
    lastname: new FormControl(""),
    email: new FormControl("")
  })

  submit(form: FormGroup<UserForm>){
    console.log("click");
    
  }
}
