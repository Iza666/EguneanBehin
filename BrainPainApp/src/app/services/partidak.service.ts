import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { Partida } from './../modeloak/partida';



@Injectable({
  providedIn: 'root'
})
export class PartidakService {

  constructor(private http: HttpClient, private authService: AuthService, private envService: EnvService, private alertService: AlertService) { }
  
  partidakLortu(){
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    console.log("Obteniendo partidas con token " + this.authService.token);
    return this.http.get<Partida[]>(this.envService.API_URL + 'partidakLortu', { headers: headers }
    ).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }
}
