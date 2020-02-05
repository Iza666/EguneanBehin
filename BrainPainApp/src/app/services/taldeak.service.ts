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
  taldekideDenaLortu(taldeIzena : string){
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    return this.http.post<Morralli[]>(this.envService.API_URL + 'taldekideDenaLortu', {taldeIzena : taldeIzena} , { headers: headers}).pipe(
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
  talderaSartu(token: string){
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    return this.http.post<boolean>(this.envService.API_URL + 'talderaSartu', {token: token} , { headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }
  //sortzailea den edo ez bueltatzen du taldekideak ezabatu ahal izateko
  isAdmin(token: string){
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    return this.http.post<boolean>(this.envService.API_URL + 'isAdmin', {token: token} , { headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }
  //taldekidea taldetik ezabatzeko metodoa
  ezabatuTaldetik(i: string, id : number){
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    return this.http.post<boolean>(this.envService.API_URL + 'ezabatuTaldetik', {i: i, id:id} , { headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }
}
