import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface User {
  name?: string;
  phoneNumber?: string;
  address?: string;
  state?: string;
  city?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/allUsers`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  addUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/addUser`, user);
  }

  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/edit/${userId}`, user);
  }

  deleteUser(userId: string | unknown): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/delete/${userId}`);
  }
}
