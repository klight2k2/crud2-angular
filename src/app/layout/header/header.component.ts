import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}
  isLogined: boolean = false;
  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
    this.router.navigateByUrl('/login');
  }
  ngOnInit(): void {
    this.isLogined = this.userService.isLogined();
    console.log('logined', this.isLogined);
  }
}
