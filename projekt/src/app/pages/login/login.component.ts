import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginForm } from '../../interfaces/form.interface';
import { UserService } from '../../services/user.service';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { AuthUser, LoginDto } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, IftaLabelModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  protected form = new FormGroup<LoginForm>({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(5)])
  })
  private userService = inject(UserService);
  private router = inject(Router);

  submit(form: FormGroup<LoginForm>){
    
    this.userService.login(form.value as LoginDto).subscribe({
      next: (authUser: AuthUser) => {
        this.userService.saveToken(authUser.accessToken)
        this.userService.saveUser(authUser.user);
        this.router.navigate(["/"])
      },
      error: () => {
        this.form.setErrors({invalidCredentials: true})
      }
    })
    
  }


}
