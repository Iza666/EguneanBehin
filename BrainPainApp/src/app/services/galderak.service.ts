import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/modeloak/user';
import { Galdera } from './../modeloak/galdera';
import { Observable } from 'rxjs';
import {GalderaPage} from 'src/app/galdera/galdera.page'
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

  bidaliAmaitutakoPartida(puntuak:number, user:User, min : number, secs: number){
    var dt = new Date();
    var time = min +":"+secs;
    var d = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    let datuak = {"id":0,"id_erabiltzailea" : user.id, "data": d, "puntuak" : puntuak,"zenbat_zuzen": 4,"zenbat_denbora" : time};
      let options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      var url = "http://localhost:8000/api/logedPersonMatch";
      new Promise(resolve => {
        this.http.post(url,JSON.stringify(datuak),options)
            .subscribe(data => {
              resolve(data)
            })
          });
      document.getElementById("galdera").style.display="none";
  }
  puntuak :number = 0;
  datuak : Array<GalderaReply>;
  bidaliErantzuna(id_galdera: number, erantzuna:number, id_partida: number) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer"+" "+this.authService.token
    });
    console.log("Respondinedo  game with token"+ this.authService.token)
    return this.http.post<GalderaReply[]>(this.envService.API_URL + 'insertQuestion', { headers: headers, id_galdera: id_galdera, erantzuna:erantzuna, id_partida: id_partida}
    ).pipe(
      tap(respuesta=> {
        respuesta.forEach( ( x ) => {

          this.datuak.push( x );
      } );
      }),
    );
     }
  d = new Date();
  m = this.d.getUTCMinutes();

  h = this.d.getUTCHours();

  partidaSortu(){
    const headers = new HttpHeaders({
      'Authorization': "Bearer"+" "+this.authService.token
    });
    console.log("Creando game with token"+ this.authService.token)
    return this.http.get<GalderaReply[]>(this.envService.API_URL + 'insertMatch', { headers: headers }
    ).pipe(
      tap(respuesta=> {
      var algo = respuesta[0];
        return respuesta[0];
      }),
    );
  }
  
}
