import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { Taldea } from 'src/app/modeloak/taldea';
import { Sailkapena_simple } from '../modeloak/sailkapena_simple';


@Injectable({
  providedIn: 'root'
})
export class TaldeakService {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private envService: EnvService

  ) { }

    //taldea sortzeko laravel-en
  taldeaSortu(izena: string) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    return this.http.post<Taldea[]>(this.envService.API_URL + 'taldeaSortu', { izena:izena},{ headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }
  //erabiltzailearn arabera taldeak lortzeko
  taldeaLortu() {
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    return this.http.post<Taldea[]>(this.envService.API_URL + 'taldeaLortu', {},{ headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }
  //taldeko taldekideak lortzeko metodoa
  taldekideakLortu(taldeIzena: string){
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    return this.http.post<Taldea>(this.envService.API_URL + 'taldekideakLortu', {taldeIzena: taldeIzena} , { headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }
  //taldekideen puntuak lortzeko metodoa
  taldekidePuntuakLortu(partaide2:string, partaide3:string, partaide4:string, partaide5:string ){
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    return this.http.post<Sailkapena_simple[]>(this.envService.API_URL + 'taldekidePuntuakLortu', {partaide2:partaide2, partaide3:partaide3, partaide4:partaide4, partaide5:partaide5} , { headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }
  //chanchullo klikatutako taldearen izena lortzeko
  taldearenIzena: string;
  taldeIzena(taldeIzena:string){
    this.taldearenIzena = taldeIzena;
  }
  taldeIzenaLortu(): string{
    return this.taldearenIzena;
  }

}
