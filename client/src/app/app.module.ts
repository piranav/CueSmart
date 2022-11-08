import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GuestViewCardComponent } from './guest-view-card/guest-view-card.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserViewCardComponent } from './user-view-card/user-view-card.component';
import { CreateCuecardComponent } from './create-cuecard/create-cuecard.component';
import { EditCuecardComponent } from './edit-cuecard/edit-cuecard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    GuestViewCardComponent,
    UserHomeComponent,
    UserViewCardComponent,
    CreateCuecardComponent,
    EditCuecardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // CLI adds AppRoutingModule to the AppModule's imports array
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }