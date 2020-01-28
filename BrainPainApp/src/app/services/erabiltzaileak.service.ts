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


  profilaAldatu(erabiltzailea: string, email: string) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    console.log(erabiltzailea + " " + email);
    return this.http.post<string>(this.envService.API_URL + 'aldatuProfila', { erabiltzailea: erabiltzailea, email: email},{ headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }
}
