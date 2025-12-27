import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile',
  imports: [AvatarModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {

  private userService = inject(UserService);
  protected user = this.userService.user$.value;
}
