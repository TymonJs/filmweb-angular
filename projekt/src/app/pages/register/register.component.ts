import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthUser, User } from '../../interfaces/user.interface';
import { PostalValidator } from '../../core/validators/postal-valid.directive';
import { InputMaskModule } from 'primeng/inputmask';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from "primeng/button";
import { Router, RouterModule } from "@angular/router";
import { StepperModule } from 'primeng/stepper';
import { UserService } from '../../services/user.service';
import { RegisterForm } from '../../interfaces/form.interface';
import { Location } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, 
    InputMaskModule, 
    IftaLabelModule, 
    PostalValidator, 
    ButtonModule, 
    StepperModule,
    RouterModule,
    DialogModule,
    BreadcrumbModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit{
  protected form = new FormGroup<RegisterForm>({
    username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    password: new FormControl("", [Validators.required, Validators.minLength(5)]),
    email: new FormControl("",[Validators.required, Validators.email]),
    address: new FormGroup({
      street: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      postal: new FormControl("", [Validators.required])
    })
  });

  private userService = inject(UserService);
  private router = inject(Router);
  private location = inject(Location);
  private messageService = inject(MessageService);
  protected isEditing = this.location.path() === "/profile/edit";
  protected modalVisible = false;

  protected items: MenuItem[] = [
    {
      label: "Profile",
      routerLink: "/profile"
    },
    {
      label: "Update profile"
    }
  ];

  protected home = {
    icon: "pi pi-home",
    routerLink: "/"
  };

  public ngOnInit(): void {
    
    const user = {...this.userService.user$.value, password: ""};
    if (this.isEditing){
      this.form.patchValue(user);
      this.form.controls.password.clearValidators();
      this.form.controls.password.updateValueAndValidity();    
    }
  }

  protected get isFirstStepInvalid(): boolean {
    const isInvalid = this.form.controls.username.invalid || this.form.controls.email.invalid;
    if (this.isEditing) return isInvalid;
    
    return isInvalid || this.form.controls.password.invalid;
  }

  protected get isSecondStepInvalid(): boolean {
    return this.form.controls.address.invalid || this.form.controls.password.invalid || this.form.controls.email.invalid;
  }

  protected get userUnchanged(): boolean{
    const user = this.userService.user$.value;
    const given = this.form.getRawValue();

    return user?.username === given.username &&
      user.email === given.email && 
      JSON.stringify(user.address) === JSON.stringify(given.address);
  }

  protected updateUser(): void{
    const formValues = this.form.getRawValue();
    const password = formValues.password;

    if (password === null){
      this.closeModal();
      this.form.controls.password.setErrors({badRequest: true});
      
      return;
    }

    const payload: Omit<User, "id"> = {
      username: formValues.username as string,
      password: password,
      email: formValues.email as string,
      address: formValues.address as {city: string, street: string, postal: string}
    };

    const updated: User = { ...(this.userService.user$.value), ...payload } as User;

    const currentUser = this.userService.user$.value;
    if (!currentUser){
      this.form.controls.password.patchValue("");
      this.form.controls.password.setErrors({badRequest: true});
      
      return;
    }
    const email = currentUser.email;

    this.userService.login({ email, password })
    .subscribe({
      next: () => {
        this.userService.updateUser(updated).subscribe((next) => {
          this.userService.user$.next(next);
          this.router.navigate(["profile"]);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Your profile has been updated.'});
          
        });
      },
      error: () => {
        this.form.controls.password.patchValue("");
        this.form.controls.password.setErrors({badRequest: true});
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Incorrect password. Please try again.'});
      }
    });

  }

  protected showModal(): void{
    this.form.controls.password.addValidators([Validators.required]);
    this.form.controls.password.updateValueAndValidity();
    this.modalVisible = true;
  }

  protected closeModal(): void{
    this.modalVisible = false;
    this.form.controls.password.patchValue("");
    this.form.controls.password.clearValidators();
    this.form.controls.password.updateValueAndValidity();
  }

  protected register(): void{
    const form: FormGroup<RegisterForm> = this.form;
    this.userService.register(form.value as Omit<User, "id">).subscribe({
      next: (res: AuthUser) => {
        this.userService.saveToken(res.accessToken);
        this.userService.saveUser(res.user);
        this.router.navigate(["/"]);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Your account has been created.'});

      },
      error: () => {
        form.controls.email.setErrors({emailTaken: true});
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Email is already taken.'});
      }
    });
  }
}
