import { Routes } from "@angular/router";
import { UsersComponent } from "@pages/users/users.component";

export const PagesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UsersComponent,
    }
]