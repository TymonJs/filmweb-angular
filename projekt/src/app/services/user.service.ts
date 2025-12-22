import { inject, Injectable } from '@angular/core';
import { AuthUser, LoginDto, User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private httpClient = inject(HttpClient);
  private ACCESS_TOKEN_KEY = "access_token";
  public user$ = new BehaviorSubject<User|null>(null);

  constructor() {
    this.verifyToken().subscribe({
      error: () => this.removeToken()
    })
  }

  register(user: Omit<User, "id">): Observable<AuthUser>{
    return this.httpClient.post<AuthUser>(environment.serverUrl + "/users", user)
  }

  login(user: LoginDto): Observable<AuthUser>{
    return this.httpClient.post<AuthUser>(environment.serverUrl + "/login", user)

  }

  getToken(): string | null{
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  saveToken(token: string): void{
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token)
  }
  saveUser(user: User){
    this.user$.next(user);
  }

  removeToken(): void{
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    this.user$.next(null)
  }

  verifyToken(): Observable<User | null>{
    const token = this.getToken();

    if (!token){
      return of(null);
    }

    const {sub} = jwtDecode(token)

    return this.httpClient.get<User>(environment.serverUrl + `/users/${sub}`)
      .pipe(
        tap(user => this.user$.next(user))
      )
  }
}
