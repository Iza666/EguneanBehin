import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { User } from '../modeloak/user';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    isLoggedIn = false;
    token:any;
    constructor(
      private http: HttpClient,
      private env: EnvService,
      public storage: Storage
    ) { }
    login(email: String, password: String) {
      return this.http.post(this.env.API_URL + 'auth/login',
        {email: email, password: password}
      ).pipe(
        tap(token => {
          this.storage.set('token', token['access_token'])
          .then(
            () => {
              console.log('Token Stored');
            },
            error => console.error('Error storing item', error)
          );
          this.token = token['access_token'];
          this.isLoggedIn = true;
          return token;
        }),
      );
    }
    register(erabiltzailea: String, email: String, password: String) {
      return this.http.post(this.env.API_URL + 'auth/register',
        {erabiltzailea: erabiltzailea, email: email, password: password}
      )
    }
    logout() {
      const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.token
      });
      return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
      .pipe(
        tap(data => {
          this.storage.remove("token");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      )
    }
    user() {
      const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.token
      });
      return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
      .pipe(
        tap(user => {
          return user;
        })
      )
    }
    getToken() {
      return this.storage.get('token').then(
        data => {
          this.token = data;
          if(this.token != null) {
            this.isLoggedIn=true;
          } else {
            this.isLoggedIn=false;
          }
        },
        error => {
          this.token = null;
          this.isLoggedIn=false;
        }
      );
    }
  }
