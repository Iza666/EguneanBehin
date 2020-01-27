import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ErabiltzaileakService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private envService: EnvService) { }




  /* profilaAldatu(erabiltzailea: string, email: string, argazkia: string){
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    console.log("im in1");

    return this.http.post(this.envService.API_URL + 'aldatuProfila', { erabiltzailea: erabiltzailea, email: email, argazkia: argazkia },{ headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
        console.log("im in2");
      }),
    )} */
  profilaAldatu(erabiltzailea: string, email: string, argazkia: string) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    console.log("im in1");
    return this.http.post<any>(this.envService.API_URL + 'aldatuProfila', { erabiltzailea: erabiltzailea, email: email, argazkia: argazkia },{ headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }
}
