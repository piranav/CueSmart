import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCuecardComponent } from './create-cuecard/create-cuecard.component';
import { EditCuecardComponent } from './edit-cuecard/edit-cuecard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserHomeComponent } from './user-home/user-home.component';


// note: more specific routes should come first
const routes: Routes = [
  //{ path: 'guest/view/:author/:name', component: GuestViewCardComponent }, // once ready to add data, update this to use a named parameter i.e. path: 'guest/view/:id' (see https://blog.briebug.com/blog/router-link)
  { path: 'user/:userId/edit/:courseName', component: EditCuecardComponent },
  { path: 'user/:userId/create', component: CreateCuecardComponent },
  { path: 'user/:userId', component: UserHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent } // wildcard: when a URL is triggered that doesn't exist, typically "page not found" component
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }