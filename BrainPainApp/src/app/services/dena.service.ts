import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Galdera } from './../modeloak/galdera';
import { Sailkapena } from './../modeloak/sailkapena';


@Injectable({
  providedIn: 'root'
})
export class DenaService {

  urlSailkapena = 'http://127.0.0.1:8000/api/ranking';


  constructor(public http: HttpClient) { 
    
  }
  getSailkapena(): Observable<Sailkapena[]> {
    return this.http.get<Sailkapena[]>(this.urlSailkapena);
  }
}