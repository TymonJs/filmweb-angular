import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../service/current-user-service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent implements OnInit {
  protected user!: User;
  constructor(private CurrentUserService: CurrentUserService){}

  ngOnInit(): void {
    this.CurrentUserService.user$.subscribe((curr) => {
      this.user = curr
    })
  }
}
