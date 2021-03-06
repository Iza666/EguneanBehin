import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/modeloak/user';
import { Galdera } from './../modeloak/galdera';
import { Observable } from 'rxjs';
import { GalderaPage } from 'src/app/galdera/galdera.page'
import { AuthService } from './auth.service';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { GalderaReply } from '../modeloak/galderaReply';




@Injectable({
  providedIn: 'root'
})
export class GalderakService {

  constructor(private http: HttpClient, private authService: AuthService, private envService: EnvService, private alertService: AlertService) {


  }


  d = new Date();
  m = this.d.getUTCMinutes();
  puntuak: number = 0;
  datuak: Array<GalderaReply>;
  h = this.d.getUTCHours();


  //JOKATU AHAL DU GURE ERABILTZAILE MAITEAAAAAAK?!?!?!
  checkJokatutaService(){
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });

    return this.http.get<boolean>(this.envService.API_URL + 'jokatuta', { headers: headers }).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }

  //amaitutako partidaren datuak laravel-era bidaltzeko metodoa
  bidaliAmaitutakoPartida(puntuak: number, d: string, min: number, secs: number, idPartida: number, zenbatZuzen: number) {
    console.log(puntuak + ' ' + d + ' ' + min + ' ' + secs + ' ' + idPartida + ' ' + zenbatZuzen);
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    console.log("Terminando with token" + this.authService.token);
    var time = min + ":" + secs;
    console.log("prepost");

    return this.http.post<string>(this.envService.API_URL + 'endedMatchInsert', { puntuak: puntuak, zenbat_denbora: time, d: d, idPartida: idPartida, zenbat_zuzen: zenbatZuzen },{ headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }

  //erantzundako galderaren erantzuna bidaltzen duen metodoa
  bidaliErantzuna(id_galdera: number, erantzuna: number, idPartida: number) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    console.log("Respondinedo  game with token" + this.authService.token);
    return this.http.post<GalderaReply>(this.envService.API_URL + 'insertQuestion', { id_galdera: id_galdera, erantzuna: erantzuna, idPartida: idPartida }, { headers: headers }
    ).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }

  //BADABIILL CLAVEE
  partidaSortu(): Observable<GalderaReply> {
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    console.log("Creando game with token" + this.authService.token)
    console.log()
    return this.http.get<GalderaReply>(this.envService.API_URL + 'insertMatch', { headers: headers }).pipe(tap(
      partida =>
        console.log(partida)
    ));
  }

}
