import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth/AuthResponse.model';
import { enableDebugTools } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
    
    constructor(private http: HttpClient) {}

    Login(email: string, password: string): Observable<AuthResponse> {
        const body = {
          login: email,
          password: password,
        };
        return this.http.post<AuthResponse>(environment.NodeJSUrl + "users/login", body);
    }

    Signup(email: string, password: string): Observable<AuthResponse> {
        const body = {
            login: email,
            password: password,
          };
        return this.http.post<AuthResponse>(environment.NodeJSUrl + "users/signup", body);
    }

    isLogedIn() {
      if(localStorage)
      {
        if(localStorage.getItem('token'))
        {
          return true;
        }
      }
      return false;
    }
}