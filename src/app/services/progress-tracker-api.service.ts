import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressTrackerApiService {

  access_token: string;
  isLoggedIn: boolean = false;

  username: string;

  allSubjects = {
    1: 'Mathematics',
    2: 'Computer Science',
    3: 'Physics'
  };

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
  
  getPriorityList(subjectId: number): Observable<any> {
    let httpOptions = {
      headers: { 'Authorization': `Bearer ${this.access_token}`}
    };
    return this.http.get(`http://127.0.0.1:5000/get_priority_list/${subjectId}`, httpOptions);
  }

  getAllSubjects(): Observable<any> {
    return this.http.get('http://127.0.0.1:5000/get_all_subjects')
  }

  getUserSubjects() {
    let httpOptions = {
      headers: { 'Authorization': `Bearer ${this.access_token}`}
    };

    return this.http.get('http://127.0.0.1:5000/get_user_subjects', httpOptions);

  }

  updateUserTopic(data: object) {
    let httpOptions = {
      headers: { 'Authorization': `Bearer ${this.access_token}`}
    };
    console.log(data);

    this.http.put('http://127.0.0.1:5000/update_topic_progress', data, httpOptions).subscribe(response => {
      console.log(response);
    });
  }


  addUserSubjects(subjectIds: number[]): any {
    let httpOptions = {
      headers: { 'Authorization': `Bearer ${this.access_token}`}
    };

    let data = {
      subjectIds: [...subjectIds]
    };



    // Define a recursive function to handle the loop
    const processSubject = (index: number) => {
      // Check if all subjects have been processed
      if (index >= subjectIds.length) {
        return; // Base case: exit recursion
      }

      let subjectId = subjectIds[index];
      let topicEndpoint = this.http.get(`http://127.0.0.1:5000/get_topics/${subjectId}`);

      // Subscribe to the HTTP request
      topicEndpoint.subscribe((response: any) => {
        let topics = response.data;
        let subject = {
          subjectId: subjectId,
          topics: topics.map((topic: any) => ({
            topicId: topic[0],
            topicCompleted: false,
            confidenceLevel: 'low',
            lastReviewed: ''
          }))
        };

        // Send the POST request after processing the topics
        this.http.post('http://127.0.0.1:5000/add_topic_progress', subject, httpOptions).subscribe((response: any) => {
          
          // Process the next subject recursively
          processSubject(index + 1);
        });
      });
    }

    this.http.post('http://127.0.0.1:5000/create_user_subject', data, httpOptions).subscribe(response => {
      processSubject(0);
    })
  }
}
