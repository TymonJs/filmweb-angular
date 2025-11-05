import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {

  @Output() userEmitter = new EventEmitter<User>();

  protected user: User = {
    id: 0,
    name: "",
    lastname: "",
    phone_number: 0,
    birth_year: 0,
    address : {
        street: "",
        house_number: 0,
        home_number: 0,
        postal_code: 0,
        city: ""
    }
}
  onSubmit(form: NgForm){
    console.log("submitted");
    
  }
}
