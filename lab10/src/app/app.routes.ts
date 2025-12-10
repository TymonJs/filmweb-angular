import { Routes } from '@angular/router';
import { BookListComponent } from './pages/book/book-list-component/book-list-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { BookDetailsComponent } from './pages/book/book-details-component/book-details-component';

export const routes: Routes = [
    {
        path: "book",
        loadChildren: () => import("./pages/book/book.routes").then(r => r.BOOK_ROUTES)
    },    
    {
        path: "info",
        loadChildren: () => import("./pages/info/info.routes").then(r => r.INFO_ROUTES)
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
]