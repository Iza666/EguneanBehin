import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { Taldea } from 'src/app/modeloak/taldea';


@Injectable({
  providedIn: 'root'
})
export class TaldeakService {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private envService: EnvService

  ) { }


  taldeaSortu(izena: string, partaide1: string, partaide2: string, partaide3: string, partaide4: string, partaide5: string) {
    const headers = new HttpHeaders({
      'Authorization': "Bearer" + " " + this.authService.token
    });
    return this.http.post<Taldea[]>(this.envService.API_URL + 'taldeaSortu', { izena:izena, partaide1:partaide1, partaide2:partaide2, partaide3:partaide3, partaide4:partaide4, partaide5:partaide5},{ headers: headers}).pipe(
      tap(respuesta => {
        console.log(respuesta)
      }),
    );
  }


  //JONARE
  /* getTaldeak(): Observable<UserTaldeak[]>{
    +const headeas = new HttpHeaders({
    +  'Authorization': "Bearer"+" "+ this.authService.token
    +});
    +
    +    return this.http.get<UserTaldeak[]>(this.env.API_URL + 'usertaldea', { headers: headeas }
           ) */

}
