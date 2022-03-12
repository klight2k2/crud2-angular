import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
export interface User {
  id: number;
  username: string;
  email: string;
  image?: string;
  phone?: string;
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit, OnDestroy {
  subscribeUsers!: SubscriptionLike;
  listUsers$!: Observable<User[]>;
  displayedColumns: string[] = ['id', 'username', 'email', 'actions'];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.listUsers$ = this.userService.listUsers();
  }
  ngOnDestroy(): void {
    // this.subscribeUsers.unsubscribe();
    // console.log('unsubscribe');
  }
}
