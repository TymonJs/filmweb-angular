import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrentUserService } from '../service/current-user-service';
import { User } from '../interfaces/user.interface';

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

  constructor(private CurrentUserService: CurrentUserService){}

  submit(form: FormGroup<UserForm>){
    this.CurrentUserService.editUser(form.value as User);
    this.form.reset();
  }
}
