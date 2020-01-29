import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Galdera } from '../modeloak/galdera';
import { Sailkapena } from '../modeloak/sailkapena';


@Injectable({
  providedIn: 'root'
})
export class SailkapenaService {

  urlZurePuntuak = 'http://127.0.0.1:8000/api/zurePuntuak';
  urlSailkapena = 'http://127.0.0.1:8000/api/ranking';
  
  constructor(public http: HttpClient, private authService: AuthService, private envService: EnvService) { 
  }
  getSailkapena(): Observable<Sailkapena[]> {
    return this.http.get<Sailkapena[]>(this.urlSailkapena);
  }
  getZurePuntuak(){
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });

    return this.http.get<number>(this.envService.API_URL + 'zurePartida', { headers: headers }).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }
}