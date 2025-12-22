import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MenubarModule, AvatarModule, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
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

}

