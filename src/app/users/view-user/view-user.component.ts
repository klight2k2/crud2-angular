import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from '../list-users/list-users.component';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit, OnDestroy {
  userId: string = '';
  user!: User;
  subscription!: Subscription;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((data) => {
        this.userId = data['id'];
      })
      .unsubscribe();
    this.subscription = this.userService
      .viewUsers(this.userId)
      .subscribe((data) => {
        console.log(data);
        this.user = data;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
