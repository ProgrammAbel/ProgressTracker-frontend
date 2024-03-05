import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProgressTrackerApiService } from '../../services/progress-tracker-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrl: './account-login.component.scss'
})
export class AccountLoginComponent implements OnInit{
  form: FormGroup;

  type: 'login' | 'signup' = 'signup';
  loading = false;

  serverMessage: string;

  constructor(private ptApi: ProgressTrackerApiService, private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [Validators.minLength(6), Validators.required]
      ],
      passwordConfirm: ['', []]
    });
  }

  changeType(val: 'login' | 'signup') {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password?.value === this.passwordConfirm?.value;
    }
  }

  createUser(username: string, password: string) {
    this.ptApi.createUser(username, password).subscribe(response => {
      this.snackBar.open('Account created successfully', 'OK', {duration: 5000});
      this.changeType('login');
    });
  }

  login(username: string, password: string) {
    this.ptApi.username = username;
    this.ptApi.login(username, password).subscribe(response => {
      this.ptApi.access_token = response.access_token;
      this.ptApi.isLoggedIn = true;
    });
    console.log(this.ptApi.access_token);
    if (!(this.ptApi.isLoggedIn)) {
      this.serverMessage = 'Invalid username or password';
    }
  }
  
  async onSubmit() {
    this.loading = true;

    const username = this.username?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        // await this.afAuth.signInWithEmailAndPassword(email, password);
        this.login(username, password);
      }
      if (this.isSignup) {
        // await this.afAuth.createUserWithEmailAndPassword(email, password);
        this.createUser(username, password);
      }
    } catch (err: any) {
      this.serverMessage = err;
    }

    this.loading = false;
  }
}
