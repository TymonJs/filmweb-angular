import { Component, signal } from '@angular/core';
import { UserForm } from "./user-form/user-form";
import { UserList } from "./user-list/user-list";
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  imports: [UserForm, UserList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected users: User[] = [];

  addUser(newUser: User) {    
    newUser.id = 1 + + (this.users[this.users.length-1]?.id || 0) + ""
    this.users.push(newUser);
  }
  deletePerson(id: string){
    console.log('====================================');
    console.log(JSON.stringify(this.users));
    console.log('====================================');
    this.users = this.users.filter(c => c.id!==id);
  }
}
