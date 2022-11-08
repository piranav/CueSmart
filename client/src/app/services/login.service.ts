import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from 'src/model/signInData';
import { USERS } from '../mockData/mock-users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuthenticated = false;
  ifUserIdExist = false;
  userId = "";

  constructor(private router: Router) { }

  authenticate(signInData: SignInData): boolean {

    if (this.checkCredential(signInData)) {
      this.isAuthenticated = true;
      this.router.navigate([`/user/${signInData.getUserId()}`]);
      this.userId = signInData.getUserId();
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  private checkCredential(signInData: SignInData): boolean {
    let userId = signInData.getUserId();
    let password = signInData.getPassword();

    let matchedUser = USERS.find( user => user['userId'] === userId);
    if (matchedUser != null && matchedUser.password === password) {
      return true;
    }
    alert("Invalid credential");
    return false;
  }

}
