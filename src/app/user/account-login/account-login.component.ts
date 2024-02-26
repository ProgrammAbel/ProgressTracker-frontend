import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrl: './account-login.component.scss'
})
export class AccountLoginComponent {
  form: FormGroup;

  type: 'login' | 'signup' = 'signup';
  loading = false;

  serverMessage: string;

  constructor(private fb: FormBuilder) {}

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

  async onSubmit() {
    this.loading = true;

    const username = this.username?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        // await this.afAuth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        // await this.afAuth.createUserWithEmailAndPassword(email, password);
      }
    } catch (err: any) {
      this.serverMessage = err;
    }

    this.loading = false;
  }
}
