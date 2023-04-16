import { Routes } from "@angular/router";

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full'
    },
    {
        path: 'pages',
        loadChildren: () => import('@pages/pages-router')
            .then((module) => module.PagesRoutes)
    },
];