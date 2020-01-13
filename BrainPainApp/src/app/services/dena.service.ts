import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Galdera } from './../modeloak/galdera';

@Injectable({
  providedIn: 'root'
})
export class DenaService {

  url = 'http://127.0.0.1:8000/api/galderak';

  constructor(public http: HttpClient) { 
    
  }

  private produktuaUrl = 'api/produktuak';  // URL produktuak api     

  getGalderak(): Observable<Galdera[]> { 	     
      return this.http.get<Galdera[]>(this.url);
  }

  
 

}