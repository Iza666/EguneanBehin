import { Component, OnInit } from '@angular/core';
import { DenaService } from './../services/dena.service';
import { Galdera } from './../modeloak/galdera';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { animationFrameScheduler } from 'rxjs';
import { Router } from '@angular/router'



@Component({
  selector: 'app-galdera',
  templateUrl: './galdera.page.html',
  styleUrls: ['./galdera.page.scss'],
})
export class GalderaPage implements OnInit {

  constructor(private DenaService : DenaService,
    private authService: AuthService, private http: HttpClient,private router: Router
    ) { }

  id = 0;
  ngOnInit() {
    this.getGalderak();
  }
  galderak : Galdera[];
  user: User;


  //Galderak lortzeko metodoa
  getGalderak(): Galdera[]{
    this.DenaService.getGalderak()
    .subscribe(data => {this.galderak = data},
       error=> console.log("Error ::"+ error));
       return this.galderak;
  }

  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
        console.log(user); 
      }
    );
  }
   count : number = 0;
  hurrengoa(){
    if(this.count!=10){
      this.getGalderak();
      this.count++;
      alert(this.count);
    }
    else{
      alert("Partida amaitu da, dena gordetzen...");
      this.bidaliAmaitutakoPartida();
      this.router.navigateByUrl('');
    }
  }

  // Galdera bakoitza bidaltzen bere erantzunarekin, falta da id_partida kontrolatzea
  bidaliGalderak(a: number): void{
    if(a == 1){
      let datuak = {"id_erabiltzailea" : this.user.id, "id_galdera": this.galderak[0].id, "id_partida" : 1, "erantzuna": this.galderak[0].opt1_erantzuna};
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
    }
    if(a == 2){
      let  datuak = {"id_erabiltzailea" : this.user.id, "id_galdera": this.galderak[0].id, "id_partida" : 1, "erantzuna": this.galderak[0].opt2};
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
          });    }
    if(a == 3){
      let  datuak = {"id_erabiltzailea" : this.user.id, "id_galdera": this.galderak[0].id, "id_partida" : 1, "erantzuna": this.galderak[0].opt3};
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
    }
  }

  bidaliAmaitutakoPartida(){
    var dt = new Date();
    var d = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    let datuak = {"id":0,"id_erabiltzailea" : this.user.id, "data": d, "puntuak" : 40000,"zenbat_zuzen": 4,"zenbat_denbora" : 5};
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
  profilaAldatu(){
    
  }
  
}
