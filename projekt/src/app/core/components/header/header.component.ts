import { Component, inject } from '@angular/core';
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
export class HeaderComponent{
  protected items = [
    { 
      label: 'Films', 
      icon: 'pi pi-video', 
      routerLink: "/films",
      routerLinkActiveOptions: { exact: true } 
    },
    { 
      label: 'Users', 
      icon: 'pi pi-users', 
      routerLink: "/users",
      routerLinkActiveOptions: { exact: true }
    },
    { 
      label: 'Library', 
      icon: 'pi pi-bookmark', 
      routerLink: "/library",
      routerLinkActiveOptions: { exact: true }
    }
  ];

  protected userService = inject(UserService);
  private router = inject(Router);
  protected user$ = this.userService.user$;

  logout(){
    this.userService.removeToken();
    this.router.navigate(["/"])
  }

}

