import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../list-users/list-users.component';
import { lastValueFrom, Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  userId: any;
  user!: User;
  imageData: string = '';
  subscription!: Subscription;
  editUserForm: FormGroup = new FormGroup({});
  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  public async loadUser() {
    const user$ = this.userService.viewUsers(this.userId);
    this.user = await lastValueFrom(user$);
    console.log(this.user);
    this.editUserForm = this.formBuilder.group({
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(3),
      ]),

      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      image: new FormControl(this.user.image),
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
    });
  }
  onFileSelect(event: Event): void {
    // @ts-ignore: Object is possibly 'null'.
    const file = (event.target as HTMLInputElement)?.files[0];
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    this.editUserForm.patchValue({ image: file });
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  }
  onSumbit() {
    console.log('submit user');
  }
  updateUser(event: Event): void {
    console.log(this.editUserForm.value);
    event.preventDefault();
    this.subscription = this.userService
      .updateUser(this.editUserForm.value, this.userId)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.snackBar.open('Update user successfully!');
          this.router.navigateByUrl('/users/list');
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open('Update user fail!');
        },
      });
  }

  ngOnInit(): void {
    this.activateRoute.params
      .subscribe((data) => {
        this.userId = data['id'];
      })
      .unsubscribe();
    if (this.userId) {
      this.loadUser();
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
