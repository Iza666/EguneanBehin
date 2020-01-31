import { Component, OnInit } from '@angular/core';
import { SailkapenaService } from '../services/sailkapena.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/modeloak/user';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { animationFrameScheduler } from 'rxjs';
import { Router } from '@angular/router'
import { GalderakService } from '../services/galderak.service';
import { GalderaReply } from '../modeloak/galderaReply';
import { Galdera } from '../modeloak/galdera';

@Component({
  selector: 'app-galdera',
  templateUrl: './galdera.page.html',
  styleUrls: ['./galdera.page.scss'],
})
export class GalderaPage implements OnInit {

  public timer = 0;

  respuesta: GalderaReply = {
    idPartida: 0,
    galdera: []
  };

  id = 0;

  galderak: Galdera[] = [];
  user: User;
  puntuak: number = 0;

  galdera: any;

  count: number = 0;

  seconds: number = 0;
  minutes: number = 0;
  erantzuna: string;
  optzioRandom: string[] = [];
  zenbatZuzen: number = 0;
  jokatutaChecked: boolean = false;
  jokatuta: boolean;

  constructor(private SailkapenaService: SailkapenaService,
    private authService: AuthService, private http: HttpClient, private router: Router, private galderakService: GalderakService) {
  }
  ngOnInit() {
    this.checkJokatuta();
    this.startGalderak(1);
  }
  startGalderak(seconds){
    var counter = seconds;
    var interval = setInterval(() => {
      console.log(counter);
      counter--;
      if(counter < 0 ){
        if(!this.jokatuta)
        {
          this.startTimer();
          //partida berria sortu ondoren galdera random bat bueltatzen du eta this.galderak-en gordetzen du
          this.galderakService.partidaSortu().subscribe(function(respuesta) {
            console.log(respuesta);
            this.respuesta=respuesta;
            this.galderak = respuesta.galdera;
            this.erantzunRandom();
          }.bind(this)
          )
        }
        else{
          this.router.navigateByUrl('/tabs/tab1');
        }
        clearInterval(interval);
        console.log('Ding!');
      };
    }, 1000);
  }
  checkJokatuta(){
    this.jokatutaChecked = true;
    this.galderakService.checkJokatutaService().subscribe(data => {this.jokatuta = data},
      error => console.log("Error ::"+ error));
    console.log(this.jokatuta);
  }
  //hasieran user objetua deklaratzeko logeatutako erabiltzailearen datuekin
  ionViewWillEnter() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
        console.log(user);
      }
    );
  }

  //erantzundako galderaren erantzuna bidaltzen du datu basera, hau 9 biderrez egiten du eta 10.enean beste metodo bateri deitzen dio
  //partidaren emaitzak gordetzeko partidak taulan
  bidaliErantzuna(a: number) {
    if (this.count != 9) {
      if(this.erantzuna == this.optzioRandom[a]){
        this.puntuak += 500;
        this.zenbatZuzen += 1;
      }
      console.log("pidiendo pregunta count != 10");
      this.galderakService.bidaliErantzuna(this.galderak[0].id, a, this.respuesta.idPartida).subscribe(
        respuesta => {
          this.respuesta = respuesta;
          this.galderak = respuesta.galdera;
          this.erantzuna = this.galderak[0].opt1_erantzuna;
          this.erantzunRandom();
          console.log(this.galderak);
          return this.respuesta;
        }
      )
      this.count++;
    }
    else {
      alert("Partida amaitu da, dena gordetzen...");
      console.log(this.puntuak);
      var dt = new Date();
      var time = this.minutes + ":" + this.seconds;
      var d = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
      this.galderakService.bidaliAmaitutakoPartida(this.puntuak, d, this.minutes, this.seconds, this.respuesta.idPartida, this.zenbatZuzen).subscribe(
        respuesta => {
          console.log(respuesta);
      });
      console.log("he hecho mierda");
      this.router.navigateByUrl('/tabs/tabPartidak');
    }
  }
  //erantzun posibleak shuffle egiten ditu
  erantzunRandom(){
    this.optzioRandom = [this.galderak[0].opt1_erantzuna, this.galderak[0].opt2, this.galderak[0].opt3];
    this.optzioRandom = this.shuffleArray();
  }
  //erantzunak random izateko guk sortutako metodoa
  shuffleArray() : string[]{
    for (var i = this.optzioRandom.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.optzioRandom[i];
        this.optzioRandom[i] = this.optzioRandom[j];
        this.optzioRandom[j] = temp;
    }
    return this.optzioRandom;
  }
  //partida hasi baino lehen erabiltzen dugun transizioaren timer-a
  startTimer() {
    setInterval(function () {
      if (this.timer < 10 && this.timer != 0) {
        this.seconds = "0" + this.timer;
        ++this.timer;
      }

      else if (this.timer != 60) {
        this.seconds = this.timer++;
      }
      else {
        this.timer = 0;
        this.seconds = 0;
        ++this.minutes;
        ++this.timer;
      }
    }.bind(this), 1000)
  }

 galderaIrudia(){
    document.getElementById("galdera_irudia").innerHTML ="<img src="+this.galderak[0].argazkia+">"
  } 
}
