import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { User } from '../../interfaces/user.interface';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterForm } from '../../interfaces/form.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  imports: [AvatarModule, ButtonModule, IftaLabelModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{

  private userService = inject(UserService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  protected user = this.userService.user$.value;

  protected form = new FormGroup<RegisterForm>({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    email: new FormControl("",[Validators.required, Validators.email]),
    address: new FormGroup({
      street: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      postal: new FormControl("", [Validators.required])
    })
  });

  public ngOnInit(): void {
    this.form.patchValue(this.user as User);
  }

  protected edit(): void{
    this.router.navigate(["profile", "edit"]);
  }

  protected logout(): void{
    this.userService.removeToken();
    this.router.navigate(["/"]);
    this.messageService.add({severity:'success', summary: 'Success', detail: 'You have been logged out.'});
  }


}
