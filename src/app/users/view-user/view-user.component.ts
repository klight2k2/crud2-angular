import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from '../list-users/list-users.component';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  userId: string = '';
  user$!: Observable<User>;
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
    this.user$ = this.userService.viewUsers(this.userId);
  }
}
