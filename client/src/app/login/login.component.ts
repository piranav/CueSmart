import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignInData } from 'src/model/signInData';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  onSignIn(signInForm: NgForm) {
    const signInData = new SignInData(signInForm.value.username, signInForm.value.password);
    this.loginService.authenticate(signInData);
  }

  

}
