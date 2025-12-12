import { Routes } from "@angular/router";
import { InfoComponent } from "./info-component/info-component";

export const INFO_ROUTES: Routes = [
    {
        path: "",
        component: InfoComponent
    },
    {
        path: "**",
        redirectTo: "/not-found"
    }
]