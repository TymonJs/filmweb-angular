import { Routes } from "@angular/router";
import { BookDetailsComponent } from "./book-details-component/book-details-component";
import { BookListComponent } from "./book-list-component/book-list-component";
import { BookFormComponent } from "./book-form-component/book-form-component";

export const BOOK_ROUTES: Routes = [
    {
        path: ":id/details",
        component: BookDetailsComponent
    },
    {
        path: "list",
        component: BookListComponent
    },
    {
        path: ":id/form",
        component: BookFormComponent
    },
    {
        path: "form",
        component: BookFormComponent
    },
    {
        path: "**",
        redirectTo: "/not-found"
    },
]