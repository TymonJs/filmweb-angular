import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found-component/page-not-found-component';
import { MainComponent } from './main-component/main-component';

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: MainComponent
    },
    {
        path: "book",
        loadChildren: () => import("./pages/book/book.routes").then(r => r.BOOK_ROUTES)
    },    
    {
        path: "info",
        loadChildren: () => import("./pages/info/info.routes").then(r => r.INFO_ROUTES)
    },
    {
        path: "not-found",
        component: PageNotFoundComponent
    },
    {
        path: "**",
        redirectTo: "not-found"
    },
    
]