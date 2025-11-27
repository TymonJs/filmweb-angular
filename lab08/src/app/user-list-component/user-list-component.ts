import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-user-list-component',
  imports: [],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.scss',
})
export class UserListComponent implements OnInit {

  protected users: User[] = []

  constructor(private UserService: UserService){}

  ngOnInit(){
    this.UserService.users$.subscribe((user) => {
      this.users = user;
    })
  }

  removeUser(id: number){
    this.UserService.removeUser(id);
  }

  editUser(id: number){
    this.UserService.editUser(id)
  }

  removeAddress(id: number, i: number){
    this.UserService.removeAddress(id,i)
  }

}
