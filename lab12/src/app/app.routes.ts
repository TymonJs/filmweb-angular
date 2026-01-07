import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { ProfileComponent } from './pages/profile-component/profile-component';
import { authGuard } from './core/guards/auth-guard';
import { LoginComponent } from './pages/login-component/login-component';
import { requestResolver } from './core/resolvers/request-resolver';

export const routes: Routes = [
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [authGuard],
        resolve: {
            post: requestResolver 
        }
    },
    {
        path: "login",
        component: LoginComponent
    }
];
