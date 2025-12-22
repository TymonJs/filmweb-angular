import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-library',
  imports: [],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent {

  protected userService!: UserService;

  constructor(){
    this.userService = inject(UserService)
  }
}
