import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthUser, User } from '../../interfaces/user.interface';
import { PostalValid } from '../../core/validators/postal-valid.directive';
import { InputMaskModule } from 'primeng/inputmask';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from "primeng/button";
import { Router, RouterModule } from "@angular/router";
import { StepperModule } from 'primeng/stepper';
import { UserService } from '../../services/user.service';
import { RegisterForm } from '../../interfaces/form.interface';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, 
    InputMaskModule, 
    IftaLabelModule, 
    PostalValid, 
    ButtonModule, 
    StepperModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
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

  private userService!: UserService;
  private router!: Router;

  constructor(){
    this.userService = inject(UserService);
    this.router = inject(Router);
  }


  submit(form: FormGroup<RegisterForm>){

    this.userService.register(form.value as Omit<User, "id">).subscribe({
      next: (res: AuthUser) => {
        this.userService.saveToken(res.accessToken);
        this.router.navigate(["/"]);

      },
      error: () => { //_: HttpErrorResponse
        form.controls.email.setErrors({emailTaken: true});
      }
    });
  }
}
