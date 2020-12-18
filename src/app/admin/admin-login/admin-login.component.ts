import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  isSubmitted = false;

  message;
  isError = false;
  isNotError = false;
  isLoggingin = false;

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
        ),
      ],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.getIsAuthenticated()) {
      this.router.navigate(['/admin/home']);
    }
  }

  login() {
    this.isLoggingin = true;
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.isLoggingin = false;
      return;
    }
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
    this.authService.getAuthErrorListener().subscribe((response) => {
      if (response.isError) {
        this.message = response.message;
        this.isError = true;
        this.isLoggingin = false;
        setTimeout(() => {
          this.isError = false;
        }, 5000);
      } else {
        this.message = 'Successfully logged in! Redirecting to homepage now...';
        this.isNotError = true;
        setTimeout(() => {
          this.router.navigate(['/admin/home']);
        }, 1500);
      }
    });
  }
}
