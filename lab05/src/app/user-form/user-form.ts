import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../interfaces/user.interface';
import { MaxAge } from "../max-age/max-age";
import { PostalValid } from "../postal-valid/postal-valid";
import { ValidatorsMessage } from "../validators-message/validators-message";
import { Capitalized } from "../capitalized";

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule, MaxAge, PostalValid, ValidatorsMessage, Capitalized],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})

export class UserForm {

  @Output() userEmitter = new EventEmitter<User>();

  protected user = this.getEmptyUser();

  onSubmit(form: NgForm) {
    this.userEmitter.emit(this.user);
    this.user = this.getEmptyUser();   
    form.resetForm();       
  }

  getEmptyUser(): User {
    return {
      id: "",
        name: "",
        lastname: "",
        phone_number: "",
        birth_year: "",
        address: {
          street: "",
          house_number: "",
          apartment_number: "",
          postal_code: "",
          city: ""
        }
    }
  }
}
