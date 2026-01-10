import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginForm } from '../../interfaces/form.interface';
import { UserService } from '../../services/user.service';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { AuthUser, LoginDto } from '../../interfaces/user.interface';
import { MessageService } from 'primeng/api';

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
  });
  private userService = inject(UserService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  protected submit(form: FormGroup<LoginForm>): void {
    
    this.userService.login(form.value as LoginDto).subscribe({
      next: (authUser: AuthUser) => {
        this.userService.saveToken(authUser.accessToken);
        this.userService.saveUser(authUser.user);
        this.router.navigate(["/"]);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'You have been logged in.'});
      },
      error: () => {
        this.form.setErrors({invalidCredentials: true});
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid email or password.'});
      }
    });
    
  }


}
