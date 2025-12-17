import { Routes } from '@angular/router';
import { TodoListComponent } from './pages/todo-list-component/todo-list-component';
import { TodoDetailsComponent } from './pages/todo-details-component/todo-details-component';
import { TodoFormComponent } from './pages/todo-form-component/todo-form-component';

export const routes: Routes = [
    {
        path: "list",
        component: TodoListComponent
    },
    {
        path: "details/:id",
        component: TodoDetailsComponent
    },
    {
        path: "form",
        component: TodoFormComponent
    },
    {
        path: "form/:id",
        component: TodoFormComponent
    }
];
