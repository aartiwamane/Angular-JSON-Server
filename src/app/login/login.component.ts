import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], //  Email required and format check
      password: ['', Validators.required] //  Password required
    });
  }

  logIn() {
    if (this.loginForm.invalid) {
      alert("Please enter a valid email and password.");
      return;
    }

    console.log(this.loginForm.value);
    alert("User logged in successfully");
    this._router.navigate(['/restaurent']);
    this.loginForm.reset();
  }
}
