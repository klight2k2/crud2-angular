import { UserService } from 'src/app/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit, OnDestroy {
  addUserForm: FormGroup = new FormGroup({});
  subscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
      ]),
    });
  }
  createUser() {
    this.subscription = this.userService
      .addUser(this.addUserForm.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.snackBar.open('User has been created!');
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open('Fail to create user!');
        },
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
