import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:3000';

@Injectable()
export class AuthAPIService {
  
  constructor(private http: HttpClient) { }

  // constructor(public http: Http ,private httplogin: HttpClient) {
  //   console.log('Hello AuthService Provider');
  // }

  login(username: string, password: string) {
    return this.http.post<any>(apiUrl +'/user/signin', { email: username, password: password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        }));
}

  // postData(credentials, type) {
  //   return new Promise((resolve, reject) => {
  //     const headers = new Headers();
  //     this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
  //       .subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });

  //   });

  // }
  logout() {
    localStorage.removeItem('currentUser');
}
}