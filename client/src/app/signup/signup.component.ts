import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { USERS } from '../mockData/mock-users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onSignUp(signUpForm: NgForm) {
    if (signUpForm.valid) {
      let currentDate =  new Date();
      // let signupDate = moment(currentDate).format('MMMM Do, YYYY h:mm:ss');
      let newUser = {
        userId: signUpForm.value.username,
        password: signUpForm.value.password,
        name: signUpForm.value.name,
        signupDate: currentDate
      };
      USERS.push(newUser);
      this.router.navigate(['/login']);
    }
    else {
      console.log("invalid");
    }
    
  }

}