import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  href: string = "";
  
  constructor(private router: Router, private route: ActivatedRoute, public loginService: LoginService) { }


  ngOnInit(): void {
    this.href = this.router.url;
  }

  // make page reload when home route is activated from guest-view-card
  reloadPage(): void {
    if (this.router.url === '/') {
      window.location.reload();
    }
  }

  // make page reload when home route is activated from user-view-card (user clicks on logo)
  userReloadPage(): void {
    console.log(this.loginService.userId);
    if (this.router.url === `/home/${this.loginService.userId}`) {
      window.location.reload();
    }
  }

  // when user clicks logout
  logout(): void {
    // TODO: write code here to log out user
    this.loginService.isAuthenticated = false;
    this.loginService.userId = "";
  }

  // TODO: fix this with real login indicator 
  // currently this isn't being called, but once it is, the nav bar will adjust for logged in user (boolean var updates UI)
  login(): void {
    this.loginService.isAuthenticated = false;
  }

  


}
