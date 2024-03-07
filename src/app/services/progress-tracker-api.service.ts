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

  getAllSubjects(): any[][] {
    let subjects: any[][] = [];
    this.http.get('http://127.0.0.1:5000/get_all_subjects').subscribe((response: any) => {
      subjects = response.data
    });
    return subjects;
  }

  addUserSubjects(subjectIds: number[]): any {
    let httpOptions = {
      headers: { 'Authorization': `Bearer ${this.access_token}`}
    };

    let data = {
      subjectIds: [...subjectIds]
    };

    console.log(data);

    let test = this.http.post('http://127.0.0.1:5000/create_user_subject', data, httpOptions);
    test.subscribe(response => {
      console.log(response);
    })

    for (let i = 0; i < subjectIds.length; i++) {
      let subjectId = subjectIds[i]
      let topicEndpoint = this.http.get(`http://127.0.0.1:5000/get_topics/${subjectId}`);
      let topics: any[][] = [[]];
      let subject = {
        subjectId: subjectId,
        topics: [] as { topicId: number; topicCompleted: boolean; confidenceLevel: number; lastReviewed: string; }[]
      };

      topicEndpoint.subscribe((response: any) => {
        topics = response.data;
        subject.topics = topics.map(topic => ({
          topicId: topic[0],
          topicCompleted: false,
          confidenceLevel: 1,
          lastReviewed: ''
        }));
        this.http.post('http://127.0.0.1:5000/add_topic_progress', subject, httpOptions)
      });

      
    };
  }
}
