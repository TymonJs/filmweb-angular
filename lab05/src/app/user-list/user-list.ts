import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  @Input() users: User[] = [];
  @Output() deletePersonEmitter = new EventEmitter<string>();

  deletePerson(id: string){
    
    this.deletePersonEmitter.emit(id);
  }
}
