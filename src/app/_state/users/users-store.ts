import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import {
  createActionGroup,
  createFeature,
  createReducer,
  emptyProps,
  props,
  on,
  createSelector,
  createFeatureSelector,
} from "@ngrx/store";

const UsersStoreKey = "users";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  birthDate: string;
}

export interface UsersState extends EntityState<User> {
  selectedUserId: string | null;
  users: User[];
  isLoading: boolean;
}

const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialState: UsersState = usersAdapter.getInitialState({
  selectedUserId: null,
  users: [],
  isLoading: false,
});

const selectUsersFeature = createFeatureSelector<UsersState>(UsersStoreKey);
export const getAllBookEntries = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);

export const getLoadingStatus = createSelector(
    selectUsersFeature,
    (state: UsersState) => state.isLoading
  );

export const UsersActions = createActionGroup({
  source: UsersStoreKey,
  events: {
    Init: emptyProps(),
    "Fetch Users": emptyProps(),
    "Save Initial Users": props<{ users: User[] }>(),
    "Start User Update": props<{ selectedUserId: string; user: User }>(),
    "Complete User Update": props<{ selectedUserId: string; user: User }>(),
  },
});

export const UsersReducer = createFeature({
  name: UsersStoreKey,
  reducer: createReducer(
    initialState,
    on(UsersActions.saveInitialUsers, (state, action) => ({
      ...state,
      users: [...action.users],
    })),

    on(UsersActions.startUserUpdate, (state, action) => ({
      ...state,
      isLoading: true,
    })),

    on(UsersActions.completeUserUpdate, (state, action) => ({
      ...state,
      users: state.users.map((user) =>
        action.selectedUserId === user.id ? { ...action.user } : user
      ),
      isLoading: false
    }))
  ),
});
