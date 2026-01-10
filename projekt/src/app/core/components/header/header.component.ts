import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MenubarModule } from 'primeng/menubar';
import { UserService } from '../../../services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MenubarModule, AvatarModule, IconFieldModule, InputIconModule, ButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})  
export class HeaderComponent implements OnInit{
  protected items = [
    { 
      label: 'Films', 
      icon: 'pi pi-video', 
      routerLink: "/films",
      routerLinkActiveOptions: { exact: true } 
    }
  ];

  protected userService = inject(UserService);
  private router = inject(Router);
  protected user$ = this.userService.user$;

  public ngOnInit(): void {
    this.userService.verifyToken().subscribe({
      next: (res) => this.userService.user$.next(res),
      error: () => this.userService.removeToken()
    });
  }

}

