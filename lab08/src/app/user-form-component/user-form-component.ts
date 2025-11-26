
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address, AddressForm, UserForm } from '../interfaces/user';

@Component({
  selector: 'app-user-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss',
})
export class UserFormComponent {
  protected form: FormGroup<UserForm> = new FormGroup({
    
    name: new FormControl<string | null>("", [
      Validators.required, Validators.minLength(3)
    ]),
    lastname: new FormControl<string | null>("",[
      Validators.required, Validators.minLength(3)
    ]),
    email: new FormControl<string | null>("", [
      Validators.required, Validators.email
    ]), 
    addresses: new FormArray<FormGroup<AddressForm>>([])
  })

  addAddress(){
    this.form.controls.addresses.push(
      new FormGroup({
        street: new FormControl<string | null>("", [Validators.required]),
        city: new FormControl<string | null>("", [Validators.required]),
        postal: new FormControl<string | null>("", [Validators.required, Validators.pattern("^[0-9]{2}-[0-9]{3}$")]),
      })
    );


  }
}
