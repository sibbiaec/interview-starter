import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DemoMaterialModule } from '@app/material.module';
import { Store } from '@ngrx/store';
import { User, UsersActions, UsersState, getAllBookEntries, getLoadingStatus } from '@app/_state/users/users-store';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, DemoMaterialModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent implements OnInit{
  dataSource: User[] = [];
  columnsToDisplay = [ 
    'id',
    'firstName',
    'lastName',
    'maidenName',
    'age',
    'gender',
    'email',
    'phone',
    'birthDate'
  ];
  users: User[] = [];
  subscription: Subscription = new Subscription();
  isLoading = false;
  updateUser: any;
  expandedElement = null;
  
  constructor(private store: Store<UsersState>) {}

  ngOnInit() {
    this.subscribeToUsersList();
    this.onFetchUsers();
  }

  onFetchUsers() {
    this.store.dispatch(UsersActions.fetchUsers());
  }

  subscribeToUsersList() {
    this.subscription = this.store
      .select(getAllBookEntries)
      .subscribe((users: User[]) => {
        this.users = users;
        console.log(this.users);
        this.dataSource = this.users;
      });

      this.store
      .select(getLoadingStatus)
      .subscribe(isLoading => this.isLoading = isLoading);
  }

  onSave(user: User) {
    if (this.updateUser) {
      this.store.dispatch(UsersActions.startUserUpdate({selectedUserId: user.id, user: this.updateUser}));
      this.updateUser = null;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onInput(value: any, column: any, user: any) {
    this.updateUser = {...user};
    this.updateUser[column] = value;
  }
}
