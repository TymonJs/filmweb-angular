import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { User } from '../../interfaces/user.interface';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterForm } from '../../interfaces/form.interface';

@Component({
  selector: 'app-profile',
  imports: [AvatarModule, ButtonModule, IftaLabelModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{

  private userService = inject(UserService);
  private router = inject(Router)
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
  })

  ngOnInit(): void {
    this.form.patchValue(this.user as User);
  }

  protected edit(){
    this.router.navigate(["profile", "edit"])
  }

  logout(){
    this.userService.removeToken();
    this.router.navigate(["/"])
  }


}
