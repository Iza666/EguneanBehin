import { Component, OnInit } from '@angular/core';
import { TaldeakService } from '../services/taldeak.service';
import { ActivatedRoute } from '@angular/router';
import { Taldea } from '../modeloak/taldea';
import { SailkapenaService } from '../services/sailkapena.service';
import { Sailkapena_simple } from '../modeloak/sailkapena_simple';
import { Morralli } from '../modeloak/morralli';


@Component({
  selector: 'app-taldea',
  templateUrl: './taldea.page.html',
  styleUrls: ['./taldea.page.scss'],
})
export class TaldeaPage implements OnInit {

  constructor(private taldeakService: TaldeakService, private route: ActivatedRoute, private sailkapenaService: SailkapenaService) { }

  ngOnInit() {
    this.taldeIzena = this.taldeakService.taldeIzenaLortu();
/*     this.taldekideakLortu();
 */    this.startCountdown(0.5);
  }
  taldeIzena : string;
  taldea : Taldea;
  //timer bat denbora baten ondoren dena exekutatzeko
  startCountdown(seconds){
    var counter = seconds;
  
    var interval = setInterval(() => {
      console.log(counter);
      counter--;
      
  
      if(counter < 0 ){
        this.erabiltzaileenSailkapenekoDatuak();
/*         this.bete();
 */        clearInterval(interval);
        console.log('Ding!');
      };
    }, 1000);
  }
  //html-a betetzen du taldekideen informazioarekin
  /* bete(){
    var a = document.getElementById("taldeIzena");
    a.innerHTML= this.taldea[0].izena;
    var a = document.getElementById("taldekide1");
    a.innerHTML= this.taldea[0].partaide1 + " " + this.zurePuntuak;
    var a = document.getElementById("taldekide2");
    a.innerHTML= this.taldea[0].partaide2 + " " + this.sailkapena[0].Totala;
    var a = document.getElementById("taldekide3");
    a.innerHTML= this.taldea[0].partaide3 + " " + this.sailkapena[1].Totala;
    var a = document.getElementById("taldekide4");
    a.innerHTML= this.taldea[0].partaide4 + " " + this.sailkapena[2].Totala;
    var a = document.getElementById("taldekide5");
    a.innerHTML= this.taldea[0].partaide5 + " " + this.sailkapena[3].Totala;
  } */


  sailkapena: Morralli[] = [];
  zurePuntuak: number;
  taldeIzenaa : string;
  token :string;
  //taldekideen sailkapeneko datuak hartzen ditu
  erabiltzaileenSailkapenekoDatuak(){
    this.taldeakService.taldekideDenaLortu().subscribe(respuesta => {
      this.sailkapena = respuesta;
      this.token = this.sailkapena[0].token;
      this.taldeIzenaa = this.sailkapena[0].izena;
      console.log(this.sailkapena);
  });
  //logeatutako erabiltzailearen datuak hartzen ditu
    this.sailkapenaService.getZurePuntuak()
      .subscribe(data => {this.zurePuntuak = data[0].Totala}
        );
  }
  alertToken(){
    const alert = document.createElement('ion-alert');
    alert.header = 'Token-a';
    alert.message = 'Hau da zure Token-a:  '+this.token;
    alert.buttons = ['Ederto'];
    document.body.appendChild(alert);
    return alert.present();
  }
  isSortzailea(){
    
  }
}

