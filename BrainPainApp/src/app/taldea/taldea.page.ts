import { Component, OnInit } from '@angular/core';
import { TaldeakService } from '../services/taldeak.service';
import { ActivatedRoute } from '@angular/router';
import { Taldea } from '../modeloak/taldea';
import { SailkapenaService } from '../services/sailkapena.service';
import { Morralli } from '../modeloak/morralli';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../modeloak/user';
import { NavController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-taldea',
  templateUrl: './taldea.page.html',
  styleUrls: ['./taldea.page.scss'],
})
export class TaldeaPage implements OnInit {

  constructor(private navCtrl: NavController,private alertCtrl: AlertController,private authService: AuthService, private taldeakService: TaldeakService, private route: ActivatedRoute, private sailkapenaService: SailkapenaService) { }

  taldeIzena : string;
  taldea : Taldea;
  sailkapena: Morralli[] = [];
  zurePuntuak: number;
  taldeIzenaa : string;
  token :string;
  isAdmin : boolean;
  user : User;
  ezabatuta : boolean = false;
  erabiltzaileIzena : string;
  erabiltzaileId : number;
  zurePosizioa: number = 0;
  zu: Morralli;

  ngOnInit() {
    this.taldeIzena = this.taldeakService.taldeIzenaLortu();
    this.authService.user().subscribe(
      user => {
        this.user = user;
      }
    ).add(() => {
      this.startCountdown(0.5);
    });
  }
  //timer bat denbora baten ondoren dena exekutatzeko
  startCountdown(seconds){
    var counter = seconds;
  
    var interval = setInterval(() => {
      console.log(counter);
      counter--;
      if(counter < 0 ){
        this.erabiltzaileenSailkapenekoDatuak();
        this.startCountdown2(1);
        clearInterval(interval);
        console.log('Ding!');
      };
    }, 1000);
  }
  //bigarren timer-a
  startCountdown2(seconds){
    var counter = seconds;
  
    var interval = setInterval(() => {
      console.log(counter);
      counter--;
      if(counter < 0 ){
        this.isSortzailea(this.token);
        clearInterval(interval);
        console.log('Ding!');
      };
    }, 1000);
  }

 
  //taldekideen sailkapeneko datuak hartzen ditu
  erabiltzaileenSailkapenekoDatuak(){
    console.log(this.taldeIzena)
    this.taldeakService.taldekideDenaLortu(this.taldeIzena).subscribe(respuesta => {
      this.sailkapena = respuesta;
      this.token = this.sailkapena[0].token;
      this.taldeIzenaa = this.sailkapena[0].izena;
    }).add(() => {
      console.log("HEMEN")
      console.log(this.user.erabiltzailea)
      this.zu = this.sailkapena.find( ({ erabiltzailea }) => erabiltzailea === this.user.erabiltzailea);
      if(this.zu != undefined)
      {
        this.zurePosizioa = this.sailkapena.findIndex( ({ id }) => id === this.zu.id) + 1;
      }
    });
    //logeatutako erabiltzailearen datuak hartzen ditu
    this.sailkapenaService.getZurePuntuak()
    .subscribe(data => {this.zurePuntuak = data[0].Totala})
    .add(() => {
      this.nullToZero();
    });
  }
  //erabiltzailearen puntuak null bueltatzen badu 0 bihurtzeko
  nullToZero(){
    if(this.zurePuntuak == null){
      this.zurePuntuak = 0;
    }
  }
  //Token-a hartzeko alert-a
  async alertToken(){

    let alerta = await this.alertCtrl.create({
      header: 'Taldearen Token-a:',
      inputs: [
        {
          name: 'token',
          value: this.token,
          placeholder: 'Taldearen Token-a:'
        }
      ],
      buttons: [
        {
          text: 'Listo!',
          handler: data => {
          }
        }
      ]
    });
   await alerta.present();
  }
  //taldearen sortzailea den edo ez jakiteko
  isSortzailea(token: string){
    this.taldeakService.isAdmin(token)
    .subscribe(data => {
      if(data == true){
        this.isAdmin = true;
        console.log(this.isAdmin)
      }
      else{
        this.isAdmin = false;
        console.log(this.isAdmin)
      }
    })
  
  this.authService.user().subscribe(
    user => {
      this.user = user;
    });
    console.log(this.user);
  }
  //klikatutako erabiltzailea taldetik ezabatzeko
  erabiltzaileaEzabatuTaldetik(i:number){
    this.erabiltzaileIzena = this.sailkapena[i].erabiltzailea;
    this.erabiltzaileId = this.sailkapena[i].id;
    this.taldeakService.ezabatuTaldetik(this.erabiltzaileIzena, this.erabiltzaileId)
    .subscribe(data => {
      if(data == true){
        this.ezabatuta = true;
        console.log(this.ezabatuta)
      }
      else{
        this.ezabatuta = false;
        console.log(this.ezabatuta)
      }
    })
  }
  //atzera joateko
  goBack(){
    this.navCtrl.navigateRoot('/tabs/tabTaldeak');
  }
}