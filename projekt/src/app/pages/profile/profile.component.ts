import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  imports: [AvatarModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {

  private userService = inject(UserService);
  protected user = this.userService.user$.value;

  protected userUnchanged(given: Omit<User, "id" | "password">){
    return this.user?.username === given.username &&
      this.user?.email === given.email && 
      JSON.stringify(this.user.address) === JSON.stringify(given.address);
  }


}
