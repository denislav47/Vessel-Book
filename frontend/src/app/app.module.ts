import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from '../services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


import { MessagesComponent } from './messages/messages.component'

import {  MatCardModule } from '@angular/material/card'
import {  MatButtonModule } from '@angular/material/button'
import {  MatToolbarModule } from '@angular/material/toolbar'
import { MatInputModule } from '@angular/material/input'
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    RouterModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
