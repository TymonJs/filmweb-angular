import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  
  private loginStatus = localStorage.getItem("isLoggedIn")==="true";
  private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBnbWFpbC5jb20iLCJpYXQiOjE3Njc4MTAwNTgsImV4cCI6MTc2NzgxMzY1OCwic3ViIjoiMSJ9.nkqRA1LPeKCXqP-4HdB6YBngSygVXS2pGAzqLqNiNRk";

  isLoggedIn(){
    return this.loginStatus;
  }

  login(){
    this.loginStatus = true;
    localStorage.setItem("isLoggedIn", "true");
  }

  logout(){
    this.loginStatus = false;
    localStorage.setItem("isLoggedIn", "false");
  }

  getToken(){
    return this.token;
  }

  setToken(tk: string){
    this.token = tk;
  }


}
