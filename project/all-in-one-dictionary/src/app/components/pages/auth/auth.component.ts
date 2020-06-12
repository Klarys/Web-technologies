import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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


  constructor() {
    this.authForm = new FormGroup({
      emailInput: new FormControl(null, [Validators.required, Validators.email]),
      passwordInput: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
   }

  ngOnInit(): void {
  }

  onAccept() {
    console.log(this.authForm.get('emailInput'));
  }

  switchMode() {
   this.loginMode = !this.loginMode;
  }
}
