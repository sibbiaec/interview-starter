import { bootstrapApplication } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from "@angular/router";

import { provideState, provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";

import { AppComponent } from "@app/app.component";
import { AppRoutes } from "@app/app-router";
import { UsersReducer } from "@state/users/users-store";
import { UsersEffects } from "@app/_state/users/users-effects";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(AppRoutes),
        provideStore(),
        provideState(UsersReducer),
        provideEffects(UsersEffects),
        importProvidersFrom(BrowserAnimationsModule),
    ]
});