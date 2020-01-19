import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/modeloak/user';
import { Galdera } from './../modeloak/galdera';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GalderakService {

  constructor(private http: HttpClient) { }

  bidaliAmaitutakoPartida(puntuak:number, user:User){
    var dt = new Date();
    var d = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    let datuak = {"id":0,"id_erabiltzailea" : user.id, "data": d, "puntuak" : puntuak,"zenbat_zuzen": 4,"zenbat_denbora" : 5};
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
  bidaliGalderak(a: number, galderak: Galdera[], user: User) : number{
    if(a == 1){
      let datuak = {"id_erabiltzailea" : user.id, "id_galdera": galderak[0].id, "id_partida" : 1, "erantzuna": 1};
      let options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      var url = "http://localhost:8000/api/insertQuestion";
      new Promise(resolve => {
        this.http.post(url,JSON.stringify(datuak),options)
           .subscribe(data => {
             resolve(data)
            })
          });
      document.getElementById("galdera").style.display="none";
      this.puntuak +=10;
      return this.puntuak;
    }
    if(a == 2){
      let  datuak = {"id_erabiltzailea" : user.id, "id_galdera": galderak[0].id, "id_partida" : 1, "erantzuna": 2};
      let options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      var url = "http://localhost:8000/api/insertQuestion";
      new Promise(resolve => {
        this.http.post(url,JSON.stringify(datuak),options)
           .subscribe(data => {
             resolve(data)
            })
          });    
          return this.puntuak;
        }
          
    if(a == 3){
      let  datuak = {"id_erabiltzailea" : user.id, "id_galdera": galderak[0].id, "id_partida" : 1, "erantzuna": 3};
      let options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      var url = "http://localhost:8000/api/insertQuestion";
      new Promise(resolve => {
        this.http.post(url,JSON.stringify(datuak),options)
           .subscribe(data => {
             resolve(data)
            })
          });
          return this.puntuak;

    }
  }
  getGalderak(): Observable<Galdera[]> { 	     
    return this.http.get<Galdera[]>('http://127.0.0.1:8000/api/galderak');
  }
}
