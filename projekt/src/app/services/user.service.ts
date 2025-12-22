import { inject, Injectable } from '@angular/core';
import { AccessToken, AuthUser, LoginDto, User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private httpClient!: HttpClient;
  private ACCESS_TOKEN_KEY = "access_token";

  constructor(){
    this.httpClient = inject(HttpClient)
  }

  register(user: Omit<User, "id">){
    return this.httpClient.post<AuthUser>(environment.serverUrl + "/users", user)
  }

  login(user: LoginDto){
    return this.httpClient.post<AccessToken>(environment.serverUrl + "/login", user)
  }

  getToken(){
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  saveToken(token: string){
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
  }
}
