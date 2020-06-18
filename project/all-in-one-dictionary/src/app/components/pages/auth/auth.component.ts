import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthResponse } from 'src/app/models/auth/AuthResponse.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  loginMode = true;
  loggedIn = false;
  loginError = false;
  signupError = false;


  constructor(private authService: AuthService, private router: Router) {
    this.loggedIn = authService.isLoggedIn();
    this.authForm = new FormGroup({
      emailInput: new FormControl(null, [Validators.required, Validators.email]),
      passwordInput: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
   }

  ngOnInit(): void {
  }

  onAccept() {
    if(this.authForm.valid)
    {
      if(this.loginMode)
      {
        this.loginError = false;
        this.authService.Login(this.authForm.get('emailInput').value, this.authForm.get('passwordInput').value).subscribe(
          (data: AuthResponse) => {
            localStorage.clear();
            
            let key = 'token';
            localStorage.setItem(key, data.token);
            this.authService.authorized.next(true);
            this.router.navigate(['']);
          },
          (data: HttpErrorResponse) => {
            this.loginError = true;
          }
        );
      }
      else
      {
        this.signupError = false;
        this.authService.Signup(this.authForm.get('emailInput').value, this.authForm.get('passwordInput').value).subscribe(
          (data: AuthResponse) => {
            this.loginMode = true;
          },
          (data: HttpErrorResponse) => {
            this.signupError = true;
          }
        );
      }
    }
  }

  switchMode() {
   this.loginMode = !this.loginMode;
  }

}
