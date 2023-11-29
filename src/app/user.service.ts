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

interface UserData {
  _id: string;
  name: string;
  phoneNumber: string;
  address: string;
  state: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserResponse {
  total: number;
  users: UserData[];
}

interface AddEditDeleteUserResponse {
  message: string;
  user: UserData;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users/allUsers`);
  }

  addUser(user: User): Observable<AddEditDeleteUserResponse> {
    return this.http.post<AddEditDeleteUserResponse>(`${this.apiUrl}/users/addUser`, user);
  }

  updateUser(userId: string, user: User): Observable<AddEditDeleteUserResponse> {
    return this.http.put<AddEditDeleteUserResponse>(`${this.apiUrl}/users/edit/${userId}`, user);
  }

  deleteUser(userId: string | unknown): Observable<AddEditDeleteUserResponse> {
    return this.http.delete<AddEditDeleteUserResponse>(`${this.apiUrl}/users/delete/${userId}`);
  }
}
