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
    const {username, email, password, address} = this.user as User
    const {street, city, postal} = address
    this.form.patchValue({
      username,
      email,
      password,
      address: {
        street,
        city,
        postal
      }
    })
  }

  protected userUnchanged(given: Omit<User, "id">){
    return this.user?.username === given.username &&
      this.user?.email === given.email && 
      this.user.password === given.password &&
      JSON.stringify(this.user.address) === JSON.stringify(given.address);
  }

  protected get saveDisabled(){
    const current = this.form.getRawValue() as Omit<User, "id">;
    return this.form.invalid || this.userUnchanged(current);
  }

  protected edit(){
    this.router.navigate(["profile", "edit"])
  }

  protected save() {
    if (this.saveDisabled) return;
    
    const current = this.form.getRawValue() as Omit<User, "id">;
    const updated: User = { ...(this.user as User), ...current };

    
    this.userService.updateUser(updated).subscribe({
      next: (user) => {
        this.userService.saveUser(user);
        this.user = user;
      },
      error: (err) => {
        console.error('Failed to update user', err);
      }
    });
  }

  logout(){
    this.userService.removeToken();
    this.router.navigate(["/"])
  }


}
