import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { User, UsersActions } from "./users-store";
import { switchMap, map, tap, Observable, delay } from "rxjs";
import { HttpClient } from "@angular/common/http";
interface responseModel {
  limit: number;
  skip: number;
  total: number;
  users: User[];
}

@Injectable()
export class UsersEffects {
  actions$ = inject(Actions);

  constructor(private http: HttpClient) {}

  fetchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.fetchUsers),
      switchMap(() => {
        console.log("API called: https://dummyjson.com/users");
        return this.http.get<responseModel>("https://dummyjson.com/users");
      }),
      map((response) => {
        return response.users.map((user) => {
          return {
            ...user,
          };
        });
      }),
      map((users) => {
        return UsersActions.saveInitialUsers({ users });
      })
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.startUserUpdate),
      delay(2000),
      map((action) => {
        return UsersActions.completeUserUpdate({
          selectedUserId: action.selectedUserId,
          user: action.user,
        });
      })
    );
  });
}
