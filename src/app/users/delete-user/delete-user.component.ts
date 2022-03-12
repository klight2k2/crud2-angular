import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  userId!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.userId = data['id'];
      console.log(this.userId);
    });
    if (this.userId) {
      this.userService.deleteUser(this.userId).subscribe({
        next: () => {
          this.snackBar.open('User delete successfully');
          this.router.navigateByUrl('/users/list');
        },
        error: (err) => {
          console.log('there was an error', err);
          this.snackBar.open('Cannot delete user!');
        },
      });
    }
  }
}
