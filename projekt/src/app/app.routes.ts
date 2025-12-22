import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LibraryComponent } from './pages/library/library.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "library",
        component: LibraryComponent,
        canActivate: [authGuard]
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];
