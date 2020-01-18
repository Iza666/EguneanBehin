import { Component, OnInit } from '@angular/core';
import { DenaService } from './../services/dena.service';
import { Galdera } from './../modeloak/galdera';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { animationFrameScheduler } from 'rxjs';


@Component({
  selector: 'app-galdera',
  templateUrl: './galdera.page.html',
  styleUrls: ['./galdera.page.scss'],
})
export class GalderaPage implements OnInit {

  constructor(private DenaService : DenaService,
    private authService: AuthService, private http: HttpClient
    ) { }

  id = 0;
  ngOnInit() {
    this.getGalderak();
  }
  galderak : Galdera[];
  user: User;


  //Galderak lortzeko metodoa
  getGalderak(): void{
    this.DenaService.getGalderak()
    .subscribe(data => {this.galderak = data},
       error=> console.log("Error ::"+ error));
  }
  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
        console.log(user); 
      }
    );
  }
  hurrengoa(){
    alert("hi");
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
    amaitu(){
      
    }
  }

  

  //Galderen erantzunak kontrolatzen 'Partidak' taulara bidaltzeko, ID PARTIDA ONDO PENTSATU // PUNTUAK, DATA ETA DENBORA BIRPASATU
  bidaliPartida(){
    let  datuak = {"id": 1, "id_erabiltzailea" : this.user.id, "data": 2, "puntuak" : 100, "zenbat_zuzen": 2, "zenbat_denbora" : 20};
      let options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      var url = "http://localhost:8000/api/insertMatch";
      new Promise(resolve => {
        this.http.post(url,JSON.stringify(datuak),options)
           .subscribe(data => {
             resolve(data)
            })
          });
  }
  profilaAldatu(){
    
  }
  
}
