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
  protected user: User | undefined = undefined;
  sendToUserList(toSend: User){
    this.user = toSend;

  }
  // protected readonly title = signal('lab05');
}
