import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(payload: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, payload).pipe(
      map((response) => {
        const token = response.accessToken;
        if (token) {
          localStorage.setItem('token', token);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError(error);
      })
    );
  }
}
