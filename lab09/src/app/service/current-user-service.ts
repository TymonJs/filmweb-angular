import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user.interface';



@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  public user$ = new BehaviorSubject<User>({name: "", lastname: "", email: ""});

  editUser(user: User){
    this.user$.next(user);
  }
}
