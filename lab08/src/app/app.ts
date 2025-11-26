import { Component, signal } from '@angular/core';
import { UserFormComponent } from "./user-form-component/user-form-component";
import { UserListComponent } from './user-list-component/user-list-component';

@Component({
  selector: 'app-root',
  imports: [UserListComponent, UserFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('lab08');
}
