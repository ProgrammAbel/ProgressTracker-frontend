import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressTrackerApiService {

  access_token: string;
  isLoggedIn: boolean = false;

  username: string;

  constructor(private http: HttpClient) { }

  createUser(username: string, password: string): Observable<any> {
    const data = { "username": username, "password": password };
    return this.http.post('http://127.0.0.1:5000/create_user', data);
  }

  login(username: string, password: string): Observable<any> {
    const data = { "username": username, "password": password };
    return this.http.post('http://127.0.0.1:5000/login', data);
  }

  logout() {
    this.isLoggedIn = false;
  }

  getOrderedList(subjectId: number): Observable<any> {
    let httpOptions = {
      headers: { 'Authorization': `Bearer ${this.access_token}`}
    };
    return this.http.get(`http://127.0.0.1:5000/get_ordered_list/${subjectId}`, httpOptions);
  }
}
