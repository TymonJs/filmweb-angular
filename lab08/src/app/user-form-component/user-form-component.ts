
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address, AddressForm, User, UserForm } from '../interfaces/user';
import { UserService } from '../services/user-service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form-component',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss',
})
export class UserFormComponent implements OnInit {

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

  constructor(protected UserService: UserService){}

  ngOnInit(): void {
      this.UserService.editingUser$.subscribe({
        next: (user) => {
          this.resetForm();
          if (user===null) return;
          
          this.form.patchValue(user);
          user.addresses.forEach(ad => this.addAddress(ad))
        }
    })
  }

  addAddress(address?: Address){
    const { city = "", street = "", postal = ""} = address || {};

    this.form.controls.addresses.push(
      new FormGroup({
        street: new FormControl<string | null>(street, Validators.required),
        city: new FormControl<string | null>(city, Validators.required),
        postal: new FormControl<string | null>(postal, [Validators.required, Validators.pattern("^[0-9]{2}-[0-9]{3}$")]),
      })
    );
  }

  removeAddress(i: number){
    this.form.controls.addresses.removeAt(i);
  }

  addUser(form: FormGroup){
    if (form.invalid) return;
    this.UserService.addUser(form.value)
    this.resetForm()
  }

  editUser(form: FormGroup){
    if (form.invalid) return;
    this.UserService.updateUser(form.value)
      
  }

  resetForm(){
    this.form.reset();
    this.form.controls.addresses.clear();
  }
}
