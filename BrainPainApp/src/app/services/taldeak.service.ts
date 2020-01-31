import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { Taldea } from 'src/app/modeloak/taldea';
import { Sailkapena_simple } from '../modeloak/sailkapena_simple';
import { Morralli } from '../modeloak/morralli';


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
  taldekideDenaLortu(){
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    return this.http.post<Morralli[]>(this.envService.API_URL + 'taldekideDenaLortu', {} , { headers: headers}).pipe(
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
