import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LibraryComponent } from './pages/library/library.component';
import { authGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddFilmComponent } from './pages/add-film/add-film.component';
import { FilmsComponent } from './pages/films/films.component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [authGuard]
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [authGuard]
    },
    {
        path: "library",
        component: LibraryComponent,
        canActivate: [authGuard]
    },
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [authGuard]
    },
    {
        path: "profile/edit",
        component: RegisterComponent,
        canActivate: [authGuard]
    },
    {
        path: "films",
        component: FilmsComponent
    },
    {
        path: "films/add",
        component: AddFilmComponent,
        canActivate: [authGuard]
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];
